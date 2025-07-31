import {Link, useLocation, useNavigate} from 'react-router-dom';
import imga from "../ARGAnisme.webp";
import imga2 from "../../../../favicon2.ico";
import { useEffect, useState } from "react";
import {authService} from "../../../services/AuthService.tsx";


export default function Nav() {
    const connected = authService.isAuthenticated();
    const admin = authService.isAdmin();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const navigate = useNavigate();
    const [transparent, setTransparent] = useState(true);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleLogout = async (e: React.FormEvent) => {
        try {
            console.log("Log out successful:", await authService.logout());
            navigate("/");
        } catch (err: any) {
            try {
                const errorData = JSON.parse(err.message);
                setErrors(errorData);
            } catch {
                setErrors({ general: err.message || "Logout failed." });
            }
            console.error("Logout error:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const handleScroll = () => {
            setTransparent(window.scrollY === 0);
        };


        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            id="navbar"
            className={`fixed h-[80px] w-full z-10 top-0 start-0 uppercase font-sans transition-colors duration-500 ease-in-out pb-4 ${
                isHomePage && transparent
                    ? "bg-transparent text-white"
                    : "bg-white text-black"
            }`}
        >
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src={isHomePage && transparent ? imga2 : imga}
                        className="h-auto sm:h-16"
                        alt="arganisme Cosmetics Logo"
                    />
                </Link>

                <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm
                               rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2
                               focus:ring-gray-200"
                    aria-controls="navbar-sticky"
                    aria-expanded="true"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div
                    className={`items-start  justify-between hidden w-full md:flex md:w-auto md:order-1 transition-colors duration-500 ${
                        isHomePage && transparent ? "text-white " : "text-black bg-gray-50 md:bg-transparent sm:rounded-b"
                    }`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg
                                   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link to="/" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                products
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                Contact
                            </Link>
                        </li>

                        {admin ? <li>
                            <Link to="/admin/products" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                Admin
                            </Link>
                        </li> : null
                        }
                        { connected ?
                            <li>
                            <Link to="/" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                Profile
                            </Link>
                        </li>
                         :
                            <li>
                                <Link to="/login" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                    Log in
                                </Link>
                            </li>
                        }
                        {connected ?
                            <li>
                                <button onClick={handleLogout} className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                    LOGOUT
                                </button>
                            </li> : null}
                        <li className="md:pl-10">
                            <Link to="/cart" className="block py-2 px-3 rounded-sm hover:text-emerald-700 md:p-0">
                                Cart (0)
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
