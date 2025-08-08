import {Link, useNavigate} from "react-router-dom";
import {authService} from "../../services/AuthService.tsx";
import {useEffect, useState} from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const admin = authService.isAdmin();
    const connected = authService.isAuthenticated();
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            console.log("Log out successful:", await authService.logout());
            navigate("/login")
            await authService.logout()
        } catch (err : any) {
            try {
                const errorData = JSON.parse(err.message);
                setErrors(errorData);
            } catch {
                setErrors({ general: err.message || "Logout failed." });
            }
            console.error("Logout error:", err);
        }
    };

    useEffect(() => {
        if (!authService.isAuthenticated()){
            setErrors({ general: "Please log in to access this page" });
        }
    }, []);


    return (
        <div className="flex flex-row h-[1OOpx] bg-gradient-to-br ">
            {/* Section Informations Menu at the left */}
            { connected &&
            <div className=" w-[450px] text-black text-xl p-10  font-mono">
                <div className="flex flex-col gap-10  p-10 items-center">
                    <Link to="/profile"><button className={"text-red-800 font-bold"}>Overview</button></Link>
                    {!admin ?
                        (<Link to="/orders"><button>{"My Orders"}</button></Link>) :
                        (<Link to="/admin/dashboard/products"><button>{"Dashboard"}</button></Link>
                )}

                    <button onClick={handleLogout} className="block bg-red-700 w-24 rounded-xl  hover:bg-red-900">
                        Log out</button>

                </div>
            </div>
            }
            {/* Section Current information page */}
            <div className="flex flex-col    items-center justify-center w-full ">

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

                {authService.isAuthenticated() &&
                    children}
            </div>
        </div>
    );
};

export default Layout;