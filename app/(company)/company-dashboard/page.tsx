'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/StatsCard'
import {
    Briefcase,
    Users,
    UserCheck,
    Plus,
    Loader2,
    MapPin,
    DollarSign,
    Calendar
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Job {
    id: string
    title: string
    description: string
    requiredSkills: string[]
    minCGPA: number
    salary: string | null
    location: string | null
    createdAt: string
    applicationCount: number
}

export default function CompanyDashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch('/api/company/jobs')
                if (res.ok) {
                    const data = await res.json()
                    setJobs(data)
                }
            } catch (error) {
                console.error('Failed to fetch jobs:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (status === 'authenticated') {
            fetchJobs()
        }
    }, [status])

    if (status === 'loading' || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const totalApplications = jobs.reduce((sum, job) => sum + job.applicationCount, 0)

    return (
        <div className="min-h-screen py-8 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Welcome, <span className="text-gradient-primary">{session?.user?.name || 'Company'}</span>!
                        </h1>
                        <p className="text-gray-400">
                            Manage your job postings and find the best candidates
                        </p>
                    </div>
                    <Link href="/post-job">
                        <Button className="gap-2">
                            <Plus className="h-5 w-5" />
                            Post New Job
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <StatsCard
                        title="Total Jobs Posted"
                        value={jobs.length}
                        icon={Briefcase}
                    />
                    <StatsCard
                        title="Total Applications"
                        value={totalApplications}
                        icon={Users}
                    />
                    <StatsCard
                        title="Active Positions"
                        value={jobs.length}
                        icon={UserCheck}
                    />
                </div>

                {/* Jobs Grid */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Your Job Postings</h2>
                </div>

                {jobs.length === 0 ? (
                    <Card className="border-white/10 bg-white/5 backdrop-blur-md">
                        <CardContent className="p-12 text-center">
                            <Briefcase className="h-16 w-16 text-gray-500 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium text-white mb-2">
                                No job postings yet
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Create your first job posting to start receiving applications
                            </p>
                            <Link href="/post-job">
                                <Button>
                                    <Plus className="mr-2 h-5 w-5" />
                                    Post Your First Job
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <Card key={job.id} className="border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1 duration-300">
                                <CardHeader>
                                    <CardTitle className="text-xl text-white">{job.title}</CardTitle>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {job.description}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {job.requiredSkills.slice(0, 3).map((skill) => (
                                                <Badge key={skill} variant="default">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {job.requiredSkills.length > 3 && (
                                                <Badge variant="default">
                                                    +{job.requiredSkills.length - 3} more
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-gray-300">Min CGPA:</span>
                                                <span>{job.minCGPA}</span>
                                            </div>
                                            {job.salary && (
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>{job.salary}</span>
                                                </div>
                                            )}
                                            {job.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{job.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Users className="h-4 w-4 text-primary" />
                                                <span className="text-gray-300">
                                                    {job.applicationCount} applications
                                                </span>
                                            </div>
                                            <Link href={`/candidates/${job.id}`}>
                                                <Button variant="secondary" size="sm" className="h-8">
                                                    View Candidates
                                                </Button>
                                            </Link>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            <span>Posted {formatDate(new Date(job.createdAt))}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
