import HomeComponents from "@/components/ui/HomeComponents";
import ServicesComponents from "@/components/ui/ServicesComponents";
import ProductsSection from "@/components/ui/ProductsSection";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import LocationComponent from "@/components/ui/Location";
import FormularioContacto from "@/components/ui/ContactComponent";


export default function Home() {
  return (
    <div>
      <HomeComponents />
      <ServicesComponents />
      <ProductsSection />
      <WhyChooseUs />
      <LocationComponent />
      <FormularioContacto />
    </div>
  );
}
