export default function Contact() {
    return (
        <div className="flex flex-col flex-grow justify-center items-center bg-gray-50 px-6 py-4 lg:px-8 box-border w-full">
            <div className=" mx-auto max-w-7xl w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Contact Us
                    </h2>
                    <p className="mt-4 text-lg leading-7 text-gray-600">
                        Have any questions? We’d love to hear from you.
                    </p>
                </div>

                <div className="ml-40 grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* FORMULAIRE À GAUCHE */}
                    <form action="#" method="POST" className="space-y-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    placeholder="John"
                                />
                            </div>

                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Doe"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    placeholder="john.doe@example.com"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-900">
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    name="phone-number"
                                    id="phone-number"
                                    placeholder="+212-675435234"
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full rounded-md bg-emerald-600 px-4 py-3 text-white font-semibold shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
                        >
                            Let's Talk
                        </button>
                    </form>

                    {/* INFOS À DROITE */}
                    <div className="space-y-6 text-gray-700">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Our Office</h3>
                            <p>Lot Maatallah, Berradi II M'Hamid<br />Marrakesh 40000, Maroc</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                            <p>+212 6 51 92 53 98</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                            <p>contact@arganisme.com</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Working Hours</h3>
                            <p>Monday – Saturday: 9h – 17h</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
