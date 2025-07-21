import Navbar from '../layout/nav/index.tsx';
import { Footer } from './footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen max-w-8xl mx-auto overflow-x-hidden">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
