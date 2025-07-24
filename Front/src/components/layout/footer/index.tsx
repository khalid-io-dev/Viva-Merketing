import { Link } from "react-router-dom";
import SocialMedia from "../../socialMedias";

export function Footer() {
    return (
            <footer className="border-t border-gray-200 w-full bg-white">
            <div className="w-full h-32 mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between sm:grid grid-cols-2">
                <span className="text-sm text-gray-500 sm:text-center">
                    © 2025 <span className="text-emerald-600 font-semibold">Arganisme Cosmetics™</span>. All Rights Reserved.
                </span>
                <SocialMedia />

                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    <li>
                        <Link to="/about" className="hover:text-emerald-600 me-4 md:me-6">About</Link>
                    </li>
                    <li>
                        <Link to="/privacy" className="hover:text-emerald-600 me-4 md:me-6">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="/blogs" className="hover:text-emerald-600 me-4 md:me-6">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-emerald-600 me-4 md:me-6">Contact</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
