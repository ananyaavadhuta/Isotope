import { supabase } from "@/integrations/supabase/client";
import Provider  from "@supabase/supabase-js";

export const lovable = {
    auth: {
        signInWithOAuth: async (provider: Provider, options?: { redirect_uri?: string }) => {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: options?.redirect_uri,
                }
            });
            return { error };
        }
    }
};
