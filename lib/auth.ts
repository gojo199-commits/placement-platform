import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { prisma } from './prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: 'jwt' },
    trustHost: true,
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const email = credentials.email as string
                const password = credentials.password as string

                // Check for student/admin user
                const user = await prisma.user.findUnique({
                    where: { email },
                })

                if (user) {
                    const isPasswordValid = await bcrypt.compare(password, user.password)
                    if (!isPasswordValid) return null

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    }
                }

                // Check for company user
                const company = await prisma.company.findUnique({
                    where: { email },
                })

                if (company) {
                    const isPasswordValid = await bcrypt.compare(password, company.password)
                    if (!isPasswordValid) return null

                    return {
                        id: company.id,
                        email: company.email,
                        name: company.name,
                        role: 'COMPANY',
                    }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as { role: string }).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
})
