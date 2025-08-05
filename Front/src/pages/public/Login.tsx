import {Link, useNavigate} from "react-router-dom";
import img from "../../../ressources/images/undraw_login_weas.svg"
import {useEffect, useState} from "react";
import {authService} from "../../services/AuthService.tsx";

export default function LoginForm() {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    useEffect(() => {
        if (authService.isAuthenticated()) {
            setLogged(true)
            setErrors({ general: "User already logged." });
            setTimeout(() => {
                navigate("/");
                setLogged(false)
                setErrors({});
            }, 5000)
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const response = await authService.login({
                email: formData.email,
                password: formData.password,
            });
            console.log("Login successful:", response);
            navigate("/");
        } catch (err: any) {
            try {
                const errorData = JSON.parse(err.message);
                setErrors(errorData);
            } catch {
                setErrors({ general: err.message || "Login failed. Please check your credentials." });
            }
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="grid-rows-1 lg:grid grid-cols-2 gap-6 px-6 lg:px-8 h-full w-full py-12">
            <div className="sm:mx-auto sm:w-full mt-6 w-full max-w-3xl pl-52  items-center">
                {errors.general && (
                    <div className="mb-4 text-red-600 text-center">{errors.general}</div>
                )}
                <div hidden={logged}>
                <div className="pb-10"><h1 className="text-4xl text-black font-mono">Sign up Here !</h1></div>

                <form onSubmit={handleSubmit} method="POST" className="space-y-6 w-full">
                    <div>
                        <label htmlFor="email" className="block text-2xl md:text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Email address"
                                disabled={loading}
                                required
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                            {errors.email && (
                                <div className="mt-1 text-red-600 text-sm">{errors.email}</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-2xl md:text-sm font-medium text-gray-900">
                                Password
                            </label>
                            {/*<div className="text-sm">
                                <a href="#" className="font-semibold text-2xl md:text-sm text-emerald-600 hover:text-emerald-500">
                                    Forgot password?
                                </a>
                            </div>*/}
                        </div>
                        <div className="mt-2.5">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                placeholder="Password"
                                required
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                disabled={loading}
                            />
                            {errors.password && (
                                <div className="mt-1 text-red-600 text-sm">{errors.password}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="block rounded-md w-40 bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-2xl md:text-sm text-gray-600">
                    Not a member?{" "}
                    <Link to="/registration" className="text-emerald-600 hover:text-emerald-700">
                        Click here to register!
                    </Link>
                </p>
                </div>

            </div>
            <img
                src={img}
                className="w-full h-full"
                alt={"orga partner"}
                hidden={logged}
            />
        </div>
    );
}