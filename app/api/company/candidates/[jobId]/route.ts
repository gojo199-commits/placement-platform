import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { calculateMatchScore } from '@/lib/matching'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ jobId: string }> }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { jobId } = await params

        const job = await prisma.jobPosting.findUnique({
            where: { id: jobId },
            include: { company: true },
        })

        if (!job) {
            return NextResponse.json(
                { error: 'Job not found' },
                { status: 404 }
            )
        }

        // Verify company ownership
        const company = await prisma.company.findUnique({
            where: { email: session.user.email },
        })

        if (!company || company.id !== job.companyId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            )
        }

        // Get applications with student details
        const applications = await prisma.application.findMany({
            where: { jobPostingId: jobId },
            include: {
                student: {
                    include: {
                        attempts: {
                            include: {
                                question: {
                                    include: { topic: true },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { matchScore: 'desc' },
        })

        // Calculate match scores if not already calculated
        const candidatesWithScores = await Promise.all(
            applications.map(async (app) => {
                let matchScore = app.matchScore

                if (matchScore === null) {
                    matchScore = await calculateMatchScore(app.student, job)

                    // Update the application with calculated score
                    await prisma.application.update({
                        where: { id: app.id },
                        data: { matchScore },
                    })
                }

                // Calculate student performance
                const totalAttempts = app.student.attempts.length
                const correctAttempts = app.student.attempts.filter(a => a.isCorrect).length
                const accuracy = totalAttempts > 0 ? correctAttempts / totalAttempts : 0

                return {
                    id: app.id,
                    studentId: app.studentId,
                    student: {
                        name: app.student.name,
                        email: app.student.email,
                        cgpa: app.student.cgpa,
                        branch: app.student.branch,
                        skills: app.student.skills,
                        graduationYear: app.student.graduationYear,
                    },
                    matchScore,
                    status: app.status,
                    appliedAt: app.appliedAt,
                    performance: {
                        totalAttempts,
                        correctAttempts,
                        accuracy: Math.round(accuracy * 100),
                    },
                }
            })
        )

        // Sort by match score
        candidatesWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))

        return NextResponse.json({
            job: {
                id: job.id,
                title: job.title,
                description: job.description,
                requiredSkills: job.requiredSkills,
                minCGPA: job.minCGPA,
                salary: job.salary,
                location: job.location,
            },
            candidates: candidatesWithScores,
        })
    } catch (error) {
        console.error('Error fetching candidates:', error)
        return NextResponse.json(
            { error: 'Failed to fetch candidates' },
            { status: 500 }
        )
    }
}
