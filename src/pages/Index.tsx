import { MouseFollowLight } from "../components/MouseFollowLight";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Features } from "../components/Features";
import { Steps } from "../components/Steps";
import { Layers } from "../components/Layers";
import { Footer } from "../components/Footer";

const Index = () => {
    return (
        <div className="min-h-screen bg-isotope-dark font-sans text-foreground selection:bg-isotope-teal selection:text-isotope-dark overflow-x-hidden">
            <MouseFollowLight />
            <Header />
            <Hero />
            <Stats />
            <Features />
            <Layers />
            <Steps />
            {/* Ready to Find Your Perfect Match CTA */}
            <section className="py-24 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Ready to Find Your <span className="text-gradient">Perfect Match</span>?
                </h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                    Join thousands of young professionals who are already building their careers through Isotope.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="px-8 py-3 bg-isotope-teal text-black font-bold rounded-lg hover:bg-isotope-teal/90 transition-all">
                        Get Started Free →
                    </button>
                    <button className="px-8 py-3 border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-all">
                        Learn More
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Index;
