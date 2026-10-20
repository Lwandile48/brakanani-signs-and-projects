import React from 'react';
import { X, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface GoogleMapsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleMapsModal: React.FC<GoogleMapsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative bg-[#1f1d1d] border border-[#3a3636] text-[#F5F4F2] rounded-xl max-w-2xl w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-[#7A000E] text-[#F5F4F2] flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Close map modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#C3B0F0] mb-2 uppercase tracking-wider">
          <Navigation className="w-4 h-4" />
          <span>Regional &amp; Nationwide Service Area</span>
        </div>

        <h3 className="text-xl font-serif font-bold text-[#F5F4F2] mb-3">
          Brakanani Signs &amp; Projects &mdash; Location &amp; Logistics
        </h3>

        <p className="text-xs text-[#DCD7D4] mb-4">
          Headquartered in South Africa, providing end-to-end design, custom fabrication, municipal approvals, and on-site rigging &amp; installation for clients across all provinces.
        </p>

        {/* Map iframe or stylized interactive view */}
        <div className="w-full h-72 rounded-lg overflow-hidden border border-[#3a3636] relative bg-[#141313] mb-4">
          <iframe
            title="Brakanani Signs & Projects Service Location"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=South+Africa&t=&z=5&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#3a3636]">
          <div className="flex items-center gap-2 text-xs text-[#DCD7D4]">
            <MapPin className="w-4 h-4 text-[#7A000E]" />
            <span>Serving Gauteng, Mpumalanga, KZN, Western Cape &amp; nationwide</span>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=South+Africa"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-4 py-2 bg-[#7A000E] hover:bg-[#5a000a] text-[#F5F4F2] text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
