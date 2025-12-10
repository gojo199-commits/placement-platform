import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const userId = session.user.id
        const { searchParams } = new URL(request.url)
        const topicId = searchParams.get('topicId')

        if (!topicId) {
            return NextResponse.json(
                { error: 'Topic ID is required' },
                { status: 400 }
            )
        }

        // Get questions the user has already attempted correctly in this topic
        const attemptedQuestionIds = await prisma.questionAttempt.findMany({
            where: {
                userId,
                question: { topicId },
                isCorrect: true // Only exclude correctly answered questions
            },
            select: { questionId: true }
        })

        const attemptedIds = attemptedQuestionIds.map(a => a.questionId)

        // Get all questions for this topic that haven't been correctly answered
        const questions = await prisma.question.findMany({
            where: {
                topicId,
                id: { notIn: attemptedIds.length > 0 ? attemptedIds : [] }
            },
            include: {
                topic: {
                    select: { name: true }
                }
            }
        })

        // Check total questions for this topic
        const totalQuestions = await prisma.question.count({
            where: { topicId }
        })

        if (questions.length === 0) {
            // All questions have been correctly answered
            return NextResponse.json({
                completed: true,
                totalQuestions,
                correctlyAnswered: attemptedIds.length,
                message: 'Congratulations! You have completed all questions in this topic.'
            })
        }

        // Select a random question from unanswered ones
        const randomIndex = Math.floor(Math.random() * questions.length)
        const question = questions[randomIndex]

        // Return the question with progress info
        return NextResponse.json({
            id: question.id,
            content: question.content,
            options: question.options,
            difficulty: question.difficulty,
            topic: question.topic,
            progress: {
                remaining: questions.length,
                total: totalQuestions,
                completed: attemptedIds.length
            }
        })
    } catch (error) {
        console.error('Error fetching random question:', error)
        return NextResponse.json(
            { error: 'Failed to fetch question' },
            { status: 500 }
        )
    }
}
