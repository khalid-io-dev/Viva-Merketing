import img from "../../../../../ressources/images/undraw_web-shopping_xd5k.svg";

export default function RegistrationForm() {
    return (

        <div className="grid-rows-1 lg:grid grid-cols-2 gap-6 px-6 lg:px-8 h-full w-full py-12">
                <div className=" w-full md:max-w-3xl p-8 rounded-md">
                <div className="mx-auto w-full mb-10">
                    <h1 className="text-center text-5xl md:text-2xl font-bold tracking-tight text-gray-900">
                        Create a new account
                    </h1>
                </div>
                <form className="space-y-8 w-full">
                    {/* Row 1 : First & Last Name */}
                    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                        <div className="md:w-1/2">
                            <label
                                htmlFor="firstname"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="First Name"
                                className="mt-2 md:h-auto block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <label
                                htmlFor="lastname"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Last Name"
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Row 2 : Phone & Email */}
                    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                        <div className="md:w-1/2">
                            <label
                                htmlFor="phone"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <label
                                htmlFor="email"
                                className="block text-2xl md:text-sm font-medium text-gray-900 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="w-full max-w-md mx-auto">
                        <label
                            htmlFor="password"
                            className="block text-2xl md:text-sm font-medium text-gray-900 mb-2 text-center"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full h-full md:w-32 rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <img
                src={img}
                className="w-full h-full"
                alt={"orga partner"}
            />

        </div>
    );
}
