import Presentation from "../../../components/presentation";
import Services from "../../../components/services";
import WhyUs from "../../../components/WhyUs";
import Organisations from "../../../components/organisations";

export default function Home() {
    return (
        <div className="flex flex-col gap-0">
            <Presentation />
            <Services />
            <WhyUs />
            <Organisations />
        </div>
            )
}
