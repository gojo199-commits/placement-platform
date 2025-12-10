'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Loader2, X, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function PostJobPage() {
    const { status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [minCGPA, setMinCGPA] = useState('')
    const [salary, setSalary] = useState('')
    const [location, setLocation] = useState('')
    const [skills, setSkills] = useState<string[]>([])
    const [skillInput, setSkillInput] = useState('')

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()])
            setSkillInput('')
        }
    }

    const removeSkill = (skill: string) => {
        setSkills(skills.filter((s) => s !== skill))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (skills.length === 0) {
            setError('Please add at least one required skill')
            return
        }

        setIsLoading(true)

        try {
            const res = await fetch('/api/company/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    requiredSkills: skills,
                    minCGPA: parseFloat(minCGPA),
                    salary: salary || undefined,
                    location: location || undefined,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                setError(data.error || 'Failed to create job posting')
                return
            }

            router.push('/company-dashboard')
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen py-8 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <Link
                    href="/company-dashboard"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>

                <Card className="border-white/10 bg-white/5 backdrop-blur-md">
                    <CardHeader>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl text-white">Post a New Job</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Fill in the details to create a new job posting
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Job Title</label>
                                <Input
                                    placeholder="e.g., Frontend Developer"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">
                                    Job Description
                                </label>
                                <Textarea
                                    rows={5}
                                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">
                                    Required Skills
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        className="flex-1"
                                        placeholder="Add a skill (e.g. React, Python)"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                addSkill()
                                            }
                                        }}
                                    />
                                    <Button type="button" variant="secondary" onClick={addSkill}>
                                        Add
                                    </Button>
                                </div>
                                {skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="default"
                                                className="pl-3 pr-1 py-1 h-8 text-sm"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkill(skill)}
                                                    className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Minimum CGPA</label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        placeholder="7.0"
                                        value={minCGPA}
                                        onChange={(e) => setMinCGPA(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Salary (Optional)</label>
                                    <Input
                                        placeholder="e.g., ₹12 LPA"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Location (Optional)</label>
                                <Input
                                    placeholder="e.g., Bangalore, Remote"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center gap-2">
                                    <X className="h-4 w-4" />
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex-1 hover:bg-white/10 hover:text-white"
                                    onClick={() => router.push('/company-dashboard')}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            Post Job
                                            <Sparkles className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
