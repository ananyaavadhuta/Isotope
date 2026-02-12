import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, MessageCircle, Users, Briefcase, GraduationCap, Sparkles, Shield, TrendingUp, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import IronFilingsEffect from "@/components/IronFilingsEffect";
import GradientBackground from "@/components/GradientBackground";
const features = [{
    icon: Zap,
    title: "Technical Sync",
    description: "We analyze tool alignment — frameworks, languages, and infrastructure preferences to find perfect technical matches."
}, {
    icon: Target,
    title: 'The "Vibe" Factor',
    description: "Pixel-perfect craftsperson or move-fast builder? We match your energy and working style preferences."
}, {
    icon: MessageCircle,
    title: "Communication Layer",
    description: "Deep-work recluse or collaborative team player? Find someone who matches your communication style."
}];
const stats = [{
    value: "10K+",
    label: "Active Users"
}, {
    value: "5K+",
    label: "Jobs Posted"
}, {
    value: "85%",
    label: "Match Success Rate"
}, {
    value: "₹50L+",
    label: "Salaries Placed"
}];
const targetAudience = [{
    icon: GraduationCap,
    title: "College Students",
    description: "Find internships and entry-level positions that match your skills and aspirations while you study."
}, {
    icon: Users,
    title: "Young Professionals",
    description: "Fresh graduates and early-career professionals looking for their perfect role in the tech ecosystem."
}, {
    icon: Briefcase,
    title: "Startups & Companies",
    description: "Startups and enterprises seeking young, dynamic talent to fuel their growth and innovation."
}];
const howItWorks = [{
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your skills, experience, and what kind of work environment you thrive in."
}, {
    step: "02",
    title: "AI-Powered Analysis",
    description: "Our intelligent system analyzes your profile across technical skills, work style, and cultural preferences."
}, {
    step: "03",
    title: "Get Matched",
    description: "Receive personalized job recommendations and compatibility scores for roles that truly fit you."
}, {
    step: "04",
    title: "Connect & Grow",
    description: "Apply directly, connect with employers, and kickstart your career journey."
}];
const benefits = [{
    icon: Sparkles,
    title: "AI-Powered Matching",
    description: "Smart algorithms that understand both skills and personality"
}, {
    icon: Shield,
    title: "Verified Opportunities",
    description: "All job postings are vetted for authenticity and quality"
}, {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Track your progress and get insights to level up"
}, {
    icon: Clock,
    title: "Quick Applications",
    description: "Apply to multiple jobs with a single profile"
}];
const Index = () => {
    return <div className="relative min-h-screen bg-background">
        <GradientBackground />
        <IronFilingsEffect />
        <Header />

        {/* Hero */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
            <div className="relative z-10 mx-auto max-w-4xl text-center">


                <h1 className="animate-slide-up mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
                    Find Your
                    <br />
                    <span className="text-gradient">Perfect Career Match</span>
                </h1>

                <p className="animate-slide-up mx-auto mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl" style={{
                    animationDelay: "0.1s"
                }}>
                    An AI-powered job platform designed for{" "}
                    <span className="font-semibold text-foreground">the new generation</span>
                    . We match you with opportunities based on skills, work style, and
                    cultural fit — not just keywords.
                </p>

                <div className="animate-slide-up mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground" style={{
                    animationDelay: "0.15s"
                }}>
                    <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Internships</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Part-time Jobs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Full-time Roles</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Freelance Gigs</span>
                    </div>
                </div>

                <div className="animate-slide-up flex flex-col items-center gap-4 sm:flex-row sm:justify-center" style={{
                    animationDelay: "0.2s"
                }}>
                    <Link to="/matchmaking">
                        <Button size="lg" className="gap-2 px-8 text-base font-semibold glow-primary">
                            Start Matching
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to="/auth">
                        <Button variant="outline" size="lg" className="px-8 text-base">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

        {/* Stats */}
        <section className="relative border-t border-border px-6 py-16">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map(stat => <div key={stat.label} className="text-center">
                    <div className="mb-1 text-3xl font-bold text-gradient md:text-4xl">
                        {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>)}
            </div>
        </section>

        {/* Who is this for */}
        <section className="relative border-t border-border px-6 py-24">
            <div className="mx-auto max-w-5xl">

                <p className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl">
                    Built for the Next Generation
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    {targetAudience.map(audience => <div key={audience.title} className="group rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:glow-primary">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <audience.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">{audience.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {audience.description}
                        </p>
                    </div>)}
                </div>
            </div>
        </section>

        {/* How It Works */}
        <section className="relative border-t border-border px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                </h2>
                <p className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl">
                    Your Journey to the Perfect Match
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {howItWorks.map((item, index) => <div key={item.step} className="relative">
                        {index < howItWorks.length - 1 && <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent lg:block" />}
                        <div className="relative rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                            <div className="mb-4 text-3xl font-bold text-primary/30">
                                {item.step}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    </div>)}
                </div>
            </div>
        </section>

        {/* Features */}
        <section className="relative border-t border-border px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                </h2>
                <p className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl">
                    Three Layers of Perfect Matching
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                    {features.map(feature => <div key={feature.title} className="group rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:glow-primary">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {feature.description}
                        </p>
                    </div>)}
                </div>
            </div>
        </section>

        {/* Benefits */}
        <section className="relative border-t border-border px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-primary">
                </h2>
                <p className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl">
                    Everything You Need to Succeed
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map(benefit => <div key={benefit.title} className="rounded-xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <benefit.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">
                            {benefit.description}
                        </p>
                    </div>)}
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="relative border-t border-border px-6 py-24">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    Ready to Find Your{" "}
                    <span className="text-gradient">Perfect Match</span>?
                </h2>
                <p className="mb-8 text-lg text-muted-foreground">
                    Join thousands of young professionals who are already building their
                    careers through Isotope.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Link to="/auth">
                        <Button size="lg" className="gap-2 px-8 text-base font-semibold glow-primary">
                            Get Started Free
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to="/for-job-seekers">
                        <Button variant="outline" size="lg" className="px-8 text-base">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-border px-6 py-8">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    <span className="font-semibold text-foreground">Isotope</span>
                    <span className="mx-2">•</span>
                    <span>Built for You</span>
                </div>
                <p className="text-xs text-muted-foreground">
                    © 2026 Isotope. All rights reserved.
                </p>
            </div>
        </footer>
    </div>;
};
export default Index;