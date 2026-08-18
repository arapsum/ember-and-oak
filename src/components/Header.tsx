import { RefObject } from "react";
import { BagIcon, CloseIcon, CupLogo, SearchIcon } from "./icons";

interface HeaderProps {
  query: string;
  onQueryChange: (q: string) => void;
  cartCount: number;
  bumpKey: number;
  onOpenCart: () => void;
  searchRef: RefObject<HTMLInputElement>;
}

export default function Header({
  query,
  onQueryChange,
  cartCount,
  bumpKey,
  onOpenCart,
  searchRef,
}: HeaderProps) {
  const searchBox = (extra: string) => (
    <div className={`relative ${extra}`}>
      <SearchIcon className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-500 pointer-events-none" />
      <input
        ref={searchRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search beans, origins, tasting notes…"
        className="w-full bg-bark-800/80 border border-bark-600/60 rounded-full pl-10 pr-16 py-2.5 text-sm text-cream-100 placeholder-cream-500 outline-none transition-all duration-300 focus:border-honey-500/70 focus:bg-bark-800 focus:shadow-[0_0_0_4px_rgba(214,142,47,0.12)]"
      />
      {query ? (
        <button
          onClick={() => onQueryChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-cream-400 hover:text-cream-100 hover:bg-bark-700 transition-colors"
        >
          <CloseIcon className="w-3.5 h-3.5" />
        </button>
      ) : (
        <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden md:block text-[11px] font-semibold text-cream-500 border border-bark-600 rounded-md px-1.5 py-0.5">
          /
        </kbd>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-honey-500 text-bark-950 text-center text-[12px] font-bold tracking-[0.14em] uppercase py-1.5 px-4">
        Roasted every Tuesday · Free shipping over $35 · Dispatched in 48 h
      </div>

      <div className="bg-bark-950/85 backdrop-blur-md border-b border-bark-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 h-[68px]">
            <a href="#top" className="flex items-center gap-3 group shrink-0">
              <span className="text-honey-400 group-hover:text-honey-300 transition-colors">
                <CupLogo className="w-9 h-9" />
              </span>
              <span className="leading-none">
                <span className="font-display font-semibold text-xl text-cream-100 tracking-tight block">
                  Ember <span className="text-honey-400 italic">&</span> Oak
                </span>
                <span className="text-[10px] tracking-[0.32em] text-cream-500 uppercase mt-1 block">
                  Roasting Co.
                </span>
              </span>
            </a>

            <div className="hidden md:block w-full max-w-md">{searchBox("")}</div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#shop"
                className="hidden sm:block text-sm font-semibold text-cream-300 hover:text-honey-300 transition-colors px-3 py-2"
              >
                The shelf
              </a>
              <button
                onClick={onOpenCart}
                aria-label="Open cart"
                className="relative flex items-center gap-2.5 bg-bark-800 hover:bg-bark-750 border border-bark-600/60 hover:border-honey-500/50 rounded-full pl-4 pr-5 py-2.5 transition-all duration-300 group"
              >
                <BagIcon className="w-5 h-5 text-honey-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-cream-100">Cart</span>
                {cartCount > 0 && (
                  <span
                    key={bumpKey}
                    className="badge-pop absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-honey-500 text-bark-950 text-[12px] font-bold flex items-center justify-center shadow-[0_0_14px_rgba(214,142,47,0.55)]"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden pb-3 -mt-1">{searchBox("")}</div>
        </div>
      </div>
    </header>
  );
}
