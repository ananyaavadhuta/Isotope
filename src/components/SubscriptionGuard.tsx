import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionGuardProps {
    children: React.ReactNode;
}

const SubscriptionGuard = ({ children }: SubscriptionGuardProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [hasSubscription, setHasSubscription] = useState(false);

    useEffect(() => {
        const checkSubscription = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                navigate("/auth");
                return;
            }

            const { data: profile } = await supabase
                .from("profiles")
                .select("pricing_plan")
                .eq("id", session.user.id)
                .returns<any>()
                .single();

            // For now, any plan name counts as "paid" since they can select it via the payment flow
            if (profile && (profile as any).pricing_plan) {
                setHasSubscription(true);
            } else {
                navigate("/pricing");
            }
            setLoading(false);
        };

        checkSubscription();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return hasSubscription ? <>{children}</> : null;
};

export default SubscriptionGuard;
