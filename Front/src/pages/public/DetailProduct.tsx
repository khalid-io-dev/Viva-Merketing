import imga from "../../../product.webp";
import imga2 from "../../../ressources/images/product2.webp"
import imga3 from "../../../ressources/images/product3.webp"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {makeSimpleRequest, API_URL} from "../../services/Requests.tsx";
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: { id: number; name: string; } [];
    category_id: number;
    category: { id: number; name: string };
}


export default function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>()
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [loading, setLoading] = useState(false);

    const fetchSingleProduct = async() => {
        try{
            setLoading(true);
            const data = await makeSimpleRequest(`${API_URL}/products/${id}`);
            setProduct(data);
        } catch (error){
            console.log("failed to fetch the product: ", error);
            setErrors({general: "Failed to load product"})
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSingleProduct()
        console.log(product)
    }, []);



    // à faire plus tard quand tout sera fonctionnel
    const [hover, setHover] = useState(imga)
    let imgs = [imga, imga2, imga3];

    const handleClick = (image: string) => {
        setHover(image)
    }

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
                    <div  id="bigImage" className="flex items-center justify-center border rounded shadow-md bg-white p-4 items-center">
                        <img
                            src={"http://localhost:8000/storage/" + product?.image.name}
                            className="w-10/12 md:w-[400px] h-full md:h-[400px] md:object-contain "
                            alt="Produit principal"
                            aria-disabled={loading}
                        />

                    </div>
                </div>

                {errors.name && (
                    <div className="mt-2 text-red-600 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {Array.isArray(errors.name) ? errors.name[0] : errors.name}
                    </div>
                )}

                {loading && (
                    <div className="p-8 text-center">
                        <div className="inline-flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="text-slate-600 font-medium">Loading informations...</span>
                        </div>
                    </div>
                )}

                {/* Bloc Informations */}
                { product && (
                <div id="informations"
                     className="flex flex-col  p-4 md:p-6 text-gray-500 ">
                    {/* Contenu des infos produit ici */}
                    <h1 className="items-start text-2xl  md:text-xl">{product.category.name}</h1>
                    <h1 className="text-4xl  md:text-2xl  mb-4 jus font-bold text-black">{product.name}</h1>
                    <p className="text-2xl md:text-lg text-gray-600 mb-2">Price : <strong>{product.price}</strong></p>
                    <div className="">
                        <p className=" text-4xl md:text-sm text-gray-500 whitespace-pre-line">{product.description}</p>
                    </div>
                    <div id="DPButtons" className="flex flex-row p-4 gap-4 w-fit items-start">
                        <button disabled={loading} className="bg-black text-white px-4 py-2  border-gray-300 rounded-none font-medium shadow hover:bg-gray-800 transition duration-300 ease-in-out w-52 h-14 md:h-auto md:w-auto">
                            Add to Cart
                        </button>
                        <button disabled={loading} className="bg-white text-black border border-gray-300 px-4 py-2 rounded-none font-medium shadow hover:bg-black hover:text-white transition duration-300 ease-in-out w-52 h-14 md:h-auto md:w-auto">
                            Checkout
                        </button>
                    </div>

                </div>)
                }
            </div>
        </div>
    )
}
