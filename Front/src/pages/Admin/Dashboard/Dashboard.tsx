import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {authService} from "../../../services/AuthService.tsx";

const AdminDashboard: React.FC<{ children: React.ReactNode}> = ({children}) => {

    const [errors, setErrors] = useState<Record<string, string | string[]>>({});

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            setErrors({ general: "Please log in to access this page" });
        } else if (!authService.isAdmin()) {
            setErrors({ general: "Unauthorized: Admin access required" });
        }
    }, []);


    return (
        <div className="flex h-screen font-sans bg-gradient-to-r from-indigo-50 to-white">


            {/* Sidebar */}
            <aside className="w-64 text-gray-100 flex flex-col p-6 min-h-screen border border-gray-350 shadow">
                <nav className="flex flex-col space-y-4 ">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-300 text-black border border-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-arrow-bar-left"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"
                            />
                        </svg>
                        <span>Revenir au site web</span>
                    </Link>

                    <Link
                        to="/admin/dashboard/products"
                        className="block px-4 py-3 font-mono rounded hover:bg-gray-100 text-black"
                    >
                        Product management
                    </Link>

                    <Link
                        to="/admin/dashboard/users"
                        className="block px-4 py-3 font-mono rounded hover:bg-gray-100 text-black"
                    >
                        Users management
                    </Link>

                    <Link
                        to="/admin/dashboard/orders"
                        className="block px-4 py-3 font-mono rounded hover:bg-gray-100 text-black"
                    >
                        Orders management
                    </Link>
                </nav>
            </aside>


            {/* Main content */}
            <main className="flex-1 bg-gray-100 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
                {/* Error Message */}
                {errors.general && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 text-red-700 rounded-xl shadow-lg backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {Array.isArray(errors.general) ? errors.general[0] : errors.general}
                        </div>
                    </div>
                )}

                {!errors.general && (children) }
            </main>
        </div>
    );
};

export default AdminDashboard;
