import Link from "next/link";

export default function Breadcrumbs({ productName, type }: { productName: string; type: string }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
                Home
            </Link>
            <span className="material-symbols-outlined text-[12px]">
                chevron_right
            </span>
            <Link href="/shop" className="hover:text-white transition-colors">
                Shop
            </Link>
            <span className="material-symbols-outlined text-[12px]">
                chevron_right
            </span>
            <Link href={`/shop?type=${type}`} className="hover:text-white transition-colors capitalize">
                {type}s
            </Link>
            <span className="material-symbols-outlined text-[12px]">
                chevron_right
            </span>
            <span className="text-white truncate max-w-[200px] md:max-w-none">{productName}</span>
        </div>
    );
}
