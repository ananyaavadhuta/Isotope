
export const Steps = () => {
    const steps = [
        {
            number: "01",
            title: "Create Your Profile",
            description: "Sign up and tell us about your skills, experience, and what kind of work environment you thrive in.",
        },
        {
            number: "02",
            title: "AI-Powered Analysis",
            description: "Our intelligent system analyzes your profile across technical skills, work style, and cultural preferences.",
        },
        {
            number: "03",
            title: "Get Matched",
            description: "Receive personalized job recommendations and compatibility scores for roles that truly fit you.",
        },
        {
            number: "04",
            title: "Connect & Grow",
            description: "Apply directly, connect with employers, and kickstart your career journey.",
        },
    ];

    return (
        <section className="py-24 bg-isotope-dark relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-isotope-teal/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Your Journey to the Perfect Match</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A simple, transparent process designed to get you hired faster.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-isotope-teal/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] group">
                            <div className="text-5xl font-bold text-white/5 mb-6 opacity-30 select-none transition-all duration-300 group-hover:opacity-10 group-hover:text-isotope-teal">
                                {step.number}
                            </div>
                            <div className="absolute top-6 left-6 text-isotope-teal text-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                {step.number}
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
