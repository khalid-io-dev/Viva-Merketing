import Navbar from '../layout/nav/index.tsx';
import { Footer } from './footer';


const isHomePage = location.pathname === '/';
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (

    <div className="flex flex-col min-h-screen max-w-8xl mx-auto overflow-x-hidden bg-gray-50">
        <Navbar />
        <main className={isHomePage ? "flex flex-col flex-grow w-full" : "flex flex-col flex-grow pt-20 w-full"}>
            {children}
        </main>
        <Footer />
    </div>
);


export default Layout;
