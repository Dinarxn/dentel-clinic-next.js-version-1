'use client';

import React, { useState } from 'react';
import { clinicConfig } from '@/config/clinic.config';
import { TreatmentCard } from '@/components/ui/TreatmentCard';

const CATEGORIES = ['All', 'Cosmetic', 'Restorative', 'Orthodontics', 'Preventive'];

export function TreatmentsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTreatments =
    selectedCategory === 'All'
      ? clinicConfig.treatments
      : clinicConfig.treatments.filter(
          (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#17324D] text-[#E8D3B0] border border-[#C49A59]/60 shadow-md'
                  : 'bg-white text-[#243244] hover:bg-[#F7F5F0] hover:text-[#C49A59] border border-[#E7E1D7]'
              }`}
            >
              {cat === 'All' ? 'All Disciplines (6)' : cat}
            </button>
          );
        })}
      </div>

      {/* Treatments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTreatments.map((treatment, idx) => (
          <TreatmentCard
            key={treatment.slug}
            treatment={treatment}
            priority={idx < 3}
          />
        ))}
      </div>
    </div>
  );
}

export default TreatmentsClient;