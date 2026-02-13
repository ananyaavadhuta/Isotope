import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, IndianRupee, FileText, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PostJob = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [jobType, setJobType] = useState("full-time");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                navigate("/auth");
                return;
            }

            const { error } = await supabase.from("jobs").insert({
                title,
                description,
                location,
                salary_range: salaryRange,
                job_type: jobType,
                employer_id: session.user.id,
                status: "open",
            });

            if (error) throw error;

            toast({
                title: "Job posted!",
                description: "Your listing is now live on the platform.",
            });
            navigate("/jobs");
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to post job.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-background">
            <GradientBackground />
            <Header />

            <div className="container mx-auto max-w-2xl px-6 pb-20 pt-24">
                <Button
                    variant="ghost"
                    className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
                    onClick={() => navigate("/jobs")}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Jobs
                </Button>

                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">Post a New Role</h1>
                    <p className="mt-2 text-muted-foreground">
                        Connect with ambitious talent who align with your company's vibe.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm">
                    <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Frontend Developer"
                            className="mt-1.5"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <div className="relative mt-1.5">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="location"
                                    placeholder="Remote / Mumbai"
                                    className="pl-10"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary Range</Label>
                            <div className="relative mt-1.5">
                                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="salary"
                                    placeholder="₹50k - ₹80k"
                                    className="pl-10"
                                    value={salaryRange}
                                    onChange={(e) => setSalaryRange(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="type">Job Type</Label>
                        <select
                            id="type"
                            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe the role, requirements, and what it's like to work with you..."
                            className="mt-1.5 min-h-[150px]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full gap-2 py-6 text-lg glow-primary" disabled={loading}>
                        <Plus className="h-5 w-5" />
                        {loading ? "Posting..." : "Post Job Listing"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
