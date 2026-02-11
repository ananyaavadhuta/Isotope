
import { GraduationCap, Briefcase, Building } from "lucide-react";

export const Features = () => {
    const features = [
        {
            title: "College Students",
            description: "Find internships and entry-level positions that match your skills and aspirations while you study.",
            icon: GraduationCap,
        },
        {
            title: "Young Professionals",
            description: "Fresh graduates and early-career professionals looking for their perfect role in the tech ecosystem.",
            icon: Briefcase,
        },
        {
            title: "Startups & Companies",
            description: "Startups and enterprises seeking young, dynamic talent to fuel their growth and innovation.",
            icon: Building,
        },
    ];

    return (
        <section className="py-24 bg-isotope-dark relative">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                    Built for the <span className="text-white">Next Generation</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-isotope-teal/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                            <div className="w-12 h-12 bg-isotope-teal/10 rounded-lg flex items-center justify-center mb-6 text-isotope-teal group-hover:scale-110 group-hover:bg-isotope-teal/20 transition-all duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
