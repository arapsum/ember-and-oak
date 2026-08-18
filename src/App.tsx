import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CartDrawer, { CartLine } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import Reveal from "./components/Reveal";
import { CheckIcon, SearchIcon } from "./components/icons";
import { CATEGORIES, Category, PRODUCTS, Product } from "./data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

interface Toast {
  id: number;
  msg: string;
}

const CART_KEY = "ember-oak-cart";

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? (JSON.parse(raw) as Record<string, number>) : {};
    } catch {
      return {};
    }
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bumpKey, setBumpKey] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  // "/" focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // body scroll lock while any overlay is open
  useEffect(() => {
    const locked = cartOpen || checkoutOpen || selected !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, checkoutOpen, selected]);

  const pushToast = useCallback((msg: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, msg }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const setQty = useCallback(
    (id: string, qty: number) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return;
      setCart((c) => {
        const next = { ...c };
        const clamped = Math.min(qty, product.stock);
        if (clamped <= 0) delete next[id];
        else next[id] = clamped;
        return next;
      });
    },
    []
  );

  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setCart((c) => {
        const current = c[product.id] ?? 0;
        return { ...c, [product.id]: Math.min(current + qty, product.stock) };
      });
      setBumpKey((k) => k + 1);
      pushToast(qty > 1 ? `Added ${qty} × ${product.name} to cart` : `Added ${product.name} to cart`);
    },
    [pushToast]
  );

  const addFromModal = useCallback(
    (product: Product, qty: number) => {
      addToCart(product, qty);
      setSelected(null);
    },
    [addToCart]
  );

  const removeLine = useCallback((id: string) => {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }, []);

  const lines: CartLine[] = useMemo(
    () =>
      PRODUCTS.filter((p) => cart[p.id])
        .map((p) => ({ product: p, qty: cart[p.id] })),
    [cart]
  );
  const cartCount = lines.reduce((s, l) => s + l.qty, 0);

  const counts = useMemo(() => {
    const map = new Map<Category, number>();
    CATEGORIES.forEach((c) => map.set(c, c === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length));
    return map;
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      const hay = `${p.name} ${p.origin} ${p.category} ${p.notes.join(" ")} ${p.varietal} ${p.process}`.toLowerCase();
      return hay.includes(q);
    });
    switch (sortKey) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [query, category, sortKey]);

  const shopCategory = (c: Category) => {
    setCategory(c);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div className="grain min-h-screen relative">
      <Header
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        bumpKey={bumpKey}
        onOpenCart={() => setCartOpen(true)}
        searchRef={searchRef}
      />

      <main>
        <Hero />

        {/* ---------- the shelf ---------- */}
        <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 scroll-mt-40">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-[12px] font-bold tracking-[0.28em] uppercase text-honey-500">The roast shelf</p>
                <h2 className="font-display font-semibold text-3xl sm:text-[42px] text-cream-100 leading-tight mt-2.5">
                  This week's coffees
                </h2>
                <p className="text-cream-500 text-sm mt-2">
                  Showing <span className="text-cream-200 font-bold">{visible.length}</span> of {PRODUCTS.length} roasts
                  {query.trim() && (
                    <>
                      {" "}for "<span className="text-honey-300 font-semibold">{query.trim()}</span>"
                    </>
                  )}
                </p>
              </div>

              <label className="flex items-center gap-3 shrink-0">
                <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-cream-500">Sort</span>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="bg-bark-800 border border-bark-600/70 rounded-full px-4 py-2.5 text-sm font-semibold text-cream-200 outline-none focus:border-honey-500/70 transition-colors cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price · low to high</option>
                  <option value="price-desc">Price · high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-wrap gap-2.5 mt-7">
              {CATEGORIES.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 border active:scale-95 ${
                      active
                        ? "bg-honey-500 border-honey-500 text-bark-950 shadow-[0_6px_24px_rgba(214,142,47,0.3)]"
                        : "bg-bark-850 border-bark-600/60 text-cream-300 hover:border-honey-500/50 hover:text-honey-200"
                    }`}
                  >
                    {c === "All" ? "Everything" : c}
                    <span className={`ml-2 text-[12px] ${active ? "text-bark-800" : "text-cream-500"}`}>
                      {counts.get(c)}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {visible.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-9">
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 70}>
                  <ProductCard
                    product={p}
                    qty={cart[p.id] ?? 0}
                    onAdd={(prod) => addToCart(prod, 1)}
                    onSetQty={setQty}
                    onOpen={setSelected}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-9 border border-dashed border-bark-600 rounded-2xl py-20 px-6 text-center">
              <span className="inline-flex w-16 h-16 rounded-full bg-bark-800 border border-bark-700 items-center justify-center text-cream-500">
                <SearchIcon className="w-7 h-7" />
              </span>
              <p className="font-display font-semibold text-2xl text-cream-100 mt-6">No beans match that</p>
              <p className="text-cream-500 text-sm mt-2 max-w-sm mx-auto">
                We couldn't find anything for "{query.trim()}" in {category === "All" ? "any category" : category}. Try
                "bergamot", "espresso" — or clear the filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-7 bg-bark-800 hover:bg-honey-500 border border-bark-600 hover:border-honey-500 text-cream-100 hover:text-bark-950 font-bold text-sm rounded-full px-7 py-3 transition-all duration-300 active:scale-95"
              >
                Clear search &amp; filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer onShopCategory={shopCategory} />

      {/* overlays */}
      <ProductModal
        product={selected}
        inCartQty={selected ? cart[selected.id] ?? 0 : 0}
        onClose={() => setSelected(null)}
        onAdd={addFromModal}
      />
      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        onClose={() => setCheckoutOpen(false)}
        onComplete={() => {
          setCart({});
          pushToast("Order placed — the roastery thanks you");
        }}
      />

      {/* toasts */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center gap-2.5 pointer-events-none w-full px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="toast-in flex items-center gap-3 bg-bark-800 border border-honey-500/40 text-cream-100 text-sm font-semibold rounded-full pl-4 pr-6 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.6)]"
          >
            <span className="w-6 h-6 rounded-full bg-honey-500 text-bark-950 flex items-center justify-center shrink-0">
              <CheckIcon className="w-3.5 h-3.5" />
            </span>
            {t.msg}
            <button
              onClick={() => {
                setToasts((x) => x.filter((y) => y.id !== t.id));
                setCartOpen(true);
              }}
              className="pointer-events-auto text-honey-300 hover:text-honey-200 font-bold ml-1 underline underline-offset-4 decoration-honey-500/40 transition-colors"
            >
              View cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
