export default function Contact(){
    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-w-52 min-h-screen">
            <div aria-hidden="true"
                 className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"></div>
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Contact Us</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Any questions ? Contacts us.</p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">First
                            name</label>
                        <div className="mt-2.5">
                            <input id="first-name" type="text" name="first-name" autoComplete="given-name"
                                   className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 border border-black"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">Last
                            name</label>
                        <div className="mt-2.5">
                            <input id="last-name" type="text" name="last-name" autoComplete="family-name"
                                   className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline--300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 border border-black"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                        <div className="mt-2.5">
                            <input id="email" type="email" name="email" autoComplete="email"
                                   className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 border border-black"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">Phone
                            number</label>
                        <div className="mt-2.5">
                            <div
                                className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                </div>
                                <input id="phone-number" type="tel" name="phone-number" placeholder="+212-675435234"
                                       className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 border border-black"/>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">Message</label>
                        <div className="mt-2.5">
                            <textarea id="message" name="message"
                                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 border border-black"></textarea>
                        </div>
                    </div>
                    <div className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            <div
                                className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
                                <span
                                    className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
                                <input id="agree-to-policies" type="checkbox" name="agree-to-policies"
                                       aria-label="Agree to policies"
                                       className="absolute inset-0 appearance-none focus:outline-hidden"/>
                            </div>
                        </div>
                        <label htmlFor="agree-to-policies" className="text-sm/6 text-gray-600">
                            By selecting this, you agree to our
                            <a href="#" className="font-semibold whitespace-nowrap text-indigo-600"> privacy policy</a>.
                        </label>
                    </div>
                </div>
                <div className="mt-10">
                    <button type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Let's
                        talk
                    </button>
                </div>
            </form>
        </div>

    )

}