import Filters from "./Filters";
import ProductGrid from "./ProductGrid";

export default function ShopSection() {
  return (
    <section id="shop" className="px-6 lg:px-12 py-10 max-w-[1600px] mx-auto min-h-screen w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        <Filters />
        <div className="flex-1">
          <ProductGrid />
        </div>
      </div>
    </section>
  );
}
