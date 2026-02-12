// MOCK CLIENT FOR STATIC MODE
// This allows the website to function (routing, UI) without a real backend connection.

const mockSupabase = {
    auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        signInWithPassword: async () => ({ data: { user: { id: "mock-user-id" }, session: { access_token: "mock-token" } }, error: null }),
        signUp: async () => ({ data: { user: { id: "mock-user-id" }, session: { access_token: "mock-token" } }, error: null }),
        signOut: async () => ({ error: null }),
    },
    from: () => ({
        select: () => ({
            eq: () => ({
                single: async () => ({ data: {}, error: null }),
                maybeSingle: async () => ({ data: {}, error: null }),
                order: () => ({ data: [], error: null }),
            }),
            order: () => ({ data: [], error: null }),
            insert: async () => ({ data: {}, error: null }),
            update: async () => ({ data: {}, error: null }),
            delete: async () => ({ data: {}, error: null }),
            data: [],
            error: null
        }),
    }),
    functions: {
        invoke: async () => ({ data: {}, error: null })
    }
} as any;

export const supabase = mockSupabase;