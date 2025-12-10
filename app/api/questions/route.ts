import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const topicId = searchParams.get('topicId')
        const difficulty = searchParams.get('difficulty')
        const category = searchParams.get('category')
        const limit = parseInt(searchParams.get('limit') || '10')

        const where: Record<string, unknown> = {}

        if (topicId) {
            where.topicId = topicId
        }

        if (difficulty) {
            where.difficulty = difficulty
        }

        if (category) {
            where.topic = { category }
        }

        const questions = await prisma.question.findMany({
            where,
            include: {
                topic: true,
            },
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(questions)
    } catch (error) {
        console.error('Error fetching questions:', error)
        return NextResponse.json(
            { error: 'Failed to fetch questions' },
            { status: 500 }
        )
    }
}
