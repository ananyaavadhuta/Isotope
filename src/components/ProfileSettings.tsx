import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Sun, Moon, Unlink, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/ThemeProvider";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfileSettingsProps {
    user: SupabaseUser;
}

const ProfileSettings = ({ user }: ProfileSettingsProps) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { theme, setTheme } = useTheme();
    const [disconnecting, setDisconnecting] = useState(false);

    const isGoogleLinked = user.app_metadata?.providers?.includes("google") ||
        user.app_metadata?.provider === "google";

    const handleDisconnectGoogle = async () => {
        setDisconnecting(true);
        try {
            // Unlink Google identity
            const googleIdentity = user.identities?.find(
                (id) => id.provider === "google"
            );
            if (googleIdentity) {
                const { error } = await supabase.auth.unlinkIdentity(googleIdentity);
                if (error) throw error;
                toast({
                    title: "Google account disconnected",
                    description: "Your Google account has been unlinked from your profile.",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.message || "Failed to disconnect Google account.",
                variant: "destructive",
            });
        } finally {
            setDisconnecting(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            // Sign out and inform user
            await supabase.auth.signOut();
            toast({
                title: "Account deletion requested",
                description: "Please contact support to complete account deletion.",
            });
            navigate("/");
        } catch {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Settings className="h-5 w-5 text-primary" />
                Settings
            </h3>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                        <Moon className="h-5 w-5 text-muted-foreground" />
                    ) : (
                        <Sun className="h-5 w-5 text-accent" />
                    )}
                    <div>
                        <Label className="text-sm font-medium">Appearance</Label>
                        <p className="text-xs text-muted-foreground">
                            {theme === "dark" ? "Dark mode" : "Light mode"}
                        </p>
                    </div>
                </div>
                <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
            </div>

            {/* Disconnect Google */}
            {isGoogleLinked && (
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-center gap-3">
                        <Unlink className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <Label className="text-sm font-medium">Google Account</Label>
                            <p className="text-xs text-muted-foreground">
                                Connected via Google sign-in
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDisconnectGoogle}
                        disabled={disconnecting}
                        className="gap-1.5"
                    >
                        <Unlink className="h-3.5 w-3.5" />
                        {disconnecting ? "Disconnecting..." : "Disconnect"}
                    </Button>
                </div>
            )}

            {/* Delete Account */}
            <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                        <Label className="text-sm font-medium text-destructive">
                            Delete Account
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            Permanently remove your account and all data
                        </p>
                    </div>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="gap-1.5">
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove all associated data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteAccount}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Yes, delete my account
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default ProfileSettings;
