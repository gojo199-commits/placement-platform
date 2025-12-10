import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

const attemptSchema = z.object({
    questionId: z.string(),
    answer: z.string(),
    timeTaken: z.number().min(0),
})

export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { questionId, answer, timeTaken } = attemptSchema.parse(body)

        const question = await prisma.question.findUnique({
            where: { id: questionId },
        })

        if (!question) {
            return NextResponse.json(
                { error: 'Question not found' },
                { status: 404 }
            )
        }

        const isCorrect = answer === question.correctAnswer

        const attempt = await prisma.questionAttempt.create({
            data: {
                userId: session.user.id,
                questionId,
                isCorrect,
                timeTaken,
            },
        })

        return NextResponse.json({
            id: attempt.id,
            isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data', details: error.issues },
                { status: 400 }
            )
        }
        console.error('Error submitting attempt:', error)
        return NextResponse.json(
            { error: 'Failed to submit attempt' },
            { status: 500 }
        )
    }
}
