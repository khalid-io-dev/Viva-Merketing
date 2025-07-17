export default function RegistrationForm() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16">

            <div className="mx-auto w-full max-w-xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Create a new account
                    </h1>
                </div>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Full Name"
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-900 mb-2">
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-4">
                            Address Details
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input
                                type="text"
                                id="area"
                                name="area"
                                placeholder="Enter area"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Enter city"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Enter state"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                            <input
                                type="text"
                                id="post-code"
                                name="post-code"
                                placeholder="Post Code"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 border border-black outline-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
