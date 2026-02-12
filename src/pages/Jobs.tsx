import { Briefcase, Rocket, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import IronFilingsEffect from "@/components/IronFilingsEffect";

const Jobs = () => {
    return (
        <div className="relative min-h-screen bg-background">
            <GradientBackground />
            <IronFilingsEffect />
            <Header />

            <div className="container mx-auto max-w-4xl px-6 pb-20 pt-24">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                        <Rocket className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                        Pre-Launch Phase
                    </h1>
                    <p className="mx-auto mb-6 max-w-lg text-lg text-muted-foreground">
                        We're building something incredible. Job listings and talent requests will be available
                        once Isotope officially launches. Stay tuned!
                    </p>
                    <div className="mb-10 flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm text-accent">
                        <Clock className="h-4 w-4" />
                        Coming Soon
                    </div>

                    <div className="grid w-full max-w-md gap-4">
                        <div className="rounded-xl border border-border bg-card/50 p-6 text-left backdrop-blur-sm">
                            <Briefcase className="mb-3 h-6 w-6 text-primary" />
                            <h3 className="mb-1 font-semibold">For Employers</h3>
                            <p className="text-sm text-muted-foreground">
                                Post job listings and discover matched candidates from our young talent pool.
                            </p>
                        </div>
                        <div className="rounded-xl border border-border bg-card/50 p-6 text-left backdrop-blur-sm">
                            <Briefcase className="mb-3 h-6 w-6 text-accent" />
                            <h3 className="mb-1 font-semibold">For Job Seekers</h3>
                            <p className="text-sm text-muted-foreground">
                                Browse curated opportunities and get AI-powered job recommendations.
                            </p>
                        </div>
                    </div>

                    <Link to="/auth" className="mt-8">
                        <Button size="lg" className="gap-2 glow-primary">
                            Create Account to Get Notified
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Jobs;