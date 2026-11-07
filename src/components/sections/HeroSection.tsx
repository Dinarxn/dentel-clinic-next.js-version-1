import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight, Sparkles, ShieldCheck, MapPin, Award } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';

/**
 * HeroSection
 * Luxury editorial hero for Lumière Dental Studio.
 * Welcomes patients with Warm Ivory architectural elegance, French atelier tranquillity,
 * authoritative prosthodontic credentials, dual conversion CTAs, and verified contact links.
 */
export function HeroSection() {
  const dialablePhone = clinicConfig.identity.phone.dialable.startsWith('tel:')
    ? clinicConfig.identity.phone.dialable
    : `tel:${clinicConfig.identity.phone.dialable}`;

  return (
    <section className="relative overflow-hidden bg-[#F7F5F0] pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#E7E1D7]">
      {/* Subtle Background Architectural Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A59]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#17324D]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Conversion CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Trust Pill / Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C49A59]/15 border border-[#C49A59]/30 text-[#17324D] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A59]" />
              <span>Boutique Dental Atelier • Bandra West, Mumbai</span>
            </div>

            {/* Main Editorial Headline in Playfair Display */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#17324D] font-bold tracking-tight leading-[1.12]">
              Artistry Meets Biological Precision in Modern Dental Care
            </h1>

            {/* Philosophy Subtext */}
            <p className="text-lg sm:text-xl text-[#243244] leading-relaxed max-w-2xl font-normal">
              Experience serene, unhurried dentistry on Turner Road. Guided by lead prosthodontist{' '}
              <strong className="font-semibold text-[#17324D]">{clinicConfig.doctor.name}</strong>, we harmonize
              facial aesthetics with sub-millimeter microscopic preservation.
            </p>

            {/* Primary & Secondary CTAs + Quick Dialer */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA: Book Consultation */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C49A59] hover:bg-[#B08746] text-white font-medium text-base shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA: Explore Disciplines */}
              <Link
                href="/treatments"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#17324D]/30 bg-white hover:bg-[#17324D] text-[#17324D] hover:text-white font-medium text-base transition-all duration-200"
              >
                Explore Disciplines
              </Link>

              {/* Quick Dialer Link */}
              <a
                href={dialablePhone}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-sm font-semibold text-[#17324D] hover:text-[#C49A59] transition-colors"
                title={`Call ${clinicConfig.identity.phone.display}`}
              >
                <div className="w-8 h-8 rounded-full bg-[#C49A59]/15 flex items-center justify-center text-[#C49A59]">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{clinicConfig.identity.phone.display}</span>
              </a>
            </div>

            {/* 3 Luxury Trust Pills */}
            <div className="pt-6 border-t border-[#E7E1D7] flex flex-wrap items-center gap-3 text-xs font-semibold text-[#17324D]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E1D7] shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#C49A59]" />
                <span>Bandra West, Mumbai</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E1D7] shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#C49A59]" />
                <span>Bespoke Prosthodontics</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E1D7] shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A59]" />
                <span>Hospital-Grade Sterilization</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Dental Imagery & Architectural Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Double-Bezel Framed Showcase Card */}
              <div className="p-2 sm:p-2.5 rounded-3xl bg-[#F7F5F0] border border-[#E7E1D7] shadow-2xl">
                <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden bg-[#17324D]">
                  <Image
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85"
                    alt="Lumière Dental Studio Operatory Suite with Natural Sunlight on Turner Road Bandra West"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Operatory Suite Details Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#17324D]/80 backdrop-blur-md border border-[#C49A59]/30 text-white space-y-1">
                    <p className="text-xs uppercase tracking-widest text-[#E8D3B0] font-semibold">
                      Private Atelier Suite
                    </p>
                    <p className="font-serif text-base sm:text-lg font-bold text-white">
                      Designed for Complete Psychological Calm
                    </p>
                    <p className="text-xs text-[#F7F5F0]/80">
                      Zeiss 0.1mm Optics • Swiss 3D CBCT • Acoustic Isolation
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Trust Accent Badge (Top Right) */}
              <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-[#E7E1D7] shadow-lg text-[#17324D]">
                <div className="w-8 h-8 rounded-full bg-[#C49A59]/20 flex items-center justify-center text-[#C49A59]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">12+ Years</p>
                  <p className="text-[10px] text-[#687789] uppercase tracking-wider font-medium">Clinical Artistry</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
