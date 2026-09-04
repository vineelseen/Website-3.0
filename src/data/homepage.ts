export const ASSET_BASE = 'https://www.ruggedmonitoring.com/wp-content/uploads'

export const NAV_ITEMS = [
  { label: 'RM EYE Platform', href: '/rm-eye/' },
  { label: 'Products', href: '/products/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'About us', href: '/about-us/' },
] as const

export const ASSET_SOLUTIONS = [
  {
    title: 'Circuit Breaker Monitoring',
    image: `${ASSET_BASE}/2025/11/03_Circuit-Breaker-Square.webp`,
    href: '/asset-monitoring/circuit-breakers-monitoring-system/',
  },
  {
    title: 'Power Cable Monitoring',
    image: `${ASSET_BASE}/2025/11/02_Cables-Square-.webp`,
    href: '/asset-monitoring/cable-monitoring-system/',
  },
  {
    title: 'Transformer Monitoring',
    image: `${ASSET_BASE}/2025/11/01_Transformer-Square.webp`,
    href: '/asset-monitoring/transformer-monitoring-system/',
  },
  {
    title: 'Rotating Machine Monitoring',
    image: `${ASSET_BASE}/2025/11/04_Rotating-Machine-Square.webp`,
    href: '/asset-monitoring/rotating-machines-monitoring-system/',
  },
  {
    title: 'Switchgear Monitoring',
    image: `${ASSET_BASE}/2025/11/05_Switchgear-Square.webp`,
    href: '/asset-monitoring/switchgear-monitoring-system/',
  },
] as const

export const PRODUCT_CARDS = [
  {
    title: 'IIoT Sensors',
    description:
      'Resistant to electromagnetic interference, ensuring highly accurate condition monitoring even in extreme environments.',
    image: `${ASSET_BASE}/2025/12/Sensors-7.webp`,
    href: '/products/iiot-sensors/',
  },
  {
    title: 'Edge Devices',
    description:
      'Comprehensive, scalable, and precision-driven for monitoring critical parameters and advancing predictive maintenance.',
    image: `${ASSET_BASE}/2025/12/Edge-Devices-3.webp`,
    href: '/products/edge-devices/',
  },
  {
    title: 'RM EYE',
    description:
      'Designed with intelligence to drive innovation and enhance AI-powered electrical asset condition monitoring.',
    image: `${ASSET_BASE}/2025/12/RM-Screens-2.webp`,
    href: '/rm-eye/',
  },
] as const

export const RM_EYE_ASSETS = [
  {
    id: 'transformers',
    label: 'Transformers',
    icon: `${ASSET_BASE}/2025/03/transformer.svg`,
    description:
      'From power generation to data centers, RM EYE utilizes advanced algorithms to address issues related to critical transformer parameters such as bushing capacitance, partial discharge, and winding hotspot temperatures.',
    extra:
      'By fostering a more reliable infrastructure, it optimizes asset performance and contributes to maximized grid stability.',
  },
  {
    id: 'batteries',
    label: 'Batteries',
    icon: `${ASSET_BASE}/2024/05/evcharging-station.svg`,
    description:
      'Dependable energy storage is crucial for ensuring a stable and uninterrupted power supply. RM EYE tracks critical battery parameters, such as temperature, state of charge, and internal resistance.',
    extra:
      'This proactive approach safeguards energy reliability and supports sustainable practices in our ever-evolving energy landscape.',
  },
  {
    id: 'cables',
    label: 'Power Cables',
    icon: `${ASSET_BASE}/2025/03/Cable.svg`,
    description:
      'As power cables age and develop hidden defects, the risk of catastrophic failures increases. RM EYE effectively detects real-time thermal stress, partial discharge activity, and insulation degradation.',
    extra:
      'Thus, not only boosting grid stability but also minimizing maintenance costs and ensuring operational continuity.',
  },
  {
    id: 'rotating',
    label: 'Rotating Machines',
    icon: `${ASSET_BASE}/2025/03/Rotating-M.svg`,
    description:
      'Unplanned failures in rotating machines can significantly disrupt operations. RM EYE addresses this issue by continuously monitoring temperature, vibration, and electrical stress.',
    extra:
      'By aligning maintenance efforts with the real-time status, RM EYE optimizes unplanned downtimes and extends the equipment\'s lifespan.',
  },
  {
    id: 'switchgears',
    label: 'Switchgears',
    icon: `${ASSET_BASE}/2025/03/Switchgear.svg`,
    description:
      'To maintain dependable power distribution through well-functioning switchgear, RM EYE employs cutting-edge algorithms that transform real-time switchgear data into actionable insights.',
    extra:
      'By identifying faults before they escalate, RM EYE not only improves safety and ensures operational continuity but also contributes to the extended lifespan of switchgear.',
  },
  {
    id: 'breakers',
    label: 'Circuit Breakers',
    icon: `${ASSET_BASE}/2025/01/breaker-condition-monitoring.svg`,
    description:
      'Circuit breakers are the first line of defense against electrical faults. RM EYE offers real-time insights into breaker timing, contact resistance, and health insulation.',
    extra:
      'This capability helps avoid unexpected trips, thereby boosting the resilience of power systems and ensuring reliable protection.',
  },
] as const

export const RELIABILITY_FEATURES = [
  'Modular Design',
  'Accurate Measurement',
  'Engineered for Excellence',
  'Reliability Redefined',
  'Seamless Integration',
  'High Precision',
  'Plug and Play Efficiency',
  'No Recalibration',
] as const

export const INDUSTRIES = [
  {
    label: 'Oil & Gas',
    title: 'Oil & Gas Industry',
    description:
      'Maximize electrical asset ROI and operational reliability with our advanced predictive maintenance ecosystem.',
    href: '/industries/oil-gas/',
  },
  {
    label: 'Steel Plant',
    title: 'Steel Plant Industry',
    description:
      'Minimize operational downtime with our predictive maintenance ecosystem built for extreme environments.',
    href: '/industries/steel-plant/',
  },
  {
    label: 'Solar Farm',
    title: 'Solar Farm Industry',
    description:
      'Real-time visibility of all electrical asset performance with our centralized predictive maintenance ecosystem.',
    href: '/industries/solar-farm/',
  },
  {
    label: 'Refinery',
    title: 'Refinery Industry',
    description:
      'Strengthen downstream O&M efficiency with our integrated predictive maintenance ecosystem for electrical assets.',
    href: '/industries/refinery/',
  },
  {
    label: 'Wind Farm',
    title: 'Wind Farm Industry',
    description:
      'Optimize electrical asset operations & maintenance with our highly scalable predictive maintenance ecosystem.',
    href: '/industries/wind-farm/',
  },
  {
    label: 'Data Centers',
    title: 'Data Centers Industry',
    description:
      'Data-driven insights for reliable and resilient electrical assets with our predictive maintenance ecosystem.',
    href: '/industries/data-centers/',
  },
  {
    label: 'EV Charging Station',
    title: 'EV Charging Station Industry',
    description:
      'Maximize safety and energy consumption with our predictive maintenance ecosystem for electrical assets.',
    href: '/industries/ev-charging-station/',
  },
  {
    label: 'OEM',
    title: 'OEM Industry',
    description:
      'Future-proof electrical assets\' health and performance with our integrated predictive maintenance ecosystem.',
    href: '/industries/oem/',
  },
] as const

export const CERTIFICATIONS = [
  `${ASSET_BASE}/2025/11/BNQ_LogoCS_ISO9001-AN_CMYK-1.webp`,
  `${ASSET_BASE}/2025/11/BNQ_LogoCS_ISO14001-AN_CMYK-1.webp`,
  `${ASSET_BASE}/2025/11/BNQ_LogoCS_ISO45001-AN_CMYK-1.webp`,
] as const

export const CLIENT_LOGOS = [
  `${ASSET_BASE}/2025/08/9.png`,
  `${ASSET_BASE}/2025/08/trafindo.png`,
  `${ASSET_BASE}/2025/08/1630556230710-removebg-preview.png`,
  `${ASSET_BASE}/2025/08/apac.png`,
  `${ASSET_BASE}/2025/08/abb-b.png`,
  `${ASSET_BASE}/2025/08/image-1.png`,
  `${ASSET_BASE}/2025/08/Bay_State_Gas-removebg-preview.png`,
] as const

export const RESOURCE_CARDS = [
  {
    title: 'Case Studies',
    description: 'Real-World Results from Installation to Impact',
    href: '/case-studies/',
  },
  {
    title: 'Blogs',
    description: 'Explore What\'s Possible for Your Assets',
    href: '/blogs/',
  },
  {
    title: 'Brochures',
    description: 'Discover RM\'s Electrical Asset Monitoring Ecosystem',
    href: '/resources/',
  },
] as const
