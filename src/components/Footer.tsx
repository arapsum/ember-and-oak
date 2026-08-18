import { useState } from "react";
import { CATEGORIES, Category } from "../data/products";
import { ArrowRightIcon, CheckIcon, CupLogo } from "./icons";

interface FooterProps {
  onShopCategory: (c: Category) => void;
}

export default function Footer({ onShopCategory }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState(false);

  const subscribe = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubError(true);
      return;
    }
    setSubError(false);
    setSubscribed(true);
  };

  return (
    <footer className="relative mt-24 border-t border-bark-700/60 bg-bark-900/60 overflow-hidden">
      <div
        className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(214,142,47,0.08) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="text-honey-400"><CupLogo className="w-9 h-9" /></span>
            <span className="leading-none">
              <span className="font-display font-semibold text-xl text-cream-100 block">
                Ember <span className="text-honey-400 italic">&</span> Oak
              </span>
              <span className="text-[10px] tracking-[0.32em] text-cream-500 uppercase mt-1 block">Roasting Co.</span>
            </span>
          </div>
          <p className="text-cream-500 text-sm leading-relaxed mt-5 max-w-sm">
            A two-drum roastery in a converted timber warehouse. We buy small, roast slow, and ship
            before the beans have even finished telling their story.
          </p>
          <div className="mt-6 space-y-1.5 text-[13px]">
            <p className="text-cream-400"><span className="text-honey-400 font-bold">Cupping bar:</span> Sat 10:00, free &amp; open</p>
            <p className="text-cream-400"><span className="text-honey-400 font-bold">Roastery:</span> 14 Kiln St, Portland, OR</p>
            <p className="text-cream-400"><span className="text-honey-400 font-bold">Doors:</span> Mon–Fri 8–16 · Sat 9–14</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-cream-500">The shelf</p>
          <ul className="mt-4 space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <button
                  onClick={() => onShopCategory(c)}
                  className="group text-sm font-semibold text-cream-300 hover:text-honey-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-bark-600 group-hover:bg-honey-400 transition-colors" />
                  {c === "All" ? "Everything" : c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-cream-500">First pour on us</p>
          <p className="text-cream-400 text-sm mt-4 leading-relaxed">
            Roast notes, brew guides and 10% off your first bag — roughly one email a month, never more.
          </p>
          {subscribed ? (
            <p className="mt-5 flex items-center gap-2.5 text-olive-300 font-bold text-sm bg-olive-500/10 border border-olive-500/25 rounded-full px-5 py-3.5">
              <CheckIcon className="w-4 h-4" /> You're on the list — check your inbox.
            </p>
          ) : (
            <>
              <div className="flex gap-2.5 mt-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && subscribe()}
                  placeholder="you@slowmail.com"
                  className={`flex-1 bg-bark-800 border rounded-full px-5 py-3 text-sm text-cream-100 placeholder-cream-500 outline-none transition-all duration-300 ${
                    subError ? "border-rust-500" : "border-bark-600/70 focus:border-honey-500/70"
                  }`}
                />
                <button
                  onClick={subscribe}
                  aria-label="Subscribe"
                  className="group bg-honey-500 hover:bg-honey-400 text-bark-950 rounded-full px-5 py-3 transition-all duration-300 active:scale-95"
                >
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
              {subError && <p className="text-[12px] text-rust-400 font-semibold mt-2 ml-2">That email doesn't look quite brewed.</p>}
            </>
          )}
        </div>
      </div>

      <div className="relative border-t border-bark-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12.5px] text-cream-500">
          <p>© 2026 Ember &amp; Oak Roasting Co. All beans reserved.</p>
          <p className="text-cream-600">Demo storefront — no real orders, payments or beans were harmed.</p>
        </div>
      </div>
    </footer>
  );
}
