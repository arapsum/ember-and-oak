import { useEffect, useState } from "react";
import { Product, money, roastName } from "../data/products";
import { BagIcon, BeanIcon, CloseIcon, LeafIcon, MinusIcon, MountainIcon, PlusIcon, StarIcon } from "./icons";

interface ProductModalProps {
  product: Product | null;
  inCartQty: number;
  onClose: () => void;
  onAdd: (p: Product, qty: number) => void;
}

export default function ProductModal({ product, inCartQty, onClose, onAdd }: ProductModalProps) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  const remaining = Math.max(0, product.stock - inCartQty);
  const maxAdd = Math.max(1, remaining);
  const effectiveQty = Math.min(qty, maxAdd);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="fade-in absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        className="modal-in relative w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[86vh] bg-bark-900 border border-bark-700/70 sm:rounded-3xl rounded-t-3xl overflow-hidden grid md:grid-cols-2 shadow-[0_50px_120px_rgba(0,0,0,0.8)]"
      >
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bark-950/70 backdrop-blur border border-bark-600/60 text-cream-300 hover:text-cream-100 hover:border-honey-500/60 flex items-center justify-center transition-colors"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <div className="relative h-56 md:h-auto">
          <img
            src={product.image}
            alt={`${product.name} coffee bag`}
            width={800}
            height={1000}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark-950/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-bark-900/20" />
          {product.badge && (
            <span className="absolute top-4 left-4 text-[12px] font-bold tracking-[0.14em] uppercase bg-honey-500 text-bark-950 rounded-full px-3 py-1.5">
              {product.badge}
            </span>
          )}
        </div>

        <div className="overflow-y-auto p-6 sm:p-8">
          <p className="text-[12px] font-bold tracking-[0.24em] uppercase text-honey-500">
            {product.category} · {product.origin}
          </p>
          <div className="flex items-start justify-between gap-4 mt-2.5">
            <h2 className="font-display font-semibold text-3xl sm:text-[34px] leading-tight text-cream-100">
              {product.name}
            </h2>
            <span className="flex items-center gap-1.5 text-sm font-bold text-cream-100 bg-bark-800 border border-bark-700 rounded-full px-3 py-1.5 shrink-0 mt-1.5">
              <StarIcon className="w-4 h-4 text-honey-400" />
              {product.rating}
              <span className="text-cream-500 font-semibold text-[12px]">({product.reviews})</span>
            </span>
          </div>

          <p className="font-display font-semibold text-2xl text-honey-300 mt-3">
            {money(product.price)}
            <span className="text-cream-500 text-sm font-body font-semibold"> / {product.weightG} g whole bean</span>
          </p>

          <p className="text-cream-400 leading-relaxed text-[15px] mt-5">{product.description}</p>

          <div className="flex flex-wrap gap-2 mt-5">
            {product.notes.map((n) => (
              <span
                key={n}
                className="text-[12px] font-bold text-honey-200 bg-honey-500/10 border border-honey-500/30 rounded-full px-3 py-1.5"
              >
                {n}
              </span>
            ))}
          </div>

          <dl className="grid grid-cols-2 gap-px bg-bark-700/50 border border-bark-700/50 rounded-xl overflow-hidden mt-6 text-sm">
            {[
              { k: "Process", v: product.process, icon: <BeanIcon className="w-4 h-4" /> },
              { k: "Altitude", v: product.altitude, icon: <MountainIcon className="w-4 h-4" /> },
              { k: "Varietal", v: product.varietal, icon: <LeafIcon className="w-4 h-4" /> },
              { k: "Roast level", v: roastName(product.roast), icon: <RoastDots level={product.roast} /> },
            ].map((row) => (
              <div key={row.k} className="bg-bark-850 px-4 py-3.5">
                <dt className="flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase font-bold text-cream-500">
                  <span className="text-honey-500">{row.icon}</span>
                  {row.k}
                </dt>
                <dd className="text-cream-200 font-semibold mt-1.5">{row.v}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-7">
            <div className="self-start flex items-center gap-1 h-[52px] bg-bark-800 border border-bark-600 rounded-full p-1.5 shrink-0">
              <button
                onClick={() => setQty(Math.max(1, effectiveQty - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-9 rounded-full flex items-center justify-center text-cream-200 hover:bg-bark-700 hover:text-honey-300 transition-colors active:scale-90"
              >
                <MinusIcon />
              </button>
              <span className="w-8 text-center font-bold text-lg text-cream-100 tabular-nums">{effectiveQty}</span>
              <button
                onClick={() => setQty(Math.min(maxAdd, effectiveQty + 1))}
                disabled={effectiveQty >= maxAdd}
                aria-label="Increase quantity"
                className="w-9 h-9 rounded-full flex items-center justify-center text-cream-200 hover:bg-bark-700 hover:text-honey-300 transition-colors active:scale-90 disabled:opacity-30"
              >
                <PlusIcon />
              </button>
            </div>

            <button
              onClick={() => onAdd(product, effectiveQty)}
              className="group w-full sm:flex-1 min-w-0 h-[52px] flex items-center justify-center gap-3 bg-honey-500 hover:bg-honey-400 text-bark-950 font-bold text-sm rounded-full px-4 sm:px-6 whitespace-nowrap transition-all duration-300 hover:shadow-[0_10px_32px_rgba(214,142,47,0.35)] active:scale-[0.98]"
            >
              <BagIcon className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">
                Add {effectiveQty > 1 ? `${effectiveQty} ` : ""}to cart · {money(product.price * effectiveQty)}
              </span>
            </button>
          </div>

          {inCartQty > 0 && (
            <p className="text-[13px] text-olive-300 font-semibold mt-3">
              Already in your cart: {inCartQty} bag{inCartQty > 1 ? "s" : ""}
              {remaining <= 0 ? " — that's all the stock we have right now." : ` · ${remaining} left in stock`}
            </p>
          )}

          <div className="flex gap-3.5 mt-6 bg-olive-500/10 border border-olive-500/25 rounded-xl px-5 py-4">
            <LeafIcon className="w-5 h-5 text-olive-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] font-bold tracking-[0.18em] uppercase text-olive-300">Brew tip</p>
              <p className="text-[13px] text-cream-300 leading-relaxed mt-1">{product.brewTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoastDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i <= level ? "bg-honey-400" : "bg-bark-600"}`}
        />
      ))}
    </span>
  );
}
