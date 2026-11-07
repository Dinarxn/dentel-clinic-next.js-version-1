import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * AppointmentCTASection
 * High-contrast Deep Navy (#17324D) conversion panel on the Home page.
 * Provides dual primary actions: Online Consultation Reservation and Instant WhatsApp Concierge.
 * Surfaces operating hours and transparent demonstration integrity reminder.
 */
export function AppointmentCTASection() {
  const dialablePhone = clinicConfig.identity.phone.dialable.startsWith('tel:')
    ? clinicConfig.identity.phone.dialable
    : `tel:${clinicConfig.identity.phone.dialable}`;

  return (
    <section className="py-20 sm:py-28 bg-[#17324D] text-[#F7F5F0] border-b border-[#C49A59]/30 relative overflow-hidden">
      {/* Decorative Warm Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C49A59]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Section Heading with Light Mode */}
        <SectionHeading
          eyebrow="Private Consultation"
          title="Begin Your Smile Transformation"
          subtitle="Schedule an unhurried, comprehensive diagnostic consultation in our serene Bandra West atelier. Discover what biomimetic dental precision can achieve for your smile."
          align="center"
          light={true}
          className="mb-10"
        />

        {/* Dual Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12">
          {/* Action 1: Reserve Consultation */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C49A59] hover:bg-[#B08746] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            <Calendar className="w-5 h-5" />
            <span>Reserve Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Action 2: WhatsApp Concierge */}
          <a
            href={clinicConfig.identity.whatsapp.prefilledUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0F2033] hover:bg-[#0A1624] text-[#E8D3B0] font-semibold text-base border border-[#C49A59]/40 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>Concierge WhatsApp</span>
          </a>

          {/* Action 3: Direct Phone Call */}
          <a
            href={dialablePhone}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F5F0] font-medium text-sm border border-white/20 transition-all duration-200"
            title={`Call ${clinicConfig.identity.phone.display}`}
          >
            <Phone className="w-4 h-4 text-[#C49A59]" />
            <span>Call {clinicConfig.identity.phone.display}</span>
          </a>
        </div>

        {/* Operating Hours & Serenity Reassurance Strip */}
        <div className="p-6 rounded-2xl bg-[#0F2033]/80 border border-[#C49A59]/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-4 text-xs sm:text-sm text-[#F7F5F0]/80">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C49A59] shrink-0" />
            <span>Monday – Saturday: 9:00 AM – 8:00 PM</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/15" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C49A59] shrink-0" />
            <span>Turner Road, Bandra West • Valet Parking</span>
          </div>
        </div>

        {/* Transparent Demonstration Prototype Reminder */}
        <div className="mt-10 p-4 rounded-xl bg-white/5 border border-[#C49A59]/30 max-w-2xl mx-auto text-xs text-[#F7F5F0]/70 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C49A59] shrink-0" />
          <span>
            Demonstration Mode: This is a live demonstration prototype website. In production, inquiries connect directly to your clinic management system.
          </span>
        </div>

      </div>
    </section>
  );
}

export default AppointmentCTASection;
