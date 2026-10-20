/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PageView, PortfolioItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { FloatingActions } from './components/FloatingActions';

const AboutView = lazy(() => import('./components/AboutView').then(({ AboutView }) => ({ default: AboutView })));
const ContactView = lazy(() => import('./components/ContactView').then(({ ContactView }) => ({ default: ContactView })));
const QuoteModal = lazy(() => import('./components/QuoteModal').then(({ QuoteModal }) => ({ default: QuoteModal })));
const ProjectLightbox = lazy(() => import('./components/ProjectLightbox').then(({ ProjectLightbox }) => ({ default: ProjectLightbox })));
const GoogleMapsModal = lazy(() => import('./components/GoogleMapsModal').then(({ GoogleMapsModal }) => ({ default: GoogleMapsModal })));

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);

  // Sync with browser hash for seamless deep linking and back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about') {
        setCurrentView('about');
      } else if (hash === 'contact') {
        setCurrentView('contact');
      } else if (hash === 'services') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (hash === 'portfolio') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    if (view === 'home') {
      window.location.hash = 'home';
    } else if (view === 'about') {
      window.location.hash = 'about';
    } else if (view === 'contact') {
      window.location.hash = 'contact';
    }
  };

  const handleOpenQuoteModal = (service?: string) => {
    setPreSelectedService(service || '');
    setQuoteModalOpen(true);
  };

  const handleSelectProject = (project: PortfolioItem) => {
    setSelectedProject(project);
  };

  const handleInquireFromProject = (project: PortfolioItem) => {
    setSelectedProject(null);
    setPreSelectedService(`Project Style: ${project.title}`);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2C2929] text-[#F5F4F2]">
      {/* Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Page View Content */}
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
          {currentView === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onOpenQuoteModal={handleOpenQuoteModal}
              onSelectProject={handleSelectProject}
            />
          )}

          {currentView === 'about' && (
            <AboutView
              onNavigate={handleNavigate}
              onOpenQuoteModal={() => handleOpenQuoteModal()}
            />
          )}

          {currentView === 'contact' && (
            <ContactView
              onOpenMapModal={() => setMapModalOpen(true)}
            />
          )}
        </Suspense>
      </main>

      {/* Shared Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Floating Action Buttons (Phone & WhatsApp) */}
      <FloatingActions />

      {/* Quote Request Modal */}
      {quoteModalOpen && (
        <Suspense fallback={null}>
          <QuoteModal
            isOpen={quoteModalOpen}
            onClose={() => setQuoteModalOpen(false)}
            preSelectedService={preSelectedService}
          />
        </Suspense>
      )}

      {/* Project Lightbox Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectLightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onInquire={handleInquireFromProject}
          />
        </Suspense>
      )}

      {/* Google Maps Preview Modal */}
      {mapModalOpen && (
        <Suspense fallback={null}>
          <GoogleMapsModal
            isOpen={mapModalOpen}
            onClose={() => setMapModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
