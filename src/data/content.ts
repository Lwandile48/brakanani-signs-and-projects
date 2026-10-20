import { ServiceItem, PortfolioItem } from '../types';
import { responsiveImageSources } from '../utils/responsiveImageSources';

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
  slogan: 'Making Your Business Visible.',
  phone: '079 184 5221',
  phoneClean: '27791845221',
  email: 'info@brakanani.co.za',
  address: 'South Africa',
  serviceCoverage: 'Serving local & regional clients across South Africa',
  year: '2024',
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
    ...serviceImage('corporate_hours_plaque_1792318419707'),
  },
  {
    id: 'indoor-outdoor',
    icon: '🏠',
    title: 'Indoor & Outdoor',
    shortDesc: 'High-impact signage designed to capture attention both inside and outside your premises.',
    fullDesc: 'Engineered to withstand the South African climate outdoors while delivering refined, flawless finishes for modern indoor interiors.',
    features: ['Outdoor weatherproof monument signs', 'Indoor departmental directories', 'Perimeter boundary signage', 'Architectural wayfinding totems'],
    materials: ['UV-resistant composites', 'Galvanized steel frames', 'Treated hardwood & masonry bases'],
    ...serviceImage('edwaleni_community_sign_1792318415988'),
  },
  {
    id: 'shopfront-building',
    icon: '🏪',
    title: 'Shopfront & Building',
    shortDesc: 'Make your business visible with clear, durable shopfront and building signage.',
    fullDesc: 'Transform retail and commercial facades into unmistakable landmarks that attract foot traffic and drive brand recall.',
    features: ['Lightboxes & illuminated fascia', '3D cut-out dimensional letters', 'Under-canopy double-sided signs', 'Window vinyl displays'],
    materials: ['Energy-efficient LED modules', 'Perspex faces', 'Powder-coated metal frames'],
    ...serviceImage('modern_shopfront_signage_1792318419764'),
  },
  {
    id: 'directional-info',
    icon: '➡️',
    title: 'Directional & Information',
    shortDesc: 'Guide clients and visitors with clear, professional directional and information signs.',
    fullDesc: 'Intuitive wayfinding systems for corporate parks, public institutions, educational campuses, and residential estates.',
    features: ['Custom roadmap & fingerpost signs', 'Floor directory boards', 'Parking & loading zone guides', 'Room numbering & plaques'],
    materials: ['Reflective vinyl graphics', 'Extruded aluminum planks', 'Anti-glare acrylic finishes'],
    ...serviceImage('wayfinding_directional_totem_1792321497153'),
  },
  {
    id: 'safety-warning',
    icon: '⚠️',
    title: 'Safety & Warning',
    shortDesc: 'Compliant safety and warning signage to keep your premises protected and professional.',
    fullDesc: 'SABS and OHS Act compliant health, safety, and regulatory signage designed for commercial facilities, industrial plants, and construction sites.',
    features: ['Fire protection & escape route signs', 'Mandatory PPE notice boards', 'Hazardous material warnings', 'Construction site board signage'],
    materials: ['Photoluminescent (glow-in-the-dark)', 'Chromadek metal boards', 'High-grade reflective vinyl'],
    ...serviceImage('safety_industrial_signage_1792321496607'),
  },
  {
    id: 'branding-promotional',
    icon: '🎨',
    title: 'Branding & Promotional',
    shortDesc: 'Promotional signage that communicates effectively and builds a strong visual presence.',
    fullDesc: 'Dynamic event and campaign branding designed for launches, trade exhibitions, retail promotions, and corporate fleet visibility.',
    features: ['Pull-up banners & teardrops', 'Full & partial vehicle branding', 'Window tinting & frosted vinyl', 'Temporary promotional billboards'],
    materials: ['Cast vehicle vinyl', 'Reinforced PVC banners', 'Frosted window privacy film'],
    ...serviceImage('branding_promotional_vehicle_1792321497500'),
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

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'edwaleni-sign',
    title: 'eDwaleni Community Sign',
    category: 'monument',
    categoryLabel: 'Monument & Outdoor',
    ...projectImage('edwaleni_community_sign_1792318415988'),
    label: 'eDwaleni Community Sign',
    description: 'A monumental stone and dimensional metal community entrance landmark designed to welcome residents and visitors with civic pride.',
    client: 'eDwaleni Community Initiative',
    location: 'South Africa',
    materials: 'Natural stone masonry, 3D fabricated steel lettering, weatherproof UV-cured topcoat',
    highlight: '"Our space, home and pride."',
  },
  {
    id: 'corporate-plaque',
    title: 'Corporate Operating Hours Plaque',
    category: 'plaque',
    categoryLabel: 'Corporate Plaques',
    ...projectImage('corporate_hours_plaque_1792318419707'),
    label: 'Corporate Operating Hours Plaque',
    description: 'Precision laser-engraved brushed stainless steel plaque with standoff mounts and matte acrylic backing for an executive office entrance.',
    client: 'Equinox Capital',
    location: 'Financial District',
    materials: 'Grade 316 brushed stainless steel, acrylic backing, stainless steel barrel standoffs',
  },
  {
    id: 'high-altitude-installation',
    title: 'High-Altitude Architectural Installation',
    category: 'installation',
    categoryLabel: 'Rigging & Installation',
    ...projectImage('signage_installers_high_altitude_1792318418195'),
    label: 'High-Altitude Installation',
    description: 'Multi-story exterior building facade lettering installation executed by certified rigging technicians adhering to strict OHS safety protocols.',
    client: 'Mandela Commercial Centre',
    location: 'Metropolitan Centre',
    materials: 'Internal steel structural truss, aluminum fabricated channel letters, LED backlighting',
    highlight: 'Certified Height Specialists',
  },
  {
    id: 'shopfront-signage',
    title: 'Shopfront Signage & Facade',
    category: 'shopfront',
    categoryLabel: 'Shopfront & Retail',
    ...projectImage('modern_shopfront_signage_1792318419764'),
    label: 'Shopfront Signage',
    description: 'Premium illuminated retail fascia sign featuring 3D warm-glow LED channel letters integrated seamlessly into a modern architectural storefront.',
    client: 'The Arcade Luxury Retail',
    location: 'Melrose Boulevard',
    materials: 'Fabricated brass-tone aluminum, opal acrylic diffusers, waterproof Samsung LED modules',
  },
  {
    id: 'directional-system',
    title: 'Directional & Information Signs',
    category: 'directional',
    categoryLabel: 'Wayfinding & Directional',
    ...projectImage('wayfinding_directional_totem_1792321497153'),
    label: 'Directional & Information Signs',
    description: 'Integrated wayfinding and property entrance signage system designed to guide vehicular and pedestrian traffic effortlessly.',
    client: 'Serengeti Reserve & Lodge',
    location: 'Scenic Regional Reserve',
    materials: 'Laser-cut steel face, architectural stone backing, warm integrated ground up-lighting',
  },
  {
    id: 'safety-signage',
    title: 'Safety & Warning Signage System',
    category: 'safety',
    categoryLabel: 'Safety & Compliance',
    ...projectImage('safety_industrial_signage_1792321496607'),
    label: 'Safety & Warning Signage',
    description: 'Heavy-duty industrial safety notice boards and emergency guidance indicators fully compliant with SABS OHS specifications.',
    client: 'Industrial Operations Site',
    location: 'Regional Logistics Hub',
    materials: 'Chromadek 0.6mm galvanized sheet, class 1 reflective vinyl, UV laminate',
  },
  {
    id: 'branding-fleet',
    title: 'Fleet Vehicle Graphics & Branding',
    category: 'promotional',
    categoryLabel: 'Branding & Fleet',
    ...projectImage('branding_promotional_vehicle_1792321497500'),
    label: 'Commercial Fleet Branding',
    description: 'Full commercial fleet vehicle wrap and corporate livery application engineered for high UV resistance and daily road durability.',
    client: 'Axon Logistics Solutions',
    location: 'Commercial Fleet Studio',
    materials: 'Premium cast vinyl wrap, UV protective gloss overlaminate, contour contouring',
    highlight: 'Turnkey Fleet Livery',
  },
];
