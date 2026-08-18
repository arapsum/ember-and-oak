import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FREE_SHIPPING_AT, FLAT_SHIPPING, money } from "../data/products";
import type { CartLine } from "./CartDrawer";
import { BeanIcon, CheckIcon, CloseIcon, FlameIcon, LockIcon, SpinnerIcon, TruckIcon } from "./icons";

type Step = "form" | "processing" | "success";

interface CheckoutModalProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onComplete: () => void;
}

interface Fields {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  card: string;
  expiry: string;
  cvc: string;
}

const EMPTY: Fields = { name: "", email: "", address: "", city: "", zip: "", card: "", expiry: "", cvc: "" };

export default function CheckoutModal({ open, lines, onClose, onComplete }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [orderNo, setOrderNo] = useState("");
  const timer = useRef<number | null>(null);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_AT ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;
  const count = lines.reduce((s, l) => s + l.qty, 0);

  useEffect(() => {
    if (!open) {
      setStep("form");
      setFields(EMPTY);
      setErrors({});
      setOrderNo("");
    }
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);

  if (!open) return null;

  const set = (k: keyof Fields) => (e: ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): boolean => {
    const er: Partial<Fields> = {};
    if (fields.name.trim().length < 2) er.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) er.email = "Enter a valid email";
    if (fields.address.trim().length < 5) er.address = "Enter a street address";
    if (!fields.city.trim()) er.city = "Required";
    if (!fields.zip.trim()) er.zip = "Required";
    if (fields.card.replace(/\s/g, "").length < 12) er.card = "Enter a valid card number";
    if (!/^\d{2}\s?\/\s?\d{2}$/.test(fields.expiry.trim())) er.expiry = "MM / YY";
    if (!/^\d{3,4}$/.test(fields.cvc.trim())) er.cvc = "3–4 digits";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep("processing");
    timer.current = window.setTimeout(() => {
      setOrderNo(`EO-${Date.now().toString(36).toUpperCase().slice(-6)}`);
      setStep("success");
    }, 2100);
  };

  const inputCls = (err?: string) =>
    `w-full bg-bark-800 border rounded-xl px-4 py-3 text-sm text-cream-100 placeholder-cream-500 outline-none transition-all duration-300 ${
      err
        ? "border-rust-500 focus:shadow-[0_0_0_4px_rgba(188,95,54,0.15)]"
        : "border-bark-600/70 focus:border-honey-500/70 focus:shadow-[0_0_0_4px_rgba(214,142,47,0.12)]"
    }`;

  const label = "text-[11px] font-bold tracking-[0.16em] uppercase text-cream-500 block mb-1.5";
  const err = (m?: string) => m && <p className="text-[12px] text-rust-400 font-semibold mt-1">{m}</p>;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="fade-in absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => step !== "processing" && onClose()} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        className="modal-in relative w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[88vh] bg-bark-900 border border-bark-700/70 sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-[0_50px_120px_rgba(0,0,0,0.8)]"
      >
        {step === "form" && (
          <>
            <div className="flex items-center justify-between px-6 sm:px-8 h-[64px] border-b border-bark-700/60 shrink-0">
              <h2 className="font-display font-semibold text-xl text-cream-100">Checkout</h2>
              <button
                onClick={onClose}
                aria-label="Close checkout"
                className="w-9 h-9 rounded-full border border-bark-600/70 text-cream-400 hover:text-cream-100 hover:border-honey-500/60 flex items-center justify-center transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto grid md:grid-cols-[1fr_280px]">
              <form onSubmit={submit} className="p-6 sm:p-8 space-y-5" noValidate>
                <div>
                  <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-honey-500 mb-3">Contact</p>
                  <div className="space-y-3.5">
                    <div>
                      <label className={label} htmlFor="co-name">Full name</label>
                      <input id="co-name" className={inputCls(errors.name)} placeholder="Ada Barista" value={fields.name} onChange={set("name")} />
                      {err(errors.name)}
                    </div>
                    <div>
                      <label className={label} htmlFor="co-email">Email</label>
                      <input id="co-email" type="email" className={inputCls(errors.email)} placeholder="ada@slowmail.com" value={fields.email} onChange={set("email")} />
                      {err(errors.email)}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-honey-500 mb-3">Shipping</p>
                  <div className="space-y-3.5">
                    <div>
                      <label className={label} htmlFor="co-address">Street address</label>
                      <input id="co-address" className={inputCls(errors.address)} placeholder="42 Roastery Lane" value={fields.address} onChange={set("address")} />
                      {err(errors.address)}
                    </div>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className={label} htmlFor="co-city">City</label>
                        <input id="co-city" className={inputCls(errors.city)} placeholder="Portland" value={fields.city} onChange={set("city")} />
                        {err(errors.city)}
                      </div>
                      <div>
                        <label className={label} htmlFor="co-zip">ZIP</label>
                        <input id="co-zip" className={inputCls(errors.zip)} placeholder="97209" value={fields.zip} onChange={set("zip")} />
                        {err(errors.zip)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-honey-500 mb-3 flex items-center gap-2">
                    Payment <LockIcon className="w-3.5 h-3.5 text-cream-500" />
                  </p>
                  <div className="space-y-3.5">
                    <div>
                      <label className={label} htmlFor="co-card">Card number</label>
                      <input id="co-card" inputMode="numeric" className={inputCls(errors.card)} placeholder="4242 4242 4242 4242" value={fields.card} onChange={set("card")} />
                      {err(errors.card)}
                    </div>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className={label} htmlFor="co-expiry">Expiry</label>
                        <input id="co-expiry" className={inputCls(errors.expiry)} placeholder="MM / YY" value={fields.expiry} onChange={set("expiry")} />
                        {err(errors.expiry)}
                      </div>
                      <div>
                        <label className={label} htmlFor="co-cvc">CVC</label>
                        <input id="co-cvc" inputMode="numeric" className={inputCls(errors.cvc)} placeholder="123" value={fields.cvc} onChange={set("cvc")} />
                        {err(errors.cvc)}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-honey-500 hover:bg-honey-400 text-bark-950 font-bold rounded-full py-4 transition-all duration-300 hover:shadow-[0_10px_36px_rgba(214,142,47,0.35)] active:scale-[0.98]"
                >
                  <LockIcon className="w-4 h-4" />
                  Place order · {money(total)}
                </button>
                <p className="text-center text-[12px] text-cream-500 -mt-1">
                  Simulated payment — nothing is charged, ever.
                </p>
              </form>

              <aside className="md:border-l border-t md:border-t-0 border-bark-700/60 bg-bark-850/50 p-6 sm:p-7 h-fit md:sticky md:top-0">
                <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-cream-500 mb-4">
                  Order summary · {count}
                </p>
                <ul className="space-y-3">
                  {lines.map(({ product, qty }) => (
                    <li key={product.id} className="flex items-center gap-3">
                      <img src={product.image} alt="" className="w-11 h-11 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-cream-200 truncate">{product.name}</p>
                        <p className="text-[12px] text-cream-500">× {qty}</p>
                      </div>
                      <span className="text-[13px] font-bold text-cream-200">{money(product.price * qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 text-sm mt-5 pt-4 border-t border-bark-700/60">
                  <div className="flex justify-between text-cream-400"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                  <div className="flex justify-between text-cream-400">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-olive-300 font-semibold" : ""}>{shipping === 0 ? "Free" : money(shipping)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-bark-700/60">
                    <span className="font-bold text-cream-100">Total</span>
                    <span className="font-display font-semibold text-lg text-honey-300">{money(total)}</span>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="flex-1 flex flex-col items-center justify-center py-28 px-8 text-center">
            <span className="text-honey-400"><SpinnerIcon className="w-11 h-11" /></span>
            <p className="font-display font-semibold text-2xl text-cream-100 mt-7">Talking to the roastery…</p>
            <p className="text-cream-500 text-sm mt-2 flex items-center gap-2 justify-center">
              <BeanIcon className="w-3.5 h-3.5 text-honey-600" />
              Reserving your bags from Tuesday's batch
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="overflow-y-auto py-12 px-6 sm:px-12 text-center">
            <span className="badge-pop inline-flex w-20 h-20 rounded-full bg-honey-500/15 border border-honey-500/40 items-center justify-center text-honey-400 shadow-[0_0_50px_rgba(214,142,47,0.25)]">
              <CheckIcon className="w-9 h-9" />
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-cream-100 mt-7">
              Order <span className="text-honey-300 italic">{orderNo}</span> confirmed
            </h2>
            <p className="text-cream-400 mt-3 max-w-md mx-auto text-[15px] leading-relaxed">
              {count} bag{count > 1 ? "s" : ""} · {money(total)}. A confirmation is on its way to{" "}
              <span className="text-cream-200 font-semibold">{fields.email || "your inbox"}</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mt-9 max-w-xl mx-auto">
              {[
                { icon: <FlameIcon className="w-4 h-4" />, t: "Roasted Tuesday" },
                { icon: <BeanIcon className="w-4 h-4" />, t: "Rested & sealed" },
                { icon: <TruckIcon className="w-4 h-4" />, t: "At your door, 2–4 days" },
              ].map((s, i) => (
                <div key={s.t} className="flex-1 flex items-center justify-center gap-2.5 bg-bark-850 border border-bark-700/60 rounded-full px-4 py-3">
                  <span className="text-honey-400">{s.icon}</span>
                  <span className="text-[13px] font-bold text-cream-200">{s.t}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onComplete();
                onClose();
              }}
              className="mt-10 bg-honey-500 hover:bg-honey-400 text-bark-950 font-bold rounded-full px-9 py-4 transition-all duration-300 hover:shadow-[0_10px_36px_rgba(214,142,47,0.35)] active:scale-[0.98]"
            >
              Back to the roastery
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
