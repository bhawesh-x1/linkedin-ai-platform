import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, Download, Sparkles, Layout, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateCarouselPDF, CarouselSlideData } from '../../utils/pdfExporter';

interface CarouselSlidePreviewProps {
  hook: string;
  body: string;
  cta: string;
}

export const CarouselSlidePreview: React.FC<CarouselSlidePreviewProps> = ({
  hook,
  body,
  cta
}) => {
  const { userProfile, brandPersona, addToast } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  // Parse body into separate points for slides
  const points = body.split('\n\n').filter(Boolean);
  
  const slides = [
    {
      title: hook,
      subtitle: 'SWIPE TO READ THE FULL PLAYBOOK →',
      type: 'cover',
      slideNum: 1,
    },
    ...points.map((pt, idx) => ({
      title: `Step 0${idx + 1}`,
      body: pt,
      type: 'content',
      slideNum: idx + 2,
    })),
    {
      title: 'Actionable Takeaway',
      body: cta,
      type: 'cta',
      slideNum: points.length + 2,
    }
  ];

  const totalSlides = slides.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const activeSlide = slides[currentSlide];

  const handleExportPDF = () => {
    setIsExporting(true);
    const pdfSlides: CarouselSlideData[] = slides.map(s => ({
      title: s.title,
      body: s.body,
      subtitle: s.subtitle,
      slideNum: s.slideNum,
      totalSlides,
      authorName: userProfile.name,
      headline: brandPersona.headline,
    }));

    setTimeout(() => {
      generateCarouselPDF(pdfSlides, `linkedin-carousel-${Date.now()}.pdf`);
      setIsExporting(false);
      addToast('Downloaded native PDF Carousel file for LinkedIn upload!', 'success');
    }, 800);
  };

  return (
    <Card padding="lg" className="border-2 border-brand-indigo/30 bg-gradient-to-br from-brand-indigo/5 via-brand-violet/5 to-transparent space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-borderLight dark:border-borderDark">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-indigo">
          <Layout className="w-4 h-4" /> NATIVE LINKEDIN PDF CAROUSEL BUILDER
        </div>
        <span className="text-xs text-bodyLight dark:text-bodyDark font-semibold">
          Slide {currentSlide + 1} of {totalSlides}
        </span>
      </div>

      {/* Simulated Carousel Slide Card */}
      <div className="aspect-[4/5] max-w-sm mx-auto rounded-2xl glass-panel border-2 border-brand-indigo/20 shadow-floating p-6 sm:p-8 flex flex-col justify-between text-headingLight dark:text-headingDark relative overflow-hidden bg-surfaceLight dark:bg-[#141824]">
        
        {/* Background Subtle Gradient Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-indigo/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-brand-violet/20 blur-2xl pointer-events-none" />

        {/* Slide Top Branding Bar */}
        <div className="flex items-center justify-between text-xs border-b border-borderLight dark:border-borderDark/60 pb-3">
          <div className="flex items-center gap-2">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-6 h-6 rounded-full object-cover border border-brand-indigo"
            />
            <span className="font-bold text-[11px] text-headingLight dark:text-headingDark">{userProfile.name}</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-indigo/10 text-brand-indigo">
            {activeSlide.slideNum}/{totalSlides}
          </span>
        </div>

        {/* Slide Main Body Content */}
        <div className="my-auto space-y-3 py-4">
          {activeSlide.type === 'cover' ? (
            <div className="space-y-4 text-center">
              <span className="text-[10px] font-extrabold tracking-widest text-brand-indigo uppercase block">
                Exclusive Playbook
              </span>
              <h3 className="text-lg font-black text-headingLight dark:text-headingDark leading-snug">
                "{activeSlide.title}"
              </h3>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-indigo text-white text-[10px] font-extrabold tracking-wider">
                  {activeSlide.subtitle}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-violet uppercase tracking-wider block">
                {activeSlide.title}
              </span>
              <p className="text-xs leading-relaxed text-headingLight dark:text-headingDark font-medium whitespace-pre-line">
                {activeSlide.body}
              </p>
            </div>
          )}
        </div>

        {/* Slide Bottom Bar */}
        <div className="pt-3 border-t border-borderLight dark:border-borderDark/60 flex items-center justify-between text-[10px] text-bodyLight dark:text-bodyDark">
          <span>{brandPersona.headline.slice(0, 35)}...</span>
          <span className="font-bold text-brand-indigo">Swipe →</span>
        </div>

      </div>

      {/* Slide Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <Button size="sm" variant="outline" onClick={prevSlide} leftIcon={<ChevronLeft className="w-4 h-4" />}>
          Previous Slide
        </Button>
        <Button size="sm" onClick={handleExportPDF} isLoading={isExporting} leftIcon={<Download className="w-4 h-4" />}>
          Download Native PDF Carousel
        </Button>
        <Button size="sm" variant="outline" onClick={nextSlide} rightIcon={<ChevronRight className="w-4 h-4" />}>
          Next Slide
        </Button>
      </div>
    </Card>
  );
};
