import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, Target, Award, Zap } from "lucide-react";

const stats = [
    { label: "Students Placed", value: "10,000+", icon: Users },
    { label: "Partner Companies", value: "500+", icon: Target },
    { label: "Success Rate", value: "95%", icon: Award },
    { label: "Practice Problems", value: "1,500+", icon: Zap },
];

export default function About() {
    return (
        <section id="about" className="py-32 relative">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-white/10 bg-white/5 text-gray-300 backdrop-blur-sm">
                        About Us
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Built for <span className="text-gradient-primary">Success</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        PlacePrep is the ultimate platform designed to help students and job seekers ace their placement interviews. We combine AI-powered practice with curated content to maximize your chances of landing your dream job.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat, i) => (
                        <Card
                            key={i}
                            className="border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center hover:bg-white/10 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <stat.icon className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-400">
                                {stat.label}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
