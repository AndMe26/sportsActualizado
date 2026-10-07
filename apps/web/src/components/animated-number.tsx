'use client'

import { useEffect, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  format?: 'currency' | 'integer' | 'percentage' | 'decimal'
  duration?: number
  className?: string
}

export function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  format = 'integer',
  duration = 1400,
  className = '',
}: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrameId: number

    // Curva suave desacelerada estilo Alpine Guides / iOS
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)

      setCurrent(easedProgress * value)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCurrent(value)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [value, duration])

  const formattedValue = () => {
    if (format === 'currency') {
      return Math.round(current).toLocaleString('es-CO')
    }
    if (format === 'percentage') {
      return Math.round(current)
    }
    if (format === 'decimal') {
      return current.toFixed(1)
    }
    return Math.round(current).toLocaleString('es-CO')
  }

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {formattedValue()}
      {suffix}
    </span>
  )
}
