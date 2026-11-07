import React from 'react';
import {
  HeroSection,
  TrustIntroSection,
  TreatmentsSection,
  WhyChooseUsSection,
  DoctorProfile,
  GalleryGrid,
  AppointmentCTASection,
  LocationSection,
} from '@/components';
import { clinicConfig } from '@/config/clinic.config';

/**
 * HomePage
 * 10-Section luxury dental studio home page for Lumière Dental Studio, Bandra West, Mumbai.
 * Designed following the 60/30/10 colour scheme:
 * - 60% Warm Ivory (#F7F5F0) architectural canvas
 * - 30% Deep Navy (#17324D) authoritative narrative panels
 * - 10% Champagne Gold (#C49A59) refined accents and primary CTAs
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      {/* 1. Hero Section — Editorial Headline, Dual CTAs & Operatory Showcase */}
      <HeroSection />

      {/* 2. Trust Introduction Section — Swiss Precision, French Atelier Tranquility & 4 Pillars */}
      <TrustIntroSection />

      {/* 3. Treatments Preview Section — 6 Core Clinical Specializations & Detail Routing */}
      <TreatmentsSection />

      {/* 4. Why Choose Us Section — Deep Navy Contrast Panel & 6 Architectural Differentiators */}
      <WhyChooseUsSection />

      {/* 5. Doctor Profile Spotlight — Dr. Aanya Mehta MDS, Credentials & Demo Disclaimer */}
      <DoctorProfile />

      {/* 6. Clinic Gallery Preview — Architectural Suites, Precision Tech & Smiles */}
      <GalleryGrid />

      {/* 7. Appointment CTA Banner — Dual Reservation Actions & WhatsApp Concierge */}
      <AppointmentCTASection />

      {/* 8. Location & Visiting Information — Turner Road Address, Hours & Interactive Map */}
      <LocationSection />

      {/* Demonstration Prototype Safeguard Notice */}
      <section className="bg-[#17324D]/5 border-t border-[#E7E1D7] py-4 px-4 text-center text-xs text-[#687789]">
        <div className="max-w-4xl mx-auto">
          <p>
            <strong className="text-[#17324D]">Demonstration Prototype Website:</strong>{' '}
            {clinicConfig.demoDisclaimers.generalNotice}
          </p>
        </div>
      </section>
    </div>
  );
}
