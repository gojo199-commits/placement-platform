'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Target, Trophy, TrendingUp, ArrowRight, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DashboardData {
    user: {
        name: string
        email: string
        cgpa: number | null
        branch: string | null
        skills: string[]
    }
    stats: {
        totalQuestions: number
        questionsAttempted: number
        correctAnswers: number
        averageTime: number
        accuracy: number
        weakTopics: string[]
        strongTopics: string[]
    }
    recentAttempts: Array<{
        id: string
        question: string
        topic: string
        isCorrect: boolean
        timeTaken: number
        attemptedAt: string
    }>
    applications: Array<{
        id: string
        jobTitle: string
        company: string
        status: string
        matchScore: number | null
        appliedAt: string
    }>
}

export default function StudentDashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [data, setData] = useState<DashboardData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login')
    }, [status, router])

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const res = await fetch('/api/student/dashboard')
                if (!res.ok) {
                    const errData = await res.json()
                    throw new Error(errData.error || 'Failed to fetch dashboard')
                }
                setData(await res.json())
            } catch (e) {
                console.error(e)
                setError(e instanceof Error ? e.message : 'An error occurred')
            } finally {
                setIsLoading(false)
            }
        }
        if (status === 'authenticated') fetchDashboard()
    }, [status])

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md w-full border-white/10 bg-white/5 backdrop-blur-md">
                    <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                            <XCircle className="h-8 w-8 text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Error Loading Dashboard</h2>
                        <p className="text-gray-400 mb-6">{error}</p>
                        <Button onClick={() => window.location.reload()} className="w-full">
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const stats = [
        { label: 'Questions', value: data?.stats?.questionsAttempted || 0, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
        { label: 'Accuracy', value: `${data?.stats?.accuracy || 0}%`, icon: Target, color: 'from-emerald-500 to-green-500' },
        { label: 'Correct', value: data?.stats?.correctAnswers || 0, icon: Trophy, color: 'from-purple-500 to-pink-500' },
        { label: 'Avg Time', value: `${data?.stats?.averageTime || 0}s`, icon: Clock, color: 'from-orange-500 to-amber-500' },
    ]

    return (
        <div className="min-h-screen py-8 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Welcome back, <span className="text-gradient-primary">{session?.user?.name?.split(' ')[0] || 'Student'}</span>!
                        </h1>
                        <p className="text-gray-400">Here's your progress overview</p>
                    </div>
                    <Link href="/practice">
                        <Button className="gap-2">
                            Start Practice <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((s) => (
                        <Card key={s.label} className="border-white/15 backdrop-blur-xl hover:border-white/25 transition-all" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                            <CardContent className="p-6">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg`}>
                                    <s.icon className="h-6 w-6 text-white" />
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
                                <p className="text-sm text-gray-400">{s.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <Card className="border-white/15 backdrop-blur-xl" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                                <Link href="/performance" className="text-sm text-primary hover:text-primary/80 transition-colors">View all →</Link>
                            </div>
                            {data?.recentAttempts?.length ? (
                                <div className="space-y-4">
                                    {data.recentAttempts.slice(0, 5).map((a) => (
                                        <div key={a.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            {a.isCorrect ? (
                                                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate mb-1">{a.question}</p>
                                                <p className="text-xs text-gray-400">{a.topic}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>No attempts yet</p>
                                    <Link href="/practice">
                                        <Button variant="ghost" className="mt-4">Start Practicing</Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Topic Insights */}
                    <Card className="border-white/15 backdrop-blur-xl" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Topic Insights</h2>

                            {data?.stats?.strongTopics?.length || data?.stats?.weakTopics?.length ? (
                                <div className="space-y-6">
                                    {data?.stats?.strongTopics?.length ? (
                                        <div>
                                            <h3 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4" /> Strong Topics
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {data.stats.strongTopics.map((t) => (
                                                    <span key={t} className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}

                                    {data?.stats?.weakTopics?.length ? (
                                        <div>
                                            <h3 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-2">
                                                <Target className="h-4 w-4" /> Needs Work
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {data.stats.weakTopics.map((t) => (
                                                    <span key={t} className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <Target className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>Complete more questions to see insights</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
