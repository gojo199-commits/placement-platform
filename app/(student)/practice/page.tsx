'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ChevronLeft, CheckCircle, XCircle, ArrowLeft, BookOpen, Trophy, RotateCcw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Topic { id: string; name: string; questionCount: number }
interface Question {
    id: string
    content: string
    options: string[]
    difficulty: string
    topic: { name: string }
    progress?: { remaining: number; total: number; completed: number }
}
interface CompletedResponse {
    completed: true
    totalQuestions: number
    correctlyAnswered: number
    message: string
}

export default function PracticePage() {
    const { status } = useSession()
    const router = useRouter()
    const [topics, setTopics] = useState<Topic[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
    const [selectedTopicName, setSelectedTopicName] = useState<string>('')
    const [question, setQuestion] = useState<Question | null>(null)
    const [completedData, setCompletedData] = useState<CompletedResponse | null>(null)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [explanation, setExplanation] = useState('')
    const [startTime, setStartTime] = useState<number>(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])

    useEffect(() => {
        async function fetchTopics() {
            try {
                const res = await fetch('/api/topics')
                if (!res.ok) throw new Error('Failed to fetch topics')
                setTopics(await res.json())
            } catch (e) {
                console.error(e)
                setError(e instanceof Error ? e.message : 'Failed to load topics')
            } finally {
                setIsLoading(false)
            }
        }
        if (status === 'authenticated') fetchTopics()
    }, [status])

    const fetchQuestion = async (topicId: string, topicName?: string) => {
        setSelectedTopic(topicId)
        if (topicName) setSelectedTopicName(topicName)
        setQuestion(null)
        setCompletedData(null)
        setSelectedAnswer(null)
        setShowResult(false)
        setError(null)
        try {
            const res = await fetch(`/api/questions/random?topicId=${topicId}`)
            const data = await res.json()

            if (data.completed) {
                // All questions completed for this topic
                setCompletedData(data)
            } else if (data.error) {
                throw new Error(data.error)
            } else {
                setQuestion(data)
                setStartTime(Date.now())
            }
        } catch (e) {
            console.error(e)
            setError(e instanceof Error ? e.message : 'Failed to load question')
        }
    }

    const submitAnswer = async () => {
        if (!selectedAnswer || !question) return
        setIsSubmitting(true)
        try {
            const res = await fetch('/api/questions/attempt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questionId: question.id, answer: selectedAnswer, timeTaken: Math.round((Date.now() - startTime) / 1000) }),
            })
            if (res.ok) {
                const data = await res.json()
                setIsCorrect(data.isCorrect)
                setExplanation(data.explanation || '')
                setShowResult(true)
            }
        } catch (e) { console.error(e) }
        finally { setIsSubmitting(false) }
    }

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    // Topic selection view
    if (!selectedTopic) {
        return (
            <div className="min-h-screen py-8 px-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back
                            </Button>
                        </Link>
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Practice Questions</h1>
                        <p className="text-gray-400">Choose a topic to start practicing</p>
                    </div>

                    {error ? (
                        <Card className="border-red-500/20 bg-red-500/5 max-w-md mx-auto">
                            <CardContent className="p-6 text-center">
                                <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                                <p className="text-red-400 mb-4">{error}</p>
                                <Button onClick={() => window.location.reload()}>Try Again</Button>
                            </CardContent>
                        </Card>
                    ) : topics.length === 0 ? (
                        <Card className="border-white/10 bg-white/5 max-w-md mx-auto">
                            <CardContent className="p-8 text-center">
                                <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400">No topics available yet.</p>
                                <p className="text-sm text-gray-500 mt-2">Please seed the database with topics and questions.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {topics.map((topic) => (
                                <Card
                                    key={topic.id}
                                    className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 cursor-pointer transition-all hover:-translate-y-1"
                                    onClick={() => fetchQuestion(topic.id, topic.name)}
                                >
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-white mb-2">{topic.name}</h3>
                                        <p className="text-sm text-gray-400">{topic.questionCount} questions</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // Completion view
    if (completedData) {
        return (
            <div className="min-h-screen py-8 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
                </div>

                <div className="max-w-lg mx-auto relative z-10">
                    <button
                        onClick={() => { setSelectedTopic(null); setCompletedData(null) }}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" /> Back to topics
                    </button>

                    <Card className="border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
                        <CardContent className="p-8 text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                                <Trophy className="h-10 w-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Topic Completed!</h2>
                            <p className="text-gray-400 mb-6">{selectedTopicName}</p>

                            <div className="bg-white/5 rounded-xl p-4 mb-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-1">
                                    {completedData.correctlyAnswered}/{completedData.totalQuestions}
                                </div>
                                <p className="text-sm text-gray-400">Questions Mastered</p>
                            </div>

                            <p className="text-gray-300 mb-8">{completedData.message}</p>

                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={() => { setSelectedTopic(null); setCompletedData(null) }}
                                    className="w-full"
                                >
                                    Practice Another Topic
                                </Button>
                                <Link href="/dashboard">
                                    <Button variant="ghost" className="w-full">
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    // Question view
    return (
        <div className="min-h-screen py-8 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <button
                    onClick={() => { setSelectedTopic(null); setQuestion(null); setError(null) }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" /> Back to topics
                </button>

                {error ? (
                    <Card className="border-red-500/20 bg-red-500/5">
                        <CardContent className="p-8 text-center">
                            <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                            <p className="text-red-400 mb-4">{error}</p>
                            <Button onClick={() => fetchQuestion(selectedTopic)}>Try Another Question</Button>
                        </CardContent>
                    </Card>
                ) : !question ? (
                    <div className="text-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                    </div>
                ) : (
                    <Card className="border-white/10 bg-white/5 backdrop-blur-md">
                        <CardContent className="p-8">
                            {/* Progress bar */}
                            {question.progress && (
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                                        <span>{question.progress.completed} of {question.progress.total} completed</span>
                                        <span>{question.progress.remaining} remaining</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                                            style={{ width: `${(question.progress.completed / question.progress.total) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-6">
                                <span className="text-sm text-gray-400">{question.topic.name}</span>
                                <Badge
                                    variant={
                                        question.difficulty === 'EASY' ? 'success' :
                                            question.difficulty === 'MEDIUM' ? 'warning' : 'danger'
                                    }
                                >
                                    {question.difficulty}
                                </Badge>
                            </div>

                            <h2 className="text-xl font-medium text-white mb-8">{question.content}</h2>

                            <div className="space-y-3 mb-8">
                                {question.options.map((option, i) => {
                                    const isSelected = selectedAnswer === option
                                    let borderColor = 'border-white/10'
                                    let bgColor = 'bg-white/5'

                                    if (showResult && isSelected) {
                                        borderColor = isCorrect ? 'border-emerald-500/50' : 'border-red-500/50'
                                        bgColor = isCorrect ? 'bg-emerald-500/10' : 'bg-red-500/10'
                                    } else if (isSelected) {
                                        borderColor = 'border-primary/50'
                                        bgColor = 'bg-primary/10'
                                    }

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => !showResult && setSelectedAnswer(option)}
                                            disabled={showResult}
                                            className={`w-full p-4 rounded-xl border ${borderColor} ${bgColor} text-left transition-all flex items-center gap-4 hover:bg-white/10 disabled:hover:bg-transparent`}
                                        >
                                            <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            <span className="text-white">{option}</span>
                                        </button>
                                    )
                                })}
                            </div>

                            {showResult && (
                                <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {isCorrect ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 text-emerald-400" />
                                                <span className="font-medium text-emerald-400">Correct!</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5 text-red-400" />
                                                <span className="font-medium text-red-400">Incorrect</span>
                                            </>
                                        )}
                                    </div>
                                    {explanation && <p className="text-sm text-gray-400">{explanation}</p>}
                                </div>
                            )}

                            {!showResult ? (
                                <Button
                                    onClick={submitAnswer}
                                    disabled={!selectedAnswer || isSubmitting}
                                    className="w-full py-6"
                                >
                                    {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Answer'}
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => fetchQuestion(selectedTopic)}
                                    className="w-full py-6"
                                >
                                    Next Question
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
