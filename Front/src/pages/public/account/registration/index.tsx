export default function RegistrationForm() {
    return (
            <div className="flex flex-col flex-grow justify-center items-center bg-white px-6 py-4 lg:px-8 box-border w-full">
                <div className="w-full max-w-3xl border  shadow-md p-8 rounded-md">
                <div className="mx-auto w-full mb-10">
                    <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                        Create a new account
                    </h1>
                </div>
                <form className="space-y-8 w-full">
                    {/* Row 1 : First & Last Name */}
                    <div className="flex gap-6 justify-center w-full">
                        <div className="w-1/2">
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="First Name"
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="lastname"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Last Name"
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Row 2 : Phone & Email */}
                    <div className="flex gap-6 justify-center w-full">
                        <div className="w-1/2">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="w-full max-w-md mx-auto">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-900 mb-2 text-center"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-32 rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
