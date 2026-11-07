import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Calendar,
  MessageSquare,
  Phone
} from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { DemoDisclaimerBadge } from '@/components/ui/DemoDisclaimerBadge';

export const metadata: Metadata = {
  title: `Our Doctor — ${clinicConfig.doctor.name} | ${clinicConfig.identity.name}`,
  description: `Learn about ${clinicConfig.doctor.name}, ${clinicConfig.doctor.title} at ${clinicConfig.identity.name} in Bandra West, Mumbai. Biomimetic aesthetic dentistry and implantology.`,
};

export default function DoctorPage() {
  const doctor = clinicConfig.doctor;

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
              Our Doctor
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative bg-gradient-to-b from-white to-[#F7F5F0] border-b border-[#E7E1D7] pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Doctor Portrait (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-[#17324D] shadow-2xl border border-[#C49A59]/40">
                <Image
                  src={doctor.image}
                  alt={doctor.imageAlt || doctor.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#17324D]/90 backdrop-blur-md border border-[#C49A59]/40 text-white flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-[#E8D3B0] font-semibold uppercase tracking-wider">
                      Clinical Excellence
                    </p>
                    <p className="font-serif text-lg font-bold text-white">
                      {doctor.experienceYears}+ Years Private Practice
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#C49A59]" />
                </div>
              </div>
            </div>

            {/* Right Doctor Headline & Credentials (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#17324D] text-[#E8D3B0] border border-[#C49A59]/40">
                  <Sparkles className="w-3 h-3 text-[#C49A59]" />
                  Founder & Clinical Director
                </span>
                <DemoDisclaimerBadge text="Demonstration Profile" variant="gold" />
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#17324D] tracking-tight leading-tight">
                {doctor.name}
              </h1>

              <p className="font-serif text-lg sm:text-xl text-[#C49A59] font-medium">
                {doctor.title}
              </p>

              {/* Philosophy Quote */}
              <div className="p-6 rounded-2xl bg-white border-l-4 border-[#C49A59] border border-[#E7E1D7] shadow-sm space-y-2">
                <p className="font-serif italic text-base sm:text-lg text-[#17324D] leading-relaxed">
                  &ldquo;{doctor.philosophy}&rdquo;
                </p>
                <p className="text-xs text-[#687789] font-semibold uppercase tracking-wider">
                  — {doctor.name}
                </p>
              </div>

              {/* Verified Credentials Pills */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
                  Board Memberships & Degrees
                </p>
                <div className="flex flex-wrap gap-2">
                  {doctor.credentials.map((cred, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E7E1D7] text-xs font-medium text-[#243244] shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A59]" />
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-[#C49A59] hover:bg-[#b08747] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Consult with Dr. Mehta</span>
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* Section 1: Detailed Biography */}
        <section aria-labelledby="bio-heading" className="space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
              Clinical Narrative
            </span>
            <h2 id="bio-heading" className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]">
              Biography & Care Philosophy
            </h2>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-6 text-[#243244] leading-relaxed text-base">
            {doctor.bioParagraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Section 2: Education & Academic Credentials */}
        <section aria-labelledby="education-heading" className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
              Academic Background
            </span>
            <h2 id="education-heading" className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]">
              Education & Advanced Fellowships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctor.educationTimeline.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] hover:border-[#C49A59]/60 shadow-sm transition-all duration-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#17324D] text-[#E8D3B0] font-bold text-xs">
                    {edu.year}
                  </span>
                  <GraduationCap className="w-5 h-5 text-[#C49A59]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#17324D]">
                  {edu.degree}
                </h3>
                <p className="text-xs text-[#687789] font-medium">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Specialized Clinical Competencies */}
        <section aria-labelledby="specialties-heading" className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
              Clinical Expertise
            </span>
            <h2 id="specialties-heading" className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]">
              Key Areas of Specialization
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctor.specialties.map((spec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E7E1D7] shadow-sm flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-xl bg-[#F7F5F0] text-[#C49A59] flex items-center justify-center shrink-0 border border-[#E7E1D7]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#17324D]">
                    {spec}
                  </h3>
                  <p className="text-xs text-[#687789] mt-1">
                    Delivered with conservative biomimetic precision and digital workflow integration.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Mandatory Demonstration Notice & Disclaimer Shield */}
        <section
          aria-labelledby="demo-disclaimer-heading"
          className="p-8 sm:p-10 rounded-3xl bg-[#F7F5F0] border-2 border-[#C49A59]/40 space-y-4"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C49A59]" />
            <h3 id="demo-disclaimer-heading" className="font-serif text-xl font-bold text-[#17324D]">
              Prototype Demonstration Notice
            </h3>
            <DemoDisclaimerBadge text="Ethical Transparency" variant="gold" />
          </div>

          <p className="text-sm text-[#243244] leading-relaxed">
            {doctor.demoDisclaimer}
          </p>

          <p className="text-xs text-[#687789] leading-relaxed">
            {clinicConfig.demoDisclaimers.doctorNotice}
          </p>
        </section>

        {/* Section 5: Consultation CTA */}
        <section
          aria-labelledby="doctor-cta-heading"
          className="relative rounded-3xl bg-[#17324D] text-white p-8 sm:p-12 border border-[#C49A59]/40 shadow-2xl overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl space-y-4">
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="light" />
            <h2
              id="doctor-cta-heading"
              className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Plan Your Personal Dental Consultation
            </h2>
            <p className="text-sm sm:text-base text-[#F7F5F0]/80 leading-relaxed">
              Dr. Mehta reserves dedicated time for every examination, allowing thorough diagnosis and transparent discussion.
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
                href={`tel:${clinicConfig.identity.phone.dialable}`}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F7F5F0] font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C49A59]" />
                <span>{clinicConfig.identity.phone.display}</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}