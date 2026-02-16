import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-3 lg:px-12 lg:py-4">
      <div className="flex items-center gap-4 lg:gap-8">
        <a className="flex items-center gap-2 group" href="/">
          <span className="material-symbols-outlined text-primary text-2xl lg:text-3xl group-hover:rotate-180 transition-transform duration-500">
            speed
          </span>
          <h2 className="text-xl lg:text-2xl font-bold tracking-tighter">CARNOTIX</h2>
        </a>

        <NavLinks />
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <SearchBar />
        <NavActions />
        <MobileNav />
      </div>
    </div>
  );
}
