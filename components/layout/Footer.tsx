export default function Footer() {
  return (
    <footer className="bg-surface-darker border-t border-white/10 pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div>
          <a className="flex items-center gap-2 mb-6 group" href="#">
            <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-180 transition-transform duration-500">
              speed
            </span>
            <h2 className="text-2xl font-bold tracking-tighter">CARNOTIX</h2>
          </a>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Bridging the gap between automotive culture and premium streetwear.
            Built for those who live life in the redline.
          </p>

          <div className="flex gap-4">
            {["twitter", "instagram"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors"
              >
                <span className="sr-only">{s}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <FooterLinks
          title="Shop"
          links={[
            "New Arrivals",
            "Best Sellers",
            "Collections",
            "Accessories",
            "Gift Cards",
          ]}
        />

        {/* Support */}
        <FooterLinks
          title="Support"
          links={[
            "Track Order",
            "Shipping & Returns",
            "Size Guide",
            "FAQ",
            "Contact Us",
          ]}
        />

        {/* Newsletter */}
        <div>
          <h3 className="font-bold uppercase tracking-wider mb-6">
            Join the Garage
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe for exclusive drops and early access.
          </p>

          <form className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-surface-dark border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-primary focus:ring-0"
            />
            <button
              type="submit"
              className="w-full bg-white text-black font-bold uppercase py-3 rounded hover:bg-primary hover:text-white transition-colors text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500">
          © 2024 CARNOTIX. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a className="text-xs text-gray-500 hover:text-white" href="#">
            Privacy Policy
          </a>
          <a className="text-xs text-gray-500 hover:text-white" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="font-bold uppercase tracking-wider mb-6">{title}</h3>
      <ul className="space-y-4 text-sm text-gray-400">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-primary transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
