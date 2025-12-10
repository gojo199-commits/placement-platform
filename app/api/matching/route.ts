import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { calculateMatchScore } from '@/lib/matching'

const applySchema = z.object({
    jobPostingId: z.string(),
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
        const { jobPostingId } = applySchema.parse(body)

        // Get the job posting
        const job = await prisma.jobPosting.findUnique({
            where: { id: jobPostingId },
        })

        if (!job) {
            return NextResponse.json(
                { error: 'Job posting not found' },
                { status: 404 }
            )
        }

        // Get the student with their attempts
        const student = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                attempts: {
                    include: {
                        question: {
                            include: { topic: true },
                        },
                    },
                },
            },
        })

        if (!student || student.role !== 'STUDENT') {
            return NextResponse.json(
                { error: 'Only students can apply for jobs' },
                { status: 403 }
            )
        }

        // Check if already applied
        const existingApplication = await prisma.application.findUnique({
            where: {
                studentId_jobPostingId: {
                    studentId: session.user.id,
                    jobPostingId,
                },
            },
        })

        if (existingApplication) {
            return NextResponse.json(
                { error: 'Already applied for this job' },
                { status: 400 }
            )
        }

        // Calculate match score
        const matchScore = await calculateMatchScore(student, job)

        // Create application
        const application = await prisma.application.create({
            data: {
                studentId: session.user.id,
                jobPostingId,
                matchScore,
            },
            include: {
                jobPosting: {
                    include: { company: true },
                },
            },
        })

        return NextResponse.json({
            id: application.id,
            matchScore,
            status: application.status,
            job: {
                title: application.jobPosting.title,
                company: application.jobPosting.company.name,
            },
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data', details: error.issues },
                { status: 400 }
            )
        }
        console.error('Error applying to job:', error)
        return NextResponse.json(
            { error: 'Failed to apply' },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        // Get all job postings for students to browse
        const jobs = await prisma.jobPosting.findMany({
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
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
