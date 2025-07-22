import { Link } from "react-router-dom";
import Sort from "../../../components/Product/Sort";

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
        id: 2,
        name: "Sérum visage",
        price: "24.99€",
        description: "Un sérum concentré pour raviver l’éclat naturel de votre peau.",
        imageUrl: "../../../../product.webp"
    },
    {
        id: 3,
        name: "Baume à lèvres",
        price: "7.50€",
        description: "Hydrate et protège vos lèvres toute la journée.",
        imageUrl: "../../../../product.webp"
    },
    {
        id: 4,
        name: "Baume à lèvres",
        price: "7.50€",
        description: "Hydrate et protège vos lèvres toute la journée.",
        imageUrl: "../../../../product.webp"
    },
    {
        id: 5,
        name: "Baume à lèvres",
        price: "7.50€",
        description: "Hydrate et protège vos lèvres toute la journée.",
        imageUrl: "../../../../product.webp"
    },
    {
        id: 6,
        name: "Baume à lèvres",
        price: "7.50€",
        description: "Hydrate et protège vos lèvres toute la journée.",
        imageUrl: "../../../../product.webp"
    },
    {
        id: 7,
        name: "Baume à lèvres",
        price: "7.50€",
        description: "Hydrate et protège vos lèvres toute la journée.",
        imageUrl: "../../../../product.webp"
    },
    // Ajoute d'autres produits si besoin
];

export default function ProductList() {
    return (
        <div className="bg-white py-12 px-6 lg:px-8 w-full min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Products</h1>
                <Sort />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* gap réduit */}
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white transition p-2 flex flex-col items-center"
                        >
                            <Link to={`/product/${product.id}`} className="w-full">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-82 rounded object-cover mb-2"
                                />
                            </Link>
                            <div className="flex justify-between w-full px-2">
                                <h2 className="text-ui-fg-subtle text-gray-600">{product.name}</h2>
                                <p className="text-ui-fg-subtle text-gray-600">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
