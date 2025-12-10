import { cn } from '@/lib/utils'

interface MatchScoreBarProps {
    score: number
    showLabel?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export function MatchScoreBar({ score, showLabel = true, size = 'md', className }: MatchScoreBarProps) {
    const percentage = Math.round(score * 100)

    const getColor = (score: number) => {
        if (score >= 0.8) return 'bg-emerald-500'
        if (score >= 0.6) return 'bg-amber-500'
        return 'bg-red-500'
    }

    const getTextColor = (score: number) => {
        if (score >= 0.8) return 'text-emerald-700'
        if (score >= 0.6) return 'text-amber-700'
        return 'text-red-700'
    }

    const heights = {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
    }

    return (
        <div className={cn('w-full', className)}>
            {showLabel && (
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-600">Match Score</span>
                    <span className={cn('text-sm font-semibold', getTextColor(score))}>
                        {percentage}%
                    </span>
                </div>
            )}
            <div className={cn('w-full rounded-full bg-slate-200', heights[size])}>
                <div
                    className={cn(
                        'rounded-full transition-all duration-500',
                        heights[size],
                        getColor(score)
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
