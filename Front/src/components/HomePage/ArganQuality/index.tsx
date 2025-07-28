export default function ArganQuality(){

    interface informations {
        svg: JSX.Element;
        titre: string;
        description: string;
    }
    const svgCoeur = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          className="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2 2 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386"/>
    </svg>
    const svgQuality = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8 text-yellow-500" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03
             L22 9.24l-7.19-.61L12 2 9.19 8.63
             2 9.24l5.46 4.73L5.82 21z"/>
    </svg>


    const infos1: informations[] = [
        {
            svg: svgCoeur,
            titre: "Made with Love!",
            description: "The Argan oil is carefully picked with love, extracted with care and distilled so that you get the purest product."
        },
        {
            svg: svgCoeur,
            titre: "100% pure",
            description: "There is no mixing done with the oil so that our consumers get the cent percent pure Argan Oil."
        },
        {
            svg: svgQuality,
            titre: "Quality check",
            description: "We inspect the quality of Argan oil before sending it out to the clients or to the market. Higher quality is what we prefer and provide to everyone."
        },
    ]
    const infos2: informations[] = [
        {
            svg: svgCoeur,
            titre: "Experience",
            description: "We have a vast experience of deal with the extraction and trade the Argan oil. This is why makes us more professional and experienced in the market."
        },
        {
            svg: svgCoeur,
            titre: "Fair price",
            description: "We do not charge anything extra to the consumers rather we only charge fair prices so that our product would remain economical for them."
        },
        {
            svg: svgCoeur,
            titre: "Certification",
            description: "We hold proper certification in extracting and selling of Argan oil. This makes us legitimate traders of Argan oil in the market."
        }
]


    return (
        <div className="flex flex-col p-8 items-center  ">
            <div className="items-center">
                <h1 className="text-4xl text-black font-mono item">100% Pure organic Argan oil</h1>
            </div>
            <div className="grid grid-cols-3 p-4 ">
                <div className="flex flex-col border border-pink-500 text-black p-5">
                    {infos1.map((_product, index)=>(
                        <div className="flex flex-col border border-emerald-900 h-full items-center" key={index}>
                            <h1 className="text-xl">{_product.titre}</h1>
                            <p className="p-5">{_product.description}</p>
                        </div>
                    ))}
                </div>
                <div className="flex border border-orange-500 justify-center">
                    <img
                        src={"../../../../ressources/images/ArganQuality.webp"}
                        className="h-50 w-50"
                    />
                </div>
                <div className="flex flex-col border border-pink-500 text-black p-5">
                    {infos2.map((_product)=>(
                        <div className="flex flex-col border border-emerald-900 h-full items-center">
                            <h1 className="text-xl">{_product.titre}</h1>
                            <p className="p-5">{_product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}