import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Camera, Save, Briefcase, Search, MapPin, Phone, Mail, FileText, LogOut, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import ProfileSettings from "@/components/ProfileSettings";
import GradientBackground from "@/components/GradientBackground";
import MouseFollowLight from "@/components/MouseFollowLight";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import VideoResumeRecorder from "@/components/VideoResumeRecorder";

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Profile form state
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");
    const [videoResumeUrl, setVideoResumeUrl] = useState<string | null>(null);

    const [role, setRole] = useState<"seeker" | "employer">("seeker");

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                navigate("/auth");
                return;
            }
            setUser(session.user);

            // Fetch profile data from public.profiles
            const { data: profile, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .returns<any>()
                .single();

            if (profile) {
                const p = profile as any;
                setFullName(p.full_name || "");
                setAvatarUrl(p.avatar_url || "");
                setRole(p.role || "seeker");
                setBio(p.bio || "");
                setPhone(p.phone_number || "");
                setLocation(p.location || "");
                setSkills(p.skills || "");
                setExperience(p.experience || "");
                setCompanyName(p.company_name || "");
                setIndustry(p.industry || "");
                setVideoResumeUrl(p.video_resume_url || null);
            } else {
                // Fallback to metadata if profile doesn't exist yet
                setFullName(session.user.user_metadata?.full_name || "");
                setAvatarUrl(session.user.user_metadata?.avatar_url || "");
                setRole(session.user.user_metadata?.role || "seeker");
            }
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session?.user) {
                navigate("/auth");
            } else {
                setUser(session.user);
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            // Update auth metadata
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName,
                    role
                }
            });

            if (authError) throw authError;

            // Update public.profiles table
            const { error: profileError } = await supabase
                .from("profiles")
                .upsert({
                    id: user.id,
                    full_name: fullName,
                    avatar_url: avatarUrl,
                    role,
                    bio,
                    phone_number: phone,
                    location,
                    skills,
                    experience,
                    company_name: companyName,
                    industry,
                    updated_at: new Date().toISOString()
                } as any);

            if (profileError) throw profileError;

            toast({
                title: "Profile updated",
                description: "Your changes have been saved successfully to the database.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update profile. Please try again.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    if (loading) {
        return (
            <div className="relative min-h-screen bg-background">
                <GradientBackground />
                <Header />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-muted-foreground">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-background">
            <GradientBackground />
            <MouseFollowLight />
            <Header />

            <div className="relative z-10 container mx-auto max-w-3xl px-6 pb-20 pt-24">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">Your Profile</h1>
                    <p className="text-muted-foreground">
                        Manage your account details and preferences
                    </p>
                </div>

                {/* Avatar Section */}
                <div className="mb-8 flex items-center gap-6 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={avatarUrl} alt={fullName} />
                            <AvatarFallback className="text-2xl">
                                {fullName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{fullName || "Your Name"}</h2>
                        <p className="text-muted-foreground">{user?.email}</p>
                        <div className="mt-2 flex items-center gap-2">
                            {role === "employer" ? (
                                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                                    <Briefcase className="h-3 w-3" />
                                    Hire Talent
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                                    <Search className="h-3 w-3" />
                                    Seek Opportunities
                                </span>
                            )}
                            <button
                                onClick={async () => {
                                    const newRole = role === "seeker" ? "employer" : "seeker";
                                    setRole(newRole);

                                    // Proactively update in DB
                                    if (user) {
                                        // Update database
                                        const { error: dbError } = await supabase
                                            .from("profiles")
                                            .update({ role: newRole } as any)
                                            .eq("id", user.id);

                                        // Update auth metadata so header sees it
                                        const { error: authError } = await supabase.auth.updateUser({
                                            data: { role: newRole }
                                        });

                                        if (dbError || authError) {
                                            toast({
                                                title: "Error switching role",
                                                description: (dbError || authError)?.message,
                                                variant: "destructive"
                                            });
                                        } else {
                                            toast({
                                                title: "Role updated",
                                                description: `You are now a ${newRole === "employer" ? "Hirer" : "Seeker"}.`,
                                            });
                                        }
                                    }
                                }}
                                className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
                            >
                                <ArrowLeftRight className="h-3 w-3" />
                                Switch to {role === "seeker" ? "Hire Talent" : "Seek Opportunities"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-6 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <User className="h-5 w-5 text-primary" />
                        Personal Information
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="fullName" className="text-muted-foreground">
                                Full Name
                            </Label>
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="mt-1.5 bg-muted/50"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    Phone Number
                                </div>
                            </Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 98765 43210"
                                className="mt-1.5 bg-muted/50"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    Email Address
                                </div>
                            </Label>
                            <Input
                                id="email"
                                value={user?.email || ""}
                                disabled
                                className="mt-1.5 bg-muted/30"
                            />
                        </div>
                        <div>
                            <Label htmlFor="location" className="text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    Location
                                </div>
                            </Label>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Your City"
                                className="mt-1.5 bg-muted/50"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="bio" className="text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                Bio
                            </div>
                        </Label>
                        <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself..."
                            className="mt-1.5 min-h-[100px] bg-muted/50"
                        />
                    </div>

                    {role === "seeker" && (
                        <>
                            <div>
                                <Label htmlFor="skills" className="text-muted-foreground">
                                    Skills
                                </Label>
                                <Input
                                    id="skills"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="React, TypeScript, Node.js, Python..."
                                    className="mt-1.5 bg-muted/50"
                                />
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Separate skills with commas
                                </p>
                            </div>
                            <div>
                                <Label htmlFor="experience" className="text-muted-foreground">
                                    Experience Summary
                                </Label>
                                <Textarea
                                    id="experience"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    placeholder="Describe your work experience, internships, or projects..."
                                    className="mt-1.5 min-h-[100px] bg-muted/50"
                                />
                            </div>

                            {/* Video Resume Section */}
                            <div>
                                <Label className="text-muted-foreground mb-2 block">
                                    Video Resume
                                </Label>
                                <VideoResumeRecorder
                                    currentVideoUrl={videoResumeUrl}
                                    onVideoSaved={(url) => setVideoResumeUrl(url)}
                                />
                            </div>
                        </>
                    )}

                    {role === "employer" && (
                        <>
                            <div>
                                <Label htmlFor="company" className="text-muted-foreground">
                                    Company Name
                                </Label>
                                <Input
                                    id="company"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Your Company Pvt. Ltd."
                                    className="mt-1.5 bg-muted/50"
                                />
                            </div>
                            <div>
                                <Label htmlFor="industry" className="text-muted-foreground">
                                    Industry
                                </Label>
                                <Input
                                    id="industry"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    placeholder="Technology, Finance, Healthcare..."
                                    className="mt-1.5 bg-muted/50"
                                />
                            </div>
                        </>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="gap-2 glow-primary"
                        >
                            <Save className="h-4 w-4" />
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>

                    {/* Settings Section */}
                    {user && <ProfileSettings user={user} />}
                </div>
            </div>
        </div>
    );
};

export default Profile;