import { useEffect, useMemo, useRef, useState } from "react";
import {
  BREW_METHODS,
  CATEGORIES,
  Category,
  BrewMethod,
  money,
  Product,
  PRODUCTS,
  roastName,
} from "../data/products";
import {
  BeanIcon,
  CheckIcon,
  CloseIcon,
  FilterIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from "./icons";
import Reveal from "./Reveal";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";
type PriceBand = "all" | "under17" | "17to19" | "over19";
type FlavorFamily = "Floral" | "Fruit-forward" | "Chocolate" | "Nutty" | "Sweet";

const ROAST_LEVELS = [1, 2, 3, 4, 5] as const;
const FLAVOR_FAMILIES: FlavorFamily[] = ["Floral", "Fruit-forward", "Chocolate", "Nutty", "Sweet"];
const PRICE_BANDS: { value: PriceBand; label: string }[] = [
  { value: "all", label: "Any price" },
  { value: "under17", label: "Under $17" },
  { value: "17to19", label: "$17–19" },
  { value: "over19", label: "$19 and up" },
];

const flavorKeywords: Record<FlavorFamily, string[]> = {
  Floral: ["jasmine", "orange zest"],
  "Fruit-forward": ["apricot", "apple", "blackcurrant", "grapefruit", "orange"],
  Chocolate: ["cacao", "chocolate", "molasses", "toffee"],
  Nutty: ["hazelnut", "almond", "walnut"],
  Sweet: ["caramel", "demerara", "honey", "toffee", "molasses"],
};

interface CataloguePageProps {
  query: string;
  onQueryChange: (query: string) => void;
  cart: Record<string, number>;
  onAdd: (product: Product) => void;
  onSetQty: (id: string, qty: number) => void;
  onOpen: (product: Product) => void;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

interface CatalogueFiltersProps {
  category: Category;
  roastLevels: number[];
  brewMethods: BrewMethod[];
  flavors: FlavorFamily[];
  priceBand: PriceBand;
  onCategoryChange: (category: Category) => void;
  onRoastToggle: (roast: number) => void;
  onBrewToggle: (method: BrewMethod) => void;
  onFlavorToggle: (flavor: FlavorFamily) => void;
  onPriceChange: (price: PriceBand) => void;
  onClear: () => void;
}

interface ProductLedgerRowProps {
  product: Product;
  qty: number;
  onAdd: (product: Product) => void;
  onSetQty: (id: string, qty: number) => void;
  onOpen: (product: Product) => void;
}

function readCatalogueState() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") as Category | null;
  const roastLevels = (params.get("roast") ?? "")
    .split(",")
    .map(Number)
    .filter((roast) => ROAST_LEVELS.includes(roast as (typeof ROAST_LEVELS)[number]));
  const brewMethods = (params.get("brew") ?? "")
    .split(",")
    .filter((method): method is BrewMethod => BREW_METHODS.includes(method as BrewMethod));
  const flavors = (params.get("flavor") ?? "")
    .split(",")
    .filter((flavor): flavor is FlavorFamily => FLAVOR_FAMILIES.includes(flavor as FlavorFamily));
  const price = params.get("price") as PriceBand | null;
  const sort = params.get("sort") as SortKey | null;

  return {
    category: category && CATEGORIES.includes(category) ? category : "All",
    roastLevels,
    brewMethods,
    flavors,
    priceBand: price && PRICE_BANDS.some((band) => band.value === price) ? price : "all",
    sortKey: sort && ["featured", "price-asc", "price-desc", "rating"].includes(sort) ? sort : "featured",
  } satisfies {
    category: Category;
    roastLevels: number[];
    brewMethods: BrewMethod[];
    flavors: FlavorFamily[];
    priceBand: PriceBand;
    sortKey: SortKey;
  };
}

function matchesFlavorFamily(product: Product, flavor: FlavorFamily) {
  return product.notes.some((note) => {
    const normalized = note.toLowerCase();
    return flavorKeywords[flavor].some((keyword) => normalized.includes(keyword));
  });
}

function FilterOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-9 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm font-semibold transition-colors ${
        active ? "bg-honey-500 text-bark-950" : "text-cream-300 hover:bg-bark-800 hover:text-honey-200"
      }`}
    >
      <span>{label}</span>
      {active && <CheckIcon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

function CatalogueFilters({
  category,
  roastLevels,
  brewMethods,
  flavors,
  priceBand,
  onCategoryChange,
  onRoastToggle,
  onBrewToggle,
  onFlavorToggle,
  onPriceChange,
  onClear,
}: CatalogueFiltersProps) {
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="text-[12px] font-bold tracking-[0.2em] uppercase text-cream-500">Coffee type</legend>
        <div className="mt-3 space-y-1">
          {CATEGORIES.map((item) => (
            <FilterOption
              key={item}
              label={item === "All" ? "Everything" : item}
              active={category === item}
              onClick={() => onCategoryChange(item)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[12px] font-bold tracking-[0.2em] uppercase text-cream-500">Roast level</legend>
        <div className="mt-3 space-y-1">
          {ROAST_LEVELS.map((roast) => (
            <FilterOption
              key={roast}
              label={roastName(roast)}
              active={roastLevels.includes(roast)}
              onClick={() => onRoastToggle(roast)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[12px] font-bold tracking-[0.2em] uppercase text-cream-500">Brew method</legend>
        <div className="mt-3 space-y-1">
          {BREW_METHODS.map((method) => (
            <FilterOption
              key={method}
              label={method}
              active={brewMethods.includes(method)}
              onClick={() => onBrewToggle(method)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[12px] font-bold tracking-[0.2em] uppercase text-cream-500">Flavor family</legend>
        <div className="mt-3 space-y-1">
          {FLAVOR_FAMILIES.map((flavor) => (
            <FilterOption
              key={flavor}
              label={flavor}
              active={flavors.includes(flavor)}
              onClick={() => onFlavorToggle(flavor)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[12px] font-bold tracking-[0.2em] uppercase text-cream-500">Price</legend>
        <div className="mt-3 space-y-1">
          {PRICE_BANDS.map((band) => (
            <FilterOption
              key={band.value}
              label={band.label}
              active={priceBand === band.value}
              onClick={() => onPriceChange(band.value)}
            />
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onClear}
        className="text-sm font-bold text-honey-300 hover:text-honey-200 underline underline-offset-4 decoration-honey-500/40 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}

function QuantityControl({ product, qty, onAdd, onSetQty }: { product: Product; qty: number; onAdd: (product: Product) => void; onSetQty: (id: string, qty: number) => void }) {
  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => onAdd(product)}
        aria-label={`Add ${product.name} to cart`}
        className="flex h-11 min-w-[118px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-bark-600 bg-bark-800 px-4 text-sm font-bold text-cream-100 transition-all hover:border-honey-500 hover:bg-honey-500 hover:text-bark-950 active:scale-95"
      >
        <PlusIcon className="w-4 h-4" />
        Add
      </button>
    );
  }

  return (
    <div role="group" aria-label={`${product.name} quantity controls`} className="flex h-11 min-w-[118px] items-center justify-center gap-1 rounded-full border border-honey-500/50 bg-bark-800 p-1">
      <button
        type="button"
        onClick={() => onSetQty(product.id, qty - 1)}
        aria-label={`Decrease ${product.name} quantity`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-cream-200 transition-colors hover:bg-bark-700 hover:text-honey-300 active:scale-90"
      >
        <MinusIcon className="w-3.5 h-3.5" />
      </button>
      <span className="w-7 text-center text-sm font-bold tabular-nums text-cream-100">{qty}</span>
      <button
        type="button"
        onClick={() => onSetQty(product.id, qty + 1)}
        disabled={qty >= product.stock}
        aria-label={`Increase ${product.name} quantity`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-cream-200 transition-colors hover:bg-bark-700 hover:text-honey-300 disabled:opacity-30 disabled:hover:bg-transparent active:scale-90"
      >
        <PlusIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function ProductLedgerRow({ product, qty, onAdd, onSetQty, onOpen }: ProductLedgerRowProps) {
  return (
    <article className="rounded-2xl border border-bark-700/60 bg-bark-850/70 p-3.5 transition-colors hover:border-honey-500/35 lg:rounded-none lg:border-x-0 lg:border-b lg:border-t-0 lg:bg-transparent lg:p-0 lg:py-5">
      <div className="lg:grid lg:grid-cols-[minmax(280px,1.45fr)_minmax(120px,.65fr)_minmax(150px,.8fr)_auto] lg:items-center lg:gap-5">
        <div className="flex min-w-0 gap-4">
          <button
            type="button"
            onClick={() => onOpen(product)}
            aria-label={`View details for ${product.name}`}
            className="group/image h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-bark-700/70 bg-bark-800 sm:h-28 sm:w-28"
          >
            <img
              src={product.image}
              alt={`${product.name} coffee bag`}
              width={800}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover/image:scale-105"
            />
          </button>
          <div className="min-w-0 py-1">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-honey-500">{product.origin}</p>
            <button
              type="button"
              onClick={() => onOpen(product)}
              className="mt-1 text-left font-display text-[22px] font-semibold leading-snug text-cream-100 transition-colors hover:text-honey-200"
            >
              {product.name}
            </button>
            {product.badge && <span className="ml-2 inline-flex rounded-full bg-honey-500 px-2 py-1 align-middle text-[12px] font-bold uppercase tracking-[0.12em] text-bark-950">{product.badge}</span>}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.notes.map((note) => (
                <span key={note} className="rounded-full border border-bark-700/70 bg-bark-800 px-2.5 py-1 text-[12px] font-semibold text-cream-400">
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-cream-300 lg:mt-0 lg:block">
          <span className="flex items-center gap-2 font-semibold text-cream-200">
            <BeanIcon className="w-4 h-4 text-honey-400" />
            {roastName(product.roast)}
          </span>
          <span className="text-cream-500 lg:mt-1 lg:block">roast</span>
        </div>

        <div className="mt-3 lg:mt-0">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-cream-500">Brew for</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {product.brewMethods.map((method) => (
              <span key={method} className="rounded-full border border-bark-700/70 bg-bark-800 px-2.5 py-1 text-[12px] font-semibold text-cream-300">
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 lg:mt-0 lg:flex-col lg:items-end lg:gap-2">
          <div className="lg:text-right">
            <p className="font-display text-xl font-semibold text-cream-100">{money(product.price)}</p>
            <p className="mt-0.5 text-[12px] text-cream-500">
              {product.weightG} g whole bean
              {product.stock <= 6 && <span className="font-bold text-rust-400"> · only {product.stock} left</span>}
            </p>
            <p className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-cream-400 lg:justify-end">
              <StarIcon className="w-3.5 h-3.5 text-honey-400" /> {product.rating} <span className="text-cream-500">({product.reviews})</span>
            </p>
          </div>
          <QuantityControl product={product} qty={qty} onAdd={onAdd} onSetQty={onSetQty} />
        </div>
      </div>
    </article>
  );
}

function CatalogueSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading catalogue" role="status">
      {[0, 1, 2].map((item) => (
        <div key={item} className="flex gap-4 rounded-2xl border border-bark-700/60 bg-bark-850/60 p-4 lg:rounded-none lg:border-x-0 lg:border-b lg:border-t-0 lg:bg-transparent">
          <div className="h-24 w-24 shrink-0 animate-pulse rounded-xl bg-bark-800 sm:h-28 sm:w-28" />
          <div className="flex-1 space-y-3 py-2">
            <div className="h-3 w-28 animate-pulse rounded bg-bark-800" />
            <div className="h-6 max-w-xs animate-pulse rounded bg-bark-800" />
            <div className="h-4 max-w-sm animate-pulse rounded bg-bark-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CataloguePage({
  query,
  onQueryChange,
  cart,
  onAdd,
  onSetQty,
  onOpen,
  loading = false,
  error = null,
  onRetry,
}: CataloguePageProps) {
  const initial = useMemo(readCatalogueState, []);
  const [category, setCategory] = useState<Category>(initial.category);
  const [roastLevels, setRoastLevels] = useState<number[]>(initial.roastLevels);
  const [brewMethods, setBrewMethods] = useState<BrewMethod[]>(initial.brewMethods);
  const [flavors, setFlavors] = useState<FlavorFamily[]>(initial.flavors);
  const [priceBand, setPriceBand] = useState<PriceBand>(initial.priceBand);
  const [sortKey, setSortKey] = useState<SortKey>(initial.sortKey);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterCloseRef = useRef<HTMLButtonElement>(null);
  const firstSync = useRef(true);
  const popStateSync = useRef(false);
  const previousState = useRef({ query, category, roastLevels, brewMethods, flavors, priceBand, sortKey });

  const filterCount = Number(category !== "All") + roastLevels.length + brewMethods.length + flavors.length + Number(priceBand !== "all");

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "All") params.set("category", category);
    if (roastLevels.length) params.set("roast", roastLevels.join(","));
    if (brewMethods.length) params.set("brew", brewMethods.join(","));
    if (flavors.length) params.set("flavor", flavors.join(","));
    if (priceBand !== "all") params.set("price", priceBand);
    if (sortKey !== "featured") params.set("sort", sortKey);

    const nextUrl = params.toString() ? `/catalogue?${params.toString()}` : "/catalogue";
    if (window.location.pathname !== "/catalogue") return;
    const previous = previousState.current;
    const onlyQueryChanged =
      previous.query !== query &&
      previous.category === category &&
      previous.roastLevels.join(",") === roastLevels.join(",") &&
      previous.brewMethods.join(",") === brewMethods.join(",") &&
      previous.flavors.join(",") === flavors.join(",") &&
      previous.priceBand === priceBand &&
      previous.sortKey === sortKey;

    if (firstSync.current || popStateSync.current || onlyQueryChanged) {
      window.history.replaceState(null, "", nextUrl);
      firstSync.current = false;
      popStateSync.current = false;
    } else {
      window.history.pushState(null, "", nextUrl);
    }
    previousState.current = { query, category, roastLevels, brewMethods, flavors, priceBand, sortKey };
  }, [brewMethods, category, flavors, priceBand, query, roastLevels, sortKey]);

  useEffect(() => {
    const syncFromUrl = () => {
      const next = readCatalogueState();
      popStateSync.current = true;
      setCategory(next.category);
      setRoastLevels(next.roastLevels);
      setBrewMethods(next.brewMethods);
      setFlavors(next.flavors);
      setPriceBand(next.priceBand);
      setSortKey(next.sortKey);
      onQueryChange(new URLSearchParams(window.location.search).get("q") ?? "");
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [onQueryChange]);

  useEffect(() => {
    if (!filtersOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => filterCloseRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [filtersOpen]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((product) => {
      const searchable = `${product.name} ${product.origin} ${product.category} ${product.notes.join(" ")} ${product.varietal} ${product.process} ${product.brewMethods.join(" ")}`.toLowerCase();
      const matchesSearch = !q || searchable.includes(q);
      const matchesCategory = category === "All" || product.category === category;
      const matchesRoast = !roastLevels.length || roastLevels.includes(product.roast);
      const matchesBrew = !brewMethods.length || brewMethods.some((method) => product.brewMethods.includes(method));
      const matchesFlavor = !flavors.length || flavors.some((flavor) => matchesFlavorFamily(product, flavor));
      const matchesPrice =
        priceBand === "all" ||
        (priceBand === "under17" && product.price < 17) ||
        (priceBand === "17to19" && product.price >= 17 && product.price < 19) ||
        (priceBand === "over19" && product.price >= 19);
      return matchesSearch && matchesCategory && matchesRoast && matchesBrew && matchesFlavor && matchesPrice;
    });

    if (sortKey === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortKey === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortKey === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [brewMethods, category, flavors, priceBand, query, roastLevels, sortKey]);

  const clearFilters = () => {
    onQueryChange("");
    setCategory("All");
    setRoastLevels([]);
    setBrewMethods([]);
    setFlavors([]);
    setPriceBand("all");
  };

  const toggle = <T,>(value: T, values: T[], setter: (next: T[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const filters = (
    <CatalogueFilters
      category={category}
      roastLevels={roastLevels}
      brewMethods={brewMethods}
      flavors={flavors}
      priceBand={priceBand}
      onCategoryChange={setCategory}
      onRoastToggle={(roast) => toggle(roast, roastLevels, setRoastLevels)}
      onBrewToggle={(method) => toggle(method, brewMethods, setBrewMethods)}
      onFlavorToggle={(flavor) => toggle(flavor, flavors, setFlavors)}
      onPriceChange={setPriceBand}
      onClear={clearFilters}
    />
  );

  return (
    <section id="shop" className="max-w-7xl mx-auto scroll-mt-40 px-4 pb-24 pt-14 sm:px-6 lg:pt-20">
      <Reveal>
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-semibold leading-tight text-cream-100 sm:text-6xl">Find your next daily cup.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-400 sm:text-lg">
            Compare fresh small-batch coffees by how they taste, roast, and brew — then choose the bag that fits your ritual.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-10">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-36 rounded-2xl border border-bark-700/60 bg-bark-900/55 p-5">
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-bark-700/60 pb-4">
              <p className="font-display text-xl font-semibold text-cream-100">Filter the shelf</p>
              {filterCount > 0 && <span className="rounded-full bg-honey-500 px-2.5 py-1 text-[12px] font-bold text-bark-950">{filterCount}</span>}
            </div>
            {filters}
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bark-700/60 pb-5">
            <div aria-live="polite">
              <p className="font-display text-2xl font-semibold text-cream-100">{visible.length} {visible.length === 1 ? "roast" : "roasts"}</p>
              <p className="mt-1 text-sm text-cream-500">
                {query.trim() ? `Matches for “${query.trim()}”` : filterCount ? `${filterCount} filters applied` : "Showing the full current shelf"}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                ref={filterButtonRef}
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="flex h-11 items-center gap-2 rounded-full border border-bark-600/70 bg-bark-800 px-4 text-sm font-bold text-cream-200 transition-colors hover:border-honey-500/60 hover:text-honey-200 lg:hidden"
              >
                <FilterIcon className="w-4 h-4 text-honey-400" />
                Filters {filterCount > 0 && <span className="rounded-full bg-honey-500 px-1.5 text-[12px] text-bark-950">{filterCount}</span>}
              </button>
              <label className="flex h-11 items-center gap-2.5 rounded-full border border-bark-600/70 bg-bark-800 px-4">
                <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-cream-500">Sort</span>
                <select
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value as SortKey)}
                  aria-label="Sort catalogue"
                  className="cursor-pointer bg-transparent text-sm font-semibold text-cream-200 outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price · low to high</option>
                  <option value="price-desc">Price · high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>
          </div>

          {filterCount > 0 && (
            <div className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
              <span className="shrink-0 self-center text-[12px] font-bold uppercase tracking-[0.16em] text-cream-500">Active</span>
              {category !== "All" && <span className="shrink-0 rounded-full border border-honey-500/40 bg-honey-500/10 px-3 py-1.5 text-[12px] font-semibold text-honey-200">{category}</span>}
              {roastLevels.map((roast) => <span key={`roast-${roast}`} className="shrink-0 rounded-full border border-honey-500/40 bg-honey-500/10 px-3 py-1.5 text-[12px] font-semibold text-honey-200">{roastName(roast)}</span>)}
              {brewMethods.map((method) => <span key={method} className="shrink-0 rounded-full border border-honey-500/40 bg-honey-500/10 px-3 py-1.5 text-[12px] font-semibold text-honey-200">{method}</span>)}
              {flavors.map((flavor) => <span key={flavor} className="shrink-0 rounded-full border border-honey-500/40 bg-honey-500/10 px-3 py-1.5 text-[12px] font-semibold text-honey-200">{flavor}</span>)}
              {priceBand !== "all" && <span className="shrink-0 rounded-full border border-honey-500/40 bg-honey-500/10 px-3 py-1.5 text-[12px] font-semibold text-honey-200">{PRICE_BANDS.find((band) => band.value === priceBand)?.label}</span>}
              <button type="button" onClick={clearFilters} className="shrink-0 px-2 text-sm font-bold text-cream-400 underline underline-offset-4 hover:text-honey-200">Clear</button>
            </div>
          )}

          <div className="mt-4 hidden grid-cols-[minmax(280px,1.45fr)_minmax(120px,.65fr)_minmax(150px,.8fr)_auto] gap-5 border-b border-bark-700/60 px-0 pb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-cream-500 lg:grid">
            <span>Coffee</span><span>Roast</span><span>Brew method</span><span className="text-right">Price</span>
          </div>

          <div className="mt-4">
            {loading ? (
              <CatalogueSkeleton />
            ) : error ? (
              <div className="rounded-2xl border border-rust-500/40 bg-rust-500/10 px-6 py-16 text-center">
                <p className="font-display text-2xl font-semibold text-cream-100">The shelf is taking a break.</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-cream-400">{error}</p>
                {onRetry && <button type="button" onClick={onRetry} className="mt-6 rounded-full bg-honey-500 px-6 py-3 text-sm font-bold text-bark-950 hover:bg-honey-400">Try again</button>}
              </div>
            ) : visible.length ? (
              <div>
                {visible.map((product) => (
                  <ProductLedgerRow
                    key={product.id}
                    product={product}
                    qty={cart[product.id] ?? 0}
                    onAdd={onAdd}
                    onSetQty={onSetQty}
                    onOpen={onOpen}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-bark-600 px-6 py-20 text-center">
                <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-bark-700 bg-bark-800 text-cream-500"><SearchIcon className="w-7 h-7" /></span>
                <p className="mt-6 font-display text-2xl font-semibold text-cream-100">No coffees match yet.</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-cream-500">Try a different origin, tasting note, brew method, or roast — or clear the filters and start with the full shelf.</p>
                <button type="button" onClick={clearFilters} className="mt-7 rounded-full border border-bark-600 bg-bark-800 px-7 py-3 text-sm font-bold text-cream-100 transition-colors hover:border-honey-500 hover:bg-honey-500 hover:text-bark-950">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)} className="absolute inset-0 bg-bark-950/75 backdrop-blur-sm" />
          <div role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl border-t border-bark-600 bg-bark-900 p-5 shadow-[0_-30px_80px_rgba(0,0,0,0.65)]">
            <div className="mb-6 flex items-center justify-between border-b border-bark-700/60 pb-4">
              <h2 id="mobile-filter-title" className="font-display text-2xl font-semibold text-cream-100">Filter the shelf</h2>
              <button ref={filterCloseRef} type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="flex h-10 w-10 items-center justify-center rounded-full border border-bark-600 text-cream-300 hover:border-honey-500 hover:text-honey-200"><CloseIcon className="w-4 h-4" /></button>
            </div>
            {filters}
            <div className="sticky bottom-0 -mx-5 mt-8 border-t border-bark-700/60 bg-bark-900/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur">
              <button type="button" onClick={() => setFiltersOpen(false)} className="flex h-12 w-full items-center justify-center rounded-full bg-honey-500 text-sm font-bold text-bark-950 hover:bg-honey-400">Show {visible.length} {visible.length === 1 ? "roast" : "roasts"}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
