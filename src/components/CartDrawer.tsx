import { useEffect } from "react";
import { FREE_SHIPPING_AT, FLAT_SHIPPING, Product, money } from "../data/products";
import { ArrowRightIcon, BagIcon, BeanIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon } from "./icons";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, lines, onClose, onSetQty, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;
  const progress = Math.min(1, subtotal / FREE_SHIPPING_AT);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-bark-900 border-l border-bark-700/70 flex flex-col shadow-[-30px_0_80px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-[68px] border-b border-bark-700/60 shrink-0">
          <h2 className="font-display font-semibold text-xl text-cream-100 flex items-center gap-3">
            <span className="text-honey-400"><BagIcon className="w-5 h-5" /></span>
            Your cart
            {count > 0 && (
              <span className="text-[12px] font-body font-bold bg-bark-800 border border-bark-600 text-cream-300 rounded-full px-2.5 py-1">
                {count} item{count > 1 ? "s" : ""}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full border border-bark-600/70 text-cream-400 hover:text-cream-100 hover:border-honey-500/60 flex items-center justify-center transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {lines.length > 0 && (
          <div className="px-6 pt-5 shrink-0">
            <div className="flex items-center gap-2.5 text-[13px] font-semibold mb-2.5">
              <TruckIcon className="w-4 h-4 text-honey-400" />
              {shipping === 0 ? (
                <span className="text-olive-300 flex items-center gap-1.5">
                  <CheckIcon className="w-3.5 h-3.5" /> Free shipping unlocked
                </span>
              ) : (
                <span className="text-cream-400">
                  <span className="text-honey-300">{money(FREE_SHIPPING_AT - subtotal)}</span> away from free shipping
                </span>
              )}
            </div>
            <div className="h-1.5 bg-bark-750 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-honey-600 to-honey-400 transition-all duration-700 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-5">
              <span className="w-20 h-20 rounded-full bg-bark-800 border border-bark-700 flex items-center justify-center text-honey-500">
                <BeanIcon className="w-9 h-9" />
              </span>
              <div>
                <p className="font-display font-semibold text-xl text-cream-100">Nothing brewing yet</p>
                <p className="text-cream-500 text-sm mt-1.5 max-w-[240px]">
                  Your cart is empty. The shelf, however, is full of very good beans.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-bold text-honey-300 border border-honey-500/40 hover:bg-honey-500 hover:text-bark-950 rounded-full px-6 py-3 transition-all duration-300"
              >
                Browse the shelf
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex gap-4 bg-bark-850 border border-bark-700/50 rounded-xl p-3.5 group/item transition-colors hover:border-bark-600"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display font-semibold text-cream-100 leading-tight">{product.name}</p>
                        <p className="text-[12px] text-cream-500 mt-0.5">{product.weightG} g · {money(product.price)} each</p>
                      </div>
                      <button
                        onClick={() => onRemove(product.id)}
                        aria-label={`Remove ${product.name} from cart`}
                        className="text-cream-500 hover:text-rust-400 p-1 -mr-1 transition-colors opacity-60 group-hover/item:opacity-100"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center gap-1 bg-bark-800 border border-bark-600/70 rounded-full p-0.5">
                        <button
                          onClick={() => onSetQty(product.id, qty - 1)}
                          aria-label={`Decrease ${product.name} quantity`}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-cream-300 hover:bg-bark-700 hover:text-honey-300 transition-colors active:scale-90"
                        >
                          <MinusIcon className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-cream-100 tabular-nums">{qty}</span>
                        <button
                          onClick={() => onSetQty(product.id, qty + 1)}
                          disabled={qty >= product.stock}
                          aria-label={`Increase ${product.name} quantity`}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-cream-300 hover:bg-bark-700 hover:text-honey-300 transition-colors active:scale-90 disabled:opacity-30"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-display font-semibold text-cream-100">{money(product.price * qty)}</p>
                    </div>
                    {qty >= product.stock && (
                      <p className="text-[11px] text-rust-400 font-bold mt-1.5">Max stock reached</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-bark-700/60 px-6 py-5 shrink-0 bg-bark-850/60">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-cream-400">
                <span>Subtotal</span>
                <span className="font-semibold text-cream-200">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cream-400">
                <span>Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? "text-olive-300" : "text-cream-200"}`}>
                  {shipping === 0 ? "Free" : money(shipping)}
                </span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-bark-700/60">
                <span className="font-bold text-cream-100">Total</span>
                <span className="font-display font-semibold text-xl text-honey-300">{money(total)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="group w-full mt-5 flex items-center justify-center gap-3 bg-honey-500 hover:bg-honey-400 text-bark-950 font-bold rounded-full py-4 transition-all duration-300 hover:shadow-[0_10px_36px_rgba(214,142,47,0.35)] active:scale-[0.98]"
            >
              Checkout · {money(total)}
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="text-center text-[12px] text-cream-500 mt-3">
              Demo checkout — no real payment is processed.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
