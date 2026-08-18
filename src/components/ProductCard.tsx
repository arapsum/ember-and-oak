import { Product, money, roastName } from "../data/products";
import { BeanIcon, MinusIcon, PlusIcon, StarIcon } from "./icons";

interface ProductCardProps {
  product: Product;
  qty: number;
  onAdd: (p: Product) => void;
  onSetQty: (id: string, qty: number) => void;
  onOpen: (p: Product) => void;
}

export default function ProductCard({ product, qty, onAdd, onSetQty, onOpen }: ProductCardProps) {
  const maxed = qty >= product.stock;

  return (
    <article className="group relative h-full bg-bark-850 border border-bark-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-honey-500/40 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.75)] flex flex-col">
      <button
        onClick={() => onOpen(product)}
        className="relative block w-full text-left"
        aria-label={`View details for ${product.name}`}
      >
        <div className="relative aspect-square overflow-hidden bg-bark-800">
          <img
            src={product.image}
            alt={`${product.name} coffee bag`}
            width={800}
            height={800}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark-950/70 via-transparent to-bark-950/20" />

          {product.badge && (
            <span className="absolute top-3.5 left-3.5 text-[12px] font-bold tracking-[0.14em] uppercase bg-honey-500 text-bark-950 rounded-full px-3 py-1.5 shadow-lg">
              {product.badge}
            </span>
          )}

          <span className="absolute bottom-3.5 left-3.5 flex items-center gap-2 text-[12px] font-bold tracking-[0.12em] uppercase text-cream-200 bg-bark-950/70 backdrop-blur border border-bark-600/50 rounded-full px-3 py-1.5">
            <BeanIcon className="w-3 h-3 text-honey-400" />
            {roastName(product.roast)} roast
          </span>

          <span className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 text-[12px] font-bold text-cream-100 bg-bark-950/70 backdrop-blur border border-bark-600/50 rounded-full px-2.5 py-1.5">
            <StarIcon className="w-3.5 h-3.5 text-honey-400" />
            {product.rating}
            <span className="text-cream-500 font-semibold">({product.reviews})</span>
          </span>
        </div>

        <div className="p-5 pb-0">
          <p className="text-[12px] font-bold tracking-[0.22em] uppercase text-honey-500">
            {product.origin}
          </p>
          <h3 className="font-display font-semibold text-[22px] text-cream-100 leading-snug mt-1.5 group-hover:text-honey-200 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.notes.map((n) => (
              <span
                key={n}
                className="text-[12px] font-semibold text-cream-400 bg-bark-800 border border-bark-700/70 rounded-full px-2.5 py-1"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </button>

      <div className="p-5 pt-4 mt-auto flex items-center justify-between gap-3">
        <div>
          <p className="font-display font-semibold text-xl text-cream-100">{money(product.price)}</p>
          <p className="text-[12px] text-cream-500 mt-0.5">
            {product.weightG} g whole bean
            {product.stock <= 6 && (
              <span className="text-rust-400 font-bold"> · only {product.stock} left</span>
            )}
          </p>
        </div>

        {qty === 0 ? (
          <button
            onClick={() => onAdd(product)}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-11 min-w-[118px] items-center justify-center gap-2 whitespace-nowrap bg-bark-800 hover:bg-honey-500 border border-bark-600 hover:border-honey-500 text-cream-100 hover:text-bark-950 font-bold text-sm rounded-full px-4 transition-all duration-300 active:scale-95"
          >
            <PlusIcon className="w-4 h-4" />
            Add
          </button>
        ) : (
          <div
            role="group"
            aria-label={`${product.name} quantity controls`}
            className="flex h-11 min-w-[118px] items-center justify-center gap-1 bg-bark-800 border border-honey-500/50 rounded-full p-1"
          >
            <button
              onClick={() => onSetQty(product.id, qty - 1)}
              aria-label={`Decrease ${product.name} quantity`}
              className="w-9 h-9 rounded-full flex items-center justify-center text-cream-200 hover:bg-bark-700 hover:text-honey-300 transition-colors active:scale-90"
            >
              <MinusIcon className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center font-bold text-cream-100 text-sm tabular-nums">{qty}</span>
            <button
              onClick={() => onSetQty(product.id, qty + 1)}
              disabled={maxed}
              aria-label={`Increase ${product.name} quantity`}
              className="w-9 h-9 rounded-full flex items-center justify-center text-cream-200 hover:bg-bark-700 hover:text-honey-300 transition-colors active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <PlusIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
