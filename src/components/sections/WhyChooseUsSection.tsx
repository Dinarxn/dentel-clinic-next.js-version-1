import React from 'react';
import {
  ShieldCheck,
  Building2,
  Syringe,
  FileSpreadsheet,
  Sparkles,
  HeartPulse,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const VALUE_PROPOSITIONS = [
  {
    icon: ShieldCheck,
    title: 'Hospital-Grade Sterilization',
    eyebrow: 'Zero Infection Compromise',
    description:
      'Rigorous 7-step sterilization protocol utilizing European Class-B vacuum autoclaves, sealed bio-pouches, and independent biological spore testing for absolute microbiological safety.',
  },
  {
    icon: Building2,
    title: 'Private Atelier Suites',
    eyebrow: 'Acoustic Serenity on Turner Road',
    description:
      'Every patient is welcomed into an acoustically isolated private treatment suite featuring ergonomic memory-foam dental chairs, natural lighting, and ceiling visual distraction amenities.',
  },
  {
    icon: Syringe,
    title: 'Pain-Free Anesthesia Technology',
    eyebrow: 'Computer-Controlled Comfort',
    description:
      'Computer-assisted local anaesthesia delivery monitors flow rate and tissue resistance in real time, virtually eliminating injection pinch and soft-tissue pressure sensation.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Transparent Treatment Plans',
    eyebrow: 'Itemized Integrity & No Hidden Fees',
    description:
      'Every patient receives a written clinical diagnostic itinerary with high-definition 3D imaging, detailed step-by-step phases, and upfront cost clarity before any procedure begins.',
  },
  {
    icon: Sparkles,
    title: 'Digital Smile Design (DSD)',
    eyebrow: 'Visualized Trial Mock-ups',
    description:
      'Advanced 3D facial aesthetic mapping and intraoral scanning allow you to preview, evaluate, and test your prospective smile in the mouth with trial mock-ups before ceramic bonding.',
  },
  {
    icon: HeartPulse,
    title: 'Biomimetic Enamel Preservation',
    eyebrow: 'Conservative Biological Care',
    description:
      'We practice ultra-conservative dentistry guided by high-magnification surgical operating microscopes, prioritizing the preservation of over 90% of your living tooth structure.',
  },
];

/**
 * WhyChooseUsSection
 * High-contrast Deep Navy (#17324D) architectural section highlighting 6 clinical differentiators.
 * Embodies the 30% Deep Navy authoritative narrative panel in the 60/30/10 colour system.
 */
export function WhyChooseUsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#17324D] text-[#F7F5F0] border-y border-[#C49A59]/30 relative overflow-hidden">
      {/* Decorative Architectural Lighting Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C49A59]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#204569]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with light mode enabled */}
        <SectionHeading
          eyebrow="Architectural Differentiators"
          title="Why Discriminating Patients Choose Lumière"
          subtitle="Every dimension of our practice on Turner Road is calibrated to provide peerless clinical rigor, biological tooth preservation, and complete psychological serenity."
          align="center"
          light={true}
          className="mb-16"
        />

        {/* 6 Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUE_PROPOSITIONS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group p-1 rounded-2xl bg-[#0F2033]/60 border border-[#C49A59]/20 hover:border-[#C49A59]/60 hover:bg-[#0F2033]/90 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 sm:p-7 flex flex-col h-full">
                  {/* Card Icon & Accent */}
                  <div className="w-12 h-12 rounded-xl bg-[#17324D] border border-[#C49A59]/40 text-[#C49A59] group-hover:bg-[#C49A59] group-hover:text-[#17324D] flex items-center justify-center transition-colors duration-300 mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Eyebrow */}
                  <span className="text-[11px] font-bold text-[#C49A59] uppercase tracking-wider mb-2">
                    {card.eyebrow}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#F7F5F0]/75 leading-relaxed mt-auto">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUsSection;
