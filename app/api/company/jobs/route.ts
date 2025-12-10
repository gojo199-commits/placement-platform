import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

const jobSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    requiredSkills: z.array(z.string()),
    minCGPA: z.number().min(0).max(10),
    salary: z.string().optional(),
    location: z.string().optional(),
})

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Find company by email (since company uses the same auth)
        const company = await prisma.company.findUnique({
            where: { email: session.user.email },
        })

        if (!company) {
            return NextResponse.json(
                { error: 'Company not found' },
                { status: 404 }
            )
        }

        const jobs = await prisma.jobPosting.findMany({
            where: { companyId: company.id },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(
            jobs.map(job => ({
                ...job,
                applicationCount: job._count.applications,
            }))
        )
    } catch (error) {
        console.error('Error fetching jobs:', error)
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const company = await prisma.company.findUnique({
            where: { email: session.user.email },
        })

        if (!company) {
            return NextResponse.json(
                { error: 'Company not found' },
                { status: 404 }
            )
        }

        const body = await request.json()
        const validatedData = jobSchema.parse(body)

        const job = await prisma.jobPosting.create({
            data: {
                companyId: company.id,
                ...validatedData,
            },
        })

        return NextResponse.json(job)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data', details: error.issues },
                { status: 400 }
            )
        }
        console.error('Error creating job:', error)
        return NextResponse.json(
            { error: 'Failed to create job' },
            { status: 500 }
        )
    }
}
