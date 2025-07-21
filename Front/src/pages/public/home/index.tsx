import AboutUs from "../about";
import Presentation from "../presentation";

export default function Home() {
    return (
        <div className="flex flex-col gap-0">
            <Presentation/>
            <AboutUs/>
        </div>
            )
}
