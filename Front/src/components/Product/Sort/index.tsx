export default function Sort() {
    return (
        <div className="flex flex-wrap justify-center bg-white ">
            <div className="border border-gray-500 gap-4">
                {["CREME", "HUILE", "SAVON", "TRUC"].map((label, index) => (
                <button
                    key={index}
                    className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
                >
                    {label}
                </button>
            ))}
            </div>
        </div>
    );
}
