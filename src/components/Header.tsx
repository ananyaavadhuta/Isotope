import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, User, LayoutDashboard, Building2, Search, IndianRupee, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Header = () => {
    const location = useLocation();
    const [user, setUser] = useState<SupabaseUser | null>(null);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Zap className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">
                        Isotope<span className="text-destructive-foreground">tope</span>
                    </span>
                </Link>

                <nav className="flex items-center gap-1">
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
                    {user && (
                        <Link to="/matchmaking">
                            <Button variant={isActive("/matchmaking") ? "secondary" : "ghost"} size="sm" className="gap-2 text-sm">
                                <LayoutDashboard className="h-4 w-4" />
                                Matchmaking
                            </Button>
                        </Link>
                    )}
                    <Link to={user ? "/profile" : "/auth"}>
                        <Button variant={isActive("/auth") || isActive("/profile") ? "secondary" : "ghost"} size="sm" className="gap-2 text-sm">
                            <User className="h-4 w-4" />
                            {user ? "Profile" : "Account"}
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;