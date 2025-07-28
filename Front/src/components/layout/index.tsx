import Navbar from '../layout/nav/index.tsx';
import { Footer } from './footer';
import Presentation from "../HomePage/presentation";
import { useLocation } from 'react-router-dom';
import PageTransition from "../pageTransition";
import ScrollToTop from "../tools/scrollToTop";
import ScrollToTopAuto from "../tools/ScrollToTopAuto"; // ← importe ceci

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen max-w-8xl mx-auto overflow-x-hidden bg-white">
            <ScrollToTopAuto />
            <Navbar />
            {isHomePage && <Presentation />}
            <main className={isHomePage ? "flex flex-col flex-grow w-full" : "flex flex-col flex-grow pt-24 w-full"}>
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default Layout;
