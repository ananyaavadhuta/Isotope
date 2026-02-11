export const Stats = () => {
    const stats = [
        { value: "10K+", label: "Active Users" },
        { value: "5K+", label: "Jobs Posted" },
        { value: "85%", label: "Match Success Rate" },
        { value: "₹50L+", label: "Salaries Placed" },
    ];

    return (
        <div className="border-y border-white/5 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
