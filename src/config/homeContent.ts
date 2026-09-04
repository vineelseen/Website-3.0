export const ASSET_BASE = 'https://rmbeta.wpenginepowered.com/wp-content/uploads'

export const images = {
  logoBlue: `${ASSET_BASE}/2026/08/Logo-RM-blue.png`,
  logoWhite: `${ASSET_BASE}/2025/12/Logo-RM-et-Signature-B-Blanc.png`,
  banner: `${ASSET_BASE}/2026/09/upscale-rm-banner-scaled.webp`,
  caseStudiesBg: `${ASSET_BASE}/2026/08/Case-Studies-Background-2.webp`,
  particleWave: `${ASSET_BASE}/2026/08/Particle-Wave-Background_7-scaled.png`,
  transformerGif: `${ASSET_BASE}/2026/08/transformer-gif.gif`,
  heroVideoMp4: 'https://rmbeta.wpenginepowered.com/assets/Banner%20Slides_2_07.mp4',
  heroVideoWebm: 'https://rmbeta.wpenginepowered.com/assets/Banner%20Slides_31.webm',
  industry: {
    generation: {
      open: `${ASSET_BASE}/2026/08/Generation_Open-Card-2-scaled.webp`,
      closed: `${ASSET_BASE}/2026/08/Generation_Closed-Card-1.webp`,
    },
    transmission: {
      open: `${ASSET_BASE}/2026/08/Transmission_Open-Card-2-scaled.webp`,
      closed: `${ASSET_BASE}/2026/08/Transmission_Closed-Card-1.webp`,
    },
    distribution: {
      open: `${ASSET_BASE}/2026/08/Distribution_Open-Card-2-scaled.webp`,
      closed: `${ASSET_BASE}/2026/08/Distribution_Closed-Card-1.webp`,
    },
    consumption: {
      open: `${ASSET_BASE}/2026/08/Consumsion_Open-Card-1-scaled.webp`,
      closed: `${ASSET_BASE}/2026/08/Consumsion_-Closed-Card-1.webp`,
    },
  },
} as const

export const embeds = {
  modules: 'https://rmbeta.wpenginepowered.com/assets/RM-moduleslive-new-2.html',
  ecoflow: 'https://rmbeta.wpenginepowered.com/assets/RM-ecoflow.html',
  assets: 'https://rmbeta.wpenginepowered.com/assets/RM-assets-live.html',
  products: 'https://rmbeta.wpenginepowered.com/assets/custom-two-sliders.html',
  assetTags: 'https://rmbeta.wpenginepowered.com/assets/custom-assetTags-slider.html',
  aboutCircle: 'https://rmbeta.wpenginepowered.com/assets/RM_aboutus_Circle.html',
} as const

export const navLinks = [
  { label: 'RM EYE', href: '#rm-eye' },
  { label: 'Assets', href: '#solution-breadth' },
  { label: 'Industries', href: '#industry-breadth' },
  { label: 'Products', href: '#product-breadth' },
  { label: 'About Us', href: '#why-rm' },
  { label: 'Contact Us', href: '#contact' },
] as const

export const partnerLogos = [
  `${ASSET_BASE}/2025/11/siemens.png`,
  `${ASSET_BASE}/2025/11/hd-mitsubishi-.png`,
  `${ASSET_BASE}/2025/11/kepco.png`,
  `${ASSET_BASE}/2025/11/larsen__toubro-logo_brandlogos.net_egljc.png`,
  `${ASSET_BASE}/2025/11/L.1-removebg-preview.png`,
] as const

export const whyRmFeatures = [
  {
    title: 'OEM-Agnostic Architecture',
    description:
      'Work across different makes, models, vintages and multi-vendor electrical infrastructure.',
  },
  {
    title: 'End-to-End Capability',
    description:
      'Connect sensing, monitoring, communications, analytics, software and workflows through one architecture.',
  },
  {
    title: 'Built for Brownfield',
    description:
      'Digitize existing and legacy infrastructure without requiring complete technology replacement.',
  },
  {
    title: 'Open Integration',
    description:
      'Integrate SCADA, SAS, CMMS, video, thermal, cybersecurity and enterprise systems.',
  },
  {
    title: 'Lifecycle Intelligence',
    description:
      'Support asset decisions from condition and maintenance through performance, investment and lifecycle planning.',
  },
  {
    title: 'Predictive by Design',
    description:
      'Enable the transition from reactive maintenance toward predictive and digitalization asset strategies.',
  },
  {
    title: 'Enterprise Scalability',
    description:
      'Scale from individual assets and substations to fleets, sites and centralized operations.',
  },
  {
    title: 'Electrical Asset Expertise',
    description:
      'Deep domain knowledge across critical electrical assets, failure modes and operating conditions.',
  },
] as const

export type IndustryKey = keyof typeof images.industry

export const industries: { key: IndustryKey; label: string }[] = [
  { key: 'generation', label: 'Generation' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'distribution', label: 'Distribution' },
  { key: 'consumption', label: 'Consumption' },
]

export const successStories = [
  {
    title: 'Switchyards',
    location: 'REFINERY | INDIA',
    description:
      'The project demonstrated how an integrated monitoring approach for heavy industries like refineries not only ensures early fault detection and maximized reliability, but also optimizes their operational strategy.',
    stat: '40%',
    statLabel: 'Reduction in Unplanned Downtime',
  },
  {
    title: 'Hydro-Power Generators',
    location: 'RENEWABLES | PHILIPPINES',
    description:
      'This collaboration has not only ensured enhanced reliability and continuous operational visibility but also effectively demonstrated the capabilities of reliable and simplified digital transformation.',
    stat: '21%',
    statLabel: 'Increase in Asset Longevity',
  },
  {
    title: 'Sub-Sea & Underground Cables',
    location: 'UTILITY | ASIA',
    description:
      'The utility overcame the challenge of monitoring a 90 km subsea cable through remote, real-time visibility, maximizing asset reliability, availability, and safety across the hybrid cable corridor.',
    stat: '38%',
    statLabel: 'Maximized Reliability',
  },
  {
    title: 'Power Transformers',
    location: 'AIRPORTS | EUROPE',
    description:
      'We examined how Rugged Monitoring’s digital transformation ecosystem could have predicted and prevented the catastrophic failure at the North Hyde substation, near Heathrow, London.',
    stat: '~£80-100',
    statLabel: 'Million Cost Savings',
  },
] as const
