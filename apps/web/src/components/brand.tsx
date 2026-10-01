'use client'

import {
  Activity,
} from 'lucide-react'
import { cn } from '@sportcomplex/ui'

export function Brand({ light = false }: { light?: boolean }) {
  return <div className={cn('flex items-center gap-2.5', light ? 'text-white' : 'text-app')}>
  <span className="brand-mark"><Activity size={19} strokeWidth={2.6} /></span>
  <span className="text-[16px] font-extrabold tracking-[-0.04em]">SportComplex</span>
  </div>
}
