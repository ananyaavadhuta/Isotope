import { Zap } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="py-12 border-t border-white/10 bg-isotope-dark">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <div className="bg-isotope-teal p-1 rounded-full">
                        <Zap className="w-3 h-3 text-black fill-current" />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-white">Isotope</span>
                    <span className="text-gray-600 mx-2">•</span>
                    <span className="text-sm text-gray-500">Built for You</span>
                </div>

                <div className="text-sm text-gray-600">
                    © 2026 Isotope. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
