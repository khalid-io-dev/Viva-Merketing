import { Link } from "react-router-dom";

export default function LoginForm() {
    return (
        <div className="flex flex-col flex-grow justify-center items-center bg-white px-6 py-4 lg:px-8 box-border w-full">
            <div className="sm:mx-auto sm:w-full">
                <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h1>
            </div>

            <div className="sm:mx-auto sm:w-full mt-6 w-full max-w-3xl">
                <form action="http://127.0.0.1:8000/login" method="POST" className="space-y-6 w-full">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
                                required
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-600">
                    Not a member?{" "}
                    <Link to="/registration" className="text-indigo-600 hover:text-indigo-700">
                        Click here to register!
                    </Link>
                </p>
            </div>
        </div>
    );
}
