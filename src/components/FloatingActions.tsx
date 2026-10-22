import React from 'react';
import { BRAND_INFO } from '../data/content';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp Action */}
      <a
        href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20Brakanani%20Signs%2C%20I%20would%20like%20to%20inquire%20about%20a%20signage%20project.`}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:bg-[#20ba59] transition-all transform hover:-translate-y-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">072 417 2753</span>
      </a>

      {/* Floating Phone Button (matches document specification) */}
      <a
        href={`tel:${BRAND_INFO.phoneClean}`}
        className="group flex items-center gap-2.5 bg-[#7A000E] text-[#F5F4F2] px-5 py-3.5 rounded-full shadow-2xl hover:bg-[#5a000a] transition-all transform hover:-translate-y-1 text-sm font-bold border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#7A000E]/60"
        title={`Call ${BRAND_INFO.phone}`}
      >
        <span className="text-base group-hover:scale-110 transition-transform">📞</span>
        <span className="tracking-wide font-sans">{BRAND_INFO.phone}</span>
      </a>
    </div>
  );
};
