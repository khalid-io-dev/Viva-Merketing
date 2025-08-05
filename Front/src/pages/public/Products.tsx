import { Link } from "react-router-dom";
import SortMenu from "../../components/Product/SortMenu.tsx";
import {useEffect, useState} from "react";
import {API_URL, makeSimpleRequest} from "../../services/Requests.tsx";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: {id: number; name: string;}[];
    category_id: number;
    category: { id: number; name: string };
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [SortedProducts] = useState<Product[]>([])
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [loading, setLoading] = useState(false);



    {/* function that fetchs all the products */}
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await makeSimpleRequest(`${API_URL}/products`);
            setProducts(data.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setErrors({ general: "Failed to load products" });
        } finally {
            setLoading(false);
        }
    };

    {/* Loading products, all the products, or products from a special category */}
    useEffect(() => {
        if (SortedProducts.length > 0){
            setProducts(SortedProducts)
            console.log("Products updated !")
        } else {
            fetchProducts();
        }
    }, []);

    {/* the function that manages the products from the sort menu */}
    const HandleProductsFromSortMenu = async (SortedProducts : Product[]) => {
        setLoading(true)
        setProducts(SortedProducts)
        setTimeout(() => {
            setLoading(false)
        }, 900)
    }

    return (
        <div className="w-full min-h-screen px-4 md:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 max-w-7xl mx-auto">
                {/* filter */}
                <SortMenu SendToParentProducts={HandleProductsFromSortMenu} />

                {/* principal content */}
                <div className="flex flex-col gap-6">

                    {/* errors section */}
                    {errors.name && (
                        <div className="mt-2 text-red-600 text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {Array.isArray(errors.name) ? errors.name[0] : errors.name}
                        </div>
                    )}

                    {/* loading */}
                    {loading && (
                        <div className="text-center">
                            <div className="inline-flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                <span className="text-slate-600 font-medium">Loading products...</span>
                            </div>
                        </div>
                    )}

                    {/* No product found */}
                    {!loading && products.length === 0 && (
                        <div className="text-center text-gray-600">
                            No product found.
                        </div>
                    )}

                    {/* products list */}
                    {products.length > 0 && !loading && (
                        <>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">Products</h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <Link
                                        to={`/products/${product.id}`}
                                        key={product.id}
                                        className="transition duration-200 transform hover:scale-[1.02] hover:shadow-lg border border-gray-200 rounded-md overflow-hidden flex flex-col bg-white"
                                    >
                                        {/* Affiche l'image si elle existe */}
                                        {product.image?.name && (
                                            <img
                                                src={`http://localhost:8000/storage/${product.image.name}`}
                                                alt={product.name}
                                                className="w-full h-64 object-cover"
                                            />
                                        )}

                                        {/* Informations produit */}
                                        <div className="flex justify-between px-4 py-3">
                                            <h2 className="text-gray-700 font-medium">{product.name}</h2>
                                            <p className="text-gray-600 font-semibold">{product.price}€</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
