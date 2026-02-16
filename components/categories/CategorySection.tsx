import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Performance Cars",
    type: "car",
    image: "/carimg.jpeg",
    description: "High-octane supercars and track-ready tuners.",
  },
  {
    title: "Super Bikes",
    type: "bike",
    image: "/bikeimg.jpeg",
    description: "Precision handling and raw two-wheeled power.",
  },
  {
    title: "F1 Heritage",
    type: "f1",
    image: "/f1img.jpeg",
    description: "Peak engineering from the pinnacle of motorsport.",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 px-6 lg:px-12 max-w-[1600px] mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold uppercase">Shop by Category</h2>
        <div className="h-1 w-20 bg-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.title} {...cat} />
        ))}
      </div>
    </section>
  );
}
