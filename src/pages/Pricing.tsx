import { Check, IndianRupee, Zap, Building2, User, ArrowRight, Star, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GradientBackground from "@/components/GradientBackground";
import IronFilingsEffect from "@/components/IronFilingsEffect";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const employerFeatures = ["Unlimited candidate matching", "AI-powered compatibility scores", "Direct messaging with candidates", "Analytics dashboard", "Priority support", "Featured company listing", "Access to premium talent pool", "Interview scheduling tools"];
const seekerFeatures = ["AI-powered job recommendations", "Unlimited job applications", "Profile visibility boost", "Work style analysis", "Resume review feedback", "Interview preparation resources", "Salary benchmarking data", "Priority application status"];
const valueProps = [{
    icon: TrendingUp,
    title: "Access to 500+ Employers",
    description: "Connect with companies everywhere—from innovative startups to established enterprises and beyond."
}, {
    icon: Star,
    title: "Diverse Opportunities",
    description: "Whether you're seeking part-time work during studies, internships, or full-time roles, our platform covers every employment type across 20+ industries."
}, {
    icon: Shield,
    title: "Verified & Safe",
    description: "All employers undergo verification. Your data is secure, and you only connect with legitimate organisations."
}, {
    icon: Zap,
    title: "Young Adult Focus",
    description: "Tailored specifically for candidates aged 16-25. Find roles designed for fresh talent, not those requiring decades of experience."
}];
const Pricing = () => {
    return <div className="relative min-h-screen bg-background">
        <GradientBackground />
        <IronFilingsEffect />
        <Header />

        <div className="relative z-10 container mx-auto max-w-6xl px-6 pb-20 pt-24">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <IndianRupee className="h-8 w-8 text-primary" />
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                    Simple, Transparent <span className="text-gradient">Pricing</span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    Affordable plans designed for the young workforce and growing businesses.
                    Invest in your future—or in finding the perfect candidate.
                </p>
            </div>

            {/* Pricing Table */}
            <div className="mb-20 overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="w-1/3 text-lg font-semibold">Plan</TableHead>
                            <TableHead className="text-center text-lg font-semibold">
                                <div className="flex items-center justify-center gap-2">
                                    <Building2 className="h-5 w-5 text-primary" />
                                    Employers
                                </div>
                            </TableHead>
                            <TableHead className="text-center text-lg font-semibold">
                                <div className="flex items-center justify-center gap-2">
                                    <User className="h-5 w-5 text-accent" />
                                    Job Seekers
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="border-border">
                            <TableCell className="font-medium">Monthly Subscription</TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <IndianRupee className="h-4 w-4" />
                                    <span className="text-2xl font-bold">1,000</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <IndianRupee className="h-4 w-4" />
                                    <span className="text-2xl font-bold">1,000</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow className="border-border">
                            <TableCell className="font-medium">Per Job Listing</TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <IndianRupee className="h-4 w-4" />
                                    <span className="text-2xl font-bold">100</span>
                                    <span className="text-muted-foreground">/listing</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-center text-muted-foreground">
                                Not applicable
                            </TableCell>
                        </TableRow>
                        <TableRow className="border-border">
                            <TableCell className="font-medium">Total Monthly Cost</TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-muted-foreground">
                                    ₹1,000 + ₹100 × (number of listings)
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="text-sm text-muted-foreground">
                                    ₹1,000 flat rate
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            {/* Features Comparison */}
            <div className="mb-20 grid gap-8 md:grid-cols-2">
                {/* Employer Features */}
                <div className="rounded-2xl border border-primary/20 bg-card/50 p-8 backdrop-blur-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Employer Plan</h3>
                            <p className="text-sm text-muted-foreground">Everything you need to hire</p>
                        </div>
                    </div>
                    <ul className="space-y-3">
                        {employerFeatures.map((feature, index) => <li key={index} className="flex items-center gap-3">
                            <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>)}
                    </ul>
                    <Link to="/auth" className="mt-8 block">
                        <Button className="w-full gap-2 glow-primary">
                            Get Started as Employer
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Seeker Features */}
                <div className="rounded-2xl border border-accent/20 bg-card/50 p-8 backdrop-blur-sm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                            <User className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Job Seeker Plan</h3>
                            <p className="text-sm text-muted-foreground">Launch your career</p>
                        </div>
                    </div>
                    <ul className="space-y-3">
                        {seekerFeatures.map((feature, index) => <li key={index} className="flex items-center gap-3">
                            <Check className="h-5 w-5 flex-shrink-0 text-accent" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>)}
                    </ul>
                    <Link to="/auth" className="mt-8 block">
                        <Button variant="outline" className="w-full gap-2">
                            Get Started as Job Seeker
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Why It's Worth It */}
            <div className="mb-20">
                <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
                    Why Isotope Is Worth the Investment
                </h2>
                <p className="mx-auto mb-10 max-w-3xl text-center text-muted-foreground">At just ₹33/day (plus minimal listing fees for employers), Isotope delivers unparalleled value for the employment ecosystem.</p>
                <div className="grid gap-6 md:grid-cols-2">
                    {valueProps.map((prop, index) => <div key={index} className="flex gap-4 rounded-xl border border-border bg-card/30 p-6">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <prop.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="mb-2 font-semibold">{prop.title}</h3>
                            <p className="text-sm text-muted-foreground">{prop.description}</p>
                        </div>
                    </div>)}
                </div>
            </div>

            {/* Additional Value */}
            <div className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm md:p-12">
                <h2 className="mb-6 text-center text-2xl font-bold">
                    More Value for Your Money
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mb-2 text-3xl font-bold text-primary">20+</div>
                        <div className="text-muted-foreground">Industries Covered</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2 text-3xl font-bold text-primary">Worldwide</div>
                        <div className="text-muted-foreground">Coverage Across Cities</div>
                    </div>
                    <div className="text-center">
                        <div className="mb-2 text-3xl font-bold text-primary">24/7</div>
                        <div className="text-muted-foreground">Platform Access</div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-muted-foreground">
                        Whether you're a teenager exploring first jobs, a college student seeking internships,
                        or a young professional ready for full-time employment—Isotope connects you with
                        opportunities that align with your aspirations and work style.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
                <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
                <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                    Join Isotope today and take the first step towards meaningful career connections.
                </p>
                <Link to="/auth">
                    <Button size="lg" className="gap-2 glow-primary">
                        Create Your Account
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    </div>;
};
export default Pricing;