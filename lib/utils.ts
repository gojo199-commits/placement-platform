import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date)
}

export function formatPercentage(value: number): string {
    return `${Math.round(value * 100)}%`
}

export function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
        case 'EASY':
            return 'text-emerald-600 bg-emerald-50'
        case 'MEDIUM':
            return 'text-amber-600 bg-amber-50'
        case 'HARD':
            return 'text-red-600 bg-red-50'
        default:
            return 'text-slate-600 bg-slate-50'
    }
}

export function getStatusColor(status: string): string {
    switch (status) {
        case 'APPLIED':
            return 'text-blue-600 bg-blue-50'
        case 'SHORTLISTED':
            return 'text-amber-600 bg-amber-50'
        case 'REJECTED':
            return 'text-red-600 bg-red-50'
        case 'SELECTED':
            return 'text-emerald-600 bg-emerald-50'
        default:
            return 'text-slate-600 bg-slate-50'
    }
}
