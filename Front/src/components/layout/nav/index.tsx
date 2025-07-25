import { Link } from 'react-router-dom';
import imga from "../ARGAnisme.webp"

export default function Nav() {
    return (
        <nav id="navbar" className= { "bg-gray-50 fixed h-[90px] w-full z-10 top-0 start-0 border-b border-gray-200 uppercase font-sans"}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        src={imga}
                        className="h-auto sm:h-16 " // garde la hauteur responsive, mais laisse la largeur naturelle
                        alt="arganisme Cosmetics Logo"
                    />
                </Link>
                <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500
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

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg
                                    md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0
                                   md:bg-transparent">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-black rounded-sm hover:text-emerald-700 md:p-0"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <Link
                            to="/#services"
                            className="block py-2 px-3 text-black rounded-sm hover:text-emerald-700 md:p-0"
                            aria-current="page"
                        >
                            <a href="#services" className="block py-2 px-3 text-black rounded-sm hover:text-emerald-700 md:p-0">Services</a>
                        </Link>
                        <li>
                            <Link
                                to="/products"
                                className="block py-2 px-3 text-black rounded-sm hover:text-emerald-700 md:p-0"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="block py-2 px-3 text-black rounded-sm hover:text-emerald-700 md:p-0"
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                <Link
                                    to="/login"
                                    className="block py-2 px-3 text-black rounded-sm hover:text-emerald-700 md:p-0"
                                >
                                    Log in
                                </Link>
                            </div>
                        </li>
                        <li>
                            <Link
                                to="/detail"
                                className="block py-2 px-3 text-black rounded-sm hover:text-emerald-700 md:p-0"
                            >
                                Detail
                            </Link>
                        </li>
                        <li className="md:pl-10">
                            <div className="flex flex-col md:order-2 space-y-8 items-center md:space-x-0 rtl:space-x-reverse">
                                <Link
                                    to="/cart"
                                    className="block py-2 px-3 text-black rounded-sm hover:text-emerald-700 md:p-0"
                                >
                                    Cart (0)
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}