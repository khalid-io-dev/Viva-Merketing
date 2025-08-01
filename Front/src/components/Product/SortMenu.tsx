import PriceSlider from "./PriceSlider.tsx";
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
interface Categorie {
    id: number;
    name: string;
}

interface Props {
    SendToParentProducts : (SortedProducts : Product[]) => void;
}

export default function SortMenu({SendToParentProducts}: Props){

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Categorie[]>([])
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [activeCategorySection, setActiveCategorySection] = useState(true);
    const [activeFilter, setActiveFilter] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<number>();

    {/* do a request and returns the results (without being authentificated) */}

    const makeAuthenticatedRequest = async (url: string) => {
        try {
            console.log('🔍 Making request to:', url);
            const response = await fetch(url);
            const text = await response.text();
            console.log('🔍 Response status:', response.status, 'Response text for categories:', text);

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

    {/* function that fetchs the products sorted by category */}

    const fetchSortedProductsByCategory = async () => {
        try {
            const data = await makeAuthenticatedRequest(`${API_URL}/products/category/` + selectedCategory);
            SendToParentProducts(data);
            setProducts(data)

        } catch (error) {
            console.error("Failed to fetch sorted products by category:", error);
            setErrors({ general: "Failed to load sorted products by category " });
        }
    };

    {/* function that fetchs all the categories */}
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await makeAuthenticatedRequest(`${API_URL}/categories`);
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            setErrors({ general: "Failed to load categories" });
        } finally {
            setLoading(false);
        }
    };

    {/* Loading categories */}

    useEffect(() => {
        fetchCategories();
    }, []);

    {/* SVGs */}

    const down = <svg width="32" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"
                      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 10 12 16 18 10" />
        <polyline points="6 18 12 24 18 18" />
    </svg>

    const up = <svg width="32" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 24 12 18 18 24" />
        <polyline points="6 16 12 10 18 16" />
    </svg>

    const CatCurrentSVG = activeCategorySection ? down : up;


    const handleClickCategory = () => {
        if (activeCategorySection) setActiveCategorySection(false);
        else setActiveCategorySection(true);
    }
    const handleClickFilter = () => {
        if (activeFilter) setActiveFilter(false);
        else setActiveFilter(true);
    }

    const handleSortClick = () => {
        fetchSortedProductsByCategory()
    }


    return (
        <div className="flex flex-col  text-black ">
            <div className="border border-collapse">
                <h1 className="hidden md:block max-w-7xl mx-auto text-center text-2xl ">Filters</h1>
            </div>
            <button
                onClick={() => {handleClickFilter()}}
                className="block md:hidden max-w-7xl mx-auto text-center text-2xl"
            >
                <h1 className="block md:hidden max-w-7xl mx-auto text-center text-2xl border border-black w-24">Filters</h1>
            </button>


            <form className={activeFilter ? "" : "hidden"}>
            <div className="p-2 border border-collapse">
                <div className="flex items-center gap-2 p-3 border border-collapse">
                    <h1 className="text-start">Price</h1>
                    <button disabled={loading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                    </svg>
                    </button>
                    <button disabled={loading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                    </svg>
                    </button>
                </div>

                <div className=" text-black p-1">
                    <div className="flex">
                        <PriceSlider/>
                    </div>

                </div>

                <div className="flex items-center gap-2 p-3 border border-collapse">
                    <h1 className="text-start">Category</h1>
                    <button
                        type="button"
                        className="text-start"
                        onClick={() => {handleClickCategory()}}
                    >
                        {CatCurrentSVG}
                    </button>
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
                            <span className="text-slate-600 font-medium">Loading categories...</span>
                        </div>
                    </div>
                )}
                {categories && !loading && (
                <div className={activeCategorySection ? "text-black pl-5 " : "hidden text-black pl-5 "}>
                {
                    categories.map((cat) => {
                        return (
                            <div key={cat.id}>
                                    <div className="grid grid-cols-2 p-2 ">
                                        <label className="text-sm">{cat.name}</label>
                                        <input onChange={() => {
                                            setSelectedCategory(cat.id)
                                        }} disabled={loading} className="border border-black lg:max-w-24 max-h-5" type="radio" name="selectedCategory"/>
                                    </div>
                                </div>
                        );
                    })
                }
                </div>
                )}
            </div>
                <div className="flex justify-center pt-8">
                    <button disabled={loading} onClick={handleSortClick} className="bg-emerald-600 border disabled:bg-gray-700  justify-center w-24 rounded hover:bg-emerald-700" type="button">Sort</button>
                </div>
            </form>
            </div>







    )
}