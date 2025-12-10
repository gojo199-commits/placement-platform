import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const topics = await prisma.topic.findMany({
            include: {
                _count: {
                    select: { questions: true },
                },
            },
            orderBy: {
                name: 'asc',
            },
        })

        const formattedTopics = topics.map(topic => ({
            id: topic.id,
            name: topic.name,
            category: topic.category,
            description: topic.description,
            questionCount: topic._count.questions,
        }))

        return NextResponse.json(formattedTopics)
    } catch (error) {
        console.error('Error fetching topics:', error)
        return NextResponse.json(
            { error: 'Failed to fetch topics' },
            { status: 500 }
        )
    }
}
