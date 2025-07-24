import imga from "../../../../../product.webp";
import imga2 from "../../../../../ressources/images/product2.webp"
import imga3 from "../../../../../ressources/images/product3.webp"
import {useState} from "react";
import Line from "../../../../components/tools/Line";

export default function DetailProduct() {
    const [hover, setHover] = useState(imga)
    let imgs = [imga, imga2, imga3];

    const handleClick = (image: string) => {
        setHover(image)
    }
    const category = 'Soap';
    const price = '29.99€'
    const productName = 'Morrocan Black Soap'
    const description = "Immerse yourself in a unique skincare experience with our hydrating face cream, made with 98% natural-origin ingredients. Infused with organic aloe vera," +
        " hyaluronic acid, and jojoba oil, it deeply moisturizes, soothes, and restores your skin’s natural radiance from the very first use."


    return (
        <div className="flex justify-center items-center bg-gray-50 py-8 px-4 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">

                {/* Bloc Images */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-4">

                    {/* Miniatures verticales */}
                    <div id="smallId" className="flex flex-row md:flex-col gap-4">
                        {imgs.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                onClick={() => handleClick(imgs[idx])}
                                className="w-28 md:w-[80px] h-28 md:h-[80px] object-cover rounded border cursor-pointer hover:ring-2 ring-gray-400"
                                alt={`thumbnail-${idx}`}
                            />
                        ))}
                    </div>

                    {/* Image principale */}
                    <div id="bigImage" className="flex items-center justify-center border rounded shadow-md bg-white p-4">
                        <img
                            src={hover}
                            className="w-10/12 md:w-[400px] h-full md:h-[400px] md:object-contain "
                            alt="Produit principal"
                        />
                    </div>
                </div>

                {/* Bloc Informations */}
                <div id="informations"
                     className="flex flex-col  p-4 md:p-6 text-gray-500 ">
                    {/* Contenu des infos produit ici */}
                    <h1 className="items-start text-2xl  md:text-xl">{category}</h1>
                    <h1 className="text-4xl  md:text-2xl  mb-4 jus font-bold text-black">{productName}</h1>
                    <p className="text-2xl md:text-lg text-gray-600 mb-2">Price : <strong>{price}</strong></p>
                    <p className=" text-2xl md:text-sm text-gray-500 ">{description}</p>
                    <div id="DPButtons" className="flex flex-row p-4 gap-4 w-fit items-start">
                        <button className="bg-black text-white px-4 py-2  border-gray-300 rounded-none font-medium shadow hover:bg-gray-800 transition duration-300 ease-in-out w-52 h-14 md:h-auto md:w-auto">
                            Add to Cart
                        </button>
                        <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-none font-medium shadow hover:bg-black hover:text-white transition duration-300 ease-in-out w-52 h-14 md:h-auto md:w-auto">
                            Checkout
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
