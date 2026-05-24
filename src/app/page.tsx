import HomeComponents from "@/components/ui/HomeComponents";
import ServicesComponents from "@/components/ui/ServicesComponents";
import ProductsSection from "@/components/ui/ProductsSection";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import LocationComponent from "@/components/ui/Location";
import FormularioContacto from "@/components/ui/ContactComponent";
import RepairServices from "@/components/ui/RepairServices";


export default function Home() {
  return (
    <div>
      <HomeComponents />
      <ServicesComponents />
      <ProductsSection />
      <RepairServices />
      <WhyChooseUs />
      <LocationComponent />
      <FormularioContacto />
    </div>
  );
}
