import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Bot, FileText, ArrowRight, CheckCircle2, AlertCircle, RotateCw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import IronFilingsEffect from "@/components/IronFilingsEffect";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
    score: number;
    feedback: string[];
    role_match: string;
    keywords_found: string[];
    improved_version: string;
}

const ResumeImprover = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [resumeText, setResumeText] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                navigate("/auth");
            }
        };
        checkAuth();
    }, [navigate]);

    const analyzeResume = async () => {
        if (!resumeText.trim()) return;
        setIsAnalyzing(true);

        try {
            // Mock AI improved logic - in production, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simple keyword analysis for "AI" feel
            const strongVerbs = ["led", "developed", "managed", "created", "designed", "architected", "implemented", "optimized"];
            const techKeywords = ["React", "Node", "Python", "AWS", "SQL", "TypeScript", "Docker", "Kubernetes", "AI", "ML"];

            const words = resumeText.toLowerCase().split(/\s+/);
            const foundVerbs = strongVerbs.filter(v => words.includes(v));
            const foundTech = techKeywords.filter(t => words.includes(t.toLowerCase()));

            let score = 65; // Base score
            score += foundVerbs.length * 5;
            score += foundTech.length * 3;
            if (score > 98) score = 98;

            const feedback = [];
            if (foundVerbs.length < 3) feedback.push("Use more strong action verbs (e.g., 'Architected' instead of 'Worked on').");
            if (resumeText.length < 200) feedback.push("Expand on your project descriptions. Detail is key.");
            if (foundTech.length < 2) feedback.push("Highlight specific technologies and tools you've used.");

            feedback.push("Quantify your impact with numbers (e.g., 'Improved load time by 30%').");

            const improved = resumeText + "\n\n[AI SUggestion]: Consider adding a 'Technical Skills' section at the top for better ATS parsing.";

            const analysisResult = {
                score,
                feedback,
                role_match: "Full Stack Engineer",
                keywords_found: [...new Set([...foundVerbs, ...foundTech])],
                improved_version: improved
            };

            setResult(analysisResult);

            // Save to database
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        resume_content: resumeText,
                        resume_score: score,
                        resume_feedback: analysisResult
                    } as any)
                    .eq('id', user.id);

                if (error) {
                    console.error("Error saving resume analysis:", error);
                    toast({
                        title: "Error Saving Results",
                        description: "Could not save analysis to your profile.",
                        variant: "destructive"
                    });
                } else {
                    toast({
                        title: "Resume Analyzed & Saved",
                        description: "Your results have been saved to your profile.",
                    });
                }
            }
        } catch (error) {
            console.error("Analysis error:", error);
            toast({
                title: "Analysis Failed",
                description: "Something went wrong during analysis.",
                variant: "destructive"
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-background">
            <GradientBackground />
            <IronFilingsEffect />
            <Header />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 pb-20 pt-24">
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                        <Sparkles className="h-6 w-6 text-purple-500" />
                    </div>
                    <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                        AI Resume <span className="text-gradient-purple">Improver</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Our AI analyzes successful profiles in your industry to help you stand out.
                        Get instant feedback on keywords, tone, and impact.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Input Section */}
                    <div className="space-y-4">
                        <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    Your Current Resume
                                </h3>
                                <span className="text-xs text-muted-foreground">Markdown or Plain Text</span>
                            </div>
                            <Textarea
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                                placeholder="Paste your resume content here..."
                                className="min-h-[400px] resize-none bg-muted/30 font-mono text-sm leading-relaxed"
                            />
                            <div className="mt-4">
                                <Button
                                    onClick={analyzeResume}
                                    className="w-full gap-2 glow-purple"
                                    disabled={isAnalyzing || !resumeText.trim()}
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Wand2 className="h-4 w-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Bot className="h-4 w-4" />
                                            Analyze & Improve
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="space-y-4">
                        {!result ? (
                            <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
                                <div className="mb-4 rounded-full bg-muted p-4">
                                    <Sparkles className="h-8 w-8 text-muted-foreground/50" />
                                </div>
                                <h3 className="text-lg font-medium">Ready to Optimize</h3>
                                <p className="text-sm text-muted-foreground">
                                    Paste your resume on the left to get a comprehensive analysis and actionable tips.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Score Card */}
                                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-purple-400">Resume Score</p>
                                            <h2 className="text-4xl font-bold">{result.score}/100</h2>
                                        </div>
                                        <div className="h-16 w-16 rounded-full border-4 border-purple-500/30 flex items-center justify-center text-xl font-bold bg-purple-500/10">
                                            {result.score}
                                        </div>
                                    </div>
                                    <div className="mt-4 h-2 w-full rounded-full bg-purple-950/50">
                                        <div
                                            className="h-full rounded-full bg-purple-500 transition-all duration-1000"
                                            style={{ width: `${result.score}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Feedback */}
                                <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                                    <h3 className="mb-4 font-semibold flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                                        Key Improvements
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.feedback.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Keywords */}
                                <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                                    <h3 className="mb-4 font-semibold flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        Detected Keywords
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.keywords_found.length > 0 ? result.keywords_found.map((k, i) => (
                                            <span key={i} className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 border border-green-500/20">
                                                {k}
                                            </span>
                                        )) : (
                                            <span className="text-sm text-muted-foreground italic">No specific technical keywords detected.</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeImprover;
