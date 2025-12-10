import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { subDays, format } from 'date-fns'

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const userId = session.user.id

        // Get all attempts in the last 30 days
        const thirtyDaysAgo = subDays(new Date(), 30)

        const attempts = await prisma.questionAttempt.findMany({
            where: {
                userId,
                attemptedAt: { gte: thirtyDaysAgo },
            },
            include: {
                question: {
                    include: { topic: true },
                },
            },
            orderBy: { attemptedAt: 'asc' },
        })

        // Group attempts by date
        const dailyData: Record<string, { correct: number; incorrect: number; total: number }> = {}

        for (const attempt of attempts) {
            const date = format(attempt.attemptedAt, 'MMM dd')

            if (!dailyData[date]) {
                dailyData[date] = { correct: 0, incorrect: 0, total: 0 }
            }

            dailyData[date].total++
            if (attempt.isCorrect) {
                dailyData[date].correct++
            } else {
                dailyData[date].incorrect++
            }
        }

        const performanceData = Object.entries(dailyData).map(([date, data]) => ({
            date,
            ...data,
        }))

        // Calculate topic-wise performance
        const topicStats: Record<string, { correct: number; total: number }> = {}

        for (const attempt of attempts) {
            const topicName = attempt.question.topic.name

            if (!topicStats[topicName]) {
                topicStats[topicName] = { correct: 0, total: 0 }
            }

            topicStats[topicName].total++
            if (attempt.isCorrect) {
                topicStats[topicName].correct++
            }
        }

        const topicPerformance = Object.entries(topicStats)
            .map(([topic, stats]) => ({
                topic,
                accuracy: Math.round((stats.correct / stats.total) * 100),
                attempted: stats.total,
            }))
            .sort((a, b) => b.attempted - a.attempted)

        // Calculate difficulty-wise performance
        const difficultyStats: Record<string, { correct: number; total: number }> = {}

        for (const attempt of attempts) {
            const difficulty = attempt.question.difficulty

            if (!difficultyStats[difficulty]) {
                difficultyStats[difficulty] = { correct: 0, total: 0 }
            }

            difficultyStats[difficulty].total++
            if (attempt.isCorrect) {
                difficultyStats[difficulty].correct++
            }
        }

        const difficultyPerformance = Object.entries(difficultyStats).map(([difficulty, stats]) => ({
            difficulty,
            accuracy: Math.round((stats.correct / stats.total) * 100),
            attempted: stats.total,
        }))

        // Overall stats
        const totalCorrect = attempts.filter(a => a.isCorrect).length
        const totalIncorrect = attempts.length - totalCorrect

        return NextResponse.json({
            performanceData,
            topicPerformance,
            difficultyPerformance,
            summary: {
                totalAttempts: attempts.length,
                totalCorrect,
                totalIncorrect,
                overallAccuracy: attempts.length > 0 ? Math.round((totalCorrect / attempts.length) * 100) : 0,
                averageTime: attempts.length > 0
                    ? Math.round(attempts.reduce((sum, a) => sum + a.timeTaken, 0) / attempts.length)
                    : 0,
            },
        })
    } catch (error) {
        console.error('Error fetching performance:', error)
        return NextResponse.json(
            { error: 'Failed to fetch performance data' },
            { status: 500 }
        )
    }
}
