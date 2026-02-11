import { Wand2, ShieldCheck, TrendingUp, Clock } from "lucide-react";

export const SuccessFeatures = () => {
    const features = [
        {
            icon: Wand2,
            title: "AI-Powered Matching",
            description: "Smart algorithms that understand both skills and personality"
        },
        {
            icon: ShieldCheck,
            title: "Verified Opportunities",
            description: "All job postings are vetted for authenticity and quality"
        },
        {
            icon: TrendingUp,
            title: "Career Growth",
            description: "Track your progress and get insights to level up"
        },
        {
            icon: Clock,
            title: "Quick Applications",
            description: "Apply to multiple jobs with a single profile"
        }
    ];

    return (
        <section className="py-24 bg-isotope-dark relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-isotope-teal/10 rounded-xl flex items-center justify-center mb-6 text-isotope-teal group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
