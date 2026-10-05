export type Brand = {
  name: string;
  logo: string;
};

export type BrandCategory = {
  id: string;
  title: string;
  brands: Brand[];
};

/** Partner brands on the homepage — monochrome PNGs under /public/brands */
export const BRAND_CATEGORIES: BrandCategory[] = [
  {
    id: "security",
    title: "מערכות אבטחה",
    brands: [
      { name: "Hikvision", logo: "/brands/hikvision-mono-v3.png" },
      { name: "Paradox", logo: "/brands/paradox-mono.png" },
      { name: "Palwintec", logo: "/brands/palwintec-mono.png" },
      { name: "ROZCOM", logo: "/brands/rozcom-mono.png" },
    ],
  },
  {
    id: "networking",
    title: "מערכות תקשורת",
    brands: [
      { name: "Aruba", logo: "/brands/aruba-mono-v3.png" },
      { name: "Ruckus", logo: "/brands/ruckus-mono-v3.png" },
      { name: "Ubiquiti", logo: "/brands/ubiquiti-mono.png" },
    ],
  },
  {
    id: "av",
    title: "אודיו וידיאו",
    brands: [
      { name: "LG", logo: "/brands/lg-mono.png" },
      { name: "Bang & Olufsen", logo: "/brands/bang-olufsen-mono.png" },
      { name: "Sonance", logo: "/brands/sonance-mono.png" },
      { name: "Sonos", logo: "/brands/sonos-mono.png" },
    ],
  },
  {
    id: "smart-home",
    title: "חשמל ובית חכם",
    brands: [
      { name: "Control4", logo: "/brands/control4-mono.png" },
      { name: "KNX", logo: "/brands/knx-mono.png" },
      { name: "Domex", logo: "/brands/domex-mono.png" },
    ],
  },
];

/** Flat list for the homepage logo carousel */
export const ALL_BRANDS: Brand[] = BRAND_CATEGORIES.flatMap((c) => c.brands);
