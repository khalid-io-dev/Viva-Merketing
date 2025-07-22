interface DisplayProductCartProps {
    image: string
    name: string;
    price: string;
}

export default function DisplayProductCart({ image, name, price }: DisplayProductCartProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <a href="#" className="shrink-0 md:order-1">
                    <img
                        className="h-20 w-20"
                        src={image}
                        alt="image produit"
                    />
                </a>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a href="#" className="text-base font-medium text-gray-900 hover:underline">
                        {name}
                    </a>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                        >
                            Add to Favorites
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                        <button className="h-5 w-5 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">–</button>
                        <input
                            type="text"
                            className="w-10 text-center border-none bg-transparent text-sm font-medium text-gray-900"
                            value="2"
                            readOnly
                        />
                        <button className="h-5 w-5 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">＋</button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900">{price}€</p>
                    </div>
                </div>
            </div>
        </div>
    )
}