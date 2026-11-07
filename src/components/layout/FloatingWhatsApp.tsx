'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';

/**
 * FloatingWhatsApp
 * Luxury floating concierge trigger for desktop viewports (hidden md:flex fixed bottom-6 right-6 z-40).
 * Connects high-intent patients directly to the clinic's WhatsApp concierge with prefilled inquiry intent.
 */
export function FloatingWhatsApp() {
  const whatsappUrl = clinicConfig.identity.whatsapp.prefilledUrl.includes('wa.me')
    ? clinicConfig.identity.whatsapp.prefilledUrl
    : `https://wa.me/${clinicConfig.identity.whatsapp.cleanDigits}?text=${encodeURIComponent(
        clinicConfig.identity.whatsapp.defaultMessage
      )}`;

  return (
    <aside
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center group pointer-events-auto"
      aria-label="WhatsApp Concierge"
    >
      {/* Concierge Tooltip Pill */}
      <span
        className="mr-3 px-3.5 py-1.5 bg-[#17324D] text-[#F7F5F0] text-xs font-medium rounded-full shadow-lg border border-[#C49A59]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap transform translate-x-2 group-hover:translate-x-0"
        role="tooltip"
      >
        Chat with Dental Concierge
      </span>

      {/* Luxury WhatsApp Trigger Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Lumière Dental Concierge on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#17324D] text-[#C49A59] border-2 border-[#C49A59] shadow-xl hover:bg-[#C49A59] hover:text-[#17324D] hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C49A59] focus:ring-offset-2"
      >
        {/* Ambient Ring Glow */}
        <span className="absolute -inset-1 rounded-full bg-[#C49A59]/20 animate-ping opacity-40 group-hover:opacity-60 pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-6" />
      </a>
    </aside>
  );
}

export default FloatingWhatsApp;
