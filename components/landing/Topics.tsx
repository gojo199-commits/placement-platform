import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code2, Database, Layout, Server, Smartphone, Terminal } from "lucide-react";

const topics = [
    {
        title: "Data Structures",
        count: "150+ Problems",
        icon: Database,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20"
    },
    {
        title: "Algorithms",
        count: "100+ Problems",
        icon: Code2,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    },
    {
        title: "System Design",
        count: "50+ Lessons",
        icon: Server,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20"
    },
    {
        title: "Frontend",
        count: "React, Next.js",
        icon: Layout,
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        border: "border-pink-400/20"
    },
    {
        title: "Backend",
        count: "Node, Python",
        icon: Terminal,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20"
    },
    {
        title: "Mobile Dev",
        count: "React Native",
        icon: Smartphone,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20"
    }
];

export default function Topics() {
    return (
        <section id="topics" className="py-32 relative">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-white/20 bg-black/50 text-white backdrop-blur-sm">
                        Curated Learning Paths
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        <span style={{ color: '#1a1a1a', textShadow: '0 0 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.3)' }}>Master </span>
                        <span style={{ color: '#1E2A4A', fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(30, 42, 74, 0.8), 0 0 40px rgba(30, 42, 74, 0.5)' }}>Every Topic</span>
                    </h2>
                    <p className="text-white max-w-2xl text-lg px-6 py-3 rounded-2xl bg-black/50 backdrop-blur-sm">
                        Structured content designed to take you from beginner to expert in key technical domains.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {topics.map((topic, i) => (
                        <Card
                            key={i}
                            className="group border-white/20 bg-black/50 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="p-6 flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${topic.bg} ${topic.border} border`}>
                                    <topic.icon className={`w-6 h-6 ${topic.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-white/70">
                                        {topic.count}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
