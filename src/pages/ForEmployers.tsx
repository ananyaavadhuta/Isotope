import { Building2, Users, Target, TrendingUp, CheckCircle, ArrowRight, Briefcase, IndianRupee, Rocket, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import IronFilingsEffect from "@/components/IronFilingsEffect";

const benefits = [
    {
        icon: Users,
        title: "Access to Young Talent",
        description: "Connect with the brightest teenagers and young adults (16-25) who bring fresh perspectives, digital fluency, and enthusiasm to your projects."
    },
    {
        icon: Target,
        title: "AI-Powered Matching",
        description: "Our advanced matching algorithm analyzes work styles, skills, and cultural fit to ensure you find candidates who truly align with your company's values."
    },
    {
        icon: TrendingUp,
        title: "Reduce Hiring Costs",
        description: "Eliminate costly mis-hires. Our vibe-check analysis predicts team compatibility before you invest in onboarding."
    },
    {
        icon: Briefcase,
        title: "Diverse Talent Pool",
        description: "Access candidates from diverse cities and regions. Find hidden gems from emerging tech hubs."
    }
];

const whyIsotope = [
    "Pre-vetted candidates with verified skills and portfolios",
    "Match scores based on work style, not just keywords",
    "Quick turnaround—average time to first match: 48 hours",
    "Dedicated support for enterprise hiring needs",
    "Analytics dashboard to track hiring funnel",
    "Flexible hiring: full-time, part-time, internships, gigs"
];

const stats = [
    { value: "10K+", label: "Active Job Seekers" },
    { value: "500+", label: "Companies Trust Us" },
    { value: "87%", label: "Match Success Rate" },
    { value: "48hrs", label: "Avg. Time to Match" }
];

const ForEmployers = () => {
    return (
        <div className="relative min-h-screen bg-background">
            <GradientBackground />
            <IronFilingsEffect />
            <Header />

            <div className="relative z-10 container mx-auto max-w-6xl px-6 pb-20 pt-24">
                {/* Hero Section */}
                <div className="mb-20 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                        Hire the Next-Gen <span className="text-gradient">Workforce</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Isotope connects you with ambitious young professionals who are ready to make an impact.
                        Find talent that matches your culture, not just your job description.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link to="/auth">
                            <Button size="lg" className="gap-2 glow-primary">
                                Start Today
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

                {/* Pre-Launch Block */}
                <div className="mb-20 rounded-2xl border border-dashed border-accent/40 bg-gradient-to-br from-accent/5 to-primary/5 p-10 text-center backdrop-blur-sm">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                        <Rocket className="h-8 w-8 text-accent" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold md:text-3xl">Pre-Launch</h2>
                    <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
                        We're currently in pre-launch phase. Sign up now to be among the first employers
                        to access our talent pool when we go live.
                    </p>
                    <div className="mb-6 flex items-center justify-center gap-2 text-sm text-accent">
                        <Clock className="h-4 w-4" />
                        Employer onboarding form coming soon
                    </div>
                    <a href="https://form.typeform.com/to/ZuEMz23o" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="gap-2 glow-primary">
                            Fill Onboarding Form
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </a>
                </div>

                {/* Stats - Horizontal bar style */}
                <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm"
                        >
                            <div className="text-3xl font-bold text-primary">{stat.value}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Benefits Grid */}
                <div className="mb-20">
                    <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
                        Why Employers Choose Isotope
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                                    <benefit.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                                <p className="text-muted-foreground">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Isotope */}
                <div className="mb-20 rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm md:p-12">
                    <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
                        The Isotope Advantage
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {whyIsotope.map((point, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                <span className="text-muted-foreground">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                        Ready to Find Your Perfect Match?
                    </h2>
                    <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                        Join hundreds of companies who are building their future workforce with Isotope.
                    </p>
                    <Link to="/auth">
                        <Button size="lg" className="gap-2 glow-primary">
                            Create Employer Account
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForEmployers;