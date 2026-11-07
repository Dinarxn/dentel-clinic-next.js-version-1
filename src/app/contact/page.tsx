import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { ContactForm } from '@/components/ui/ContactForm';
import { DemoDisclaimerBadge } from '@/components/ui/DemoDisclaimerBadge';

export const metadata: Metadata = {
  title: `Contact Us & Appointments | ${clinicConfig.identity.name}`,
  description:
    'Schedule a consultation at Lumière Dental Studio on Turner Road in Bandra West, Mumbai. Direct phone, WhatsApp concierge, and appointment request form.',
};

export default function ContactPage() {
  const { identity, demoDisclaimers } = clinicConfig;

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
              Contact Us
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
              Direct Concierge
            </span>
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="gold" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#17324D] tracking-tight leading-tight">
            Schedule Your Private Consultation
          </h1>

          <p className="text-base sm:text-lg text-[#243244] max-w-2xl mx-auto leading-relaxed">
            Located in the heart of Bandra West on Turner Road. Our concierge team is available to assist you with scheduling, queries, and travel arrangements.
          </p>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Clinic Contact Details & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Address & Landmark Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#17324D]">
                <div className="w-10 h-10 rounded-2xl bg-[#F7F5F0] text-[#C49A59] flex items-center justify-center shrink-0 border border-[#E7E1D7]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#17324D]">
                    Studio Location
                  </h3>
                  <p className="text-xs text-[#687789]">{identity.address.locality}, {identity.address.city}</p>
                </div>
              </div>

              <div className="space-y-1 text-sm text-[#243244] leading-relaxed pl-13">
                <p className="font-semibold text-[#17324D]">{identity.address.line1}</p>
                <p>{identity.address.line2}</p>
                {identity.address.landmark && (
                  <p className="text-xs text-[#687789] italic">Landmark: {identity.address.landmark}</p>
                )}
                <p>
                  {identity.address.locality}, {identity.address.city}, {identity.address.state} — {identity.address.postalCode}
                </p>
              </div>

              {/* Valet Parking Notice */}
              <div className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#E7E1D7] flex items-start gap-3 text-xs text-[#243244]">
                <Car className="w-4 h-4 text-[#C49A59] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#17324D]">Complimentary Valet Parking</strong> is available at the Heritage Boulevard entrance on Turner Road.
                </p>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#17324D]">
                Direct Contact Channels
              </h3>

              {/* Phone Link */}
              <a
                href={`tel:${identity.phone.dialable}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F7F5F0] hover:bg-[#E7E1D7]/50 border border-[#E7E1D7] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#C49A59] flex items-center justify-center shrink-0 border border-[#E7E1D7]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#687789] block">
                    Direct Telephone
                  </span>
                  <span className="text-sm font-bold text-[#17324D] group-hover:text-[#C49A59] transition-colors">
                    {identity.phone.display}
                  </span>
                </div>
              </a>

              {/* WhatsApp Link */}
              <a
                href={identity.whatsapp.prefilledUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F7F5F0] hover:bg-[#E7E1D7]/50 border border-[#E7E1D7] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#25D366] flex items-center justify-center shrink-0 border border-[#E7E1D7]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#687789] block">
                    WhatsApp Concierge
                  </span>
                  <span className="text-sm font-bold text-[#17324D] group-hover:text-[#25D366] transition-colors">
                    Instant Messaging Assistant
                  </span>
                </div>
              </a>

              {/* Email Link */}
              <a
                href={`mailto:${identity.email}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F7F5F0] hover:bg-[#E7E1D7]/50 border border-[#E7E1D7] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#17324D] flex items-center justify-center shrink-0 border border-[#E7E1D7]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#687789] block">
                    Concierge Email
                  </span>
                  <span className="text-sm font-bold text-[#17324D] group-hover:text-[#C49A59] transition-colors truncate block">
                    {identity.email}
                  </span>
                </div>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#17324D]">
                <Clock className="w-5 h-5 text-[#C49A59]" />
                <h3 className="font-serif text-lg font-bold text-[#17324D]">
                  Consultation Hours
                </h3>
              </div>

              <div className="space-y-2 text-xs text-[#243244]">
                {identity.hours.fullDisplay.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-[#E7E1D7]/60 last:border-b-0">
                    <span className="font-medium text-[#687789]">{h.split(':')[0]}</span>
                    <span className="font-bold text-[#17324D]">{h.split(':').slice(1).join(':')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Google Maps Embed */}
            <div className="rounded-3xl overflow-hidden bg-white border border-[#E7E1D7] shadow-sm">
              <div className="relative w-full h-64 bg-[#17324D]/10">
                <iframe
                  src={identity.maps.embedUrl}
                  title="Lumière Dental Studio Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[25%] contrast-105"
                />
              </div>
              <div className="p-4 bg-white flex items-center justify-between">
                <span className="text-xs font-semibold text-[#17324D]">
                  Turner Road, Bandra West, Mumbai
                </span>
                <a
                  href={identity.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#C49A59] hover:text-[#b08747] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Bottom Demonstration Disclaimer Strip */}
        <section
          aria-labelledby="contact-disclaimer-heading"
          className="mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-2 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#C49A59]" />
            <span
              id="contact-disclaimer-heading"
              className="text-xs font-bold uppercase tracking-widest text-[#17324D]"
            >
              Demonstration Mode Disclaimer
            </span>
          </div>
          <p className="text-xs text-[#687789] max-w-3xl mx-auto leading-relaxed">
            {demoDisclaimers.generalNotice}
          </p>
          <p className="text-[11px] text-[#687789]/80 max-w-2xl mx-auto">
            {demoDisclaimers.footerNotice}
          </p>
        </section>
      </main>
    </div>
  );
}