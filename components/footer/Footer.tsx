import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-surface-dark border-t border-border-dark pt-16 pb-8">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="size-6 text-primary">
                                <svg
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-extrabold uppercase italic text-white">
                                Carnottix
                            </h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            High-performance streetwear for the modern automotive enthusiast.
                            Designed in Tokyo, built for the world.
                        </p>
                        <div className="flex gap-4">
                            <Link className="text-gray-400 hover:text-white transition-colors" href="#">
                                IG
                            </Link>
                            <Link className="text-gray-400 hover:text-white transition-colors" href="#">
                                TW
                            </Link>
                            <Link className="text-gray-400 hover:text-white transition-colors" href="#">
                                YT
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-6 text-white">Shop</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link className="hover:text-primary transition-colors" href="#">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="#">
                                    Best Sellers
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="#">
                                    Accessories
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="#">
                                    Collections
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-6 text-white">Support</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/faq">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="#">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/size-guide">
                                    Size Guide
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" href="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-wider mb-6 text-white">
                            Join the Crew
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Get 10% off your first order and early access to drops.
                        </p>
                        <div className="flex">
                            <input
                                className="bg-black/30 border border-border-dark border-r-0 rounded-l-md px-4 py-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-gray-600 text-white"
                                placeholder="ENTER EMAIL"
                                type="email"
                            />
                            <button className="bg-primary hover:bg-red-600 text-white px-4 rounded-r-md font-bold text-sm transition-colors">
                                JOIN
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-border-dark pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
                    <p>© 2024 CARNOTTIX. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link className="hover:text-white" href="#">
                            Privacy Policy
                        </Link>
                        <Link className="hover:text-white" href="#">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
