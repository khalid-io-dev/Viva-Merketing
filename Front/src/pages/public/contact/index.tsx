export default function Contact() {
    return (
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex flex-col justify-center">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Contact Us
                </h2>
                <p className="mt-4 text-lg leading-7 text-gray-600">
                    Have any questions? We’d love to hear from you.
                </p>
            </div>

            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl space-y-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-900"
                        >
                            First name
                        </label>
                        <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="John"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Last name
                        </label>
                        <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Doe"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="john.doe@example.com"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="phone-number"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Phone number
                        </label>
                        <input
                            type="tel"
                            name="phone-number"
                            id="phone-number"
                            placeholder="+212-675435234"
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="Your message here..."
                        ></textarea>
                    </div>
                </div>

                <div className="flex items-center gap-x-3">
                    <input
                        id="agree-to-policies"
                        name="agree-to-policies"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                        htmlFor="agree-to-policies"
                        className="text-sm text-gray-600"
                    >
                        I agree to the{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:underline">
                            privacy policy
                        </a>
                        .
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                >
                    Let's Talk
                </button>
            </form>
        </div>
    );
}
