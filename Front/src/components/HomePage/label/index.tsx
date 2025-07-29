import {Link} from "react-router-dom";

export default function Label(){
    const title = "Start your private label now!"
    const description = "If you are looking to start a business with private label, " +
        "then we are always present here to serve you with the most reliable items and products that will transform your label into the most triumphant one overnight."
    return (
        <div className="flex flex-col p-7  items-center h-full w-auto bg-white ">
            <div className="flex flex-col justify-center text-black w-9/12 md:w-5/12 gap-5">
                <h1 className="text-4xl text-black uppercase font-mono w-auto">{title}</h1>
                <p className="text-xl   text-gray-800 p-2 font-normal w-auto">{description}</p>
            </div>
            <div className="w-1/3 h-0.5 w-1/3 bg-black my-6" />

            <Link to={"/contact"} className="bg-black text-white px-4 py-2 rounded-none font-medium sm:text-center shadow hover:bg-white hover:text-black transition duration-300 ease-in-out md:w-52 h-14 md:h-12  items-center">
                Contact us
            </Link>

        </div>
    )
}