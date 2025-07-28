import imageFond from "../../../../ressources/images/champs.webp"
import {Link} from "react-router-dom";
export default function AboutHomePage(){

    const title = "About US";
    const description = "Arganisme Cosmetics S.A.R.L was founded in " +
        "1976 as a boutique distributor of Argan Oil, products from co-operatives and a supplier of essential oils."


    return (
        <div className="relative flex flex-col items-center w-full">
            <img
                src={imageFond}
                alt="John Smith"
                className="w-full h-96 object-cover"
            />

            {/* Rideau gris foncé semi-transparent */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>


            {/* Conteneur texte + bouton centré au milieu de l'image */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center space-y-4">
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="text-2xl">{description}</p>

                <Link to="/about" className="bg-black hover:bg-white text-white hover:text-black hovfont-semibold px-6 py-2 rounded-none transition">
                    Read more
                </Link>
            </div>
        </div>



    )


}