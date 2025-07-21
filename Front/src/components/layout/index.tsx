import Navbar from '../layout/nav/index.tsx';
import { Footer } from './footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-col min-h-screen max-w-8xl mx-auto overflow-x-hidden">
        <Navbar />
        <main className="flex flex-col flex-grow pt-24 w-full">
            {children}
        </main>
        <Footer />
    </div>
);


export default Layout;
