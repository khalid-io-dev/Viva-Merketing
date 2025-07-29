import { Link } from "react-router-dom";
import img from "../../../../../ressources/images/undraw_login_weas.svg"

export default function LoginForm() {
    return (
        <div className="grid-rows-1 lg:grid grid-cols-2 gap-6 px-6 lg:px-8 h-full w-full py-12">
            <div className="sm:mx-auto sm:w-full mt-6 w-full max-w-3xl pl-52  items-center">
                <div className="pb-10"><h1 className="text-4xl text-black font-mono">Sign up Here !</h1></div>
                <form action="#" method="POST" className="space-y-6 w-full">
                    <div>
                        <label htmlFor="email" className="block text-2xl md:text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Email address"
                                required
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-2xl md:text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-2xl md:text-sm text-emerald-600 hover:text-emerald-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2.5">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                required
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="block rounded-md w-40 bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                        >
                            Sign in
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
            <img
                src={img}
                className="w-full h-full"
                alt={"orga partner"}
            />
        </div>
    );
}