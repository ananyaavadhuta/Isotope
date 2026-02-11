
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Hero = () => {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-isotope-teal/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-isotope-green/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
                    <span className="text-isotope-teal text-xs font-semibold tracking-wider uppercase">New Feature</span>
                    <span className="text-gray-400 text-xs">AI-Powered Matching is live</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                    Find Your <br />
                    <span className="text-gradient">Perfect Career Match</span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    An AI-powered job platform designed for <span className="text-white font-semibold">the new generation</span>.
                    We match you with opportunities based on skills, work style, and cultural fit — not just keywords.
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-400">
                    {["Internships", "Part-time Jobs", "Full-time Roles", "Freelance Gigs"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-isotope-teal" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 bg-isotope-teal text-black font-bold rounded-lg hover:bg-isotope-teal/90 hover:scale-105 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                        Start Matching
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-isotope-orange text-black font-bold rounded-lg hover:bg-isotope-orange/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,176,0,0.3)]">
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};
