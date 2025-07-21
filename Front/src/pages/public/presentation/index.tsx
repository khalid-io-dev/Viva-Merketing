import imga from "../../../../ressources/images/imagePres.webp";
export default function Presentation(){
    return (
        <div className=" bg-pink-400 text-gray-800 m-0">
            <main>
                <div className="relative">
                <img
                    src={imga}
                    className=" h-auto w-full "
                    alt="arganisme Cosmetics Logo"
                />
                <p className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold bg-black bg-opacity-40">
                Bienvenue sur Arganisme Cosmetics</p>
                </div>
            </main>
        </div>
    )
}