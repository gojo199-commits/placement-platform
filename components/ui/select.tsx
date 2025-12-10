import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {label}
                    </label>
                )}
                <select
                    className={cn(
                        'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
                        error && 'border-red-500 focus:ring-red-400',
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        )
    }
)
Select.displayName = 'Select'

export { Select }
