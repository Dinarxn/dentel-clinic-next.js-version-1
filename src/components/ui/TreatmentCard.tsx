import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { TreatmentItem } from '@/types';

export interface TreatmentCardProps {
  treatment: TreatmentItem;
  priority?: boolean;
}

/**
 * TreatmentCard
 * Luxury double-bezel card showcasing a specialized dental discipline.
 * Highlights procedure category, key clinical metrics (duration, downtime, anesthesia),
 * high-resolution operatory imagery, and direct link to treatment detail route.
 */
export function TreatmentCard({ treatment, priority = false }: TreatmentCardProps) {
  const imageUrl = treatment.image || treatment.thumbnailImage || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80';

  return (
    <article
      className="group relative p-1.5 rounded-2xl bg-[#F7F5F0] border border-[#E7E1D7] hover:border-[#C49A59]/60 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="bg-white rounded-[calc(1rem-0.375rem)] p-5 sm:p-6 flex flex-col h-full justify-between overflow-hidden">
        {/* Card Header & Visual Media */}
        <div>
          {/* Image Container with Luxury Bezel */}
          <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-[#17324D]/5 mb-5">
            <Image
              src={imageUrl}
              alt={treatment.imageAlt || treatment.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/60 via-transparent to-transparent pointer-events-none" />

            {/* Category Pill Floating in Corner */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#17324D]/90 backdrop-blur-md text-[#E8D3B0] border border-[#C49A59]/40 shadow-sm">
                {treatment.category}
              </span>
            </div>
          </div>

          {/* Treatment Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17324D] tracking-tight group-hover:text-[#C49A59] transition-colors leading-snug mb-2">
            <Link href={`/treatments/${treatment.slug}`}>
              {treatment.title}
            </Link>
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs font-medium text-[#C49A59] uppercase tracking-wider mb-3">
            {treatment.tagline}
          </p>

          {/* Procedural Overview */}
          <p className="text-sm text-[#687789] line-clamp-3 leading-relaxed mb-6">
            {treatment.shortDescription || treatment.overview}
          </p>
        </div>

        {/* Card Footer: Clinical Metrics & Action Link */}
        <div className="pt-4 border-t border-[#E7E1D7]/80 space-y-4">
          {/* Key Clinical Metrics Row */}
          <div className="space-y-1.5 text-xs text-[#243244]/80">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5" title="Duration">
                <Clock className="w-3.5 h-3.5 text-[#C49A59] shrink-0" />
                <span className="truncate">{treatment.duration}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Recovery / Downtime">
                <Sparkles className="w-3.5 h-3.5 text-[#C49A59] shrink-0" />
                <span className="truncate">{treatment.recoveryTime}</span>
              </div>
            </div>
            {treatment.anesthesia && (
              <div className="flex items-center gap-1.5 pt-1 border-t border-[#E7E1D7]/40 text-[11px] text-[#687789]" title="Anesthesia">
                <Shield className="w-3.5 h-3.5 text-[#C49A59] shrink-0" />
                <span className="truncate">{treatment.anesthesia}</span>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <Link
            href={`/treatments/${treatment.slug}`}
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#C49A59] text-[#17324D] hover:text-white font-medium text-sm transition-all duration-200 border border-[#E7E1D7] hover:border-[#C49A59] group/btn"
          >
            <span>Explore Discipline</span>
            <ArrowRight className="w-4 h-4 text-[#C49A59] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TreatmentCard;
