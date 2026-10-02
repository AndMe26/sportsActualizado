'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Activity, ArrowLeft, ArrowRight } from 'lucide-react'
import { sampleAccounts, type Role } from '@sportcomplex/core'
import { Input } from '@sportcomplex/ui'
import { Brand } from '@/components/brand'
import { ActionButton } from '@/components/action-button'
import { GoogleMark } from '@/components/google-mark'
import { useApp } from '@/components/app-provider'

// Función para obtener la página principal según el rol
function getRoleDestination(role: Role): string {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'staff':
      return '/scanner' // o '/pos' según prefieras para el empleado
    case 'customer':
    default:
      return '/dashboard'
  }
}

function getSafeNextPath(path: string | null) {
  return path && path.startsWith('/') && !path.startsWith('//') ? path : null
}

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const register = mode === 'register'
  const router = useRouter()
  const { session, ready, login, notify } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Si ya hay sesión iniciada, redirigir a su panel correspondiente
  useEffect(() => {
    if (ready && session) {
      const nextPath = getSafeNextPath(new URLSearchParams(window.location.search).get('next'))
      router.replace(session.role === 'customer' && nextPath ? nextPath : getRoleDestination(session.role))
    }
  }, [ready, session, router])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) {
      notify('Ingresa un correo válido para continuar.', 'error')
      return
    }

    const account = login(email, register ? name : undefined)
    notify(
      register
        ? `¡Bienvenido a Altura Club, ${account.name.split(' ')[0]}!`
        : `Hola de nuevo, ${account.name.split(' ')[0]}.`,
      'success'
    )

    // Redirigir según el rol del usuario conectado
    const nextPath = getSafeNextPath(new URLSearchParams(window.location.search).get('next'))
    const destination = account.role === 'customer' && nextPath ? nextPath : getRoleDestination(account.role)

    router.push(destination)
  }

  return (
    <main className="auth-page">
      <div className="auth-art">
        <div className="auth-art-content">
          <Brand light />
          <div className="auth-mantra">
            <div className="eyebrow hero-eyebrow">TU ESPACIO, TU MOMENTO</div>
            <h2>El movimiento<br />cambia <span>todo.</span></h2>
            <p>Bienvenido a una comunidad que se mueve contigo.</p>
            <div className="auth-decoration">
              <Activity size={152} strokeWidth={0.8} />
            </div>
          </div>
          <div className="auth-quote">“La mejor inversión es la que haces en ti.”</div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-mobile-brand"><Brand /></div>
        <div className="auth-form-wrap">
          <Link href="/" className="back-link">
            <ArrowLeft size={15} /> Volver al inicio
          </Link>
          <div className="eyebrow">{register ? 'EMPIEZA HOY' : 'QUÉ BUENO TENERTE DE VUELTA'}</div>
          <h1>{register ? 'Crea tu cuenta.' : 'Ingresa a tu espacio.'}</h1>
          <p className="auth-subtitle">
            {register ? 'Un paso más cerca de tu próxima aventura.' : 'Tu próximo momento de bienestar te espera.'}
          </p>

          <button
            type="button"
            className="google-button"
            onClick={() => notify('El acceso con Google estará disponible pronto. Por ahora usa tu correo.')}
          >
            <GoogleMark /> Continuar con Google
          </button>

          <div className="auth-divider">
            <span />o con tu correo<span />
          </div>

          <form className="auth-fields" onSubmit={submit}>
            {register && (
              <label>
                Nombre completo
                <Input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="name"
                />
              </label>
            )}
            <label>
              Correo electrónico
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nombre@correo.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Contraseña
              <Input
                type="password"
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                autoComplete={register ? 'new-password' : 'current-password'}
                required
              />
            </label>

            {!register && (
              <button
                type="button"
                className="forgot-link"
                onClick={() => notify('La recuperación de contraseña estará disponible pronto.')}
              >
                ¿Olvidaste tu contraseña?
              </button>
            )}

            <ActionButton type="submit" className="w-full justify-center">
              {register ? 'Crear mi cuenta' : 'Ingresar'} <ArrowRight size={16} />
            </ActionButton>
          </form>

          {!register && process.env.NODE_ENV !== 'production' && (
            <p className="dev-hint">
              Solo en desarrollo, sin validar contraseña:{' '}
              {sampleAccounts.map((account) => (
                <button
                  type="button"
                  key={account.email}
                  onClick={() => setEmail(account.email)}
                >
                  {account.email} ({account.role})
                </button>
              ))}
            </p>
          )}

          <div className="auth-switch">
            {register ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
            <Link href={register ? '/login' : '/register'} onClick={(event) => {
              const nextPath = getSafeNextPath(new URLSearchParams(window.location.search).get('next'))
              if (!nextPath) return
              event.preventDefault()
              const destination = register ? '/login' : '/register'
              router.push(`${destination}?next=${encodeURIComponent(nextPath)}`)
            }}>
              {register ? 'Ingresar' : 'Regístrate'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}