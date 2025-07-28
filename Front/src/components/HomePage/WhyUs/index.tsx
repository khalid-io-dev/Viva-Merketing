export default function WhyUs(){
    interface sections {
        id: number;
        title: string;
        description: string;
        color: string;
    }

    const sec: sections[] = [
        {
            id: 1,
            title: "WHY CHOOSE US",
            description: "We mainly focus on maintaining the quality of our items so that our costumers continue to avail our services " +
                "which are sustainable and environment friendly. We closely monitor the extraction methods and ensure that every product is " +
                "extracted morally.",
            color: "bg-[#7B5E3B]"
        },
        {
            id:2,
            title: "OUR MISSION",
            description: "The mission of Arganism is to get the world as a whole acquainted with the healthy properties of argan oil. " +
                "In addition, Arganisme strives to promote its national pride Argan, which grows solely in southern Morocco. " +
                "And last but not least to offer the farmers a fair price for their product.",
            color: "bg-[#C9A66B]"
        },
        {
            id:3,
            title: "WHAT YOU GET",
            description: "Experts at ARGANisme closely supervise the quality to ensure that the procedure has been taken out perfectly." +
                " Our prices are also very economical as compared to the other competitors in market which are offering your mediocre products on high prices." +
                " We charge very nominal prices that we come across during production.",
            color: "bg-[#F6EEE3]"
        }
    ];

    return (
        <div className="flex flex-col w-full h-full items-center pl-6 pr-6">
            <div className="flex flex-col md:grid grid-cols-3 w-full h-auto">
                {sec.map((section) => (
                    <div className={section.color + " flex flex-col items-center w-full h-full p-20"}>
                        <h1 className="font-mono text-3xl text-black  first-letter:text-4xl">{section.title}</h1>
                        <p className="text-sm text-gray-800 font-normal pt-5">{section.description}</p>
                    </div>
                ))}
            </div>
        </div>

    )


}