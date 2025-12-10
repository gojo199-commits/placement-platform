'use client'

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PerformanceData {
    date: string
    correct: number
    incorrect: number
    total: number
}

interface TopicPerformance {
    topic: string
    accuracy: number
    attempted: number
}

interface PerformanceChartProps {
    data: PerformanceData[]
    type?: 'area' | 'bar'
    title?: string
}

interface TopicChartProps {
    data: TopicPerformance[]
    title?: string
}

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#6366f1', '#8b5cf6', '#ec4899']

export function PerformanceChart({ data, type = 'area', title = 'Performance Over Time' }: PerformanceChartProps) {
    return (
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-base font-medium text-white">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {type === 'area' ? (
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="correctGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="incorrectGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="correct"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fill="url(#correctGradient)"
                                    name="Correct"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="incorrect"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    fill="url(#incorrectGradient)"
                                    name="Incorrect"
                                />
                                <Legend />
                            </AreaChart>
                        ) : (
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="correct" fill="#10b981" name="Correct" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="incorrect" fill="#ef4444" name="Incorrect" radius={[4, 4, 0, 0]} />
                                <Legend />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export function TopicAccuracyChart({ data, title = 'Topic-wise Accuracy' }: TopicChartProps) {
    return (
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-base font-medium text-white">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis dataKey="topic" type="category" stroke="#9ca3af" fontSize={12} width={100} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                                    color: '#fff'
                                }}
                                formatter={(value: number) => [`${value}%`, 'Accuracy']}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.accuracy >= 70 ? '#10b981' : entry.accuracy >= 50 ? '#f59e0b' : '#ef4444'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

interface AccuracyPieChartProps {
    correct: number
    incorrect: number
    title?: string
}

export function AccuracyPieChart({ correct, incorrect, title = 'Overall Accuracy' }: AccuracyPieChartProps) {
    const data = [
        { name: 'Correct', value: correct },
        { name: 'Incorrect', value: incorrect },
    ]

    const total = correct + incorrect
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

    return (
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-base font-medium text-white">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                <Cell fill="#10b981" />
                                <Cell fill="#ef4444" />
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">{accuracy}%</p>
                            <p className="text-sm text-gray-400">Accuracy</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-sm text-gray-400">Correct ({correct})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-sm text-gray-400">Incorrect ({incorrect})</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
