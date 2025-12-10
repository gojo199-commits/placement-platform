import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Get user's weak topics based on performance
        const attempts = await prisma.questionAttempt.findMany({
            where: { userId: session.user.id },
            include: {
                question: {
                    include: { topic: true },
                },
            },
        })

        // Calculate topic-wise performance
        const topicStats: Record<string, { correct: number; total: number; topicId: string }> = {}

        for (const attempt of attempts) {
            const topicName = attempt.question.topic.name
            const topicId = attempt.question.topicId

            if (!topicStats[topicName]) {
                topicStats[topicName] = { correct: 0, total: 0, topicId }
            }

            topicStats[topicName].total++
            if (attempt.isCorrect) {
                topicStats[topicName].correct++
            }
        }

        // Find weak topics (accuracy < 50%)
        const weakTopicIds = Object.entries(topicStats)
            .filter(([, stats]) => stats.total >= 3 && stats.correct / stats.total < 0.5)
            .map(([, stats]) => stats.topicId)

        // Get attempted question IDs
        const attemptedQuestionIds = attempts.map(a => a.questionId)

        // Get recommended questions
        let recommendations: any[] = []

        if (weakTopicIds.length > 0) {
            // Prioritize questions from weak topics
            recommendations = await prisma.question.findMany({
                where: {
                    topicId: { in: weakTopicIds },
                    id: { notIn: attemptedQuestionIds },
                },
                include: { topic: true },
                take: 5,
            })
        }

        if (recommendations.length < 5) {
            // Fill with random unattempted questions
            const additionalQuestions = await prisma.question.findMany({
                where: {
                    id: { notIn: [...attemptedQuestionIds, ...recommendations.map(q => q.id)] },
                },
                include: { topic: true },
                take: 5 - recommendations.length,
                orderBy: { createdAt: 'desc' },
            })

            recommendations = [...recommendations, ...additionalQuestions]
        }

        return NextResponse.json({
            recommendations,
            weakTopics: Object.entries(topicStats)
                .filter(([, stats]) => stats.total >= 3 && stats.correct / stats.total < 0.5)
                .map(([name]) => name),
        })
    } catch (error) {
        console.error('Error fetching recommendations:', error)
        return NextResponse.json(
            { error: 'Failed to fetch recommendations' },
            { status: 500 }
        )
    }
}
