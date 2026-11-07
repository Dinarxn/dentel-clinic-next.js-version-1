'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Maximize2,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { DemoDisclaimerBadge } from '@/components/ui/DemoDisclaimerBadge';
import { GalleryItem } from '@/types';

const CATEGORY_MAP: Record<string, string> = {
  all: 'All Showcase',
  clinic: 'Atelier Suites',
  technology: 'Precision Tech',
  smiles: 'Smile Artistry',
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const { galleryItems, galleryCategories } = clinicConfig;

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const activeLightboxItem: GalleryItem | null =
    selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : 0
    );
  }, [selectedImageIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
    );
  }, [selectedImageIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  // Keyboard navigation for Lightbox (ESC, Left, Right)
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleClose, handleNext, handlePrev]);

  return (
    <div className="bg-[#F7F5F0] min-h-screen">
      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumbs"
        className="bg-white/80 border-b border-[#E7E1D7] py-3 sticky top-16 sm:top-20 z-20 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-xs font-semibold text-[#687789] overflow-x-auto whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-[#C49A59] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#E7E1D7]">
              <ChevronRight className="w-3.5 h-3.5 text-[#687789]" />
            </li>
            <li className="text-[#17324D] font-bold" aria-current="page">
              Gallery
            </li>
          </ol>
        </div>
      </nav>

      {/* Editorial Header */}
      <header className="relative bg-gradient-to-b from-white to-[#F7F5F0] border-b border-[#E7E1D7] pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#17324D] text-[#E8D3B0] border border-[#C49A59]/40">
              <Sparkles className="w-3 h-3 text-[#C49A59]" />
              Visual Architecture
            </span>
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="gold" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#17324D] tracking-tight leading-tight">
            Inside Lumière Dental Studio
          </h1>

          <p className="text-base sm:text-lg text-[#243244] max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in our tranquil Bandra West treatment suites, hospital-grade Class-B sterilization bay, and sub-millimeter diagnostic precision technology.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            {galleryCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedImageIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#17324D] text-[#E8D3B0] border border-[#C49A59]/60 shadow-md'
                      : 'bg-white text-[#243244] hover:bg-[#F7F5F0] hover:text-[#C49A59] border border-[#E7E1D7]'
                  }`}
                >
                  {CATEGORY_MAP[cat] || cat}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative p-1 rounded-3xl bg-white border border-[#E7E1D7] hover:border-[#C49A59]/60 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-72 sm:h-80 rounded-[calc(1.5rem-0.25rem)] overflow-hidden bg-[#17324D]">
                <Image
                  src={item.imageUrl}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/85 via-[#17324D]/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#17324D]/90 backdrop-blur-md text-[#E8D3B0] border border-[#C49A59]/40 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 text-[#C49A59]" />
                    {CATEGORY_MAP[item.category] || item.category}
                  </span>
                </div>

                {/* Zoom Icon Hint */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Title & Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="font-serif text-lg font-bold text-white leading-snug mb-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-[#F7F5F0]/80 line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Consultation Banner */}
        <section
          aria-labelledby="gallery-cta-heading"
          className="relative rounded-3xl bg-[#17324D] text-white p-8 sm:p-12 border border-[#C49A59]/40 shadow-2xl overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl space-y-4">
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="light" />
            <h2
              id="gallery-cta-heading"
              className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Tour Our Private Studio in Bandra West
            </h2>
            <p className="text-sm sm:text-base text-[#F7F5F0]/80 leading-relaxed">
              We welcome prospective patients for a private walkthrough and consultation. Experience our serene acoustic environment firsthand.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[#C49A59] hover:bg-[#b08747] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation</span>
              </Link>

              <a
                href={clinicConfig.identity.whatsapp.prefilledUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F7F5F0] font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#17324D]/90 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white border border-[#C49A59]/40 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#E7E1D7] bg-[#F7F5F0]">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#17324D] text-[#E8D3B0]">
                  {CATEGORY_MAP[activeLightboxItem.category] || activeLightboxItem.category}
                </span>
                <span className="text-xs text-[#687789] font-medium">
                  Image {selectedImageIndex! + 1} of {filteredItems.length}
                </span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full text-[#687789] hover:text-[#17324D] hover:bg-white transition-colors cursor-pointer"
                aria-label="Close Lightbox (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Main Image Display */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] bg-[#17324D]">
              <Image
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.alt || activeLightboxItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-contain"
                priority
              />

              {/* Prev / Next Buttons */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#17324D] flex items-center justify-center shadow-lg transition-all cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#17324D] flex items-center justify-center shadow-lg transition-all cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 sm:p-6 bg-white space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#17324D]">
                {activeLightboxItem.title}
              </h4>
              {activeLightboxItem.caption && (
                <p className="text-xs text-[#687789] leading-relaxed">
                  {activeLightboxItem.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}