import { Megaphone, Users, Linkedin, TrendingUp, CheckCircle, ArrowRight, Mail, Star, Globe, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import IronFilingsEffect from "@/components/IronFilingsEffect";
const perks = [{
    icon: TrendingUp,
    title: "Build Your Personal Brand",
    description: "Gain recognition as a campus leader and career advocate. Boost your LinkedIn presence and professional network."
}, {
    icon: Globe,
    title: "Wide Network",
    description: "Join a community of like-minded ambassadors across colleges and cities. Collaborate on events and campaigns."
}];
const responsibilities = ["Promote Isotope across your college campus and social media channels", "Organise awareness sessions and career workshops in your institution", "Share job opportunities with peers and student groups", "Provide feedback on platform features and user experience", "Create content (reels, posts, stories) showcasing Isotope's value", "Represent Isotope at local career fairs and networking events"];
const requirements = ["Active LinkedIn profile with professional presence", "Demonstrable marketing experience (social media, events, or campaigns)", "Currently enrolled in a college or university (preferred)", "Strong communication and interpersonal skills", "Passion for helping young professionals find meaningful careers", "Ability to commit 5-10 hours per week to ambassador activities"];
const ForAmbassadors = () => {
    return <div className="relative min-h-screen bg-background">
        <GradientBackground />
        <IronFilingsEffect />
        <Header />

        <div className="relative z-10 container mx-auto max-w-6xl px-6 pb-20 pt-24">
            {/* Hero Section - Unique: Split layout with large accent */}
            <div className="mb-20 grid items-center gap-10 md:grid-cols-5">
                <div className="md:col-span-3">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
                        <Megaphone className="h-4 w-4" />
                        Ambassador Programme
                    </div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                        Be the Voice of <span className="text-gradient">Isotope</span>
                    </h1>
                    <p className="max-w-xl text-lg text-muted-foreground">Help people discover career opportunities that match their ambitions. Build your brand and make an impact.</p>
                    <div className="mt-8">
                        <a href="mailto:ananya.avadhuta@gmail.com">
                            <Button size="lg" className="gap-2 glow-primary">
                                <Mail className="h-4 w-4" />
                                Apply Now
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="hidden md:col-span-2 md:flex md:items-center md:justify-center">
                    <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                        <div className="absolute inset-4 rounded-full border border-accent/10 bg-accent/5" />
                        <Megaphone className="h-20 w-20 text-accent/60" />
                    </div>
                </div>
            </div>

            {/* Perks - Unique: Alternating offset cards */}
            <div className="mb-20">
                <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
                    Why Become an Ambassador?
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {perks.map((perk, index) => <div key={index} className={`rounded-xl border bg-card/50 p-6 backdrop-blur-sm transition-all hover:bg-card ${index % 2 === 0 ? "border-accent/20 md:translate-y-4" : "border-primary/20"}`}>
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${index % 2 === 0 ? "bg-accent/10" : "bg-primary/10"}`}>
                            <perk.icon className={`h-6 w-6 ${index % 2 === 0 ? "text-accent" : "text-primary"}`} />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">{perk.title}</h3>
                        <p className="text-muted-foreground">{perk.description}</p>
                    </div>)}
                </div>
            </div>

            {/* Responsibilities - Unique: Numbered timeline */}
            <div className="mb-20">
                <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
                    What You'll Do
                </h2>
                <div className="mx-auto max-w-2xl space-y-4">
                    {responsibilities.map((item, index) => <div key={index} className="flex items-start gap-4 rounded-lg border border-border bg-card/30 p-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {index + 1}
                        </div>
                        <span className="pt-1 text-muted-foreground">{item}</span>
                    </div>)}
                </div>
            </div>

            {/* Requirements - Unique: Two-column with accent border */}
            <div className="mb-20 rounded-2xl border-l-4 border-l-accent border-r border-t border-b border-border bg-card/50 p-8 backdrop-blur-sm md:p-12">
                <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                    Requirements
                </h2>
                <p className="mb-8 text-muted-foreground">
                    We're looking for motivated individuals who meet the following criteria:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    {requirements.map((req, index) => <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                        <span className="text-muted-foreground">{req}</span>
                    </div>)}
                </div>
            </div>

            {/* Application CTA */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-card/80 to-accent/5 p-8 text-center backdrop-blur-sm md:p-12">
                <Users className="mx-auto mb-4 h-12 w-12 text-accent/60" />
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Ready to Join the Team?
                </h2>
                <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                    Send us your resume and a brief introduction about why you'd make a great Isotope ambassador.
                    We review applications on a rolling basis.
                </p>
                <a href="mailto:ananya.avadhuta@gmail.com">
                    <Button size="lg" className="gap-2 glow-primary">
                        <Mail className="h-4 w-4" />
                        Apply via Email
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </a>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:ananya.avadhuta@gmail.com" className="text-primary underline underline-offset-2">
                        ananya.avadhuta@gmail.com
                    </a>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                    Please include your resume and a brief cover letter with your application.
                </p>
            </div>
        </div>
    </div>;
};
export default ForAmbassadors;