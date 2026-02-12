import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, User, Code, ArrowRight, RotateCw, Briefcase, MapPin, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import MatchResult from "@/components/MatchResult";
import GradientBackground from "@/components/GradientBackground";
import IronFilingsEffect from "@/components/IronFilingsEffect";
import { supabase } from "@/integrations/supabase/client";

const sampleResults = [{
    score: 87,
    summary: "Both share a love for modern JavaScript tooling and rapid iteration. The coder's Next.js expertise directly maps to the project's frontend needs, and their Tailwind mastery ensures a polished UI from day one.",
    friction: "The coder prefers async communication and deep-focus blocks, while the project demands daily standups and pair programming sessions.",
    verdict: "The High-Fidelity Dream Team"
}, {
    score: 62,
    summary: "Solid technical alignment on backend infrastructure, but the coder's preference for experimental tech may clash with the project's enterprise stability requirements.",
    friction: "The coder thrives in chaos and rapid prototyping, while the client expects meticulous documentation and change management processes.",
    verdict: "The Controlled Chaos Duo"
}, {
    score: 94,
    summary: "A near-perfect technical and cultural match. The coder's open-source ethos aligns beautifully with the project's build-in-public philosophy, and their full-stack capabilities cover every technical need.",
    friction: "The coder's tendency to over-engineer could slow down the project's need for quick MVPs.",
    verdict: "The Dynamic Duo"
}];

const recommendedJobs = [
    {
        title: "Frontend Developer Intern",
        company: "TechStartup Co.",
        location: "Metro City",
        salary: "₹15K - ₹25K/month",
        match: 92
    },
    {
        title: "Junior React Developer",
        company: "Digital Solutions",
        location: "Tech Hub",
        salary: "₹4L - ₹6L/year",
        match: 88
    },
    {
        title: "UI/UX Developer",
        company: "ShopMax",
        location: "Remote",
        salary: "₹5L - ₹8L/year",
        match: 85
    },
    {
        title: "Full Stack Developer",
        company: "PayFlow",
        location: "Tech Hub",
        salary: "₹6L - ₹10L/year",
        match: 81
    }
];

const Matchmaking = () => {
    const navigate = useNavigate();
    const [coderText, setCoderText] = useState("");
    const [projectText, setProjectText] = useState("");
    const [result, setResult] = useState<(typeof sampleResults)[0] | null>(null);
    const [isMatching, setIsMatching] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                navigate("/auth");
            }
        };
        checkAuth();
    }, [navigate]);

    const handleMatch = () => {
        if (!coderText.trim() || !projectText.trim()) return;
        setIsMatching(true);
        // Simulate matching with a random sample result
        setTimeout(() => {
            const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
            setResult(randomResult);
            setIsMatching(false);
        }, 1500);
    };

    const handleReset = () => {
        setResult(null);
        setCoderText("");
        setProjectText("");
    };

    return (
        <div className="relative min-h-screen bg-background">
            <GradientBackground />
            <IronFilingsEffect />
            <Header />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 pb-20 pt-24">
                <div className="mb-12 text-center">
                    <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                        The <span className="text-gradient">Matchmaker</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Paste the candidate profile and project description to find the match
                    </p>
                </div>

                {!result ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Coder Input */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                    <User className="h-4 w-4 text-primary" />
                                </div>
                                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                    The Candidate
                                </Label>
                            </div>
                            <Textarea
                                value={coderText}
                                onChange={e => setCoderText(e.target.value)}
                                placeholder="Paste resume, GitHub bio, or 'About Me' text here..."
                                className="min-h-[280px] resize-none bg-muted/30 font-mono text-sm leading-relaxed"
                            />
                        </div>

                        {/* Project Input */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                                    <Code className="h-4 w-4 text-accent" />
                                </div>
                                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                    The Project
                                </Label>
                            </div>
                            <Textarea
                                value={projectText}
                                onChange={e => setProjectText(e.target.value)}
                                placeholder="Paste job description or project vision here..."
                                className="min-h-[280px] resize-none bg-muted/30 font-mono text-sm leading-relaxed"
                            />
                        </div>

                        {/* Match Button */}
                        <div className="md:col-span-2">
                            <Button
                                onClick={handleMatch}
                                disabled={!coderText.trim() || !projectText.trim() || isMatching}
                                size="lg"
                                className="w-full gap-2 py-6 text-base font-semibold glow-primary"
                            >
                                {isMatching ? (
                                    <>
                                        <RotateCw className="h-4 w-4 animate-spin" />
                                        Analyzing Vibes...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="h-4 w-4" />
                                        Find the Match
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-xl">
                        <MatchResult
                            score={result.score}
                            summary={result.summary}
                            friction={result.friction}
                            verdict={result.verdict}
                        />
                        <Button
                            onClick={handleReset}
                            variant="outline"
                            className="mt-6 w-full gap-2"
                        >
                            <RotateCw className="h-4 w-4" />
                            Try Another Match
                        </Button>

                        {/* Job Recommendations */}
                        <div className="mt-12">
                            <h2 className="mb-6 text-xl font-semibold">
                                Recommended Jobs Based on Your Profile
                            </h2>
                            <div className="space-y-4">
                                {recommendedJobs.map((job, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/30"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{job.title}</h3>
                                                <p className="text-sm text-muted-foreground">{job.company}</p>
                                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {job.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <IndianRupee className="h-3 w-3" />
                                                        {job.salary}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                                    {job.match}% Match
                                                </span>
                                                <Button size="sm" variant="ghost" className="text-xs">
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to="/jobs" className="mt-6 block">
                                <Button className="w-full gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    View All Jobs
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Matchmaking;