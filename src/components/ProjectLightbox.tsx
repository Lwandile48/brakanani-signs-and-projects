import React from 'react';
import { PortfolioItem } from '../types';
import { X, MapPin, Tag, Wrench, ArrowRight } from 'lucide-react';

interface ProjectLightboxProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onInquire: (project: PortfolioItem) => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose, onInquire }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative bg-[#1f1d1d] border border-[#3a3636] text-[#F5F4F2] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-[#7A000E] text-[#F5F4F2] flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative bg-[#141313] flex items-center justify-center min-h-[300px] md:min-h-[460px] p-2">
            <img
              src={project.image}
              srcSet={project.imageSrcSet}
              sizes="(max-width: 768px) 90vw, 448px"
              alt={project.title}
              decoding="async"
              referrerPolicy="no-referrer"
              className="max-h-[420px] w-full object-cover rounded-lg border border-[#3a3636]"
              onError={(e) => {
                // Zero-broken-image policy fallback
                const target = e.currentTarget;
                target.style.display = 'none';
                target.parentElement?.classList.add('bg-gradient-to-br', 'from-[#2C2929]', 'to-[#030303]');
              }}
            />
            {project.highlight && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded border border-white/10 text-xs text-[#C3B0F0] font-medium">
                {project.highlight}
              </div>
            )}
          </div>

          {/* Details Side */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C3B0F0] mb-2 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>{project.categoryLabel}</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#F5F4F2] mb-3">
                {project.title}
              </h3>

              <p className="text-sm text-[#DCD7D4] leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#3a3636] text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#7A000E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#888] block">Location &amp; Client</span>
                    <span className="text-[#F5F4F2] font-medium">{project.location} &mdash; {project.client}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Wrench className="w-4 h-4 text-[#7A000E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#888] block">Materials &amp; Craftsmanship</span>
                    <span className="text-[#F5F4F2] font-medium">{project.materials}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#3a3636] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onInquire(project);
                  onClose();
                }}
                className="w-full sm:w-auto flex-1 px-5 py-3 bg-[#7A000E] hover:bg-[#5a000a] text-[#F5F4F2] text-xs uppercase tracking-wider font-bold rounded flex items-center justify-center gap-2 transition-colors"
              >
                <span>Request Similar Signage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-3 border border-[#3a3636] text-[#DCD7D4] hover:text-[#F5F4F2] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#2C2929] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
