// Exemple en React, mais tu peux facilement adapter en HTML pur.

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">About Us</h1>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {/* Section Intro */}
                <section className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-semibold mb-4">Who We Are</h2>
                    <p className="text-lg text-gray-600">
                        We are Arganisme Cosmetics, dedicated to providing natural and high-quality cosmetic products made from argan oil. Our passion is to help you feel confident and beautiful every day.
                    </p>
                </section>

                {/* Section Mission */}
                <section className="bg-white rounded-lg shadow p-8">
                    <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Our mission is to blend tradition with innovation to deliver effective skincare products that are environmentally friendly and ethically sourced. We strive to empower our customers by offering transparency and quality in every bottle.
                    </p>
                </section>

                {/* Section Team */}
                <section>
                    <h3 className="text-2xl font-semibold mb-8 text-center">Meet Our Team</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {/* Member 1 */}
                        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="Jane Doe"
                                className="w-24 h-24 rounded-full mb-4 object-cover"
                            />
                            <h4 className="font-bold text-lg">Jane Doe</h4>
                            <p className="text-sm text-gray-500 mb-2">CEO & Founder</p>
                            <p className="text-gray-600 text-sm">
                                Passionate about natural beauty, Jane leads the vision and growth of our company.
                            </p>
                        </div>

                        {/* Member 2 */}
                        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="John Smith"
                                className="w-24 h-24 rounded-full mb-4 object-cover"
                            />
                            <h4 className="font-bold text-lg">John Smith</h4>
                            <p className="text-sm text-gray-500 mb-2">Head of Production</p>
                            <p className="text-gray-600 text-sm">
                                John ensures that every product meets the highest standards of quality.
                            </p>
                        </div>

                        {/* Member 3 */}
                        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
                            <img
                                src="https://randomuser.me/api/portraits/women/65.jpg"
                                alt="Sara Lee"
                                className="w-24 h-24 rounded-full mb-4 object-cover"
                            />
                            <h4 className="font-bold text-lg">Sara Lee</h4>
                            <p className="text-sm text-gray-500 mb-2">Marketing Manager</p>
                            <p className="text-gray-600 text-sm">
                                Sara connects with customers and shares our story across channels.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section Values */}
                <section className="bg-white rounded-lg shadow p-8">
                    <h3 className="text-2xl font-semibold mb-4">Our Core Values</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Integrity in sourcing and production</li>
                        <li>Respect for the environment</li>
                        <li>Commitment to customer satisfaction</li>
                        <li>Innovation rooted in tradition</li>
                    </ul>
                </section>
            </main>

        </div>
    );
}
