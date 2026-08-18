import Reveal from "./Reveal";
import { ArrowRightIcon, BeanIcon, FlameIcon, LeafIcon, TruckIcon } from "./icons";

const HERO_IMG =
  "https://image.qwenlm.ai/generated-images/0777ddd1-1de3-46f7-bf71-e3b7a7f5356a/_result.png";

const MARQUEE = [
  "Ethiopia · Gedeb",
  "bergamot",
  "Colombia · Huila",
  "caramel",
  "Kenya · Nyeri AA",
  "blackcurrant",
  "jasmine",
  "toasted hazelnut",
  "molasses",
  "orange zest",
  "SL28",
  "pink bourbon",
];

const STATS = [
  ["12 kg", "batch size"],
  ["48 h", "roast-to-dispatch"],
  ["92+", "avg. cup score"],
] as const;

export default function Hero() {
  const scrollToShop = () =>
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient glows */}
      <div
        className="ember-glow absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(214,142,47,0.13) 0%, transparent 65%)" }}
      />
      <div
        className="absolute top-24 -right-52 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(188,95,54,0.1) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 relative z-10">
          <Reveal>
            <p className="flex items-center gap-2.5 text-honey-400 text-[12px] font-bold tracking-[0.28em] uppercase">
              <FlameIcon className="w-4 h-4" />
              Small-batch roastery · Portland, OR
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display font-semibold text-cream-100 text-[44px] sm:text-6xl lg:text-[76px] leading-[1.02] tracking-tight mt-6">
              Coffee worth
              <br />
              <em className="text-honey-400 font-medium">slowing down</em>
              <br />
              for.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="text-cream-400 text-base sm:text-lg leading-relaxed max-w-xl mt-7">
              Six rotating single origins and blends, roasted every Tuesday in 12-kilo batches and
              shipped within 48 hours — fully traceable from cherry to cup.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-wrap items-center gap-4 mt-9">
              <button
                onClick={scrollToShop}
                className="group flex items-center gap-3 bg-honey-500 hover:bg-honey-400 text-bark-950 font-bold text-[15px] rounded-full pl-7 pr-5 py-3.5 transition-all duration-300 hover:shadow-[0_10px_36px_rgba(214,142,47,0.35)] hover:-translate-y-0.5"
              >
                Shop the roast shelf
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href="#promise"
                className="text-sm font-bold text-cream-300 hover:text-honey-300 border-b border-bark-600 hover:border-honey-500/60 pb-1 transition-colors"
              >
                Our roast promise
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:hidden mt-8">
            <div className="relative h-44 overflow-hidden rounded-[28px] border border-bark-600/60 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
              <img
                src={HERO_IMG}
                alt=""
                width={800}
                height={1000}
                loading="eager"
                className="w-full h-full object-cover object-[center_58%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bark-950/65 via-transparent to-bark-950/10" />
              <span className="absolute bottom-3.5 left-3.5 flex items-center gap-2 bg-bark-900/85 backdrop-blur border border-bark-600/70 rounded-full px-3 py-1.5 text-[12px] font-bold tracking-[0.12em] uppercase text-cream-200">
                <span className="w-1.5 h-1.5 rounded-full bg-honey-400" />
                Now roasting
              </span>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="flex flex-wrap gap-x-10 gap-y-4 mt-8 lg:mt-12 pt-7 border-t border-bark-700/60">
              {STATS.map(([big, small]) => (
                <div key={small}>
                  <dt className="font-display font-semibold text-2xl text-cream-100">{big}</dt>
                  <dd className="text-[12px] tracking-[0.18em] uppercase text-cream-500 mt-1">{small}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

        </div>

        <div className="hidden lg:block lg:col-span-5 relative">
          <Reveal delay={150} className="relative mx-auto max-w-[400px] lg:max-w-none">
            <div className="relative rounded-t-full rounded-b-[28px] overflow-hidden border border-bark-600/60 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
              <img
                src={HERO_IMG}
                alt="Latte art being poured into a ceramic cup"
                width={800}
                height={1000}
                fetchPriority="high"
                loading="eager"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bark-950/55 via-transparent to-bark-950/10" />
            </div>

            {/* rotating stamp */}
            <div className="absolute -bottom-8 -left-6 sm:-left-12 w-[118px] h-[118px] sm:w-[140px] sm:h-[140px]">
              <svg viewBox="0 0 100 100" className="spin-slower w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <defs>
                  <path id="stampCircle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                </defs>
                <circle cx="50" cy="50" r="48" fill="#1a120b" stroke="#55402a" strokeWidth="1" />
                <text fontSize="9.2" letterSpacing="2.1" fill="#e5a44a" fontWeight="700">
                  <textPath href="#stampCircle">FRESHLY ROASTED · SMALL BATCH ·</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-honey-400">
                <BeanIcon className="w-8 h-8" />
              </span>
            </div>

            {/* now roasting chip */}
            <div className="float-slow absolute top-7 -right-3 sm:-right-7 bg-bark-900/90 backdrop-blur border border-bark-600/70 rounded-full pl-3.5 pr-5 py-2.5 flex items-center gap-2.5 shadow-[0_18px_44px_rgba(0,0,0,0.55)]">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-honey-400 opacity-70" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-honey-400" />
              </span>
              <span className="text-[12px] font-bold text-cream-200 tracking-wide">
                Now roasting · Yirgacheffe Lot 23
              </span>
            </div>
          </Reveal>
        </div>

      </div>

      {/* origin marquee */}
      <div className="marquee border-y border-bark-700/60 bg-bark-900/60 py-3.5 overflow-hidden relative">
        <div className="marquee-track flex items-center gap-7">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-7 shrink-0" aria-hidden={dup === 1}>
              {MARQUEE.map((item) => (
                <span key={`${dup}-${item}`} className="flex items-center gap-7">
                  <span className="text-[13px] tracking-[0.22em] uppercase font-semibold text-cream-400 whitespace-nowrap">
                    {item}
                  </span>
                  <BeanIcon className="w-3.5 h-3.5 text-honey-600 shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* roast promise strip */}
      <div id="promise" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 scroll-mt-36">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-0 sm:divide-x divide-bark-700/70 border border-bark-700/60 rounded-2xl bg-bark-900/50 px-8 py-6">
            {[
              { icon: <FlameIcon className="w-5 h-5" />, title: "Roasted every Tuesday", sub: "Never more than 7 days from roast date" },
              { icon: <LeafIcon className="w-5 h-5" />, title: "Direct-trade lots only", sub: "Paid 2–3× commodity price, every harvest" },
              { icon: <TruckIcon className="w-5 h-5" />, title: "Dispatched in 48 h", sub: "Valved bags, sealed at peak rest" },
            ].map((f, i) => (
              <div key={f.title} className={`flex items-start gap-4 ${i === 1 ? "sm:px-8" : i === 2 ? "sm:pl-8" : ""} flex-1`}>
                <span className="text-honey-400 mt-0.5 shrink-0">{f.icon}</span>
                <div>
                  <p className="font-display font-semibold text-cream-100 text-[15px]">{f.title}</p>
                  <p className="text-cream-500 text-[13px] mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
