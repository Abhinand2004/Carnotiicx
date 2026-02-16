import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import Ticker from "@/components/layout/Ticker";
import CategorySection from "@/components/categories/CategorySection";
import ShopSection from "@/components/shop/ShopSection";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <Ticker />
      <CategorySection />
      <ShopSection />
      <Footer />
    </>
  );
}
