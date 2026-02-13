import { Briefcase, Rocket, Clock, ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import IronFilingsEffect from "@/components/IronFilingsEffect";
import JobList from "@/components/JobList";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Jobs = () => {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUserRole(session.user.user_metadata?.role || "seeker");
            }
        };
        getSession();
    }, []);

    return (
        <div className="relative min-h-screen bg-background">
            <GradientBackground />
            <IronFilingsEffect />
            <Header />

            <div className="container mx-auto max-w-5xl px-6 pb-20 pt-24">
                <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                            Available Opportunities
                        </h1>
                        <p className="mt-2 text-muted-foreground text-lg">
                            Find projects and roles that match your vibe and skills.
                        </p>
                    </div>
                    {userRole === "employer" && (
                        <Link to="/post-job">
                            <Button className="gap-2 glow-primary">
                                <Plus className="h-4 w-4" />
                                Post a New Job
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                    <div className="space-y-6">
                        <JobList />
                    </div>

                    <div className="space-y-6">
                        {/* Phase Info */}
                        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                                <Rocket className="h-5 w-5 text-accent" />
                            </div>
                            <h3 className="mb-2 font-bold">Pre-Launch Phase</h3>
                            <p className="text-sm text-muted-foreground">
                                We're currently in active beta. New listings are being added daily by our partner companies.
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-accent">
                                <Clock className="h-3 w-3" />
                                Launching Officially Soon
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                            <h3 className="mb-4 font-bold">Tips for Success</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    Complete your profile to 100%
                                </li>
                                <li className="flex gap-2">
                                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    Add projects to your portfolio
                                </li>
                                <li className="flex gap-2">
                                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    Check your match score before applying
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;