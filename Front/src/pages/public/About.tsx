// Exemple en React, mais tu peux facilement adapter en HTML pur.

import Organisations from "../../components/HomePage/organisations";
import WhyUs from "../../components/HomePage/WhyUs";

export default function AboutUs() {
    const desc1 = "Arganisme is the first distributor of argan oil which was founded in 1976.\n" +
        "Since 2005 Arganisme has set up a production line and is the first manufacturer and wholesaler of argan oil worldwide. To provide our customers with an excellent service worldwide, Arganisme has moved its headquarters to Brussels, Belgium in January 2016."

    const desc2 = "We offer a wide range of skincare items which are specifically proposed for the effectual function. This plant helps us in developing the products that could moisturize, nourish and heal your skin in all natural ways. To counter the harsh affects of environment and pollution on your skin, this Argan oil skin care cream is the best one to have. Using its moisturizer twice a day is very good for the skin and hydrates it too. The great fact about this oil is that it overcomes the aging affects too. Some of the well known products are:"

    return (
        <div id="about" className=" bg-gray-50 text-gray-800">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {/* Section Intro */}
                <section className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-semibold mb-4">ABOUT US</h2>
                    <p className="text-2xl  font-thin text-red-700 ">
                        Founded in Essouira Morocco, Arganisme company’sprimary objective
                        was to service to all size of companies.
                    </p>
                </section>

                {/* Section Mission */}
                <section className="bg-white rounded-lg shadow p-8">
                    <p className="text-gray-700 leading-relaxed font-normal text-xl">
                        {desc1}
                    </p>
                </section>


                {/* Section Values */}
                <section className="bg-white rounded-lg shadow p-8">
                    <h3 className="text-2xl font-semibold mb-4" id="services">Our products categories</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Argan Oil (organic)</li>
                        <li>Prickly Pear Seed Oil (organic)</li>
                        <li>Pure Rose water</li>
                        <li>Shampoos</li>
                        <li>Soaps</li>
                        <li>Hair masks</li>
                        <li>Nutri night cream</li>
                        <li>Creams</li>
                    </ul>
                </section>
            </main>

            <WhyUs />
            <Organisations/>

        </div>
    );
}
