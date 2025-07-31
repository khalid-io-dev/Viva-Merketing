import { Link } from "react-router-dom";
import SortMenu from "../../components/Product/SortMenu.tsx";
import {useEffect, useState} from "react";
const API_URL = "http://localhost:8000/api";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string | null;
    category_id: number;
    category: { id: number; name: string };
}


export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [loading, setLoading] = useState(false);

    const makeAuthenticatedRequest = async (url: string) => {
        try {
            console.log('🔍 Making request to:', url);
            const response = await fetch(url);
            const text = await response.text();
            console.log('🔍 Response status:', response.status, 'Response text:', text);

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}`;
                try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            return JSON.parse(text);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await makeAuthenticatedRequest(`${API_URL}/products`);
            setProducts(data.data); // Adjust based on your pagination response
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setErrors({ general: "Failed to load products" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            fetchProducts();
    }, []);



    return (
        <div className="grid-rows-1 lg:grid grid-cols-[250px_1fr] gap-6 px-6 lg:px-8 h-full w-full py-12">
            <SortMenu />
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
                        <span className="text-slate-600 font-medium">Loading products...</span>
                    </div>
                </div>
            )}
            <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-start" hidden={loading}>Our products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9"> {/* gap réduit */}
                    {products.map((product) => (
                        <Link to={`/products/${product.id}`} className="w-full">
                        <div
                            key={product.id}
                            className= "transition flex flex-col items-center border border-gray-200"
                        >
                                <img
                                    src="product.webp"
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />
                            <div className="flex justify-between w-full px-2">
                                <h2 className="text-ui-fg-subtle text-gray-600">{product.name}</h2>
                                <p className="text-ui-fg-subtle text-gray-600">{product.price}</p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
