import React, { useState } from 'react';
import { PageView } from '../types';
import { BRAND_INFO } from '../data/content';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionScroll = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#2C2929]/95 backdrop-blur-md border-b border-[#3a3636] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A000E] rounded-md p-1 cursor-pointer"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#7A000E] text-[#F5F4F2] rounded-lg flex items-center justify-center font-serif text-xl sm:text-2xl font-bold shadow-md group-hover:bg-[#5a000a] transition-colors shrink-0">
            B
          </div>
          <div className="leading-tight">
            <strong className="block text-[#F5F4F2] tracking-wider text-sm sm:text-base font-bold font-serif-brand">
              {BRAND_INFO.name}
            </strong>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.16em] text-[#DCD7D4] block uppercase">
              {BRAND_INFO.tagline}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links for Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'home'
                ? 'border-[#7A000E] text-[#C3B0F0] font-semibold'
                : 'border-transparent text-[#F5F4F2] hover:text-[#C3B0F0] hover:border-[#7A000E]'
            }`}
          >
            Home
          </button>

          
          <button
            onClick={() => handleSectionScroll('services')}
            className="py-1 border-b-2 border-transparent text-[#F5F4F2] hover:text-[#C3B0F0] hover:border-[#7A000E] transition-colors whitespace-nowrap cursor-pointer"
          >
            Services
          </button>

          <button
            onClick={() => handleSectionScroll('why')}
            className="py-1 border-b-2 border-transparent text-[#F5F4F2] hover:text-[#C3B0F0] hover:border-[#7A000E] transition-colors whitespace-nowrap cursor-pointer"
          >
            Why Us
          </button>

          <button
            onClick={() => handleSectionScroll('portfolio')}
            className="py-1 border-b-2 border-transparent text-[#F5F4F2] hover:text-[#C3B0F0] hover:border-[#7A000E] transition-colors whitespace-nowrap cursor-pointer"
          >
            Our  Work
          </button>
          

          <button
            onClick={() => handleNavClick('about')}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'about'
                ? 'border-[#7A000E] text-[#C3B0F0] font-semibold'
                : 'border-transparent text-[#F5F4F2] hover:text-[#C3B0F0] hover:border-[#7A000E]'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'contact'
                ? 'border-[#7A000E] text-[#C3B0F0] font-semibold'
                : 'border-transparent text-[#F5F4F2] hover:text-[#C3B0F0] hover:border-[#7A000E]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Call link & Primary CTA / Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${BRAND_INFO.phoneClean}`}
            className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[#DCD7D4] hover:text-[#F5F4F2] px-3 py-2 rounded border border-[#3a3636] hover:border-[#7A000E] transition-all"
            title="Call Brakanani"
          >
            <Phone className="w-3.5 h-3.5 text-[#C3B0F0]" />
            <span>{BRAND_INFO.phone}</span>
          </a>

          {/* Desktop-only "Get a Quote" button */}
          <button
            onClick={onOpenQuoteModal}
            className="hidden md:flex px-5 py-2.5 bg-[#7A000E] text-[#F5F4F2] text-sm font-semibold rounded hover:bg-[#5a000a] transition-all duration-200 cursor-pointer shadow-sm items-center gap-1.5 whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-[#7A000E]/50"
          >
            <span>Get a Quote</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </button>

          {/* Mobile Hamburger Toggle Button with Menu label */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-[#222020] border border-[#3a3636] text-[#F5F4F2] hover:text-[#C3B0F0] hover:border-[#7A000E] active:scale-95 transition-all focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu to review all sections'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#DCD7D4]">
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </span>
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#C3B0F0]" />
            ) : (
              <Menu className="w-5 h-5 text-[#F5F4F2]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer to Review All Sections */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1c1a1a] border-b border-[#3a3636] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200 shadow-2xl">
          {/* Section Review Header */}
          <div className="px-1 pt-1 pb-1 flex items-center justify-between text-xs text-[#888] font-medium border-b border-white/5">
            <span>Review Site Sections</span>
            <span className="text-[11px] text-[#C3B0F0] font-semibold">Brakanani Signs</span>
          </div>

          {/* Navigation Links list */}
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                currentView === 'home'
                  ? 'bg-[#7A000E]/20 text-[#C3B0F0] border border-[#7A000E]/40 font-bold'
                  : 'text-[#F5F4F2] hover:bg-[#2C2929]'
              }`}
            >
              <span>Home</span>
              <span className="text-xs text-[#888]">&rsaquo;</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                currentView === 'about'
                  ? 'bg-[#7A000E]/20 text-[#C3B0F0] border border-[#7A000E]/40 font-bold'
                  : 'text-[#F5F4F2] hover:bg-[#2C2929]'
              }`}
            >
              <span>About Us</span>
              <span className="text-xs text-[#888]">&rsaquo;</span>
            </button>

            <button
              onClick={() => handleSectionScroll('services')}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#F5F4F2] hover:bg-[#2C2929] transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Our Services</span>
              <span className="text-xs text-[#888]">&rsaquo;</span>
            </button>

            <button
              onClick={() => handleSectionScroll('why')}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#F5F4F2] hover:bg-[#2C2929] transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Why Choose Us</span>
              <span className="text-xs text-[#888]">&rsaquo;</span>
            </button>

            <button
              onClick={() => handleSectionScroll('portfolio')}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#F5F4F2] hover:bg-[#2C2929] transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Our Work / Portfolio</span>
              <span className="text-xs text-[#888]">&rsaquo;</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-[#7A000E]/20 text-[#C3B0F0] border border-[#7A000E]/40 font-bold'
                  : 'text-[#F5F4F2] hover:bg-[#2C2929]'
              }`}
            >
              <span>Contact Us</span>
              <span className="text-xs text-[#888]">&rsaquo;</span>
            </button>
          </div>

          {/* Inset "Get a Quote" Option inside the menu options */}
          <div className="pt-2 border-t border-[#3a3636]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 bg-[#7A000E] hover:bg-[#5a000a] text-[#F5F4F2] rounded-lg text-left flex items-center justify-between shadow-lg cursor-pointer transition-all border border-[#7A000E]/50 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-black/25 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-[#C3B0F0]" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-white">
                    Get a Quote
                  </span>
                  <span className="block text-[11px] text-[#F5F4F2]/80 font-normal">
                    Custom signage pricing &amp; specs
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-[#F5F4F2] px-2 py-0.5 rounded">
                Instant
              </span>
            </button>
          </div>

          {/* Direct Phone Call Option */}
          <div className="pt-1">
            <a
              href={`tel:${BRAND_INFO.phoneClean}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#222020] text-xs text-[#F5F4F2] font-semibold border border-[#3a3636] hover:border-[#7A000E] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C3B0F0]" />
              <span>Call Direct: {BRAND_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
