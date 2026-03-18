export type ServiceItem = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  summary: string;
  intro: string;
  description: string[];
  highlights: string[];
  ingredients: string[];
  price?: string;
};

export const serviceItems: ServiceItem[] = [
  {
    slug: "gel-nail-polish",
    title: "Gel Nail Polish",
    shortTitle: "Gel Nail Polish",
    icon: "flaticon-barbershop",
    summary:
      "Vegan, cruelty-free salon-quality formula with intense color and up to 3 weeks of glossy wear.",
    intro:
      "Elevate your mani game with a salon-inspired gel polish made for beauty lovers who want shine, wear, and nail-friendly care.",
    description: [
      "Mudiame Lush Gel Nail Polish delivers rich, high-gloss color designed to stay vibrant without chipping, cracking, or fading too quickly.",
      "The formula is crafted for long wear while still feeling gentle on the nails, making it a strong option for both everyday beauty and statement looks.",
    ],
    highlights: [
      "Vegan and cruelty-free formula",
      "Up to 3 weeks of wear",
      "High-gloss finish",
      "Designed to resist chipping and fading",
    ],
    ingredients: [
      "Conditioning agents to help strengthen and nourish the nails",
      "High-shine and long-wear components for a chip-resistant glossy finish",
      "Pigments for colour payoff and frost for shine",
    ],
    price: "NGN 7,000",
  },
  {
    slug: "lip-gloss",
    title: "Lip Glosses",
    shortTitle: "Lip Gloss",
    icon: "flaticon-makeup",
    summary:
      "High-shine vegan lip glosses made for comfortable all-day wear and polished everyday beauty.",
    intro:
      "Mudiame Lush Lip Glosses are created to deliver lasting shine while keeping lips looking smooth, fresh, and beautifully finished.",
    description: [
      "These glosses are vegan and cruelty-free, making them ideal for customers who want shine-focused lip products without compromising on comfort.",
      "They are suitable for all-day wear and work well for soft everyday looks or more elevated beauty moments.",
    ],
    highlights: [
      "Vegan and cruelty-free",
      "High-shine finish",
      "Comfortable all-day wear",
      "Suitable for everyday glam",
    ],
    ingredients: [
      "Polyisobutene",
      "Paraffinum Liquidum",
      "Ethylhexyl Palmitate",
      "Tocopherol",
      "Tridecyl Trimellitate",
      "Octyldodecanol",
      "Hydrogenated Styrene/Isoprene Copolymer",
      "Silica Dimethyl Silylate",
      "Phenoxyethanol",
      "Parfume",
    ],
    price: "NGN 4,000",
  },
  {
    slug: "eyeshadow-palette",
    title: "Eyeshadow Palette",
    shortTitle: "Eyeshadow Palette",
    icon: "flaticon-makeup-1",
    summary:
      "Richly pigmented matte, shimmer, and metallic shades with smooth blendability and long-wearing performance.",
    intro:
      "The Mudiame Lush Eyeshadow Palette is designed to take you from soft daytime elegance to bold evening glam with ease.",
    description: [
      "Each palette features a curated collection of shades that balance velvety mattes, luminous shimmers, and multidimensional metallics.",
      "The buttery texture glides smoothly onto the lids with strong payoff, easy blending, and crease-resistant wear for a polished finish.",
    ],
    highlights: [
      "9 versatile shades",
      "Matte, shimmer, and metallic finishes",
      "Highly pigmented and buildable",
      "Smooth, blendable texture",
      "Long-wearing and crease-resistant",
      "Suitable for all skin tones",
    ],
    ingredients: [
      "Talc",
      "Mica",
      "Synthetic Fluorphlogopite",
      "Magnesium Stearate",
      "Zinc Stearate",
      "Silica",
      "Dimethicone",
      "Ethylhexyl Palmitate",
      "Caprylic/Capric Triglyceride",
      "Phenoxyethanol",
      "Ethylhexylglycerin",
      "Tocopheryl Acetate (Vitamin E)",
      "Tin Oxide",
    ],
    price: "NGN 12,000",
  },
  {
    slug: "lip-pencil",
    title: "Lip Pencil",
    shortTitle: "Lip Pencil",
    icon: "flaticon-woman-1",
    summary:
      "Smooth-glide precision lip pencil that defines, shapes, and supports longer-lasting lipstick wear.",
    intro:
      "Mudiame Lush Lip Pencil is built for clean definition, fuller-looking lips, and better lipstick hold throughout the day.",
    description: [
      "Its creamy texture supports smooth, precise application while helping to prevent feathering and bleeding.",
      "It can be worn alone for a softly defined look or paired with lipstick to improve shape, structure, and wear time.",
    ],
    highlights: [
      "Long-wearing",
      "Smudge-resistant",
      "Smooth, precise application",
      "Suitable for all skin types",
    ],
    ingredients: [
      "Hydrogenated Vegetable Oil",
      "Synthetic Beeswax",
      "Carnauba Wax",
      "Cera Alba",
      "Tocopherol",
      "Ascorbyl Palmitate",
      "Lecithin",
      "Glyceryl Stearate",
      "Glyceryl Oleate",
      "Citric Acid",
      "Mica",
    ],
    price: "NGN 3,000",
  },
  {
    slug: "face-and-foot-masks",
    title: "Face & Foot Masks",
    shortTitle: "Face & Foot Masks",
    icon: "flaticon-woman",
    summary:
      "Nourishing mask essentials selected to support beauty care, comfort, and complete self-care routines.",
    intro:
      "Mudiame Lush also offers self-care essentials like face masks and foot masks for customers who want beauty and care in one routine.",
    description: [
      "These products are part of the brand's wider beauty and wellness line, selected with a focus on quality, affordability, and visible results.",
      "They are ideal for customers who want soothing, supportive treatments as part of a broader beauty ritual.",
    ],
    highlights: [
      "Supports self-care routines",
      "Focused on comfort and visible results",
      "Selected for quality and affordability",
    ],
    ingredients: ["Ingredients vary by product selection."],
    price: "From NGN 5,000",
  },
  {
    slug: "hair-and-body-oils",
    title: "Hair & Body Oils",
    shortTitle: "Hair & Body Oils",
    icon: "flaticon-candle-1",
    summary:
      "Revitalizing oil essentials for healthier-looking hair, softer skin, and confident everyday beauty care.",
    intro:
      "The Mudiame Lush self-care line includes hair oils and body oils chosen to support softness, nourishment, and daily confidence.",
    description: [
      "These oils extend the brand's beauty offering beyond colour cosmetics, giving customers more complete care solutions in one place.",
      "They are selected or formulated with a clear focus on quality, affordability, and practical everyday results.",
    ],
    highlights: [
      "Supports healthy-looking hair and soft skin",
      "Built for everyday self-care",
      "Part of the wider Mudiame Lush beauty essentials range",
    ],
    ingredients: ["Ingredients vary by product selection."],
    price: "From NGN 6,500",
  },
];

export const featuredServiceItems = serviceItems.slice(0, 4);

export const findServiceBySlug = (slug: string | null) =>
  serviceItems.find((item) => item.slug === slug) || serviceItems[0];
