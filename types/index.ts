export type Role = 'STUDENT' | 'COMPANY' | 'ADMIN'
export type Category = 'APTITUDE' | 'TECHNICAL' | 'CODING'
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'
export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED'

export interface User {
    id: string
    email: string
    name: string
    role: Role
    rollNumber?: string | null
    cgpa?: number | null
    branch?: string | null
    graduationYear?: number | null
    skills: string[]
}

export interface Topic {
    id: string
    name: string
    category: Category
    description?: string | null
    questions?: Question[]
}

export interface Question {
    id: string
    content: string
    options: string[]
    correctAnswer: string
    explanation?: string | null
    difficulty: Difficulty
    topicId: string
    topic?: Topic
}

export interface QuestionAttempt {
    id: string
    userId: string
    questionId: string
    isCorrect: boolean
    timeTaken: number
    attemptedAt: Date
    question?: Question
}

export interface Company {
    id: string
    name: string
    email: string
    description?: string | null
    jobPostings?: JobPosting[]
}

export interface JobPosting {
    id: string
    companyId: string
    title: string
    description: string
    requiredSkills: string[]
    minCGPA: number
    salary?: string | null
    location?: string | null
    company?: Company
    applications?: Application[]
}

export interface Application {
    id: string
    studentId: string
    jobPostingId: string
    matchScore?: number | null
    status: ApplicationStatus
    appliedAt: Date
    student?: User
    jobPosting?: JobPosting
}

export interface DashboardStats {
    totalQuestions: number
    questionsAttempted: number
    correctAnswers: number
    averageTime: number
    accuracy: number
    weakTopics: string[]
    strongTopics: string[]
}

export interface PerformanceData {
    date: string
    correct: number
    incorrect: number
    total: number
}

export interface TopicPerformance {
    topic: string
    accuracy: number
    attempted: number
}
