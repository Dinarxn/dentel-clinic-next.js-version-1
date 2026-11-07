import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TreatmentCard } from '@/components/ui/TreatmentCard';

/**
 * TreatmentsSection
 * Featured clinical treatments showcase on the Home page.
 * Presents all 6 core clinical disciplines from clinicConfig with luxury double-bezel cards,
 * key procedural metrics, and a link to the complete treatments catalog.
 */
export function TreatmentsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-b border-[#E7E1D7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Specialized Disciplines"
          title="Curated Aesthetic & Restorative Treatments"
          subtitle="Six specialized clinical disciplines executed with conservative biomimetic precision, sub-millimeter optics, and master ceramo-aesthetic craftsmanship."
          align="center"
          className="mb-16"
        />

        {/* 6-Treatment Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinicConfig.treatments.map((treatment, index) => (
            <TreatmentCard
              key={treatment.slug}
              treatment={treatment}
              priority={index < 3}
            />
          ))}
        </div>

        {/* Bottom Catalog Link Callout */}
        <div className="mt-16 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#17324D] hover:bg-[#0F2033] text-[#F7F5F0] font-medium text-base shadow-md hover:shadow-lg transition-all duration-200 border border-[#C49A59]/40 group"
          >
            <span>Explore All 6 Clinical Portfolios</span>
            <ArrowRight className="w-4 h-4 text-[#C49A59] group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <p className="mt-3 text-xs text-[#687789]">
            Detailed clinical steps, candidacy guidelines, and recovery protocols available for each procedure
          </p>
        </div>

      </div>
    </section>
  );
}

export default TreatmentsSection;
