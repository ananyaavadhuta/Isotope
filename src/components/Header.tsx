import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Zap, User, LayoutDashboard, Building2, Search, IndianRupee, Megaphone, Plus, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [dbRole, setDbRole] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async (userId: string) => {
            const { data } = await supabase
                .from("profiles")
                .select("role, full_name")
                .eq("id", userId)
                .single();
            if (data) {
                setDbRole((data as any).role);
                setFullName((data as any).full_name);
            }
        };

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            const u = session?.user ?? null;
            setUser(u);
            if (u) fetchProfile(u.id);
            else setDbRole(null);
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            const u = session?.user ?? null;
            setUser(u);
            if (u) fetchProfile(u.id);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Zap className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">
                        Iso<span className="text-destructive-foreground">tope</span>
                    </span>
                </Link>

                <nav className="flex items-center gap-1">
                    {!user && (
                        <>
                            <Link to="/for-employers">
                                <Button variant={isActive("/for-employers") ? "secondary" : "ghost"} size="sm" className="gap-2 text-sm">
                                    <Building2 className="h-4 w-4" />
                                    For Employers
                                </Button>
                            </Link>
                            <Link to="/for-job-seekers">
                                <Button variant={isActive("/for-job-seekers") ? "secondary" : "ghost"} size="sm" className="gap-2 text-sm">
                                    <Search className="h-4 w-4" />
                                    For Job Seekers
                                </Button>
                            </Link>
                        </>
                    )}

                    <Link to="/pricing">
                        <Button variant={isActive("/pricing") ? "secondary" : "ghost"} size="sm" className="gap-2 text-sm">
                            <IndianRupee className="h-4 w-4" />
                            Pricing
                        </Button>
                    </Link>
                    <Link to="/for-ambassadors">
                        <Button variant={isActive("/for-ambassadors") ? "secondary" : "ghost"} size="sm" className="gap-2 text-sm">
                            <Megaphone className="h-4 w-4" />
                            Ambassadors
                        </Button>
                    </Link>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={isActive("/profile") ? "secondary" : "ghost"} size="sm" className="gap-2 ml-2 glow-primary/10">
                                    <User className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        {fullName || "My Isotope"}
                                    </span>
                                    <ChevronDown className="h-3 w-3 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {fullName || "Dashboard"}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/matchmaking" className="cursor-pointer flex items-center">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Matchmaking</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/resume-improver" className="cursor-pointer flex items-center">
                                        <Zap className="mr-2 h-4 w-4 text-purple-500" />
                                        <span>Resume AI Tool</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/jobs" className="cursor-pointer flex items-center">
                                        <Search className="mr-2 h-4 w-4" />
                                        <span>Find Jobs</span>
                                    </Link>
                                </DropdownMenuItem>

                                {dbRole === "employer" && (
                                    <DropdownMenuItem asChild>
                                        <Link to="/post-job" className="cursor-pointer flex items-center text-accent">
                                            <Plus className="mr-2 h-4 w-4" />
                                            <span>Post a Job</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="cursor-pointer flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link to="/auth">
                            <Button variant={isActive("/auth") ? "secondary" : "ghost"} size="sm" className="gap-2 text-sm ml-2">
                                <User className="h-4 w-4" />
                                Account
                            </Button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;