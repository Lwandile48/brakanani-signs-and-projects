import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, ArrowRight, FileCheck, Phone } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preSelectedService = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: preSelectedService || '',
    location: '',
    estimatedDimensions: '',
    installationRequired: true,
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: preSelectedService || prev.service || '',
      }));
    }
  }, [isOpen, preSelectedService]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(ref);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSelectedFile(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      location: '',
      estimatedDimensions: '',
      installationRequired: true,
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative bg-[#222020] border border-[#3a3636] text-[#F5F4F2] rounded-xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#181616] hover:bg-[#7A000E] text-[#F5F4F2] flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#7A000E]/20 text-[#C3B0F0] rounded-full flex items-center justify-center mx-auto border border-[#7A000E]/40">
              <CheckCircle2 className="w-9 h-9 text-[#C3B0F0]" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#F5F4F2]">
              Quote Request Received!
            </h3>

            <p className="text-sm text-[#DCD7D4] max-w-md mx-auto leading-relaxed">
              Thank you{formData.name ? `, ${formData.name}` : ''}. Our estimators have logged your project request under reference{' '}
              <span className="font-mono text-[#C3B0F0] font-bold">{referenceId}</span>.
            </p>

            <div className="bg-[#181616] p-4 rounded-lg border border-[#3a3636] text-left text-xs space-y-1.5 max-w-md mx-auto">
              {formData.company && <div><span className="text-[#888]">Company:</span> <span className="text-[#F5F4F2]">{formData.company}</span></div>}
              {formData.service && <div><span className="text-[#888]">Signage Type:</span> <span className="text-[#F5F4F2] font-semibold">{formData.service}</span></div>}
              {(formData.phone || formData.email) && <div><span className="text-[#888]">Contact:</span> <span className="text-[#F5F4F2]">{[formData.phone, formData.email].filter(Boolean).join(' · ')}</span></div>}
              {selectedFile && (
                <div className="text-[#C3B0F0] flex items-center gap-1.5 pt-1">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>File attached: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
              )}
            </div>

            <p className="text-xs text-[#888]">
              We usually respond with initial mockups and cost schedules within 24 business hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20Brakanani%20Signs%2C%20I%20just%20submitted%20Quote%20Request%20${referenceId}%20for%20${encodeURIComponent(formData.service)}.`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-white text-xs uppercase tracking-wider font-bold rounded hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2"
              >
                <span>Notify via WhatsApp</span>
              </a>

              <button
                onClick={resetForm}
                className="px-5 py-2.5 bg-[#7A000E] text-[#F5F4F2] text-xs uppercase tracking-wider font-bold rounded hover:bg-[#5a000a] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C3B0F0] block mb-1">
                Brakanani Signs &amp; Projects
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#F5F4F2]">
                Request a Custom Quote
              </h2>
              <p className="text-xs text-[#DCD7D4] mt-1">
                Tell us about your signage requirements. All fields are optional. We provide complimentary site surveys and detailed itemised quotations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#DCD7D4] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sipho Ndlovu"
                    className="w-full bg-[#181616] border border-[#3a3636] rounded px-3 py-2 text-sm text-[#F5F4F2] focus:outline-none focus:border-[#7A000E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#DCD7D4] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 079 184 5221"
                    className="w-full bg-[#181616] border border-[#3a3636] rounded px-3 py-2 text-sm text-[#F5F4F2] focus:outline-none focus:border-[#7A000E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#DCD7D4] mb-1">
                  Company
                </label>
                <input
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Brakanani Signs & Projects"
                  className="w-full bg-[#181616] border border-[#3a3636] rounded px-3 py-2 text-sm text-[#F5F4F2] focus:outline-none focus:border-[#7A000E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#DCD7D4] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.co.za"
                  className="w-full bg-[#181616] border border-[#3a3636] rounded px-3 py-2 text-sm text-[#F5F4F2] focus:outline-none focus:border-[#7A000E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#DCD7D4] mb-1">
                    Signage Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="e.g. 3D Channel Letters, Pylon Sign, Lightbox"
                    className="w-full bg-[#181616] border border-[#3a3636] rounded px-3 py-2 text-sm text-[#F5F4F2] focus:outline-none focus:border-[#7A000E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#DCD7D4] mb-1">
                    Estimated Dimensions / Scope
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedDimensions}
                    onChange={(e) => setFormData({ ...formData, estimatedDimensions: e.target.value })}
                    placeholder="e.g. 3m x 1.2m or Not sure yet"
                    className="w-full bg-[#181616] border border-[#3a3636] rounded px-3 py-2 text-sm text-[#F5F4F2] focus:outline-none focus:border-[#7A000E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#DCD7D4] mb-1">
                  Project Description &amp; Specifics
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your signage project, installation location, wall/ground surface, illumination requirements, etc."
                  className="w-full bg-[#181616] border border-[#3a3636] rounded px-3 py-2 text-sm text-[#F5F4F2] focus:outline-none focus:border-[#7A000E]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#DCD7D4]">
                  <input
                    type="checkbox"
                    checked={formData.installationRequired}
                    onChange={(e) => setFormData({ ...formData, installationRequired: e.target.checked })}
                    className="accent-[#7A000E] rounded"
                  />
                  <span>Installation &amp; rigging required on site</span>
                </label>

                <div>
                  <label htmlFor="quote-file" className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-[#C3B0F0] hover:text-[#F5F4F2]">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{selectedFile ? 'Change file' : 'Attach example'}</span>
                    <input
                      id="quote-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,.pdf,.ai,.eps,.cdr"
                    />
                  </label>
                </div>
              </div>

              {selectedFile && (
                <div className="bg-[#181616] px-3 py-1.5 rounded text-xs text-[#DCD7D4] flex items-center justify-between border border-[#3a3636]">
                  <span className="truncate max-w-[300px]">Attached: {selectedFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-[#7A000E] hover:text-red-400 ml-2 font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="pt-3 border-t border-[#3a3636] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#888] hover:text-[#F5F4F2]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#7A000E] hover:bg-[#5a000a] text-[#F5F4F2] text-xs uppercase tracking-wider font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Submit Quote Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
