import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Hydrating Serum",
        description: "Deeply moisturizes your skin.",
        price: "29.99€",
        imageUrl: "https://via.placeholder.com/300x200"
    },
    {
        id: 2,
        name: "Argan Oil Shampoo",
        description: "Nourishes and repairs hair.",
        price: "19.99€",
        imageUrl: "https://via.placeholder.com/300x200"
    },
    {
        id: 3,
        name: "Rose Face Cream",
        description: "Smooth and gentle daily cream.",
        price: "24.99€",
        imageUrl: "https://via.placeholder.com/300x200"
    }
];

export default function ProductList() {
    return (
        <div className="bg-white py-12 px-6 lg:px-8 w-full min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Products</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition p-4 flex flex-col items-center"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                            <p className="text-emerald-600 font-bold text-base mt-2">{product.price}</p>

                            <Link
                                to={`/product/${product.id}`}
                                className="mt-4 w-full inline-block text-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition"
                            >
                                View Product
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
