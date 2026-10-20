import React from 'react';
import { PageView } from '../types';
import { BRAND_INFO } from '../data/content';
import { responsiveImageSources } from '../utils/responsiveImageSources';
import { CheckCircle2, Shield, Target, Award, ArrowRight, Hammer, Layers, Users } from 'lucide-react';
import { GlassFold } from '@/components/ui/glass-fold';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenQuoteModal }) => {
  return (
    <div className="space-y-0 animate-in fade-in duration-300">
      
      {/* ===== PAGE TITLE WITH WEBGEL GLASS-FOLD BACKGROUND ===== */}
      <div className="relative text-center py-24 md:py-32 overflow-hidden border-b border-[#3a3636] bg-[#0c0a0a]">
        {/* Animated WebGL GlassFold Shader with Brakanani Brand Palette */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
          <GlassFold
            color1="#7A000E" /* Dark Ruby */
            color2="#141111" /* Meteorite Deep Dark */
            color3="#C3B0F0" /* Creme White Lit Edge */
            speed={0.35}
            scale={1.15}
            noise={0.06}
            className="w-full h-full"
          />
        </div>

        {/* Ambient Dark Scrim for Legibility & Contrast */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#030303]/80 via-[#030303]/50 to-[#2C2929] pointer-events-none" />

        {/* Subtle Mesh Grid */}
        <div 
          className="absolute inset-0 z-[2] opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #DCD7D4 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C3B0F0] block">
            Craftsmanship &middot; Durability &middot; Integrity
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F5F4F2]">
            About Brakanani
          </h1>
          <p className="text-base sm:text-lg text-[#DCD7D4] max-w-xl mx-auto font-sans">
            Professional Signage &amp; Project Solutions
          </p>
        </div>
      </div>

      {/* ===== INTRO / STORY (matching about.html) ===== */}
      <section className="py-20 md:py-28 bg-[#2C2929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C3B0F0] block">
                Our Heritage &amp; Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F4F2]">
                Who We Are
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#DCD7D4] leading-relaxed">
                <p>
                  <strong className="text-[#F5F4F2]">Brakanani Signs &amp; Projects</strong> is a professional signage and project solutions company dedicated to helping businesses and organisations make a strong, lasting impression. We provide quality signage solutions designed to improve visibility, strengthen brand identity and create professional spaces.
                </p>
                <p>
                  From concept and design through to production and installation, we focus on delivering practical, durable and visually appealing solutions tailored to each client's needs.
                </p>
                <p>
                  We believe that quality workmanship, attention to detail and reliable service are the foundation of every successful project. We work closely with our clients to understand their requirements and deliver solutions that represent their brand professionally.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 text-xs text-[#DCD7D4]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A000E]" />
                  <span>Turnkey In-House Fabrication</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A000E]" />
                  <span>Licensed Installation Riggers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A000E]" />
                  <span>South African Weatherproofing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7A000E]" />
                  <span>Municipal &amp; OHS Compliant</span>
                </div>
              </div>
            </div>

            {/* Intro Image: Installers erecting the large eDwaleni sign */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border-2 border-[#3a3636] shadow-2xl bg-[#222020]">
                <img
                  {...responsiveImageSources('edwaleni_community_sign_1792318415988')}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="eDwaleni Community Monument Sign Installation"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[450px] object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C3B0F0] mb-1">
                    Monumental Project Delivery
                  </span>
                  <p className="text-sm font-serif font-bold text-[#F5F4F2]">
                    eDwaleni Community Welcome Monument
                  </p>
                  <p className="text-xs text-[#DCD7D4] mt-0.5">
                    Architectural stone foundation with fabricated dimensional lettering erected on a scenic roadside bank.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== VISION & MISSION (matching about.html) ===== */}
      <section className="py-20 bg-[#222020] border-t border-b border-[#3a3636]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F4F2] mb-3">
              Our Vision &amp; Mission
            </h2>
            <p className="text-sm text-[#DCD7D4]">
              Guided by a commitment to elevate commercial spaces and community identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Vision Card in Dark Ruby with subtle background image */}
            <div className="relative bg-[#7A000E] text-[#F5F4F2] p-6 sm:p-10 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden group border border-white/10">
              {/* Background Monument Image with Ruby Gradient Overlay */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  {...responsiveImageSources('edwaleni_community_sign_1792318415988')}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 filter brightness-75"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5a000a]/95 via-[#7A000E]/85 to-[#7A000E]/70" />
              </div>

              <div className="relative z-10">
                <div className="w-11 h-11 sm:w-13 sm:h-13 bg-black/30 border border-white/20 rounded-xl flex items-center justify-center mb-5 sm:mb-6 shadow-md backdrop-blur-sm">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#F5F4F2]" />
                </div>
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#F5F4F2] mb-3 sm:mb-4">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-[#F5F4F2]/90 leading-relaxed font-sans">
                  To become a trusted and recognised signage and project solutions provider, known for quality, creativity, reliability and exceptional customer service.
                </p>
              </div>

              <div className="relative z-10 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/20 text-xs text-white/80 font-medium">
                Setting the benchmark for sign engineering in Southern Africa
              </div>
            </div>

            {/* Mission Card with subtle architectural showcase image */}
            <div className="relative bg-[#222020] border border-[#3a3636] text-[#F5F4F2] p-6 sm:p-10 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden group">
              {/* Background Architectural Image with Dark Gradient Overlay */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  {...responsiveImageSources('hero_signage_showcase_1792318416486', 1376)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141212]/95 via-[#222020]/90 to-[#2C2929]/80" />
              </div>

              <div className="relative z-10">
                <div className="w-11 h-11 sm:w-13 sm:h-13 bg-[#7A000E]/20 border border-[#7A000E]/40 rounded-xl flex items-center justify-center mb-5 sm:mb-6 shadow-md backdrop-blur-sm">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#C3B0F0]" />
                </div>
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#C3B0F0] mb-3 sm:mb-4">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-[#DCD7D4] leading-relaxed font-sans">
                  To deliver professional signage and project solutions that help businesses stand out, communicate effectively and build a strong visual presence.
                </p>
              </div>

              <div className="relative z-10 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#3a3636] text-xs text-[#DCD7D4] font-medium">
                Empowering brands through durable visual communication
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== FEATURED CASE STUDY (matching about.html) ===== */}
      <section className="py-20 md:py-28 bg-[#2C2929]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#222020] border border-[#3a3636] rounded-xl p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Image Side: Installers working on high altitude */}
              <div className="lg:col-span-6 relative">
                <div className="rounded-lg overflow-hidden border border-[#3a3636] bg-[#181616]">
                  <img
                    {...responsiveImageSources('signage_installers_high_altitude_1792318418195')}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    alt="High-Altitude Installation Crew at Work"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-[360px] sm:h-[420px] object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="mt-3 text-xs text-[#888] flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#7A000E]" />
                  <span>Certified rigging specialists on elevated staging</span>
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-6 space-y-5">
                <span className="inline-block bg-[#7A000E] text-[#F5F4F2] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  FEATURED CASE STUDY
                </span>

                <h2 className="text-3xl font-serif font-bold text-[#F5F4F2]">
                  eDwaleni Community Sign
                </h2>

                <p className="text-base text-[#DCD7D4] leading-relaxed">
                  From concept to professional high-altitude installation. A high-impact outdoor signage project designed to capture attention and create a lasting welcome for the eDwaleni community.
                </p>

                <blockquote className="border-l-2 border-[#C3B0F0] pl-4 py-1 italic text-lg text-[#C3B0F0] font-serif font-semibold">
                  &ldquo;Our space, home and pride.&rdquo;
                </blockquote>

                <p className="text-xs text-[#DCD7D4] leading-relaxed">
                  The structure combines rustic natural dry-stack masonry with precision-cut dimensional metal letters, engineered to withstand intense solar exposure and rain.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenQuoteModal('Monument / Community Sign')}
                    className="px-6 py-3 bg-[#7A000E] hover:bg-[#5a000a] text-[#F5F4F2] text-sm font-semibold rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ===== TURNKEY PROCESS ===== */}
      <section className="py-20 bg-[#222020] border-t border-[#3a3636]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C3B0F0] block mb-2">
              End-to-End Methodology
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#F5F4F2]">
              How We Deliver Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Consultation & Site Survey',
                desc: 'Detailed assessment of architectural surfaces, visibility sightlines, and local municipal bylaws.',
              },
              {
                step: '02',
                title: '3D CAD & Engineering',
                desc: 'Photorealistic digital mockups, structural stress calculations, and material selections.',
              },
              {
                step: '03',
                title: 'Precision Fabrication',
                desc: 'CNC routing, laser cutting, welding, UV curing, and testing in our dedicated facility.',
              },
              {
                step: '04',
                title: 'Rigging & Installation',
                desc: 'Professional crane work, scaffolding, electrical connection, and final compliance sign-off.',
              },
            ].map((p) => (
              <div key={p.step} className="bg-[#2C2929] border border-[#3a3636] p-6 rounded-lg">
                <span className="font-mono text-xl font-bold text-[#7A000E] block mb-2">{p.step}.</span>
                <h3 className="text-base font-serif font-bold text-[#F5F4F2] mb-2">{p.title}</h3>
                <p className="text-xs text-[#DCD7D4] leading-relaxed">{p.desc}</p>
              </div>
            ))}
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
