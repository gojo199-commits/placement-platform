import { User, JobPosting, QuestionAttempt, Question, Topic } from '@prisma/client'

type UserWithAttempts = User & {
    attempts: (QuestionAttempt & {
        question: Question & {
            topic: Topic
        }
    })[]
}

export async function calculateMatchScore(
    student: UserWithAttempts,
    job: JobPosting
): Promise<number> {
    let score = 0
    const weights = {
        cgpa: 0.25,
        skills: 0.35,
        performance: 0.40,
    }

    // CGPA Score (25%)
    if (student.cgpa) {
        if (student.cgpa >= job.minCGPA) {
            const cgpaAboveMin = student.cgpa - job.minCGPA
            const maxAbove = 10 - job.minCGPA
            const cgpaScore = 0.7 + (0.3 * (cgpaAboveMin / maxAbove))
            score += weights.cgpa * Math.min(cgpaScore, 1)
        } else {
            const cgpaRatio = student.cgpa / job.minCGPA
            score += weights.cgpa * cgpaRatio * 0.5
        }
    }

    // Skills Match Score (35%)
    const studentSkills = student.skills || []
    const requiredSkills = job.requiredSkills || []

    if (studentSkills.length > 0 && requiredSkills.length > 0) {
        const studentSkillsLower = studentSkills.map(s => s.toLowerCase())
        const requiredSkillsLower = requiredSkills.map(s => s.toLowerCase())

        let matchedSkills = 0
        for (const skill of requiredSkillsLower) {
            if (studentSkillsLower.some(s => s.includes(skill) || skill.includes(s))) {
                matchedSkills++
            }
        }

        const skillsScore = matchedSkills / requiredSkills.length
        score += weights.skills * skillsScore
    }

    // Performance Score (40%)
    if (student.attempts && student.attempts.length > 0) {
        const totalAttempts = student.attempts.length
        const correctAttempts = student.attempts.filter(a => a.isCorrect).length
        const accuracy = correctAttempts / totalAttempts

        const jobSkillsLower = requiredSkills.map(s => s.toLowerCase())
        let relevantAttempts = 0
        let relevantCorrect = 0

        for (const attempt of student.attempts) {
            const topicLower = attempt.question.topic.name.toLowerCase()
            const isRelevant = jobSkillsLower.some(
                skill => topicLower.includes(skill) || skill.includes(topicLower)
            )

            if (isRelevant) {
                relevantAttempts++
                if (attempt.isCorrect) {
                    relevantCorrect++
                }
            }
        }

        let performanceScore = accuracy * 0.6

        if (relevantAttempts > 0) {
            const relevantAccuracy = relevantCorrect / relevantAttempts
            performanceScore += relevantAccuracy * 0.4
        } else {
            performanceScore += accuracy * 0.4
        }

        const attemptBonus = Math.min(totalAttempts / 50, 1) * 0.1
        performanceScore = Math.min(performanceScore + attemptBonus, 1)

        score += weights.performance * performanceScore
    }

    return Math.round(score * 100) / 100
}
