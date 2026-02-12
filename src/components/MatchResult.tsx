import { Zap, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MatchResult = ({
    score,
    summary,
    friction,
    verdict,
}: {
    score: number;
    summary: string;
    friction: string;
    verdict: string;
}) => {
    const getScoreColor = () => {
        if (score >= 80) return "text-primary";
        if (score >= 50) return "text-accent";
        return "text-destructive";
    };

    return (
        <div className="animate-slide-up space-y-6 rounded-xl border border-border bg-card p-8">
            {/* Score */}
            <div className="text-center">
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    Compatibility Score
                </p>
                <p className={`font-mono text-6xl font-bold ${getScoreColor()}`}>
                    {score}%
                </p>
            </div>

            {/* Verdict */}
            <div className="rounded-lg bg-muted p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Match Title
                </p>
                <p className="text-xl font-bold text-gradient">"{verdict}"</p>
            </div>

            {/* Summary */}
            <div>
                <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        The Synergy
                    </p>
                </div>
                <p className="text-secondary-foreground leading-relaxed">{summary}</p>
            </div>

            {/* Friction */}
            <div>
                <div className="mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-accent" />
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Potential Friction
                    </p>
                </div>
                <p className="text-secondary-foreground leading-relaxed">{friction}</p>
            </div>
        </div>
    );
};

export default MatchResult;
