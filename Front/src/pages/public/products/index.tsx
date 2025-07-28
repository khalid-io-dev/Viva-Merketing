import { Link } from "react-router-dom";
import SortMenu from "../../../components/Product/SortMenu";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "Crème hydratante",
        price: "19.99€",
        description: "Une crème légère et nourrissante pour tous types de peau.",
        imageUrl: "product.webp"
    },

    {
        id: 3,
        name: "Baume à lèvres",
        price: "7.50€",
        description: "Hydrate et protège vos lèvres toute la journée.",
        imageUrl: "../../../../product.webp"
    },
    {
        id: 3,
        name: "Baume à lèvres",
        price: "7.50€",
        description: "Hydrate et protège vos lèvres toute la journée.",
        imageUrl: "../../../../product.webp"
    },

    // Ajoute d'autres produits si besoin
];

export default function ProductList() {
    return (
        <div className="grid-rows-1 lg:grid grid-cols-[250px_1fr] gap-6 bg-white px-6 lg:px-8 h-full w-full py-12">
                <SortMenu />
            <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-start">Our products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9"> {/* gap réduit */}
                    {products.map((product) => (
                        <Link to={`/product/${product.id}`} className="w-full">
                        <div
                            key={product.id}
                            className= "transition flex flex-col items-center border border-gray-200"
                        >
                                <img
                                    src={product.imageUrl}
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
