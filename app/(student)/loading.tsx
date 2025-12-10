export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
            </div>

            <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-16 h-16 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-gray-400 animate-pulse">Loading...</p>
            </div>
        </div>
    )
}
