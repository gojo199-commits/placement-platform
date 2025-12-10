'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
            </div>

            <Card className="max-w-md w-full border-white/10 bg-white/5 backdrop-blur-md relative z-10">
                <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                        <AlertTriangle className="h-10 w-10 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Something went wrong!
                    </h2>
                    <p className="text-gray-400 mb-8">
                        We encountered an error while loading this page. Please try again.
                    </p>
                    <Button onClick={reset} className="w-full bg-white text-black hover:bg-gray-200">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try again
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
