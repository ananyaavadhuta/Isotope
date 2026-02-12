import { User, Sparkles, Shield, Rocket, CheckCircle, ArrowRight, GraduationCap, MapPin, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import IronFilingsEffect from "@/components/IronFilingsEffect";
const benefits = [{
    icon: Sparkles,
    title: "AI-Powered Career Matching",
    description: "Our intelligent system analyses your skills, work preferences, and personality to match you with opportunities where you'll genuinely thrive."
}, {
    icon: Shield,
    title: "Verified Employers",
    description: "All companies on our platform undergo thorough verification. Work with legitimate organisations that value young talent."
}, {
    icon: Rocket,
    title: "Accelerate Your Career",
    description: "Access exclusive opportunities with startups, established enterprises, and everything in between across a diverse job market."
}, {
    icon: GraduationCap,
    title: "Perfect for Beginners",
    description: "Whether you're a student seeking internships or a fresh graduate ready for your first role, we specialise in entry-level opportunities."
}];
const features = ["Personalised job recommendations based on your unique profile", "Work style compatibility scores with potential employers", "Direct communication with hiring managers", "Resume and portfolio feedback from industry experts", "Interview preparation resources and tips", "Salary benchmarking for fair compensation"];
const industries = ["Technology & IT", "Marketing & Creative", "Finance & Accounting", "Customer Support", "Content & Media", "E-commerce & Retail", "Healthcare", "Education"];
const ForJobSeekers = () => {
    return <div className="relative min-h-screen bg-background">
        <GradientBackground />
        <IronFilingsEffect />
        <Header />

        <div className="relative z-10 container mx-auto max-w-6xl px-6 pb-20 pt-24">
            {/* Hero Section */}
            <div className="mb-20 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                    <User className="h-8 w-8 text-accent" />
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                    Launch Your Career with <span className="text-gradient">Isotope</span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    The premier platform for young professionals seeking meaningful employment opportunities.
                    Find roles that match your aspirations, not just your qualifications.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Link to="/auth">
                        <Button size="lg" className="gap-2 glow-primary">
                            Create Your Profile
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to="/pricing">
                        <Button variant="outline" size="lg" className="gap-2">
                            <IndianRupee className="h-4 w-4" />
                            View Pricing
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Who We Serve */}
            <div className="mb-20 rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm md:p-12">
                <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
                    Designed for the Youth
                </h2>
                <p className="mx-auto mb-8 max-w-3xl text-center text-muted-foreground">Isotope is specifically tailored for teenagers and young adults. Whether you reside in a metropolitan city or a smaller town, we connect you with opportunities that align with your career goals.</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <span className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                        <MapPin className="h-4 w-4" />
                        Wide Coverage
                    </span>
                    <span className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent">
                        <GraduationCap className="h-4 w-4" />
                        Students Welcome
                    </span>
                    <span className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                        <Rocket className="h-4 w-4" />
                        Fresh Graduates
                    </span>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="mb-20">
                <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
                    Why Choose Isotope
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {benefits.map((benefit, index) => <div key={index} className="group rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-card">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                            <benefit.icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                    </div>)}
                </div>
            </div>

            {/* Features */}
            <div className="mb-20">
                <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
                    Platform Features
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {features.map((feature, index) => <div key={index} className="flex items-start gap-3 rounded-lg border border-border bg-card/30 p-4">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                        <span className="text-muted-foreground">{feature}</span>
                    </div>)}
                </div>
            </div>

            {/* Industries */}
            <div className="mb-20 rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm md:p-12">
                <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
                    Industries We Cover
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
                    Access opportunities across a wide spectrum of industries. Our employer network spans
                    traditional sectors and emerging fields alike.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    {industries.map((industry, index) => <span key={index} className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground">
                        {industry}
                    </span>)}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Your Dream Job Awaits
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                    Join thousands of young professionals who have discovered fulfilling careers through Isotope.
                    Your journey begins with a single step.
                </p>
                <Link to="/auth">
                    <Button size="lg" className="gap-2 glow-primary">
                        Register Now
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    </div>;
};
export default ForJobSeekers;