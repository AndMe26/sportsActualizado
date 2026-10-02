import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive/15 text-destructive hover:bg-destructive/25',
        outline: 'border border-border text-foreground',
        success: 'border border-[#5e8b48]/20 bg-[#edf5e2] text-[#4b7652] dark:border-[#9ee285]/30 dark:bg-[#1f3524] dark:text-[#9ee285]',
        warning: 'border border-[#d5ae4e]/20 bg-[#fbf4df] text-[#947838] dark:border-[#edd67d]/30 dark:bg-[#38311b] dark:text-[#edd67d]',
        admin: 'rounded-md bg-[#f0f3ed] px-2 py-0.5 text-[11px] font-extrabold tracking-wider text-[#738176] dark:bg-[#24332a] dark:text-[#9bb684]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
