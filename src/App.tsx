import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';

// Auth Component
import { AuthPage } from './components/auth/AuthPage';

// Landing Page Components
import { Navbar } from './components/landing/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { TrustedLogos } from './components/landing/TrustedLogos';
import { FeatureGrid } from './components/landing/FeatureGrid';
import { ProductShowcase } from './components/landing/ProductShowcase';
import { Testimonials } from './components/landing/Testimonials';
import { PricingSection } from './components/landing/PricingSection';
import { FAQSection } from './components/landing/FAQSection';
import { Footer } from './components/landing/Footer';

// Dashboard Components
import { Sidebar } from './components/dashboard/Sidebar';
import { TopHeader } from './components/dashboard/TopHeader';
import { MobileNav } from './components/dashboard/MobileNav';
import { LinkedInPreviewModal } from './components/dashboard/LinkedInPreviewModal';
import { ExportModal } from './components/dashboard/ExportModal';
import { CommandPalette } from './components/dashboard/CommandPalette';
import { ToastContainer } from './components/ui/ToastContainer';
import { LinkedInOAuthModal } from './components/dashboard/LinkedInOAuthModal';
import { LinkedInPublishingSimulatorModal } from './components/dashboard/LinkedInPublishingSimulatorModal';

// Dashboard Modules
import { PostGenerator } from './components/dashboard/modules/PostGenerator';
import { PostAnalyzer } from './components/dashboard/modules/PostAnalyzer';
import { RewriteAssistant } from './components/dashboard/modules/RewriteAssistant';
import { GenerationHistory } from './components/dashboard/modules/GenerationHistory';
import { SavedDrafts } from './components/dashboard/modules/SavedDrafts';
import { AnalyticsDashboard } from './components/dashboard/modules/AnalyticsDashboard';
import { BrandVoiceSettings } from './components/dashboard/modules/BrandVoiceSettings';
import { UserProfileSettings } from './components/dashboard/modules/UserProfileSettings';
import { DatabaseInspector } from './components/dashboard/modules/DatabaseInspector';

const MainContent: React.FC = () => {
  const { viewMode, activeModule, isOAuthOpen, setIsOAuthOpen, publishPost, setPublishPost } = useApp();

  if (viewMode === 'auth') {
    return <AuthPage />;
  }

  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-bgLight dark:bg-bgDark text-headingLight dark:text-headingDark selection:bg-brand-indigo/20 selection:text-brand-indigo">
        <Navbar />
        <main>
          <HeroSection />
          <TrustedLogos />
          <FeatureGrid />
          <ProductShowcase />
          <Testimonials />
          <PricingSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    );
  }

  // Dashboard View
  const renderModule = () => {
    switch (activeModule) {
      case 'generator':
        return <PostGenerator />;
      case 'analyzer':
        return <PostAnalyzer />;
      case 'rewrite':
        return <RewriteAssistant />;
      case 'history':
        return <GenerationHistory />;
      case 'drafts':
        return <SavedDrafts />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'brand-voice':
        return <BrandVoiceSettings />;
      case 'settings':
        return <UserProfileSettings />;
      case 'database':
        return <DatabaseInspector />;
      default:
        return <PostGenerator />;
    }
  };

  return (
    <div className="min-h-screen flex bg-bgLight dark:bg-bgDark text-headingLight dark:text-headingDark selection:bg-brand-indigo/20 selection:text-brand-indigo">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <TopHeader />

        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {renderModule()}
        </main>
      </div>

      {/* Responsive Mobile Bottom Navigation */}
      <MobileNav />

      {/* OAuth & Auto-Publishing Modals */}
      <LinkedInOAuthModal isOpen={isOAuthOpen} onClose={() => setIsOAuthOpen(false)} />
      <LinkedInPublishingSimulatorModal post={publishPost} onClose={() => setPublishPost(null)} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <MainContent />
        
        {/* Global Modals & Notifications */}
        <LinkedInPreviewModal />
        <ExportModal />
        <CommandPalette />
        <ToastContainer />
      </AppProvider>
    </ThemeProvider>
  );
}
