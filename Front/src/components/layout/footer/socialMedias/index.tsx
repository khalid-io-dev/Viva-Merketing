
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
                <li>
                    <a
                        className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-700"
                        aria-label="Locate" href="https://www.google.com/maps/place/Arganisme+Cosmetics+sarl/@31.581479,-8.0554702,17.22z/data=!4m10!1m2!2m1!1sLot+Maatallah,+Berradi+II+M'Hamid+Marrakesh+40000,+Maroc!3m6!1s0xdafef218aab70b3:0xe80d903730a8befc!8m2!3d31.581614!4d-8.0539082!15sCjhMb3QgTWFhdGFsbGFoLCBCZXJyYWRpIElJIE0nSGFtaWQgTWFycmFrZXNoIDQwMDAwLCBNYXJvY1o4IjZsb3QgbWFhdGFsbGFoIGJlcnJhZGkgaWkgbSBoYW1pZCBtYXJyYWtlc2ggNDAwMDAgbWFyb2OSARRjb3NtZXRpY3Nfd2hvbGVzYWxlcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VONmFDMDJiV2RCUlJBQqoBaBABKgciA2xvdCgEMh8QASIbkV2fgwYY6RkVRMfy5Em6KApKU8G0z3gF82sRMjoQAiI2bG90IG1hYXRhbGxhaCBiZXJyYWRpIGlpIG0gaGFtaWQgbWFycmFrZXNoIDQwMDAwIG1hcm9j4AEA-gEFCKQBEEs!16s%2Fg%2F11fskp8y24?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                        </svg>
                    </a>
                </li>


            </ul>

        </div>
    )
}

export default SocialMedia;
