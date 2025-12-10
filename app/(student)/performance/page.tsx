'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/components/StatsCard'
import { PerformanceChart, TopicAccuracyChart, AccuracyPieChart } from '@/components/PerformanceChart'
import {
    Target,
    Clock,
    CheckCircle,
    XCircle,
    Loader2,
    TrendingUp,
    BookOpen
} from 'lucide-react'
import Link from 'next/link'

interface PerformanceData {
    performanceData: Array<{
        date: string
        correct: number
        incorrect: number
        total: number
    }>
    topicPerformance: Array<{
        topic: string
        accuracy: number
        attempted: number
    }>
    difficultyPerformance: Array<{
        difficulty: string
        accuracy: number
        attempted: number
    }>
    summary: {
        totalAttempts: number
        totalCorrect: number
        totalIncorrect: number
        overallAccuracy: number
        averageTime: number
    }
}

export default function PerformancePage() {
    const { status } = useSession()
    const router = useRouter()
    const [data, setData] = useState<PerformanceData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    useEffect(() => {
        async function fetchPerformance() {
            try {
                const res = await fetch('/api/student/performance')
                if (res.ok) {
                    const performanceData = await res.json()
                    setData(performanceData)
                }
            } catch (error) {
                console.error('Failed to fetch performance:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (status === 'authenticated') {
            fetchPerformance()
        }
    }, [status])

    if (status === 'loading' || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!data || data.summary.totalAttempts === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md w-full border-white/10 bg-white/5 backdrop-blur-md">
                    <CardContent className="p-12 text-center">
                        <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-white mb-2">
                            No performance data yet
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Start practicing questions to see your performance analytics here.
                        </p>
                        <Link href="/practice">
                            <Button>Start Practicing</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-8 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
                    <p className="text-gray-400 mt-1">
                        Track your progress and identify areas for improvement
                    </p>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatsCard
                        title="Total Attempts"
                        value={data.summary.totalAttempts}
                        icon={BookOpen}
                    />
                    <StatsCard
                        title="Overall Accuracy"
                        value={`${data.summary.overallAccuracy}%`}
                        icon={Target}
                    />
                    <StatsCard
                        title="Correct Answers"
                        value={data.summary.totalCorrect}
                        icon={CheckCircle}
                    />
                    <StatsCard
                        title="Avg. Time"
                        value={`${data.summary.averageTime}s`}
                        icon={Clock}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <PerformanceChart
                        data={data.performanceData}
                        title="Performance Trend (Last 30 Days)"
                    />
                    <AccuracyPieChart
                        correct={data.summary.totalCorrect}
                        incorrect={data.summary.totalIncorrect}
                    />
                </div>

                {/* Topic Performance */}
                <div className="mb-8">
                    <TopicAccuracyChart
                        data={data.topicPerformance}
                        title="Topic-wise Performance"
                    />
                </div>

                {/* Detailed Topic Table */}
                <Card className="border-white/10 bg-white/5 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-white">Detailed Topic Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Topic</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Attempted</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Accuracy</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.topicPerformance.map((topic, index) => (
                                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-white/10 rounded-lg">
                                                        <BookOpen className="h-4 w-4 text-gray-300" />
                                                    </div>
                                                    <span className="font-medium text-white">{topic.topic}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center text-gray-400">
                                                {topic.attempted}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${topic.accuracy >= 70
                                                                ? 'bg-emerald-500'
                                                                : topic.accuracy >= 50
                                                                    ? 'bg-amber-500'
                                                                    : 'bg-red-500'
                                                                }`}
                                                            style={{ width: `${topic.accuracy}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-300 w-12">
                                                        {topic.accuracy}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <Badge
                                                    variant={
                                                        topic.accuracy >= 70
                                                            ? 'success'
                                                            : topic.accuracy >= 50
                                                                ? 'warning'
                                                                : 'danger'
                                                    }
                                                >
                                                    {topic.accuracy >= 70 ? 'Strong' : topic.accuracy >= 50 ? 'Average' : 'Weak'}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <Link href="/practice">
                                                    <Button variant="ghost" size="sm" className="hover:bg-white/10 hover:text-white">
                                                        Practice
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Difficulty Breakdown */}
                <Card className="mt-8 border-white/10 bg-white/5 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-white">Performance by Difficulty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {data.difficultyPerformance.map((diff) => (
                                <div
                                    key={diff.difficulty}
                                    className={`p-4 rounded-xl border border-white/5 ${diff.difficulty === 'EASY'
                                        ? 'bg-emerald-500/10'
                                        : diff.difficulty === 'MEDIUM'
                                            ? 'bg-amber-500/10'
                                            : 'bg-red-500/10'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`font-medium ${diff.difficulty === 'EASY'
                                            ? 'text-emerald-400'
                                            : diff.difficulty === 'MEDIUM'
                                                ? 'text-amber-400'
                                                : 'text-red-400'
                                            }`}>
                                            {diff.difficulty}
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            {diff.attempted} attempts
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold text-white">
                                        {diff.accuracy}%
                                    </div>
                                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${diff.difficulty === 'EASY'
                                                ? 'bg-emerald-500'
                                                : diff.difficulty === 'MEDIUM'
                                                    ? 'bg-amber-500'
                                                    : 'bg-red-500'
                                                }`}
                                            style={{ width: `${diff.accuracy}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
