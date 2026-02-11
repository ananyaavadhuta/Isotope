const GradientBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {/* Large gradient circle - top right */}
            <div
                className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full opacity-30 blur-[100px]"
                style={{
                    background:
                        "radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 50%, transparent 70%)",
                }}
            />

            {/* Medium gradient circle - bottom left */}
            <div
                className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full opacity-20 blur-[80px]"
                style={{
                    background:
                        "radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.2) 50%, transparent 70%)",
                }}
            />

            {/* Small accent circle - center right */}
            <div
                className="absolute right-1/4 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full opacity-15 blur-[60px]"
                style={{
                    background:
                        "radial-gradient(circle, hsl(175 80% 60%) 0%, transparent 70%)",
                }}
            />

            {/* Subtle purple accent - bottom right */}
            <div
                className="absolute bottom-1/4 right-1/3 h-[250px] w-[250px] rounded-full opacity-10 blur-[50px]"
                style={{
                    background:
                        "radial-gradient(circle, hsl(280 70% 60%) 0%, transparent 70%)",
                }}
            />

            {/* Grid overlay */}
            <div className="bg-grid absolute inset-0 opacity-20" />
        </div>
    );
};

export default GradientBackground;
