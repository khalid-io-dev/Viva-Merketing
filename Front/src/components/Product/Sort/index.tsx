export default function Sort() {
    return (
        <div className="flex flex-wrap justify-start gap-5 bg-white pb-3">
                {["CREME", "HUILE", "SAVON", "TRUC"].map((label, index) => (
                <button
                    key={index}
                    className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:border-gray-500 hover:text-black transition-colors duration-200"
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
