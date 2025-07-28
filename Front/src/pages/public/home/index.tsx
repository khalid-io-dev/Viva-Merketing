import Services from "../../../components/HomePage/services";
import WhyUs from "../../../components/HomePage/WhyUs";
import Organisations from "../../../components/HomePage/organisations";
import Label from "../../../components/HomePage/label";

export default function Home() {
    return (
        <div className="flex flex-col gap-0">
            <Services />
            <WhyUs />
            <Organisations />
            <Label />
        </div>
            )
}
