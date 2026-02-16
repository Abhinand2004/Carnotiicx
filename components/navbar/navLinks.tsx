import Link from "next/link";

export default function NavLinks() {
  const links = [
    { name: "Shop", href: "/" },
    { name: "Collections", href: "#" },
    { name: "FAQ", href: "/faq" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="hidden lg:flex items-center gap-8 ml-8">
      {links.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-gray-300 hover:text-primary text-sm font-medium transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
