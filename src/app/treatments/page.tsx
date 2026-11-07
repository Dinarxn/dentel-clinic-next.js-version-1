import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { DemoDisclaimerBadge } from '@/components/ui/DemoDisclaimerBadge';
import { TreatmentsClient } from './TreatmentsClient';

export const metadata: Metadata = {
  title: `Specialized Dental Treatments | ${clinicConfig.identity.name}`,
  description:
    'Comprehensive portfolio of biomimetic porcelain veneers, computer-guided dental implants, invisible aligners, microscopic endodontics, laser whitening, and periodontal wellness.',
};

export default function TreatmentsPage() {
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
              Treatments
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
              Clinical Portfolio
            </span>
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="gold" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#17324D] tracking-tight leading-tight">
            Curated Aesthetic & Restorative Disciplines
          </h1>

          <p className="text-base sm:text-lg text-[#243244] max-w-2xl mx-auto leading-relaxed">
            Every clinical procedure at Lumière Dental Studio is guided by biomimetic principles—preserving maximum natural tooth structure while achieving harmonious, enduring beauty.
          </p>
        </div>
      </header>

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* Interactive Filter and Grid */}
        <TreatmentsClient />

        {/* Clinical Consultation Advisory Panel */}
        <section
          aria-labelledby="advisory-heading"
          className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm"
        >
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block">
              Ethical Practice Guidelines
            </span>
            <h2
              id="advisory-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]"
            >
              Our Biomimetic Treatment Philosophy
            </h2>
            <p className="text-sm sm:text-base text-[#243244] leading-relaxed">
              We reject aggressive, irreversible dentistry in favor of conservative, tissue-preserving techniques. Before recommending any cosmetic or restorative intervention, Dr. Aanya Mehta conducts a comprehensive assessment utilizing 3D CBCT digital imaging, occlusal pressure mapping, and aesthetic mock-ups.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E7E1D7]">
                <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A59]" />
                  Zero Pressure
                </h3>
                <p className="text-xs text-[#687789]">
                  Comprehensive explanation of all options, costs, and timelines before any decision.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E7E1D7]">
                <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A59]" />
                  Sub-Millimeter Optics
                </h3>
                <p className="text-xs text-[#687789]">
                  Operating under dental microscopy ensures conservative preparations and superior seal.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E7E1D7]">
                <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A59]" />
                  Digital Smile Design
                </h3>
                <p className="text-xs text-[#687789]">
                  Preview your planned transformation directly in your mouth before permanent bonding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA Panel */}
        <section
          aria-labelledby="cta-catalog-heading"
          className="relative rounded-3xl bg-[#17324D] text-white p-8 sm:p-12 border border-[#C49A59]/40 shadow-2xl overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl space-y-4">
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="light" />
            <h2
              id="cta-catalog-heading"
              className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Uncertain Which Protocol Fits Your Goals?
            </h2>
            <p className="text-sm sm:text-base text-[#F7F5F0]/80 leading-relaxed">
              Schedule a dedicated 45-minute comprehensive examination and 3D digital scan with Dr. Aanya Mehta in our private Bandra West consultation suite.
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
    </div>
  );
}