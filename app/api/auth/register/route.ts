import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering - prevents build-time database access
export const dynamic = 'force-dynamic'

const studentSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.literal('STUDENT'),
    rollNumber: z.string().optional(),
    cgpa: z.number().min(0).max(10).optional(),
    branch: z.string().optional(),
    graduationYear: z.number().optional(),
    skills: z.array(z.string()).optional(),
})

const companySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.literal('COMPANY'),
    description: z.string().optional(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (body.role === 'COMPANY') {
            const validatedData = companySchema.parse(body)

            const existingCompany = await prisma.company.findUnique({
                where: { email: validatedData.email },
            })

            if (existingCompany) {
                return NextResponse.json(
                    { error: 'Email already registered' },
                    { status: 400 }
                )
            }

            const hashedPassword = await bcrypt.hash(validatedData.password, 10)

            const company = await prisma.company.create({
                data: {
                    email: validatedData.email,
                    password: hashedPassword,
                    name: validatedData.name,
                    description: validatedData.description,
                },
            })

            return NextResponse.json({
                id: company.id,
                email: company.email,
                name: company.name,
                role: 'COMPANY',
            })
        } else {
            const validatedData = studentSchema.parse(body)

            const existingUser = await prisma.user.findUnique({
                where: { email: validatedData.email },
            })

            if (existingUser) {
                return NextResponse.json(
                    { error: 'Email already registered' },
                    { status: 400 }
                )
            }

            const hashedPassword = await bcrypt.hash(validatedData.password, 10)

            const user = await prisma.user.create({
                data: {
                    email: validatedData.email,
                    password: hashedPassword,
                    name: validatedData.name,
                    role: 'STUDENT',
                    rollNumber: validatedData.rollNumber,
                    cgpa: validatedData.cgpa,
                    branch: validatedData.branch,
                    graduationYear: validatedData.graduationYear,
                    skills: validatedData.skills || [],
                },
            })

            return NextResponse.json({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            })
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data', details: error.flatten() },
                { status: 400 }
            )
        }
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
