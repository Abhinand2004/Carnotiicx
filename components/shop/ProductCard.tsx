import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  type?: string;
  color?: string;
  description?: string;
}

export default function ProductCard({ id, title, image, price, originalPrice, badge }: Props) {
  return (
    <Link href={`/product/${id}`} className="block group">
      <div className="bg-surface-dark rounded-lg overflow-hidden border border-white/5 transition-all duration-300 group-hover:border-white/20">
        <div className="relative aspect-[4/5]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-primary px-2 py-1 text-xs font-bold text-black uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-300">{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
