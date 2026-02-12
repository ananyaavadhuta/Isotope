
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import { Footer } from "./components/Footer";
import IronFilingsEffect from "./components/IronFilingsEffect";
import MouseFollowLight from "./components/MouseFollowLight";

const Layout = () => {
    return (
        <div className="min-h-screen bg-isotope-dark font-sans text-foreground selection:bg-isotope-teal selection:text-isotope-dark overflow-x-hidden relative">
            <IronFilingsEffect />
            <MouseFollowLight />
            <Header />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
