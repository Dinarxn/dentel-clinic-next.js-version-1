import React from 'react';
import { ShieldCheck, Eye, Scan, HeartHandshake, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const FOUNDATIONAL_PILLARS = [
  {
    icon: ShieldCheck,
    title: '7-Step Class-B Autoclave',
    tag: 'Hospital-Grade Sterilization',
    description:
      'Fractional pre-vacuum autoclaves exceeding European EN 13060 standards. Every instrument set undergoes multi-stage chemical decontamination, vacuum steam sterilization, and independent biological spore verification in sealed barrier pouches.',
  },
  {
    icon: Eye,
    title: '0.1mm Zeiss Microscopic Dentistry',
    tag: 'Biomimetic Enamel Preservation',
    description:
      'Surgical operating optics with up to 25x magnification illuminate hidden micro-anatomy. By treating at sub-millimeter precision, we preserve up to 90% more of your natural living tooth enamel than conventional methods.',
  },
  {
    icon: Scan,
    title: '3D Swiss CBCT Imaging',
    tag: 'Sub-Millimeter Guided Precision',
    description:
      'Ultra-low-dose Cone Beam Computed Tomography provides 3D volumetric mapping of bone architecture and nerve trajectories. Computer-generated surgical templates ensure rock-solid, predictable implant placement.',
  },
  {
    icon: HeartHandshake,
    title: 'Zero-Anxiety Private Suites',
    tag: 'Acoustic Serenity & Ergonomics',
    description:
      'Private treatment chambers acoustically insulated from street sounds and equipment buzz. Features ambient lighting, ceiling media displays, noise-cancelling headphones, and completely unhurried clinical appointments.',
  },
];

/**
 * TrustIntroSection
 * Articulates the clinical philosophy of Lumière Dental Studio:
 * Merging rigorous Swiss medical precision with the serene hospitality of a Parisian atelier.
 */
export function TrustIntroSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-b border-[#E7E1D7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Heading */}
        <SectionHeading
          eyebrow="Clinical Philosophy"
          title="The Harmony of Swiss Precision and French Atelier Serenity"
          subtitle="We have reimagined the dental experience from the ground up — replacing clinical anxiety with bespoke acoustic comfort, sub-millimeter optics, and strict hospital-grade bio-sterilization."
          align="center"
          className="mb-16"
        />

        {/* 4 Foundational Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FOUNDATIONAL_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-1 rounded-2xl bg-white border border-[#E7E1D7] hover:border-[#C49A59]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Pillar Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] border border-[#E7E1D7] group-hover:bg-[#17324D] group-hover:text-[#C49A59] text-[#17324D] flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-[#E7E1D7] group-hover:text-[#C49A59]/40 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Eyebrow Tag */}
                  <span className="text-[11px] font-bold text-[#C49A59] uppercase tracking-wider mb-2">
                    {pillar.tag}
                  </span>

                  {/* Pillar Title */}
                  <h3 className="font-serif text-xl font-bold text-[#17324D] mb-3 leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#687789] leading-relaxed mt-auto">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E1D7] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C49A59]/15 text-[#C49A59] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#17324D]">
                Commitment to Biomimetic Conservation
              </h4>
              <p className="text-xs sm:text-sm text-[#687789]">
                Every procedure is designed to protect your biological tooth structure and natural tooth vitality.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F5F0] border border-[#E7E1D7] text-xs font-semibold text-[#17324D]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              NABH Protocol Standard Design
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TrustIntroSection;
