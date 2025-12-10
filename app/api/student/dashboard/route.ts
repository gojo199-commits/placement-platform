import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

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

        // Get user data
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
                email: true,
                cgpa: true,
                branch: true,
                skills: true,
            },
        })

        // Get all attempts by user
        const attempts = await prisma.questionAttempt.findMany({
            where: { userId },
            include: {
                question: {
                    include: { topic: true },
                },
            },
            orderBy: { attemptedAt: 'desc' },
        })

        // Calculate stats
        const totalQuestions = await prisma.question.count()
        const questionsAttempted = new Set(attempts.map(a => a.questionId)).size
        const correctAnswers = attempts.filter(a => a.isCorrect).length
        const totalAttempts = attempts.length
        const accuracy = totalAttempts > 0 ? correctAnswers / totalAttempts : 0
        const averageTime = totalAttempts > 0
            ? Math.round(attempts.reduce((sum, a) => sum + a.timeTaken, 0) / totalAttempts)
            : 0

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

        // Identify weak and strong topics
        const weakTopics = Object.entries(topicStats)
            .filter(([, stats]) => stats.total >= 3 && stats.correct / stats.total < 0.5)
            .map(([name]) => name)

        const strongTopics = Object.entries(topicStats)
            .filter(([, stats]) => stats.total >= 3 && stats.correct / stats.total >= 0.7)
            .map(([name]) => name)

        // Get recent attempts
        const recentAttempts = attempts.slice(0, 5).map(a => ({
            id: a.id,
            question: a.question.content.substring(0, 50) + '...',
            topic: a.question.topic.name,
            isCorrect: a.isCorrect,
            timeTaken: a.timeTaken,
            attemptedAt: a.attemptedAt,
        }))

        // Get applications
        const applications = await prisma.application.findMany({
            where: { studentId: userId },
            include: {
                jobPosting: {
                    include: { company: true },
                },
            },
            orderBy: { appliedAt: 'desc' },
            take: 5,
        })

        return NextResponse.json({
            user,
            stats: {
                totalQuestions,
                questionsAttempted,
                correctAnswers,
                averageTime,
                accuracy: Math.round(accuracy * 100),
                weakTopics,
                strongTopics,
            },
            recentAttempts,
            applications: applications.map(app => ({
                id: app.id,
                jobTitle: app.jobPosting.title,
                company: app.jobPosting.company.name,
                status: app.status,
                matchScore: app.matchScore,
                appliedAt: app.appliedAt,
            })),
        })
    } catch (error) {
        console.error('Error fetching dashboard:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 }
        )
    }
}
