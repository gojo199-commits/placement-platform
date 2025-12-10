'use client'

import { useState } from 'react'
import { cn, getDifficultyColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

interface QuestionCardProps {
    question: {
        id: string
        content: string
        options: string[]
        correctAnswer: string
        explanation?: string | null
        difficulty: string
        topic?: { name: string }
    }
    onSubmit: (questionId: string, answer: string, timeTaken: number) => Promise<void>
    showResult?: boolean
}

export function QuestionCard({ question, onSubmit, showResult = false }: QuestionCardProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [submitted, setSubmitted] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [startTime] = useState(Date.now())
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (!selectedAnswer || submitted) return

        setIsLoading(true)
        const timeTaken = Math.round((Date.now() - startTime) / 1000)
        const correct = selectedAnswer === question.correctAnswer
        setIsCorrect(correct)
        setSubmitted(true)

        try {
            await onSubmit(question.id, selectedAnswer, timeTaken)
        } catch (error) {
            console.error('Failed to submit answer:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {question.topic && (
                            <Badge variant="default">{question.topic.name}</Badge>
                        )}
                        <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                        </Badge>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Question</span>
                    </div>
                </div>
                <CardTitle className="mt-4 text-lg font-medium text-slate-800">
                    {question.content}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {question.options.map((option, index) => {
                        const letter = String.fromCharCode(65 + index)
                        const isSelected = selectedAnswer === option
                        const isCorrectAnswer = submitted && option === question.correctAnswer
                        const isWrongSelected = submitted && isSelected && !isCorrect

                        return (
                            <button
                                key={index}
                                onClick={() => !submitted && setSelectedAnswer(option)}
                                disabled={submitted}
                                className={cn(
                                    'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                                    !submitted && isSelected && 'border-slate-800 bg-slate-50',
                                    !submitted && !isSelected && 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                                    submitted && isCorrectAnswer && 'border-emerald-500 bg-emerald-50',
                                    submitted && isWrongSelected && 'border-red-500 bg-red-50',
                                    submitted && !isCorrectAnswer && !isWrongSelected && 'border-slate-200 opacity-60'
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            'flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm',
                                            !submitted && isSelected && 'bg-slate-800 text-white',
                                            !submitted && !isSelected && 'bg-slate-100 text-slate-600',
                                            submitted && isCorrectAnswer && 'bg-emerald-500 text-white',
                                            submitted && isWrongSelected && 'bg-red-500 text-white',
                                            submitted && !isCorrectAnswer && !isWrongSelected && 'bg-slate-100 text-slate-400'
                                        )}>
                                            {letter}
                                        </span>
                                        <span className={cn(
                                            'text-sm',
                                            submitted && isCorrectAnswer && 'text-emerald-700 font-medium',
                                            submitted && isWrongSelected && 'text-red-700',
                                            !submitted && 'text-slate-700'
                                        )}>
                                            {option}
                                        </span>
                                    </div>
                                    {submitted && isCorrectAnswer && (
                                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                                    )}
                                    {submitted && isWrongSelected && (
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>

                {submitted && question.explanation && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-blue-800 mb-1">Explanation</p>
                        <p className="text-sm text-blue-700">{question.explanation}</p>
                    </div>
                )}

                {!submitted && (
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedAnswer || isLoading}
                        className="w-full"
                    >
                        {isLoading ? 'Submitting...' : 'Submit Answer'}
                    </Button>
                )}

                {submitted && (
                    <div className={cn(
                        'p-4 rounded-lg text-center',
                        isCorrect ? 'bg-emerald-50' : 'bg-red-50'
                    )}>
                        <p className={cn(
                            'font-medium',
                            isCorrect ? 'text-emerald-700' : 'text-red-700'
                        )}>
                            {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
