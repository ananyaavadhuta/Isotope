import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, IndianRupee, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    salary_range: string;
    job_type: string;
    created_at: string;
    profiles: {
        full_name: string;
    }
}

const JobList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const { data, error } = await supabase
                .from("jobs")
                .select(`
          *,
          profiles:employer_id (
            full_name
          )
        `)
                .eq("status", "open")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching jobs:", error);
            } else {
                setJobs(data as any);
            }
            setLoading(false);
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                    <Briefcase className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No jobs available yet</h3>
                <p className="max-w-xs text-muted-foreground">
                    Check back later or complete your profile to get recommended.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className="group rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground">
                                {job.profiles?.full_name || "Isotope Partner"}
                            </p>
                        </div>
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {job.job_type}
                        </div>
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                        {job.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3" />
                            {job.salary_range}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(job.created_at).toLocaleDateString()}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button size="sm" className="gap-2">
                            Apply Now
                            <ArrowRight className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobList;
