import Services from "../../../components/HomePage/services";
import WhyUs from "../../../components/HomePage/WhyUs";
import Organisations from "../../../components/HomePage/organisations";
import Label from "../../../components/HomePage/label";
import ArganQuality from "../../../components/HomePage/ArganQuality";
import AboutHomePage from "../../../components/HomePage/AboutHomePage";
import ProductsAds from "../../../components/Product/productsAds";

export default function Home() {
    return (
        <div className="flex flex-col gap-0 ">
            <Services />
            <AboutHomePage />
            <ProductsAds />
            <ArganQuality />
            <WhyUs />
            <Organisations />
            <Label />
        </div>
            )
}
