import React from 'react';
import { PageView } from '../types';
import { BRAND_INFO } from '../data/content';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  return (
    <footer className="bg-[#030303] text-[#F5F4F2] pt-16 pb-8 border-t border-[#222020]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7A000E] text-[#F5F4F2] rounded-lg flex items-center justify-center font-serif text-xl font-bold">
                B
              </div>
              <div>
                <strong className="block text-[#F5F4F2] tracking-wider text-base font-bold font-serif-brand">
                  {BRAND_INFO.name}
                </strong>
                <span className="text-[10px] font-medium tracking-[0.2em] text-[#DCD7D4] block uppercase">
                  {BRAND_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#DCD7D4] max-w-sm leading-relaxed">
              <strong className="text-[#F5F4F2]">{BRAND_INFO.slogan}</strong><br />
              Professional signage and project solutions — from concept and design through to precision fabrication and high-altitude installation.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-[#DCD7D4]">BEE Compliant &middot; SABS Safety Standards &middot; Nationwide Logistics</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F4F2] border-b border-[#222] pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#DCD7D4]">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5F4F2] hover:translate-x-1 transition-transform inline-flex items-center gap-1.5"
                >
                  <span className="text-[#7A000E]">&rsaquo;</span> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5F4F2] hover:translate-x-1 transition-transform inline-flex items-center gap-1.5"
                >
                  <span className="text-[#7A000E]">&rsaquo;</span> About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-[#F5F4F2] hover:translate-x-1 transition-transform inline-flex items-center gap-1.5"
                >
                  <span className="text-[#7A000E]">&rsaquo;</span> Services Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-[#F5F4F2] hover:translate-x-1 transition-transform inline-flex items-center gap-1.5"
                >
                  <span className="text-[#7A000E]">&rsaquo;</span> Portfolio &amp; Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5F4F2] hover:translate-x-1 transition-transform inline-flex items-center gap-1.5"
                >
                  <span className="text-[#7A000E]">&rsaquo;</span> Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F4F2] border-b border-[#222] pb-2">
              Contact
            </h4>
            <div className="space-y-2.5 text-sm text-[#DCD7D4]">
              <a
                href={`tel:${BRAND_INFO.phoneClean}`}
                className="flex items-center gap-2.5 hover:text-[#C3B0F0] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#7A000E] shrink-0" />
                <span>{BRAND_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="flex items-center gap-2.5 hover:text-[#C3B0F0] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#7A000E] shrink-0" />
                <span>{BRAND_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A000E] shrink-0 mt-0.5" />
                <span>{BRAND_INFO.address}<br /><span className="text-xs text-[#999]">Serving local &amp; regional clients</span></span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C3B0F0] hover:text-[#F5F4F2] transition-colors"
                >
                  <span>Request Project Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Social Links & Working Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F4F2] border-b border-[#222] pb-2">
              Follow Us
            </h4>
            <p className="text-xs text-[#DCD7D4]">
              Stay updated with our latest installations and architectural signage projects.
            </p>
            <div className="flex gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-[#222020] border border-[#3a3636] rounded-full flex items-center justify-center text-xs font-bold hover:bg-[#7A000E] hover:border-[#7A000E] transition-colors"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-[#222020] border border-[#3a3636] rounded-full flex items-center justify-center text-xs font-bold hover:bg-[#7A000E] hover:border-[#7A000E] transition-colors"
              >
                ig
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-[#222020] border border-[#3a3636] rounded-full flex items-center justify-center text-xs font-bold hover:bg-[#7A000E] hover:border-[#7A000E] transition-colors"
              >
                in
              </a>
            </div>

            <div className="pt-3 text-xs text-[#999]">
              <span className="block font-medium text-[#DCD7D4]">Production &amp; Installation:</span>
              Monday &ndash; Friday: 08:00 &ndash; 17:00<br />
              Emergency &amp; Weekend Rigging: By appointment
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7a7373] gap-3">
          <p>&copy; {BRAND_INFO.year} {BRAND_INFO.name} Signs &amp; Projects. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#DCD7D4]/60">Professional Signage &amp; Project Solutions</span>
            <span>&middot;</span>
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#F5F4F2] transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
