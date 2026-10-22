import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { PageView, PortfolioItem, ServiceItem } from '../types';
import { BRAND_INFO, SERVICES, WHY_CHOOSE_US, PORTFOLIO_ITEMS } from '../data/content';
import { Phone, ArrowRight, Check, Sparkles, Eye, ShieldCheck, Compass, Layers, LayoutGrid } from 'lucide-react';
import { GlassFold } from '@/components/ui/glass-fold';
import type { SlideItem } from '@/components/ui/dimensional-switch-slider';
import { responsiveImageSources } from '../utils/responsiveImageSources';

const DimensionalSwitchSlider = lazy(() =>
  import('@/components/ui/dimensional-switch-slider').then(({ DimensionalSwitchSlider }) => ({
    default: DimensionalSwitchSlider,
  }))
);

const DIMENSIONAL_SHOWCASE_FEATURED_IDS: Partial<Record<PortfolioItem['category'], string>> = {
  monument: 'boards-hazeyveiw-board',
  safety: 'safety-and-warning-signage-smoking-area-1',
  shopfront: 'shopfront-signage-factory-board',
};

interface HomeViewProps {
  onNavigate: (view: PageView) => void;
  onOpenQuoteModal: (service?: string) => void;
  onSelectProject: (project: PortfolioItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [workViewMode, setWorkViewMode] = useState<'slider' | 'grid'>('slider');
  const [shouldLoadSlider, setShouldLoadSlider] = useState(false);
  const portfolioSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = portfolioSectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoadSlider(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadSlider(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const filteredPortfolio = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const dimensionalPortfolioItems = PORTFOLIO_ITEMS.filter((item, index, items) => {
    const featuredId = DIMENSIONAL_SHOWCASE_FEATURED_IDS[item.category];
    if (featuredId) return item.id === featuredId;
    return items.findIndex((candidate) => candidate.category === item.category) === index;
  });

  const sliderItems: SlideItem[] = dimensionalPortfolioItems.map((item) => ({
    id: item.id,
    image: item.image,
    imageSrcSet: item.imageSrcSet,
    text: item.title,
    category: item.categoryLabel,
    subtext: `${item.location} · ${item.materials}`,
  }));

  const handleSliderItemClick = (slide: SlideItem) => {
    const found = PORTFOLIO_ITEMS.find((p) => p.id === slide.id || p.title === slide.text);
    if (found) {
      onSelectProject(found);
    }
  };

  return (
    <div className="space-y-0">
      
      {/* ===== HERO SECTION WITH WEBGEL GLASS-FOLD BACKGROUND ===== */}
      <section className="relative min-h-[600px] text-[#F5F4F2] pt-28 pb-24 md:py-36 overflow-hidden border-b border-[#3a3636] bg-[#0c0a0a]">
        {/* Animated WebGL GlassFold Shader with Brakanani Brand Palette */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
          <GlassFold
            color1="#7A000E" /* Dark Ruby */
            color2="#141111" /* Meteorite Deep Dark */
            color3="#C3B0F0" /* Creme White Lit Edge */
            speed={0.4}
            scale={1.05}
            noise={0.06}
            className="w-full h-full"
          />
        </div>

        {/* Ambient Overlay Scrim for Text Contrast and Legibility */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#030303]/90 via-[#030303]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#222020] via-transparent to-[#030303]/40 pointer-events-none" />

        {/* Subtle grid texture overlay */}
        <div 
          className="absolute inset-0 z-[2] opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #DCD7D4 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#F5F4F2] leading-[1.15] text-balance">
                Built To Be <span className="text-[#7A000E]">Seen.</span>
              </h1>

              <p className="text-sm sm:text-lg text-[#DCD7D4] max-w-2xl leading-relaxed">
                Professional signage &amp; project solutions &mdash; from concept and design through to precision fabrication and certified high-altitude installation.
              </p>

              {/* Actions matching document */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-3">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#7A000E] hover:bg-[#5a000a] text-[#F5F4F2] font-semibold text-xs sm:text-sm rounded shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#portfolio"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent hover:bg-[#DCD7D4] text-[#F5F4F2] hover:text-[#2C2929] border border-[#DCD7D4] font-semibold text-xs sm:text-sm rounded transition-all duration-200"
                >
                  View Our Work
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 sm:pt-8 border-t border-[#3a3636] grid grid-cols-3 gap-2 sm:gap-4 text-[11px] sm:text-xs text-[#DCD7D4]">
                <div>
                  <strong className="block text-[#F5F4F2] font-semibold text-xs sm:text-sm truncate">100% Turnkey</strong>
                  <span className="text-[10px] sm:text-xs">Concept to Rigging</span>
                </div>
                <div>
                  <strong className="block text-[#F5F4F2] font-semibold text-xs sm:text-sm truncate">SABS Compliant</strong>
                  <span className="text-[10px] sm:text-xs">Certified safety</span>
                </div>
                <div>
                  <strong className="block text-[#F5F4F2] font-semibold text-xs sm:text-sm truncate">Nationwide</strong>
                  <span className="text-[10px] sm:text-xs">SA delivery</span>
                </div>
              </div>
            </div>

            {/* Hero Right Showcase Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border-2 border-[#3a3636] shadow-2xl group bg-[#181616]">
                <img
                  {...responsiveImageSources('Shopfront Signage/Factory Board')}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  alt="Brakanani Signage Showcase"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C3B0F0] mb-1">
                    Shopfront & Building Signage
                  </span>
                  <p className="text-sm font-serif font-bold text-[#F5F4F2]">
                    Prominent exterior signage for a local business
                  </p>
                  <p className="text-xs text-[#DCD7D4] mt-1">
                    Clear, visible signage that helps customers find the business.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-20 md:py-28 bg-[#222020] border-b border-[#3a3636]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F4F2] mb-3">
              Our Services
            </h2>
            <p className="text-base text-[#DCD7D4]">
              Practical, durable and visually appealing signage solutions tailored to each client's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="relative bg-[#1f1d1d] border border-[#3a3636] rounded-xl p-5 sm:p-7 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7A000E] hover:shadow-2xl flex flex-col justify-between group overflow-hidden"
              >
                {/* Background Image with Dark Contrast Scrim */}
                {service.bgImage && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
                    <img
                      src={service.bgImage}
                      srcSet={service.bgImageSrcSet}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-35 group-hover:scale-108 transition-all duration-700 filter brightness-90"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141212] via-[#1a1818]/90 to-[#222020]/75" />
                  </div>
                )}

                {/* Subtle blueprint grid overlay */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #DCD7D4 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative z-10">
                  {/* Top Row: Icon + Editorial Index */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#7A000E]/20 border border-[#7A000E]/40 rounded-xl flex items-center justify-center text-xl sm:text-2xl group-hover:bg-[#7A000E] group-hover:scale-105 transition-all shadow-md backdrop-blur-sm">
                      {service.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#888] tracking-widest bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#F5F4F2] group-hover:text-white mb-2 transition-colors break-words">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#DCD7D4] leading-relaxed mb-4 break-words">
                    {service.shortDesc}
                  </p>

                  {/* Feature Tags inside Card */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {service.features.slice(0, 2).map((feature, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] sm:text-[11px] font-medium text-[#C3B0F0] bg-black/40 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-3.5 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#888] truncate max-w-[140px]">
                    {service.materials[0] || 'Custom Spec'}
                  </span>
                  <button
                    onClick={() => onOpenQuoteModal(service.title)}
                    className="text-xs font-semibold text-[#C3B0F0] group-hover:text-white inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#7A000E] group-hover:text-[#C3B0F0]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-8 py-3.5 bg-[#7A000E] hover:bg-[#5a000a] text-[#F5F4F2] font-semibold text-sm rounded shadow-md transition-colors cursor-pointer"
            >
              Request a Custom Solution
            </button>
          </div>

        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section id="why" className="py-20 md:py-28 bg-[#2C2929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F4F2] mb-3">
              Why Choose Us?
            </h2>
            <p className="text-base text-[#DCD7D4]">
              Quality workmanship, attention to detail and reliable service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-[#222020] border border-[#3a3636] rounded-xl p-5 sm:p-7 text-left hover:border-[#7A000E] hover:-translate-y-1 transition-all duration-300 shadow-md group overflow-hidden"
              >
                {/* Background Editorial Watermark Index */}
                <span className="absolute -top-2 -right-1 font-mono font-black text-6xl text-white/[0.03] group-hover:text-white/[0.06] select-none pointer-events-none transition-colors">
                  0{idx + 1}
                </span>

                {/* Ambient glow in corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#7A000E]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#7A000E]/20 transition-all" />

                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#7A000E] text-[#F5F4F2] rounded-lg flex items-center justify-center mb-4 sm:mb-5 text-sm sm:text-base font-bold shadow-md group-hover:scale-105 transition-transform">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#F5F4F2] mb-1.5 group-hover:text-white transition-colors break-words">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#DCD7D4] leading-relaxed mb-3 break-words">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-[#3a3636]/80 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#C3B0F0]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#7A000E]" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== PORTFOLIO SECTION WITH 3D DIMENSIONAL SLIDER ===== */}
      <section ref={portfolioSectionRef} id="portfolio" className="py-20 md:py-28 bg-[#222020] border-t border-b border-[#3a3636] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C3B0F0] block mb-2">
              Featured Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F4F2] mb-3">
              Our Work
            </h2>
            <p className="text-base text-[#DCD7D4]">
              Signs that speak for you &mdash; built to stand out.
            </p>
          </div>

          {/* View Mode Toggle (3D Dimensional Switcher vs Complete Grid) */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex p-1 bg-[#181616] border border-[#3a3636] rounded-lg">
              <button
                type="button"
                onClick={() => setWorkViewMode('slider')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  workViewMode === 'slider'
                    ? 'bg-[#7A000E] text-[#F5F4F2] shadow-sm'
                    : 'text-[#DCD7D4] hover:text-[#F5F4F2]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Dimensional Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => setWorkViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  workViewMode === 'grid'
                    ? 'bg-[#7A000E] text-[#F5F4F2] shadow-sm'
                    : 'text-[#DCD7D4] hover:text-[#F5F4F2]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Complete Project Gallery ({PORTFOLIO_ITEMS.length})</span>
              </button>
            </div>
          </div>

          {workViewMode === 'slider' ? (
            <div className="space-y-6">
              {/* 3D Dimensional Flip Card Slider */}
              <div className="bg-[#181616]/70 border border-[#3a3636] rounded-2xl p-2 sm:p-8 backdrop-blur-sm shadow-2xl overflow-hidden">
                {shouldLoadSlider ? (
                  <Suspense fallback={<div className="min-h-[460px] sm:min-h-[600px]" aria-busy="true" />}>
                    <DimensionalSwitchSlider
                      items={sliderItems}
                      onItemClick={handleSliderItemClick}
                      infinite
                      direction="horizontal"
                      autoplay
                      autoplayDelay={3600}
                      textColor="#F5F4F2"
                      accentColor="#7A000E"
                      textSize={30}
                      cardWidth={740}
                      cardHeight={440}
                      cardBorderRadius={14}
                    />
                  </Suspense>
                ) : (
                  <div className="min-h-[460px] sm:min-h-[600px]" aria-hidden="true" />
                )}
              </div>

              {/* Quick thumb navigation strip */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <span className="text-xs text-[#888] mr-1">Direct jump:</span>
                {dimensionalPortfolioItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectProject(item)}
                    className="text-xs px-3 py-1.5 rounded bg-[#2C2929] hover:bg-[#7A000E] text-[#DCD7D4] hover:text-[#F5F4F2] border border-[#3a3636] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Category Filter Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'monument', label: 'Monument & Outdoor' },
                  { id: 'plaque', label: 'Corporate Plaques' },
                  { id: 'shopfront', label: 'Shopfront Signage' },
                  { id: 'directional', label: 'Directional' },
                  { id: 'safety', label: 'Safety & Warning' },
                  { id: 'promotional', label: 'Branding & Promotional' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[#7A000E] text-[#F5F4F2]'
                        : 'bg-[#2C2929] text-[#DCD7D4] hover:text-[#F5F4F2] border border-[#3a3636]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Enhanced Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectProject(item)}
                    className="group relative rounded-xl overflow-hidden bg-[#181616] aspect-[4/3] border-2 border-[#3a3636] hover:border-[#7A000E] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center text-center p-0"
                  >
                    <img
                      src={item.image}
                      srcSet={item.imageSrcSet}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                      }}
                    />
                    
                    {/* Top Floating Glassmorphism Header */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                      <span className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-[#C3B0F0] border border-white/10 shadow-md">
                        {item.categoryLabel}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-[#F5F4F2] group-hover:bg-[#7A000E] flex items-center justify-center transition-colors border border-white/15 shadow-md">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Overlay with Rich Metadata */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/95 via-[#030303]/40 to-transparent flex flex-col justify-end p-5 text-left">
                      <div className="text-base font-serif font-bold text-[#F5F4F2] group-hover:text-[#C3B0F0] transition-colors mb-1">
                        {item.label}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#DCD7D4] mb-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#7A000E] shrink-0" />
                        <span className="truncate">{item.location} &middot; {item.client}</span>
                      </div>
                      <p className="text-[11px] text-[#999] line-clamp-1">
                        {item.materials}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12 pt-6 border-t border-[#3a3636]/60">
            <p className="text-xs text-[#DCD7D4] mb-3">
              Need a custom installation or specialized material specification?
            </p>
            <button
              onClick={() => onOpenQuoteModal()}
              className="text-xs font-bold uppercase tracking-wider text-[#C3B0F0] hover:text-[#F5F4F2] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Speak directly to our project estimators</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ===== CTA BANNER (matching document) ===== */}
      <section className="bg-[#7A000E] text-[#F5F4F2] text-center py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F4F2]">
            Built To Be Seen.
          </h2>
          <p className="text-base text-[#F5F4F2]/90 max-w-xl mx-auto">
            Ready to make your business visible? Let's create signage that speaks for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a
              href={`tel:${BRAND_INFO.phoneClean}`}
              className="px-8 py-3.5 bg-transparent border-2 border-[#F5F4F2] text-[#F5F4F2] hover:bg-[#F5F4F2] hover:text-[#7A000E] font-semibold text-sm rounded transition-all duration-200"
            >
              📞 {BRAND_INFO.phone}
            </a>
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-8 py-3.5 bg-[#2C2929] hover:bg-[#030303] text-[#F5F4F2] font-semibold text-sm rounded transition-all duration-200 shadow-lg cursor-pointer"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
