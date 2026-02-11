
import { Zap, Heart, MessageSquare } from "lucide-react";

export const Layers = () => {
    return (
        <section className="py-24 bg-isotope-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Three Layers of Perfect Matching</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-isotope-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] group">
                        <div className="w-12 h-12 bg-isotope-teal/10 rounded-lg flex items-center justify-center mb-6 text-isotope-teal group-hover:scale-110 group-hover:bg-isotope-teal/20 transition-all duration-300">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Technical Sync</h3>
                        <p className="text-gray-400 leading-relaxed">
                            We analyze tool alignment — frameworks, languages, and infrastructure preferences to find perfect technical matches.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-isotope-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] group">
                        <div className="w-12 h-12 bg-isotope-teal/10 rounded-lg flex items-center justify-center mb-6 text-isotope-teal group-hover:scale-110 group-hover:bg-isotope-teal/20 transition-all duration-300">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">The "Vibe" Factor</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Pixel-perfect craftsperson or move-fast builder? We match your energy and working style preferences.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-isotope-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] group">
                        <div className="w-12 h-12 bg-isotope-teal/10 rounded-lg flex items-center justify-center mb-6 text-isotope-teal group-hover:scale-110 group-hover:bg-isotope-teal/20 transition-all duration-300">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Communication Layer</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Deep-work recluse or collaborative team player? Find someone who matches your communication style.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
