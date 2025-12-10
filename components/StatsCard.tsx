import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
    title: string
    value: string | number
    subtitle?: string
    icon: LucideIcon
    trend?: {
        value: number
        isPositive: boolean
    }
    className?: string
}

export function StatsCard({ title, value, subtitle, icon: Icon, trend, className }: StatsCardProps) {
    return (
        <Card className={cn('overflow-hidden border-white/10 bg-white/5 backdrop-blur-md', className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-400">{title}</p>
                        <p className="text-3xl font-bold text-white mt-1">{value}</p>
                        {subtitle && (
                            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                        )}
                        {trend && (
                            <div className={cn(
                                'flex items-center gap-1 mt-2 text-sm font-medium',
                                trend.isPositive ? 'text-emerald-400' : 'text-red-400'
                            )}>
                                <span>{trend.isPositive ? '↑' : '↓'}</span>
                                <span>{Math.abs(trend.value)}%</span>
                                <span className="text-gray-500 font-normal">vs last week</span>
                            </div>
                        )}
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl">
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
