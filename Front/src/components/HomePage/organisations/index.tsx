
export default function Organisations(){

    const title = "We love organizations"
    const items = Array.from({ length: 6 }, (_, i) => i + 1);


    const description = "Our products are recognized by this great organizations.\n"
         + "We love to work with them"
    return (
        <div className="bg-white pl-6 pr-6">
            <div className="flex flex-col bg-[#E6F0F1] w-full h-full items-center p-24">
            <h1 className="text-4xl text-black uppercase font-mono">{title}</h1>
            <p className="text-xl   text-gray-800 p-2 font-normal">{description}</p>
            <div className="w-full h-0.5 w-1/3 bg-black my-6" />
            <div className="flex flex-grow text-black h-auto w-full object-contain" id="listOrgas">
            {items.map((_item , index) => (
                <div className=" h-full w-full">
                    <img
                        src={'../../../ressources/images/organisations/orga' + index + '.webp'}
                        className="w-10/12"
                        alt="Produit principal"
                    />
                </div>
            ))}
            </div>

        </div>
        </div>


    )
}