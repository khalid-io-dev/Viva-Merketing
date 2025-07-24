
const SocialMedia= () => {
    return (
        <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1 hidden md:flex">
            <ul className="mb-4 -ml-2 flex md:order-1 md:mb-0">


                <li>
                    <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-700"
                        aria-label="Instagram" href="https://www.instagram.com/arganisme/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round"
                             strokeLinejoin="round" className="h-5 w-5">
                            <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                            <path d="M16.5 7.5l0 .01"></path>
                        </svg>
                    </a>
                </li>

                <li>
                    <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-700"
                        aria-label="Facebook" href="https://www.facebook.com/ARGANOILofARGANisme/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round"
                             strokeLinejoin="round" className="h-5 w-5">
                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                        </svg>
                    </a>
                </li>


            </ul>

        </div>
    )
}

export default SocialMedia;
