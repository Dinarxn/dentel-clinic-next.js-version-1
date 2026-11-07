import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Microscope,
  Leaf,
  Calendar,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { DemoDisclaimerBadge } from '@/components/ui/DemoDisclaimerBadge';

export const metadata: Metadata = {
  title: `About Us | ${clinicConfig.identity.name}`,
  description:
    'Discover the heritage, biomimetic philosophy, and hospital-grade 7-step sterilization protocol behind Lumière Dental Studio in Bandra West, Mumbai.',
};

export default function AboutPage() {
  const sterilizationSteps = [
    {
      step: 1,
      title: 'Ultrasonic Decontamination Bath',
      description: 'Instruments undergo enzymatic cavitation to eliminate bio-burden at sub-microscopic levels prior to manual scrubbing.',
    },
    {
      step: 2,
      title: 'Medical-Grade Thermal Wash & Rinse',
      description: 'High-temperature demineralized water cleansing removes all chemical residues and particulate matter.',
    },
    {
      step: 3,
      title: 'Microscopic Inspection & Lubrication',
      description: 'Handpieces and micro-surgical instruments are magnified to verify flawless surface integrity and calibrated lubrication.',
    },
    {
      step: 4,
      title: 'Individual Multi-Layer Vacuum Pouching',
      description: 'Every instrument is hermetically sealed in medical-grade sterilization pouches with integrated chemical indicator strips.',
    },
    {
      step: 5,
      title: 'Class-B Fractional Pre-Vacuum Autoclaving',
      description: 'Medical autoclave creates fractional vacuum pulses, driving pressurized steam at 134°C into all hollow lumens and micro-channels.',
    },
    {
      step: 6,
      title: 'Chemical & Biological Spore Attestation',
      description: 'Internal multi-variable chemical integrators change color only upon complete lethal spore sterilization. Weekly third-party spore vials verify biological safety.',
    },
    {
      step: 7,
      title: 'Sterile Storage & Chairside Unsealing',
      description: 'Instruments remain sterile until opened directly in front of the patient in private operatory suites.',
    },
  ];

  const philosophyPillars = [
    {
      icon: Leaf,
      title: 'Biomimetic Conservation',
      description: 'We mimic nature by conserving healthy enamel and dentin rather than aggressive grinding for artificial crowns.',
    },
    {
      icon: Microscope,
      title: 'Microscopic Precision',
      description: 'Sub-millimeter optical magnification ensures precision marginal fits, leak-proof bonding, and maximum longevity.',
    },
    {
      icon: HeartHandshake,
      title: 'Acoustic Suite Serenity',
      description: 'Acoustically insulated private operatory suites eliminate dental sounds, pairing noise-cancelling audio with ceiling visual calm.',
    },
  ];

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
              About Us
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
              Boutique Dental Heritage
            </span>
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="gold" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#17324D] tracking-tight leading-tight">
            The Art and Science of Serene Dentistry
          </h1>

          <p className="text-base sm:text-lg text-[#243244] max-w-2xl mx-auto leading-relaxed">
            Founded in 2014 on Turner Road in Bandra West, Lumière Dental Studio was created to redefine what a dental visit feels like: unhurried, anxiety-free, and grounded in uncompromising clinical artistry.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        {/* Section 1: Clinic Heritage & Story */}
        <section aria-labelledby="heritage-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block">
              Bandra West Studio Heritage
            </span>
            <h2 id="heritage-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[#17324D] tracking-tight">
              An Architectural Sanctuary Designed for Calm
            </h2>
            <p className="text-base text-[#243244] leading-relaxed">
              When Dr. Aanya Mehta envisioned Lumière Dental Studio, she sought to eliminate the cold, clinical austerity typical of traditional clinics. Instead, our Bandra West studio reflects the warmth of a Parisian atelier—featuring natural oak finishes, Warm Ivory palettes, soft ambient lighting, and bespoke acoustic isolation.
            </p>
            <p className="text-base text-[#243244] leading-relaxed">
              Every appointment is scheduled with generous buffer times. We never double-book suites. You are greeted by name, escorted to your private operatory, and treated with complete, undivided attention.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E7E1D7]">
                <p className="font-serif text-2xl font-bold text-[#17324D]">12+ Years</p>
                <p className="text-xs text-[#687789] mt-1 font-medium">Dedicated Private Practice in Mumbai</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E7E1D7]">
                <p className="font-serif text-2xl font-bold text-[#C49A59]">60 Minutes</p>
                <p className="text-xs text-[#687789] mt-1 font-medium">Standard Unhurried Consultation Window</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative p-2 rounded-3xl bg-white border border-[#E7E1D7] shadow-xl">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#17324D]">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                  alt="Interior operatory suite at Lumière Dental Studio in Bandra West Mumbai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Three Clinical Pillars */}
        <section aria-labelledby="pillars-heading" className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block">
              Core Principles
            </span>
            <h2 id="pillars-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[#17324D]">
              Our Three Inviolable Clinical Standards
            </h2>
            <p className="text-sm sm:text-base text-[#687789]">
              How we guarantee long-term oral vitality and tranquil care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-[#E7E1D7] hover:border-[#C49A59]/60 shadow-sm transition-all duration-200 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#17324D] text-[#C49A59] flex items-center justify-center border border-[#C49A59]/40">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#17324D]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#243244] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: 7-Step Class-B Sterilization Protocol */}
        <section aria-labelledby="sterilization-heading" className="p-8 sm:p-12 rounded-3xl bg-[#17324D] text-white border border-[#C49A59]/40 shadow-2xl space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C49A59]" />
              <span className="text-xs font-bold tracking-widest text-[#E8D3B0] uppercase">
                Patient Protection Protocol
              </span>
            </div>
            <h2 id="sterilization-heading" className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Hospital-Grade 7-Step Class-B Sterilization
            </h2>
            <p className="text-sm sm:text-base text-[#F7F5F0]/80 leading-relaxed">
              We adhere strictly to international CDC (Centers for Disease Control) and DCI hygiene standards. Our multi-stage sterilization chain guarantees zero cross-contamination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sterilizationSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C49A59]/50 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-[#C49A59] text-[#17324D] font-bold text-xs flex items-center justify-center">
                    0{step.step}
                  </span>
                  <span className="text-[10px] font-semibold text-[#E8D3B0] uppercase tracking-wider">
                    Protocol Stage {step.step}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-[#F7F5F0]/75 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#E8D3B0]">
            <p>
              ✔ Third-party biological spore testing certified weekly • Individual vacuum pouch unsealed chairside
            </p>
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="light" />
          </div>
        </section>

        {/* Section 4: Lead Clinician Feature */}
        <section aria-labelledby="doctor-preview-heading" className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 sm:w-60 aspect-[4/5] rounded-2xl overflow-hidden bg-[#17324D] shadow-md border border-[#C49A59]/30">
              <Image
                src={clinicConfig.doctor.image}
                alt={clinicConfig.doctor.name}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block">
              Lead Clinician & Founder
            </span>
            <h2 id="doctor-preview-heading" className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]">
              Meet Dr. Aanya Mehta, MDS
            </h2>
            <p className="text-xs font-semibold text-[#687789]">
              BDS (Mumbai) • MDS (Prosthodontics) • Fellow, ICOI
            </p>
            <p className="text-sm text-[#243244] leading-relaxed">
              Dr. Mehta personally directs all cosmetic smile design protocols, computer-guided dental implants, and restorative treatments. With over twelve years of clinical practice in Bandra West, her approach marries biological tooth conservation with refined artistic outcomes.
            </p>
            <div className="pt-2">
              <Link
                href="/doctor"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17324D] hover:bg-[#1f4266] text-[#E8D3B0] font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Read Full Doctor Biography</span>
                <ArrowRight className="w-4 h-4 text-[#C49A59]" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: Consultation CTA */}
        <section aria-labelledby="about-cta-heading" className="text-center max-w-3xl mx-auto space-y-6">
          <DemoDisclaimerBadge text="Demonstration Prototype" variant="gold" />
          <h2 id="about-cta-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[#17324D]">
            Experience Serene Dental Artistry in Bandra West
          </h2>
          <p className="text-sm sm:text-base text-[#687789] leading-relaxed">
            We invite you to schedule a relaxed, unhurried consultation to discuss your personal aesthetic and oral wellness goals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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
              className="px-6 py-3.5 rounded-xl bg-[#17324D] hover:bg-[#1f4266] text-[#E8D3B0] font-bold text-xs uppercase tracking-wider border border-[#C49A59]/40 transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}