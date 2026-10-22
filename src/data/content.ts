import { ServiceItem, PortfolioItem } from '../types';
import { responsiveImageSources } from '../utils/responsiveImageSources';
import { IMAGE_VARIANT_WIDTHS } from './imageVariants.generated';

const serviceImage = (name: string) => {
  const { src, srcSet } = responsiveImageSources(name);
  return { bgImage: src, bgImageSrcSet: srcSet };
};

const projectImage = (name: string) => {
  const { src, srcSet } = responsiveImageSources(name);
  return { image: src, imageSrcSet: srcSet };
};

export const BRAND_INFO = {
  name: 'BRAKANANI',
  tagline: 'SIGNS & PROJECTS',
  slogan: 'Built To Be Seen',
  phone: '079 184 5221',
  phoneClean: '27791845221',
  email: 'info@brakananisigns.co.za',
  address: 'South Africa',
  serviceCoverage: 'Serving local & regional clients across South Africa',
  year: '2026',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'business-corporate',
    icon: '🏢',
    title: 'Business & Corporate',
    shortDesc: 'Professional signage that strengthens your brand identity and creates a lasting impression.',
    fullDesc: 'From high-impact reception logos to exterior corporate building identity, we engineer signage that reflects the prestige and credibility of your enterprise.',
    features: ['3D fabricated channel letters', 'Reception & lobby feature walls', 'Architectural entrance pylons', 'Corporate branding plaques'],
    materials: ['Brushed stainless steel', 'Anodized aluminum', 'Acrylic with LED backlighting'],
    ...serviceImage('Corporate Plaques/Corporate Plaque'),
  },
  {
    id: 'indoor-outdoor',
    icon: '🏠',
    title: 'Indoor & Outdoor',
    shortDesc: 'High-impact signage designed to capture attention both inside and outside your premises.',
    fullDesc: 'Engineered to withstand the South African climate outdoors while delivering refined, flawless finishes for modern indoor interiors.',
    features: ['Outdoor weatherproof monument signs', 'Indoor departmental directories', 'Perimeter boundary signage', 'Architectural wayfinding totems'],
    materials: ['UV-resistant composites', 'Galvanized steel frames', 'Treated hardwood & masonry bases'],
    ...serviceImage('boards/Complex Entrance Board'),
  },
  {
    id: 'shopfront-building',
    icon: '🏪',
    title: 'Shopfront & Building',
    shortDesc: 'Make your business visible with clear, durable shopfront and building signage.',
    fullDesc: 'Transform retail and commercial facades into unmistakable landmarks that attract foot traffic and drive brand recall.',
    features: ['Lightboxes & illuminated fascia', '3D cut-out dimensional letters', 'Under-canopy double-sided signs', 'Window vinyl displays'],
    materials: ['Energy-efficient LED modules', 'Perspex faces', 'Powder-coated metal frames'],
    ...serviceImage('Shopfront Signage/Factory Board'),
  },
  {
    id: 'directional-info',
    icon: '➡️',
    title: 'Directional & Information',
    shortDesc: 'Guide clients and visitors with clear, professional directional and information signs.',
    fullDesc: 'Intuitive wayfinding systems for corporate parks, public institutions, educational campuses, and residential estates.',
    features: ['Custom roadmap & fingerpost signs', 'Floor directory boards', 'Parking & loading zone guides', 'Room numbering & plaques'],
    materials: ['Reflective vinyl graphics', 'Extruded aluminum planks', 'Anti-glare acrylic finishes'],
    ...serviceImage('Corporate Plaques/Builkding Directions'),
  },
  {
    id: 'safety-warning',
    icon: '⚠️',
    title: 'Safety & Warning',
    shortDesc: 'Compliant safety and warning signage to keep your premises protected and professional.',
    fullDesc: 'SABS and OHS Act compliant health, safety, and regulatory signage designed for commercial facilities, industrial plants, and construction sites.',
    features: ['Fire protection & escape route signs', 'Mandatory PPE notice boards', 'Hazardous material warnings', 'Construction site board signage'],
    materials: ['Photoluminescent (glow-in-the-dark)', 'Chromadek metal boards', 'High-grade reflective vinyl'],
    ...serviceImage('Safety and Warning Signage/Safetey Signs 2'),
  },
  {
    id: 'branding-promotional',
    icon: '🎨',
    title: 'Branding & Promotional',
    shortDesc: 'Promotional signage that communicates effectively and builds a strong visual presence.',
    fullDesc: 'Dynamic event and campaign branding designed for launches, trade exhibitions, retail promotions, and corporate fleet visibility.',
    features: ['Pull-up banners & teardrops', 'Full & partial vehicle branding', 'Window tinting & frosted vinyl', 'Temporary promotional billboards'],
    materials: ['Cast vehicle vinyl', 'Reinforced PVC banners', 'Frosted window privacy film'],
    ...serviceImage('Branding/Khayalami Hotel Group 2'),
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Quality',
    description: 'We take pride in delivering professional, durable signage built with premium industrial-grade materials.',
    highlight: 'Rigorous Quality Checks',
  },
  {
    title: 'Reliability',
    description: 'Committed to meeting project requirements, strict deadlines, and municipal compliance standards.',
    highlight: 'On-Time Project Delivery',
  },
  {
    title: 'Custom Solutions',
    description: 'Every project is approached according to the client\'s specific brand guidelines and architectural needs.',
    highlight: 'Bespoke Engineering',
  },
  {
    title: 'Professional Service',
    description: 'From initial consultation and site survey through to rigging and installation, we make the process seamless.',
    highlight: 'Turnkey Execution',
  },
];

const PORTFOLIO_CATEGORY_BY_FOLDER = {
  boards: {
    category: 'monument',
    categoryLabel: 'Boards & Outdoor',
    description: 'An outdoor signboard project for clear, visible business and community communication.',
  },
  Branding: {
    category: 'promotional',
    categoryLabel: 'Branding & Promotional',
    description: 'A business branding project designed to make the organization easy to recognize.',
  },
  'Corporate Plaques': {
    category: 'plaque',
    categoryLabel: 'Corporate Plaques',
    description: 'A corporate plaque or information sign for clear, professional indoor communication.',
  },
  'Safety and Warning Signage': {
    category: 'safety',
    categoryLabel: 'Safety & Warning',
    description: 'A safety or warning sign created to make important information easy to see.',
  },
  'Shopfront Signage': {
    category: 'shopfront',
    categoryLabel: 'Shopfront Signage',
    description: 'A shopfront signage project that helps customers identify a business.',
  },
} as const;

const PORTFOLIO_CATEGORY_OVERRIDES = {
  'Corporate Plaques/Builkding Directions': {
    category: 'directional',
    categoryLabel: 'Wayfinding & Directional',
    description: 'A building directory sign that helps visitors find their way around a property.',
  },
} as const;

const portfolioTitle = (imagePath: string) => {
  const filename = imagePath.split('/').at(-1) ?? imagePath;
  const title = filename
    .replace(/\bHazeyveiw\b/i, 'Hazeyview')
    .replace(/\bHazerd\b/i, 'Hazard')
    .replace(/\bSafetey\b/i, 'Safety')
    .replace(/\bBuilkding\b/i, 'Building')
    .replace(/\bStorfront\b/i, 'Storefront');

  return title;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = Object.keys(IMAGE_VARIANT_WIDTHS).map((imagePath) => {
  const folder = imagePath.split('/')[0];
  const category = PORTFOLIO_CATEGORY_OVERRIDES[imagePath as keyof typeof PORTFOLIO_CATEGORY_OVERRIDES]
    ?? PORTFOLIO_CATEGORY_BY_FOLDER[folder as keyof typeof PORTFOLIO_CATEGORY_BY_FOLDER];
  const title = portfolioTitle(imagePath);

  return {
    id: imagePath.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title,
    category: category.category,
    categoryLabel: category.categoryLabel,
    ...projectImage(imagePath),
    label: title,
    description: category.description,
    client: 'Project showcase',
    location: 'South Africa',
    materials: 'Custom signage materials',
  };
});
