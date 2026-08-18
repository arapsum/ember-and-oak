export interface Product {
  id: string;
  name: string;
  origin: string;
  category: "Single Origin" | "Blend" | "Espresso" | "Decaf";
  roast: 1 | 2 | 3 | 4 | 5;
  price: number;
  weightG: number;
  notes: string[];
  process: string;
  altitude: string;
  varietal: string;
  description: string;
  brewTip: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  stock: number;
}

export const CATEGORIES = ["All", "Single Origin", "Blend", "Espresso", "Decaf"] as const;
export type Category = (typeof CATEGORIES)[number];

export const FREE_SHIPPING_AT = 35;
export const FLAT_SHIPPING = 4.5;

export const money = (n: number) => `$${n.toFixed(2)}`;

export const roastName = (r: number) =>
  ["Light", "Medium-Light", "Medium", "Medium-Dark", "Dark"][r - 1] ?? "Medium";

export const PRODUCTS: Product[] = [
  {
    id: "yirgacheffe",
    name: "Yirgacheffe Sunrise",
    origin: "Ethiopia · Gedeb",
    category: "Single Origin",
    roast: 1,
    price: 18.5,
    weightG: 250,
    notes: ["Bergamot", "Apricot", "Jasmine"],
    process: "Washed",
    altitude: "1,900–2,200 m",
    varietal: "Heirloom",
    description:
      "A new-crop lot from smallholder farms around Gedeb, fermented 36 hours and sun-dried on raised beds. It pours like iced tea and finishes like marmalade — our brightest cup of the season.",
    brewTip: "Best as a slow V60 pour-over, 1:16 ratio, 94 °C water. Let it cool a little — the florals open up.",
    image:
      "https://image.qwenlm.ai/generated-images/a3572e3f-1acd-4384-b7e8-2a81717958ac/_result.png",
    rating: 4.9,
    reviews: 212,
    badge: "New crop",
    stock: 24,
  },
  {
    id: "huila",
    name: "Huila Velvet",
    origin: "Colombia · San Agustín",
    category: "Single Origin",
    roast: 3,
    price: 17.0,
    weightG: 250,
    notes: ["Caramel", "Red apple", "Cacao nib"],
    process: "Washed",
    altitude: "1,650 m",
    varietal: "Caturra & Pink Bourbon",
    description:
      "Grown by the Trujillo family on volcanic soil above San Agustín and dried slowly under shade cloth. Rounded, sweet and endlessly drinkable — the bag our regulars never let run out.",
    brewTip: "A forgiving all-rounder: batch brew, French press or a 1:2 espresso all sing. Start at 20 g in, 40 g out.",
    image:
      "https://image.qwenlm.ai/generated-images/49093461-22df-4f25-9c6c-94b5ac9c33f8/_result.png",
    rating: 4.7,
    reviews: 348,
    badge: "Bestseller",
    stock: 32,
  },
  {
    id: "midnight-ember",
    name: "Midnight Ember",
    origin: "Brazil + Sumatra · Espresso blend",
    category: "Espresso",
    roast: 5,
    price: 16.5,
    weightG: 250,
    notes: ["Molasses", "Dark chocolate", "Toasted hazelnut"],
    process: "Natural & pulped natural",
    altitude: "1,100–1,300 m",
    varietal: "Mundo Novo & Catuaí",
    description:
      "Our house espresso, built to cut through milk without shouting. A dense, syrupy body from dry-processed Brazils, with Sumatra adding low embers of spice underneath the chocolate.",
    brewTip: "Pull it 18 g in, 36 g out, 28–32 seconds. Rest the bag 10+ days for the crema to fully settle.",
    image:
      "https://image.qwenlm.ai/generated-images/d9d512e6-1db6-4daf-93df-a2baaa6e6aa7/_result.png",
    rating: 4.8,
    reviews: 501,
    badge: "Staff pick",
    stock: 40,
  },
  {
    id: "nyeri",
    name: "Nyeri Blackcurrant",
    origin: "Kenya · Nyeri AA",
    category: "Single Origin",
    roast: 2,
    price: 19.75,
    weightG: 250,
    notes: ["Blackcurrant", "Grapefruit", "Demerara"],
    process: "Washed, double fermented",
    altitude: "1,750–1,900 m",
    varietal: "SL28 & SL34",
    description:
      "A classic AA auction lot from a cooperative wet mill on the slopes of the Aberdares. Explosive, winey acidity with a brown-sugar backbone — Kenya at its most unapologetic.",
    brewTip: "Shine it in a Chemex or Kalita. Grind a touch finer than you think; the acids reward a long, even extraction.",
    image:
      "https://image.qwenlm.ai/generated-images/97af6e35-4cb5-4157-9c84-d8c8f7ba906b/_result.png",
    rating: 4.8,
    reviews: 167,
    badge: "Limited lot",
    stock: 6,
  },
  {
    id: "cloudline",
    name: "Cloudline Decaf",
    origin: "Colombia · Sugarcane E.A.",
    category: "Decaf",
    roast: 3,
    price: 17.25,
    weightG: 250,
    notes: ["Honey", "Almond", "Milk chocolate"],
    process: "Sugarcane E.A. decaffeination",
    altitude: "1,500 m",
    varietal: "Castillo",
    description:
      "Decaffeinated with sugarcane ethanol at origin, so the sweetness survives the process. Soft, nutty and gentle — the evening cup that converts people who swore they 'could taste the decaf'.",
    brewTip: "Decaf extracts faster: drop your water to 90 °C and pull shots a few seconds shorter than usual.",
    image:
      "https://image.qwenlm.ai/generated-images/192ab95c-80d5-492a-91c5-cf49c491097f/_result.png",
    rating: 4.6,
    reviews: 129,
    stock: 18,
  },
  {
    id: "hearth-honey",
    name: "Hearth & Honey",
    origin: "Guatemala + Ethiopia · Filter blend",
    category: "Blend",
    roast: 3,
    price: 16.0,
    weightG: 250,
    notes: ["Toffee", "Orange zest", "Walnut"],
    process: "Washed & honey processed",
    altitude: "1,400–1,800 m",
    varietal: "Bourbon & Heirloom",
    description:
      "A filter blend designed for lazy Sunday mornings: Guatemalan toffee weight folded into a top note of Ethiopian blossom. Comforting first, interesting second — exactly as it should be.",
    brewTip: "Built for immersion: 60 g per litre in a French press, 4 minutes, one gentle stir at the start.",
    image:
      "https://image.qwenlm.ai/generated-images/06f869e4-3d94-48c1-8fc4-6408beafc05c/_result.png",
    rating: 4.7,
    reviews: 284,
    badge: "Back in stock",
    stock: 4,
  },
];
