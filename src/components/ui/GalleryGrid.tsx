'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { SectionHeading } from '@/components/ui/SectionHeading';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Showcase',
  clinic: 'Atelier Suites',
  technology: 'Precision Tech',
  smiles: 'Smile Artistry',
};

/**
 * GalleryGrid
 * Curated architectural and clinical photography showcase on the Home page.
 * Supports interactive category filtering, Next.js image optimization,
 * subtle hover zoom effects, and direct link to the full /gallery catalog.
 */
export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { galleryItems, galleryCategories } = clinicConfig;

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-b border-[#E7E1D7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Architectural Showcase"
          title="Inside Our Bandra West Studio"
          subtitle="Explore the serene interior architecture, hospital-grade sterilization bay, and advanced 3D diagnostic technology engineered for your total comfort."
          align="center"
          className="mb-10"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#17324D] text-[#E8D3B0] border border-[#C49A59]/50 shadow-sm'
                    : 'bg-white text-[#243244] hover:bg-[#F7F5F0] hover:text-[#C49A59] border border-[#E7E1D7]'
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* Responsive Image Grid (2 cols mobile, 3 cols desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative p-1 rounded-2xl bg-white border border-[#E7E1D7] hover:border-[#C49A59]/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative w-full h-64 sm:h-72 rounded-[calc(1rem-0.25rem)] overflow-hidden bg-[#17324D]">
                <Image
                  src={item.imageUrl}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/80 via-[#17324D]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Floating Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#17324D]/90 backdrop-blur-md text-[#E8D3B0] border border-[#C49A59]/40 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 text-[#C49A59]" />
                    {CATEGORY_LABELS[item.category] || item.category}
                  </span>
                </div>

                {/* Bottom Caption & Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-snug mb-1">
                    {item.title}
                  </h4>
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

        {/* Link to Full Gallery Page */}
        <div className="mt-14 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#17324D] text-[#17324D] hover:text-white font-medium text-sm transition-all duration-200 border border-[#E7E1D7] hover:border-[#17324D] shadow-sm hover:shadow-md group"
          >
            <span>Explore Complete Studio Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#C49A59] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default GalleryGrid;
