import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IndianRupee, CreditCard, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import MouseFollowLight from "@/components/MouseFollowLight";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                navigate("/auth");
                return;
            }

            // Get selected plan from state or default
            const params = new URLSearchParams(location.search);
            const selectedPlan = params.get("plan") || "Basic Seeker Plan";
            const selectedPrice = params.get("price") || "1,000";

            setPlan(selectedPlan);
            setPrice(selectedPrice);
            setLoading(false);
        };
        checkAuth();
    }, [navigate, location]);

    const handlePayment = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const { error } = await (supabase
                .from("profiles")
                .update({ pricing_plan: plan } as any) as any)
                .eq("id", session.user.id);

            if (error) {
                toast({
                    title: "Error",
                    description: "Failed to update subscription. Please try again.",
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Coming Soon",
                description: "The payment gateway is being integrated. We've activated your access for now!",
            });

            // Redirect to profile or home after a short delay
            setTimeout(() => {
                navigate("/profile");
            }, 2000);
        }
    };

    if (loading) return null;

    return (
        <div className="relative min-h-screen bg-background">
            <GradientBackground />
            <MouseFollowLight />
            <Header />

            <div className="relative z-10 container mx-auto max-w-2xl px-6 pb-20 pt-24">
                <div className="mb-12 text-center">
                    <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
                        Complete Your <span className="text-gradient">Subscription</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Unlock premium features and start your journey with Isotope
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm shadow-xl">
                    <div className="mb-8 flex items-center justify-between rounded-xl bg-muted/30 p-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Plan Selected</p>
                            <h3 className="text-xl font-bold">{plan}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Amount</p>
                            <h3 className="text-xl font-bold flex items-center justify-end gap-1">
                                <IndianRupee className="h-5 w-5" />
                                {price}/mo
                            </h3>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-2 font-semibold">
                                <CreditCard className="h-5 w-5 text-primary" />
                                Payment Method
                            </h4>
                            <div className="grid gap-3">
                                <div className="flex items-center gap-3 rounded-lg border border-primary bg-primary/5 p-4">
                                    <div className="h-4 w-4 rounded-full border-4 border-primary" />
                                    <div className="flex flex-1 items-center justify-between">
                                        <span className="font-medium">UPI / Credit Card / Debit Card</span>
                                        <div className="flex gap-2">
                                            <div className="h-6 w-10 rounded bg-muted/50" />
                                            <div className="h-6 w-10 rounded bg-muted/50" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-xl bg-primary/5 p-6">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm font-medium">Secure Payment</p>
                                    <p className="text-xs text-muted-foreground">Your transaction is encrypted and secured by industry-standard protocols.</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 text-lg font-bold gap-2 glow-primary"
                            onClick={handlePayment}
                        >
                            <Zap className="h-5 w-5 fill-current" />
                            Securely Pay ₹{price}
                            <ArrowRight className="h-5 w-5" />
                        </Button>

                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mt-4">
                            <CheckCircle2 className="h-3 w-3" />
                            Powered by Isotope Checkout
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate("/pricing")}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                    >
                        Change subscription plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
