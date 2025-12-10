import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Search, AlertCircle } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <Card className="max-w-md w-full border-white/10 bg-white/5 backdrop-blur-md relative z-10">
                <CardContent className="p-12 text-center">
                    <div className="relative mb-6 inline-block">
                        <div className="text-9xl font-bold text-white/5 select-none">404</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AlertCircle className="h-16 w-16 text-red-400 opacity-80" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button variant="ghost" className="w-full sm:w-auto hover:bg-white/10 hover:text-white">
                                <Home className="mr-2 h-4 w-4" />
                                Go Home
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button className="w-full sm:w-auto">
                                <Search className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
