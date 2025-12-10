'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export default function RegisterPage() {
    const router = useRouter()
    const [role, setRole] = useState<'STUDENT' | 'COMPANY'>('STUDENT')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', cgpa: '', branch: '', graduationYear: '2025', skills: '', companyDescription: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData, role,
                    cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null,
                    graduationYear: parseInt(formData.graduationYear),
                    skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
                }),
            })
            if (!res.ok) throw new Error((await res.json()).message || 'Registration failed')
            router.push('/login?registered=true')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
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
                        <CardTitle>Create account</CardTitle>
                        <CardDescription>Get started with your free account</CardDescription>
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
                                <label className="text-sm font-medium text-muted-foreground">
                                    {role === 'STUDENT' ? 'Full Name' : 'Company Name'}
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Password</label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength={6}
                                    required
                                />
                            </div>

                            {role === 'STUDENT' && (
                                <>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">CGPA</label>
                                            <Input
                                                type="number"
                                                name="cgpa"
                                                value={formData.cgpa}
                                                onChange={handleChange}
                                                step="0.1"
                                                min="0"
                                                max="10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground">Year</label>
                                            <select
                                                name="graduationYear"
                                                value={formData.graduationYear}
                                                onChange={handleChange}
                                                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/10"
                                            >
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Branch</label>
                                        <Input
                                            type="text"
                                            name="branch"
                                            value={formData.branch}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Skills</label>
                                        <Input
                                            type="text"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            placeholder="React, Node.js, Python"
                                        />
                                    </div>
                                </>
                            )}

                            {role === 'COMPANY' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <textarea
                                        name="companyDescription"
                                        value={formData.companyDescription}
                                        onChange={handleChange}
                                        className="flex min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none hover:bg-white/10"
                                        rows={3}
                                    />
                                </div>
                            )}

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
                                        Create account
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
