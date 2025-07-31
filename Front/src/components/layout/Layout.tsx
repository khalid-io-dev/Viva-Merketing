import Navbar from './Nav.tsx';
import { Footer } from './footer/Footer.tsx';
import Presentation from "../HomePage/presentation";
import { useLocation } from 'react-router-dom';
import ScrollToTop from "../tools/animation/scrollToTop";
import ScrollToTopAuto from "../tools/animation/ScrollToTopAuto";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen max-w-8xl mx-auto overflow-x-hidden bg-white">
            <ScrollToTopAuto />
            <Navbar />
            {isHomePage && <Presentation />}
            <main className={isHomePage ? "flex flex-col flex-grow w-full h-full" : "flex flex-col flex-grow pt-24 w-full h-full"}>
                    {children}
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default Layout;
