import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors border',
                    {
                        'border-transparent bg-white/10 text-white hover:bg-white/20': variant === 'default',
                        'border-transparent bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20': variant === 'success',
                        'border-transparent bg-amber-500/10 text-amber-400 hover:bg-amber-500/20': variant === 'warning',
                        'border-transparent bg-red-500/10 text-red-400 hover:bg-red-500/20': variant === 'danger',
                        'border-transparent bg-blue-500/10 text-blue-400 hover:bg-blue-500/20': variant === 'info',
                        'text-foreground': variant === 'outline',
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Badge.displayName = 'Badge'

export { Badge }
