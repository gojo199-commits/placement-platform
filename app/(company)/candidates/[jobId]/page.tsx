'use client'

import { useEffect, useState, use } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MatchScoreBar } from '@/components/MatchScoreBar'
import {
    ArrowLeft,
    Loader2,
    Users,
    GraduationCap,
    Target,
    Mail,
    MapPin,
    DollarSign
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Candidate {
    id: string
    studentId: string
    student: {
        name: string
        email: string
        cgpa: number | null
        branch: string | null
        skills: string[]
        graduationYear: number | null
    }
    matchScore: number
    status: string
    appliedAt: string
    performance: {
        totalAttempts: number
        correctAttempts: number
        accuracy: number
    }
}

interface JobDetails {
    id: string
    title: string
    description: string
    requiredSkills: string[]
    minCGPA: number
    salary: string | null
    location: string | null
}

interface CandidatesData {
    job: JobDetails
    candidates: Candidate[]
}

export default function CandidatesPage({ params }: { params: Promise<{ jobId: string }> }) {
    const resolvedParams = use(params)
    const { status } = useSession()
    const router = useRouter()
    const [data, setData] = useState<CandidatesData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [minScoreFilter, setMinScoreFilter] = useState(0)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    useEffect(() => {
        async function fetchCandidates() {
            try {
                const res = await fetch(`/api/company/candidates/${resolvedParams.jobId}`)
                if (res.ok) {
                    const candidatesData = await res.json()
                    setData(candidatesData)
                }
            } catch (error) {
                console.error('Failed to fetch candidates:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (status === 'authenticated') {
            fetchCandidates()
        }
    }, [status, resolvedParams.jobId])

    if (status === 'loading' || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Card>
                    <CardContent className="p-12 text-center">
                        <p className="text-slate-600">Failed to load candidates.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const filteredCandidates = data.candidates.filter(
        (c) => (c.matchScore || 0) >= minScoreFilter / 100
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                href="/company-dashboard"
                className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>

            {/* Job Details Header */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                {data.job.title}
                            </h1>
                            <p className="text-slate-600 mb-4">{data.job.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {data.job.requiredSkills.map((skill) => (
                                    <Badge key={skill} variant="default">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                                <GraduationCap className="h-4 w-4" />
                                <span>Min CGPA: {data.job.minCGPA}</span>
                            </div>
                            {data.job.salary && (
                                <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    <span>{data.job.salary}</span>
                                </div>
                            )}
                            {data.job.location && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{data.job.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Candidates Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-slate-600" />
                    <h2 className="text-xl font-semibold text-slate-900">
                        Candidates ({filteredCandidates.length})
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">Min Match Score:</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={minScoreFilter}
                        onChange={(e) => setMinScoreFilter(parseInt(e.target.value))}
                        className="w-32"
                    />
                    <span className="text-sm font-medium text-slate-900 w-12">
                        {minScoreFilter}%
                    </span>
                </div>
            </div>

            {filteredCandidates.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No candidates found
                        </h3>
                        <p className="text-slate-600">
                            {data.candidates.length === 0
                                ? 'No one has applied for this position yet.'
                                : 'Try lowering the minimum match score filter.'}
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">
                                            Rank
                                        </th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">
                                            Candidate
                                        </th>
                                        <th className="text-center py-4 px-6 text-sm font-medium text-slate-600">
                                            CGPA
                                        </th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-slate-600">
                                            Skills
                                        </th>
                                        <th className="text-center py-4 px-6 text-sm font-medium text-slate-600">
                                            Practice Performance
                                        </th>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-slate-600 min-w-[180px]">
                                            Match Score
                                        </th>
                                        <th className="text-right py-4 px-6 text-sm font-medium text-slate-600">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCandidates.map((candidate, index) => (
                                        <tr
                                            key={candidate.id}
                                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${index === 0
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : index === 1
                                                        ? 'bg-slate-200 text-slate-700'
                                                        : index === 2
                                                            ? 'bg-orange-100 text-orange-700'
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    #{index + 1}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-medium text-slate-900">
                                                        {candidate.student.name}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                                        <Mail className="h-3 w-3" />
                                                        <span>{candidate.student.email}</span>
                                                    </div>
                                                    {candidate.student.branch && (
                                                        <p className="text-sm text-slate-500">
                                                            {candidate.student.branch}
                                                            {candidate.student.graduationYear && ` • ${candidate.student.graduationYear}`}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`font-semibold ${(candidate.student.cgpa || 0) >= data.job.minCGPA
                                                    ? 'text-emerald-600'
                                                    : 'text-amber-600'
                                                    }`}>
                                                    {candidate.student.cgpa?.toFixed(1) || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-1">
                                                    {candidate.student.skills.slice(0, 3).map((skill) => (
                                                        <Badge
                                                            key={skill}
                                                            variant={
                                                                data.job.requiredSkills.some(
                                                                    (s) => s.toLowerCase() === skill.toLowerCase()
                                                                )
                                                                    ? 'success'
                                                                    : 'default'
                                                            }
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                    {candidate.student.skills.length > 3 && (
                                                        <Badge variant="default">
                                                            +{candidate.student.skills.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Target className="h-4 w-4 text-slate-400" />
                                                    <span className="text-sm">
                                                        {candidate.performance.accuracy}% accuracy
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        ({candidate.performance.totalAttempts} attempts)
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <MatchScoreBar score={candidate.matchScore} size="md" />
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Badge
                                                    variant={
                                                        candidate.status === 'SHORTLISTED'
                                                            ? 'success'
                                                            : candidate.status === 'REJECTED'
                                                                ? 'danger'
                                                                : candidate.status === 'SELECTED'
                                                                    ? 'success'
                                                                    : 'info'
                                                    }
                                                >
                                                    {candidate.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
