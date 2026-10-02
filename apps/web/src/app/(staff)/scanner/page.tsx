'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Camera,
  CameraOff,
  Check,
  Clock3,
  LogOut,
  MapPin,
  Menu,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Ticket,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { formatDate, initials, roleHome, roleNavigation, serviceCategories, type CategorySlug } from '@sportcomplex/core'
import { Badge, Button, Input } from '@sportcomplex/ui'
import { Brand } from '@/components/brand'
import { UserMenu } from '@/components/user-menu'
import { useApp } from '@/components/app-provider'
import { useBookings } from '@/lib/stores'

type Result = 'valid' | 'used' | 'missing' | 'wrong' | 'inactive'

export default function AccessScannerPage() {
  const { session, notify, logout } = useApp()
  const [bookings, setBookings] = useBookings()
  const [menuOpen, setMenuOpen] = useState(false)
  const [code, setCode] = useState('')
  const [access, setAccess] = useState<CategorySlug>('canchas')
  const [result, setResult] = useState<Result | null>(null)

  // Camera & Scanner State
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [flashActive, setFlashActive] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const lastScannedRef = useRef<string | null>(null)

  const booking = bookings.find((entry) => entry.code === code.trim().toUpperCase())
  const nav = (session?.role && roleNavigation[session.role]) ? roleNavigation[session.role] : roleNavigation.staff

  // Synthesized Web Audio feedback
  const playBeep = (type: 'success' | 'error' = 'success') => {
    if (!soundEnabled || typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === 'success') {
        osc.frequency.setValueAtTime(880, ctx.currentTime) // A5
        osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.08) // D6
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.24)
      } else {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(220, ctx.currentTime)
        gain.gain.setValueAtTime(0.18, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.28)
      }
    } catch {
      // AudioContext blocked by policy or unsupported
    }
  }

  // Camera Management
  const startCamera = async (targetFacing: 'environment' | 'user' = facingMode) => {
    setCameraError(null)
    setCameraLoading(true)

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraError('Tu navegador o entorno no soporta acceso a la cámara mediante WebRTC.')
      setCameraLoading(false)
      return
    }

    try {
      // Stop previous tracks if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }

      const streamPromise = navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: targetFacing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => {
          const timeoutErr = new Error('Tiempo de espera agotado. Concede permisos de cámara o utiliza la simulación.')
          timeoutErr.name = 'TimeoutError'
          reject(timeoutErr)
        }, 3500)
      )

      const stream = await Promise.race([streamPromise, timeoutPromise])

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => {})
      }
      setCameraActive(true)
      notify('Cámara iniciada correctamente.', 'success')
    } catch (err: unknown) {
      const errorObj = err as { name?: string; message?: string }
      console.warn('Error accediendo a cámara:', err)
      if (errorObj.name === 'NotAllowedError' || errorObj.name === 'PermissionDeniedError') {
        setCameraError('Permiso de cámara denegado. Permite el acceso a la cámara en los ajustes de tu navegador.')
      } else if (errorObj.name === 'NotFoundError' || errorObj.name === 'DevicesNotFoundError') {
        setCameraError('No se encontró ninguna cámara física conectada al dispositivo.')
      } else {
        setCameraError(`No se pudo inicializar la cámara (${errorObj.message || 'Error de hardware'}).`)
      }
      setCameraActive(false)
    } finally {
      setCameraLoading(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(nextMode)
    if (cameraActive) {
      startCamera(nextMode)
    }
  }

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // QR / Barcode detection loop using BarcodeDetector if available
  useEffect(() => {
    if (!cameraActive) return

    let isSubscribed = true
    let scanInterval: NodeJS.Timeout | null = null

    // Check BarcodeDetector native support
    const hasBarcodeDetector = typeof window !== 'undefined' && 'BarcodeDetector' in window

    if (hasBarcodeDetector) {
      try {
        const detector = new (window as unknown as { BarcodeDetector: new (opts: { formats: string[] }) => { detect: (el: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>> } }).BarcodeDetector({
          formats: ['qr_code', 'code_128', 'code_39', 'ean_13'],
        })

        scanInterval = setInterval(async () => {
          if (!videoRef.current || videoRef.current.readyState < 2) return

          try {
            const barcodes = await detector.detect(videoRef.current)
            if (barcodes && barcodes.length > 0 && isSubscribed) {
              const rawValue = barcodes[0].rawValue?.trim()
              if (rawValue && rawValue !== lastScannedRef.current) {
                lastScannedRef.current = rawValue
                handleDetectedCode(rawValue)
              }
            }
          } catch {
            // Frame detection pass error ignored
          }
        }, 300)
      } catch (e) {
        console.warn('BarcodeDetector error:', e)
      }
    }

    return () => {
      isSubscribed = false
      if (scanInterval) clearInterval(scanInterval)
    }
  }, [cameraActive, bookings, access, soundEnabled])

  // Handle scanned or entered code
  const handleDetectedCode = (detectedText: string) => {
    const matched = detectedText.match(/ALT-\d{4}-\d{4}/i)
    const cleanCode = matched ? matched[0].toUpperCase() : detectedText.toUpperCase()

    setCode(cleanCode)
    setFlashActive(true)
    setTimeout(() => setFlashActive(false), 500)
    validateCode(cleanCode)
  }

  const validateCode = (codeToTest: string) => {
    const trimmed = codeToTest.trim().toUpperCase()
    const target = bookings.find((entry) => entry.code === trimmed)
    const next: Result = !target
      ? 'missing'
      : target.status === 'Usada'
        ? 'used'
        : target.status !== 'Confirmada'
          ? 'inactive'
          : target.category !== access
            ? 'wrong'
            : 'valid'

    setResult(next)
    playBeep(next === 'valid' ? 'success' : 'error')

    notify(
      next === 'valid'
        ? `Tiquete válido: ${target?.client} (${target?.service}).`
        : next === 'used'
          ? 'Este tiquete ya fue utilizado anteriormente.'
          : next === 'wrong'
            ? `Servicio incorrecto (${target?.category}). Este acceso es para ${access}.`
            : next === 'inactive'
              ? `La reserva está ${target?.status.toLowerCase()}.`
              : 'Código de tiquete no encontrado en el sistema.',
      next === 'valid' ? 'success' : 'error',
    )
  }

  const label: Record<Result, string> = {
    valid: 'VÁLIDO',
    used: 'YA USADO',
    wrong: 'SERVICIO INCORRECTO',
    missing: 'NO ENCONTRADO',
    inactive: 'RESERVA NO ACTIVA',
  }

  const showTicket = booking && result && result !== 'missing'

  return (
    <main className="scanner-page">
      <div className="scanner-top">
        <Link aria-label="Ir al punto de venta" href={session ? roleHome[session.role] : '/'} className="scanner-brand">
          <Brand light />
        </Link>
        <nav className="scanner-employee-nav" aria-label="Tareas del empleado">
          {nav.map(({ label: text, href }) => (
            <Link key={href} href={href} className={href === '/scanner' ? 'scanner-nav-active' : ''}>
              {text}
            </Link>
          ))}
        </nav>
        <UserMenu variant="dark" />
        <button
          className="scanner-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="scanner-mobile-nav" aria-label="Tareas del empleado">
          {nav.map(({ label: text, href }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {text}
              <ArrowRight size={15} />
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              logout()
            }}
          >
            Cerrar sesión <LogOut size={15} />
          </button>
        </nav>
      )}

      <div className="scanner-title">
        <div className="eyebrow">ALTURA CLUB · CONTROL DE ACCESO</div>
        <h1>
          Control de <span>acceso.</span>
        </h1>
        <p>Valida los códigos QR en tiempo real mediante la cámara o el teclado.</p>
      </div>

      <div className="scanner-workspace">
        <section className="camera-preview" aria-label="Visor del escáner">
          {cameraActive && (
            <div className="camera-active-badge">
              <span className="camera-active-dot" />
              <span>EN VIVO ({facingMode === 'environment' ? 'TRASERA' : 'FRONTAL'})</span>
            </div>
          )}

          {/* Real video stream */}
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className="camera-video-stream"
            style={{ display: cameraActive ? 'block' : 'none' }}
          />

          {!cameraActive && <div className="camera-texture" />}
          {flashActive && <div className="camera-scan-flash" />}

          <div className="camera-visual">
            <div className="camera-frame" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <span className={cameraActive ? 'camera-scanline-active' : 'camera-scanline'} />
            </div>
            <span className="camera-hint">
              {cameraActive ? 'APUNTA AL CÓDIGO QR' : 'CÁMARA EN ESPERA'}
            </span>
          </div>

          <div className="camera-status">
            <span>
              <i style={{ background: cameraActive ? '#c9ef75' : '#889988' }} />{' '}
              {cameraActive ? 'Sensor Activo' : 'Cámara Desactivada'}
            </span>
            <small>
              {cameraActive
                ? 'Escaneando códigos automáticamente...'
                : 'Activa la cámara o ingresa el código manual'}
            </small>
          </div>
        </section>

        {/* Camera Toolbar */}
        <div className="camera-controls-bar">
          {!cameraActive ? (
            <Button
              type="button"
              onClick={() => startCamera()}
              disabled={cameraLoading}
              className="camera-btn"
              aria-label="Activar escáner de cámara"
            >
              <Camera size={18} />
              {cameraLoading ? 'Iniciando sensor...' : 'Activar Cámara'}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                onClick={stopCamera}
                variant="destructive"
                className="camera-btn camera-btn-stop"
                aria-label="Detener cámara"
              >
                <CameraOff size={18} />
                Detener Cámara
              </Button>
              <Button
                type="button"
                onClick={toggleFacingMode}
                variant="outline"
                className="camera-btn"
                aria-label="Cambiar entre cámara frontal y trasera"
              >
                <RefreshCw size={17} />
                Cambiar Lente
              </Button>
            </>
          )}

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="icon-action text-[#c9ef75] border-[#3d4c41]"
            aria-label={soundEnabled ? 'Silenciar sonidos de lectura' : 'Activar sonidos de lectura'}
            title={soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        {/* Camera Error Banner */}
        {cameraError && (
          <div className="camera-error-banner" role="alert">
            <AlertTriangle size={20} className="flex-shrink-0 text-[#ff8d82]" />
            <div>
              <b>Aviso de hardware / permisos:</b>
              <p className="mt-1 text-[11.5px] leading-relaxed opacity-90">{cameraError}</p>
            </div>
          </div>
        )}

        {/* Manual controls form */}
        <form
          className="scanner-controls"
          onSubmit={(event) => {
            event.preventDefault()
            validateCode(code)
          }}
        >
          <div className="scanner-controls-heading">
            <span>
              <QrCode size={19} />
            </span>
            <div>
              <h2>Validar tiquete manual</h2>
              <p>O ingresa el código directamente para revisar el acceso.</p>
            </div>
          </div>

          <label className="scanner-field">
            Código del tiquete
            <Input
              value={code}
              onChange={(event) => {
                setCode(event.target.value)
                setResult(null)
              }}
              placeholder="ALT-0000-0000"
              autoComplete="off"
            />
          </label>

          <label className="scanner-field">
            Acceso seleccionado
            <select
              value={access}
              onChange={(event) => {
                setAccess(event.target.value as CategorySlug)
                setResult(null)
              }}
            >
              {serviceCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <Button type="submit" disabled={!code.trim()} className="w-full min-h-[44px]">
            <QrCode size={18} className="mr-2" /> Validar tiquete
          </Button>
        </form>
      </div>

      {/* Quick Test Codes */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="scanner-examples">
          <div className="flex items-center justify-between">
            <b>Simulación de QR de prueba (desarrollo):</b>
            <span className="text-[11px] text-[#8e9f93]">Haz clic para escanear</span>
          </div>
          <div>
            {bookings.slice(0, 6).map((entry) => (
              <button
                key={entry.id}
                onClick={() => {
                  setAccess(entry.category)
                  handleDetectedCode(entry.code)
                }}
                className="scanner-example hover:border-[#c9ef75] hover:text-[#c9ef75] transition-colors"
                title={`Probar escaneo de ${entry.client} (${entry.service})`}
              >
                <Sparkles size={12} className="inline mr-1 opacity-70" />
                {entry.code}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scan Result */}
      {result ? (
        <section className="scan-result" aria-live="polite">
          <div className="scan-status">
            <Badge
              variant={result === 'valid' ? 'success' : result === 'used' ? 'warning' : 'destructive'}
              className="text-[12px] px-3 py-1 font-bold tracking-wider inline-flex items-center gap-1.5"
            >
              <BadgeCheck size={16} /> {label[result]}
            </Badge>
          </div>

          {showTicket ? (
            <>
              <div className="scan-person">
                <span className="scan-avatar">{initials(booking.client)}</span>
                <div>
                  <b>{booking.client}</b>
                  <span>Cliente</span>
                </div>
              </div>
              <div className="scan-details">
                <span>
                  <Ticket size={15} /> {booking.service}
                </span>
                <span>
                  <Clock3 size={15} />{' '}
                  {formatDate(booking.date, { day: 'numeric', month: 'short', year: 'numeric' })} · {booking.time}
                </span>
                <span>
                  <MapPin size={15} /> Sede {booking.sede}
                </span>
              </div>

              {result === 'valid' && (
                <div className="scan-actions">
                  <button
                    className="allow-button"
                    onClick={() => {
                      setBookings(
                        bookings.map((entry) =>
                          entry.id === booking.id ? { ...entry, status: 'Usada' } : entry,
                        ),
                      )
                      setResult('used')
                      playBeep('success')
                      notify('Acceso registrado con éxito.', 'success')
                    }}
                  >
                    <Check size={17} /> Registrar ingreso
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="scanner-error" role="alert">
              No existe un tiquete asociado a este código en el sistema.
            </p>
          )}
        </section>
      ) : (
        <div className="scanner-instructions">
          <span>
            <ShieldCheck size={17} />
          </span>
          <p>
            <b>Validación de tiquetes en tiempo real</b>
            <small>Apunta el visor al código QR del cliente o presiona un código de prueba.</small>
          </p>
        </div>
      )}

      <div className="scanner-bottom">
        <span>ALTURA CLUB · SISTEMA DE ACCESO</span>
        <span>SEDE POBLADO</span>
      </div>
    </main>
  )
}

