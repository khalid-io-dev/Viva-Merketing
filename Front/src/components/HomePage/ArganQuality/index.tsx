import type {JSX} from "react";

export default function ArganQuality() {

    interface informations {
        svg: JSX.Element;
        titre: string;
        description: string;
        color: string;
    }

    const svgCoeur = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                          className="bi bi-heart" viewBox="0 0 16 16">
        <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
    </svg>
    const svgQuality = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            className="bi bi-check-all" viewBox="0 0 16 16">
        <path
            d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
    </svg>

    const svgPure = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         className="bi bi-droplet"
                         viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
        <path fill-rule="evenodd"
              d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
    </svg>
    const svgExp = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        className="bi bi-star" viewBox="0 0 16 16">
        <path
            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
    </svg>

    const svgCertif = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                           className="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>

    const svgPrice = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                          className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
        <path
            d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
    </svg>

    const infos1: informations[] = [
        {
            svg: svgCoeur,
            titre: "Made with Love!",
            description: "The Argan oil is carefully picked with love, extracted with care and distilled so that you get the purest product.",
            color: "bg-[#F3CBA4]"
        },
        {
            svg: svgPure,
            titre: "100% pure",
            description: "There is no mixing done with the oil so that our consumers get the cent percent pure Argan Oil.",
            color: "bg-[#D9913C]"
        },
        {
            svg: svgQuality,
            titre: "Quality check",
            description: "We inspect the quality of Argan oil before sending it out to the clients or to the market. Higher quality is what we prefer and provide to everyone.",
            color: "bg-[#8A5620]"
        },
    ]
    const infos2: informations[] = [
        {
            svg: svgExp,
            titre: "Experience",
            description: "We have a vast experience of deal with the extraction and trade the Argan oil. This is why makes us more professional and experienced in the market.",
            color: "bg-[#A7CFA9]"
        },
        {
            svg: svgPrice,
            titre: "Fair price",
            description: "We do not charge anything extra to the consumers rather we only charge fair prices so that our product would remain economical for them.",
            color: "bg-[#5E8C61]"

        },
        {
            svg: svgCertif,
            titre: "Certification",
            description: "We hold proper certification in extracting and selling of Argan oil. This makes us legitimate traders of Argan oil in the market.",
            color: "bg-[#2F5233]"
        }
    ]





    return (
        <div className="flex flex-col items-center  " >
            <div className="items-center p-16">
            <h1 className="text-4xl text-black font-mono item">100% Pure organic Argan oil</h1>
        </div>
            <div className="flex flex-col md:grid grid-cols-3 p-8 ">
                <div className="flex flex-col   text-black items-center">
                    {infos1.map((_product, index) => (
                        <div className="flex flex-row h-full justify-center">
                            <div className={" flex flex-col  -emerald-900 h-full items-center "} key={index}>
                                <h1 className="text-2xl font-mono first-letter:text-emerald-600 first-letter:text-3xl">{_product.titre}</h1>
                                <p className="p-5 font-normal">{_product.description}</p>
                            </div>
                            {/*<div
                                className="hidden w-20 h-20 rounded-full bg-[#A97449] hover:bg-[#8C6338] flex items-center justify-center">
                                <div className="w-10 h-10 text-white">
                                    {_product.svg}
                                </div>
                            </div>*/}

                        </div>
                    ))}
                </div>
                <div className="flex  justify-center">
                    <img
                        src={"../../../../ressources/images/ArganQuality.webp"}
                        className="h-50 w-50"
                    />
                </div>
                <div className="flex flex-col  text-black pl-5 ">
                    {infos2.map((_product, index) => (
                        <div className="flex flex-row h-full justify-center">
                            {/*<div
                                className="hidden w-20 h-20 rounded-full bg-[#A97449] hover:bg-[#8C6338] flex items-center justify-center">
                                <div className="w-10 h-10 text-white">
                                    {_product.svg}
                                </div>
                            </div>*/}
                            <div className={" flex flex-col  -emerald-900 h-full items-center "} key={index}>
                                <h1 className="text-2xl font-mono first-letter:text-emerald-600 first-letter:text-3xl">{_product.titre}</h1>
                                <p className="p-5 font-normal">{_product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}