import { useState } from "react";
import img1 from "../../../ressources/images/caroussel/img1.webp";
import img2 from "../../../ressources/images/caroussel/img2.webp";
import img3 from "../../../ressources/images/caroussel/img3.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Image {
    id: number;
    titre: string;
    description: string;
    image: string;
}

export default function Presentation() {
    const images: Image[] = [
        {
            id: 1,
            titre: "Expert in natural cosmetics products",
            description:
                "We service niche beauty brands, personal care, beverage and pharmaceutical industries as an integral part of our customers supply chain.",
            image: img1,
        },
        {
            id: 2,
            titre: "Argan oil is nature gift to kind men",
            description:
                "Arganisme, pure argan oil is made in traditional artisanal maner. Each argan seed that goes to our pure argan oil is plucked by hand.",
            image: img2,
        },
        {
            id: 3,
            titre: "Private label",
            description:
                "Give your personal touch, then we are always present here to serve you with the most reliable items and products that will transform your label into the most triumphant one overnight.",
            image: img3,
        },
    ];

    const [index, setIndex] = useState(0);

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div id="presentation" className="relative bg-gray-50 text-gray-800 w-full overflow-hidden">
            <div className="relative h-[500px]">
                <img
                    src={images[index].image}
                    alt={images[index].titre}
                    className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{images[index].titre}</h2>
                    <p className="text-md sm:text-lg max-w-2xl">{images[index].description}</p>
                </div>

                {/* Boutons navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Indicateurs ronds */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                            index === i ? "bg-white" : "bg-gray-400"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
