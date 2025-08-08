export default function Services() {
    const titre1 = "Our Services for you"
    const description = "We provide a complete branding service.\n" +
        "We turns private labels into successful brands."

    interface categories {
        id: number;
        title: string;
        description: string;
    }

    const cat: categories[] = [
        {
            id: 1,
            title: "Private label",
            description: "The history of our company is closely linked to the realization of a wide range of " +
                "cosmetic products under private label, the first manufacturer in Morocco that produce Argan oil " +
                "and other cosmetic products."
        },
        {
            id:2,
            title: "Collaboration",
            description: "To develop its own range is intensively communicate " +
                "and collaborate very important. The Cosmetic Company believes in a personal approach from the start."
        },
        {
            id:3,
            title: "Quality Control",
            description: "We take great pride in our capabilities to craft and deliver high quality " +
                "products that in turn become memorable to you. We believe this should be the standard of each industry."
        }
    ];

    return (
        <div className="flex flex-col  w-full h-full items-center p-24" id="services">
            <h1 className="text-4xl text-black font-mono ">{titre1}</h1>
            <p className="text-sm    text-gray-800 p-2 font-normal">{description}</p>
            <div className="w-full h-0.5 w-1/3 bg-black my-6" />

            <div className="flex flex-col md:grid grid-cols-3 w-full h-auto p-6">
                {cat.map((categories) => (
                    <div className="flex flex-col items-center ">
                        <h1 className="font-mono text-3xl text-black first-letter:text-emerald-600 first-letter:text-4xl">{categories.title}</h1>
                        <p className="text-sm text-gray-800 p-2 font-normal">{categories.description}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}