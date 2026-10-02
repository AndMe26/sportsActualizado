import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-[#123e30] text-white hover:bg-[#1d6048] dark:bg-[#8cd766] dark:text-[#111815] dark:hover:bg-[#a2e87d]',
        brand: 'bg-[#123e30] text-white hover:bg-[#1d6048] dark:bg-[#8cd766] dark:text-[#111815] dark:hover:bg-[#a2e87d]',
        accent: 'bg-[#c9ef75] text-[#19352a] hover:bg-[#d6f694] font-bold shadow-xs',
        outline:
          'border-border border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'border border-border bg-[#f1f3ee] text-[#202b25] hover:bg-[#e6eae2] dark:bg-[#202b26] dark:text-[#f2f5f1] dark:border-[#303c35] dark:hover:bg-[#2b3a33]',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/15 text-destructive hover:bg-destructive/25 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto min-h-0',
      },
      size: {
        default: 'h-11 min-h-[44px] gap-2 px-4 text-sm',
        sm: 'h-9 min-h-[36px] gap-1.5 px-3 text-xs',
        lg: 'h-12 min-h-[48px] gap-2.5 px-6 text-base',
        icon: 'size-11 min-h-[44px] min-w-[44px]',
        'icon-sm': 'size-9 min-h-[36px] min-w-[36px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
