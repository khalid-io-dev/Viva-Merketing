export default function ProfilePage(){
    return (
        <div className="flex flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Section Informations Menu at the left */}
            <div className="  w-[450px]  border border-gray-400 text-black text-2xl p-10">
            <div className="flex flex-col gap-10 border border-gray-500 p-10">
                    <button  className="border border-black rounded-none">OVERVIEW</button>
                    <button  className="border border-black rounded-none">ORDERS</button>
                    <button  className="border border-black rounded-none">ACCOUNT</button>
                    <button  className="border border-black rounded-none">LOGOUT</button>
                </div>

            </div>
            {/* Section Current information page */}
            <div className="border border-gray-400 w-full">
                <p>Salut</p>
            </div>
        </div>


    )}