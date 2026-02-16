"use client";

import { useRouter } from "next/navigation";

interface Props {
  title: string;
  image: string;
  description: string;
  type: string;
}

export default function CategoryCard({
  title,
  image,
  description,
  type,
}: Props) {
  const router = useRouter();

  const handleCategoryClick = () => {
    router.push(`/?type=${type}#shop`);
  };

  return (
    <div
      onClick={handleCategoryClick}
      className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-3xl font-black italic uppercase mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {title}
        </h3>
        <div className="h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
        <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}
