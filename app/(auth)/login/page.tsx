'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'STUDENT' | 'COMPANY'>('STUDENT')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const result = await signIn('credentials', { email, password, redirect: false })
            if (result?.error) {
                setError('Invalid email or password')
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        } catch {
            setError('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 brightness-100 contrast-150" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            PlacePrep
                        </span>
                    </Link>
                </div>

                <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
                    <CardHeader className="text-center">
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-white/5 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setRole('STUDENT')}
                                className={`py-2 text-sm font-medium rounded-lg transition-all ${role === 'STUDENT'
                                        ? 'bg-primary text-primary-foreground shadow-lg'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('COMPANY')}
                                className={`py-2 text-sm font-medium rounded-lg transition-all ${role === 'COMPANY'
                                        ? 'bg-primary text-primary-foreground shadow-lg'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Company
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Password</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-sm text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                                Create one
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                {/* Demo Credentials */}
                <Card className="mt-6 bg-white/5 border-white/5">
                    <CardContent className="pt-6">
                        <p className="text-xs font-medium text-muted-foreground mb-3 text-center uppercase tracking-wider">Demo Credentials</p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <p className="font-medium text-foreground mb-1">Student</p>
                                <p className="text-muted-foreground">rahul@example.com</p>
                                <p className="text-muted-foreground">student123</p>
                            </div>
                            <div>
                                <p className="font-medium text-foreground mb-1">Company</p>
                                <p className="text-muted-foreground">hr@techcorp.com</p>
                                <p className="text-muted-foreground">company123</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
