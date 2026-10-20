import React, { useState } from 'react';
import { BRAND_INFO } from '../data/content';
import { Upload, ArrowRight, CheckCircle2, FileText, Phone, Mail, MapPin } from 'lucide-react';

interface ContactViewProps {
  onOpenMapModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenMapModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `MSG-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setUploadedFile(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="py-20 md:py-28 bg-[#2C2929] min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* The Distinctive Contact Card from attached contact.html */}
        <div className="relative bg-[#1a1818] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] shadow-2xl border border-[#3a3636]">
          
          {/* ===== LEFT SIDE: Map & Info (7 cols on desktop) ===== */}
          <div className="lg:col-span-7 relative p-8 sm:p-12 md:p-14 flex flex-col justify-between overflow-hidden">
            
            {/* Stylized Map Background Pattern */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><g fill='none' stroke='%23DCD7D4' stroke-width='1.5' opacity='0.4'><path d='M50,50 L150,50 L200,100 L200,200 L150,250 L50,250 Z'/><path d='M250,50 L350,50 L400,100 L400,200 L350,250 L250,250 Z'/><path d='M100,300 L200,300 L250,350 L250,450 L200,500 L100,500 Z'/><path d='M300,300 L400,300 L450,350 L450,450 L400,500 L300,500 Z'/><path d='M500,100 L600,100 L650,150 L650,250 L600,300 L500,300 Z'/><path d='M500,350 L600,350 L650,400 L650,500 L600,550 L500,550 Z'/></g></svg>")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Dark overlay for map readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1818]/95 via-[#1a1818]/80 to-[#1a1818]/60 pointer-events-none" />

            {/* Animated Pin */}
            <div className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:flex flex-col items-center gap-2 pointer-events-none">
              <div className="w-10 h-10 bg-[#7A000E] text-[#F5F4F2] rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow border-2 border-white/20">
                <MapPin className="w-5 h-5 fill-white text-transparent" />
              </div>
              <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider text-[#C3B0F0] border border-white/10">
                South Africa
              </span>
            </div>

            {/* Top link: look at google maps — */}
            <div className="relative z-10 mb-8">
              <button
                onClick={onOpenMapModal}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#DCD7D4] hover:text-[#F5F4F2] underline underline-offset-4 decoration-[#7A000E] hover:decoration-white transition-all cursor-pointer font-medium"
              >
                <span>look at google maps &mdash;</span>
              </button>
            </div>

            {/* Bottom info section */}
            <div className="relative z-10 mt-auto pt-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F4F2] mb-8 font-serif-brand">
                Contact us
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DCD7D4] mb-2 font-sans">
                    Our Address
                  </h4>
                  <p className="text-[#F5F4F2] leading-relaxed text-sm">
                    {BRAND_INFO.address}<br />
                    Serving local &amp; regional<br />
                    clients
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DCD7D4] mb-2 font-sans">
                    Our Contacts
                  </h4>
                  <p className="space-y-1 text-sm">
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      className="text-[#F5F4F2] hover:text-[#C3B0F0] block transition-colors"
                    >
                      {BRAND_INFO.email}
                    </a>
                    <a
                      href={`tel:${BRAND_INFO.phoneClean}`}
                      className="text-[#F5F4F2] hover:text-[#C3B0F0] font-semibold block transition-colors"
                    >
                      {BRAND_INFO.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Social and follow us line */}
              <div className="flex flex-wrap justify-between items-center mt-10 pt-6 border-t border-white/10 gap-4">
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-xs text-[#F5F4F2] hover:bg-[#7A000E] hover:border-[#7A000E] transition-colors"
                  >
                    f
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-xs text-[#F5F4F2] hover:bg-[#7A000E] hover:border-[#7A000E] transition-colors"
                  >
                    ig
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-xs text-[#F5F4F2] hover:bg-[#7A000E] hover:border-[#7A000E] transition-colors"
                  >
                    in
                  </a>
                </div>
                <span className="text-xs text-[#DCD7D4] font-medium">&mdash; follow us</span>
              </div>
            </div>

          </div>

          {/* ===== RIGHT SIDE: White/Pearl Form Card (5 cols on desktop) ===== */}
          <div className="lg:col-span-5 bg-[#F5F4F2] text-[#2C2929] p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C2929] mb-8 font-sans">
                Feedback Form
              </h3>

              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 bg-[#7A000E]/10 text-[#7A000E] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#2C2929]">
                    Thank You!
                  </h4>
                  <p className="text-xs text-[#555] leading-relaxed">
                    Your inquiry has been received. Ticket reference: <span className="font-mono font-bold text-[#7A000E]">{ticketId}</span>. A project consultant will be in touch shortly.
                  </p>
                  {uploadedFile && (
                    <div className="bg-[#e8e6e3] p-2.5 rounded text-xs text-[#333] flex items-center justify-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#7A000E]" />
                      <span>{uploadedFile.name}</span>
                    </div>
                  )}
                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-[#030303] text-[#F5F4F2] text-xs uppercase font-bold tracking-wider rounded hover:bg-[#7A000E] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20Brakanani%20Signs%2C%20I%20sent%20a%20message%20ref%20${ticketId}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#7A000E] hover:underline font-semibold"
                    >
                      Follow up on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Floating label: Name */}
                  <div className="floating-input-group">
                    <input
                      type="text"
                      id="form-name"
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <label htmlFor="form-name">Name</label>
                  </div>

                  {/* Floating label: E-mail */}
                  <div className="floating-input-group">
                    <input
                      type="email"
                      id="form-email"
                      required
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <label htmlFor="form-email">E-mail</label>
                  </div>

                  {/* Floating label: Phone */}
                  <div className="floating-input-group">
                    <input
                      type="tel"
                      id="form-phone"
                      required
                      placeholder=" "
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <label htmlFor="form-phone">Phone</label>
                  </div>

                  {/* Floating label: Message */}
                  <div className="floating-input-group">
                    <textarea
                      id="form-message"
                      required
                      rows={3}
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <label htmlFor="form-message">Message</label>
                  </div>

                  {uploadedFile && (
                    <div className="flex items-center justify-between bg-white px-3 py-2 rounded text-xs border border-neutral-300">
                      <span className="truncate max-w-[200px] text-neutral-700 font-medium">{uploadedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-[#7A000E] hover:underline font-bold text-xs ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Form Actions: Upload file & Send Message matching document */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#DCD7D4]">
                    <label htmlFor="contact-file-upload" className="flex items-center gap-2 text-xs font-semibold text-[#555] hover:text-[#2C2929] cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-[#7A000E]" />
                      <span>{uploadedFile ? 'Change file' : 'Upload file'}</span>
                      <input
                        id="contact-file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*,.pdf,.doc,.docx"
                      />
                    </label>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-[#030303] hover:bg-[#7A000E] text-[#F5F4F2] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-3 transition-colors cursor-pointer"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-300 text-[11px] text-[#777]">
              <span>Quick response guaranteed &middot; </span>
              <a href={`tel:${BRAND_INFO.phoneClean}`} className="text-[#7A000E] font-semibold hover:underline">
                Direct hotline: {BRAND_INFO.phone}
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
