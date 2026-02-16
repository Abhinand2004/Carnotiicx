import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link href="/cart" className="relative group cursor-pointer block">
      <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors text-[24px]">
        shopping_bag
      </span>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
