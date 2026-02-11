import { Zap, Building2, Search, IndianRupee, Megaphone, User } from "lucide-react";

export const Header = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-isotope-dark/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-isotope-teal p-1.5 rounded-full">
                        <Zap className="w-5 h-5 text-black fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Isotope</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <a href="#" className="flex items-center gap-2 hover:text-isotope-teal transition-colors">
                        <Building2 className="w-4 h-4" />
                        <span>For Employers</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 hover:text-isotope-teal transition-colors">
                        <Search className="w-4 h-4" />
                        <span>For Job Seekers</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 hover:text-isotope-teal transition-colors">
                        <IndianRupee className="w-4 h-4" />
                        <span>Pricing</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 hover:text-isotope-teal transition-colors">
                        <Megaphone className="w-4 h-4" />
                        <span>Ambassadors</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 hover:text-isotope-teal transition-colors">
                        <User className="w-4 h-4" />
                        <span>Account</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};
