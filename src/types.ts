export type PageView = 'home' | 'about' | 'contact' | 'services' | 'portfolio';

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  materials: string[];
  bgImage?: string;
  bgImageSrcSet?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'monument' | 'plaque' | 'installation' | 'shopfront' | 'directional' | 'safety' | 'promotional';
  categoryLabel: string;
  image: string;
  imageSrcSet: string;
  label: string;
  description: string;
  client: string;
  location: string;
  materials: string;
  highlight?: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  file?: File | null;
}
