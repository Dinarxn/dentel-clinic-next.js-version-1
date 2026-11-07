import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DemoDisclaimerBadge } from '@/components/ui/DemoDisclaimerBadge';

/**
 * DoctorProfile
 * Spotlight feature celebrating Dr. Aanya Mehta, MDS Aesthetic Prosthodontist.
 * Showcases verified credentials, clinical philosophy, and biomimetic convictions.
 *
 * CRITICAL DEMO INTEGRITY:
 * Prominently surfaces the fictional demonstration notice. Strictly avoids fabricated reviews or fake ratings.
 */
export function DoctorProfile() {
  const { doctor } = clinicConfig;

  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-b border-[#E7E1D7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Clinical Leadership"
          title="Meet Our Founder & Lead Prosthodontist"
          subtitle="Specialized aesthetic prosthodontics and micro-invasive smile reconstructions delivered with unhurried care and French atelier tranquility."
          align="center"
          className="mb-16"
        />

        {/* Doctor Spotlight Card Container */}
        <div className="p-2 sm:p-3 rounded-3xl bg-white border border-[#E7E1D7] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10">
            
            {/* Left: Doctor Portrait with Double Bezel Framing (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden bg-[#17324D] shadow-lg border border-[#C49A59]/30">
                <Image
                  src={doctor.image}
                  alt={doctor.imageAlt || doctor.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/70 via-transparent to-transparent pointer-events-none" />

                {/* Experience Floating Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#17324D]/85 backdrop-blur-md border border-[#C49A59]/30 text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#E8D3B0] font-semibold uppercase tracking-wider">Clinical Experience</p>
                    <p className="font-serif text-lg font-bold text-white">{doctor.experienceYears}+ Years Clinical Precision</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#C49A59]" />
                </div>
              </div>

              {/* Verified Clinical Specializations Under Portrait */}
              <div className="w-full max-w-sm mt-4 flex flex-wrap gap-1.5 justify-center">
                {doctor.specialties.slice(0, 3).map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F7F5F0] border border-[#E7E1D7] text-[11px] font-medium text-[#243244]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#C49A59]" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Biography, Philosophy & Credentials (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Doctor Title & Name */}
              <div>
                <span className="text-xs font-bold text-[#C49A59] tracking-widest uppercase block mb-1">
                  {doctor.title}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#17324D] tracking-tight">
                  {doctor.name}
                </h3>
                <p className="text-sm font-semibold text-[#687789] mt-1">
                  BDS (Mumbai) • MDS (Prosthodontics, Crown & Bridge) • Fellow ICOI
                </p>
              </div>

              {/* Philosophy Quote Box */}
              <div className="p-5 rounded-2xl bg-[#F7F5F0] border-l-4 border-[#C49A59] border border-[#E7E1D7] space-y-2">
                <p className="font-serif italic text-base sm:text-lg text-[#17324D] leading-relaxed">
                  &ldquo;{doctor.philosophy}&rdquo;
                </p>
                <p className="text-xs text-[#687789] font-medium tracking-wide uppercase">
                  — Clinical Philosophy
                </p>
              </div>

              {/* Bio Excerpt */}
              <p className="text-sm sm:text-base text-[#243244] leading-relaxed">
                {doctor.bioParagraphs[0]}
              </p>

              {/* Formal Credentials Pills */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#C49A59]" />
                  Board Certifications & Affiliations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#243244]">
                  {doctor.credentials.map((cred) => (
                    <div
                      key={cred}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F5F0] border border-[#E7E1D7]"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C49A59] shrink-0" />
                      <span className="truncate">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CRITICAL DEMO INTEGRITY DISCLAIMER NOTICE */}
              <div className="p-4 rounded-xl bg-[#17324D]/5 border border-[#C49A59]/40 text-xs text-[#687789] space-y-2">
                <DemoDisclaimerBadge
                  text="Fictional Demonstration Profile"
                  variant="gold"
                />
                <p className="leading-relaxed">
                  {clinicConfig.demoDisclaimers.doctorNotice}
                </p>
              </div>

              {/* Action Button: Full Bio */}
              <div className="pt-2">
                <Link
                  href="/doctor"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#17324D] hover:bg-[#0F2033] text-[#F7F5F0] font-medium text-sm transition-all duration-200 border border-[#C49A59]/40 group"
                >
                  <span>View Full Clinical Biography & Credentials</span>
                  <ArrowRight className="w-4 h-4 text-[#C49A59] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default DoctorProfile;
