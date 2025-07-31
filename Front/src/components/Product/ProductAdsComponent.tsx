import {Link} from "react-router-dom";
import CountUp from "../tools/animation/CountUp";

export default function ProductsAds(){
    const countup = <CountUp
        from={0}
        to={40}
        separator=","
        direction="up"
        duration={0.5}
        className="count-up-text font-bold"
    />;
    return (
        <div className="flex flex-col w-full h-full text-white items-center">
            <div className="bg-gray-700 hover:bg-gradient-to-b hover:bg-emerald-900 w-full flex items-center justify-center">
                <p className="text-2xl p-8 text-center">
                    We have more than {countup} products for your brand.{" "}
                    <Link to="/products" className="underline hover:text-emerald-600">
                        See more
                    </Link>
                </p>
            </div>
        </div>
    );

}