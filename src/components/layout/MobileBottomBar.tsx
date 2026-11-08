'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';

/**
 * MobileBottomBar
 * Persistent fixed bottom action bar on mobile viewports (< 768px).
 * Fixed at screen bottom: fixed bottom-0 left-0 right-0 z-40.
 * Provides one-tap access to Call Clinic (tel:), WhatsApp concierge (wa.me), and appointment booking.
 * Fully verified for zero collision with page content via RootLayout's pb-24 md:pb-0.
 */
export function MobileBottomBar() {
  const dialablePhone = clinicConfig.identity.phone.dialable.startsWith('tel:')
    ? clinicConfig.identity.phone.dialable
    : `tel:${clinicConfig.identity.phone.dialable}`;

  // Direct universal wa.me link with prefilled appointment inquiry
  const whatsappUrl = clinicConfig.identity.whatsapp.prefilledUrl.includes('wa.me')
    ? clinicConfig.identity.whatsapp.prefilledUrl
    : `https://wa.me/${clinicConfig.identity.whatsapp.cleanDigits}?text=${encodeURIComponent(
        clinicConfig.identity.whatsapp.defaultMessage
      )}`;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E7E1D7] px-4 py-2 pb-safe shadow-[0_-4px_25px_rgba(23,50,77,0.08)]"
      aria-label="Mobile Quick Action Bar"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Action 1: Call Clinic via tel: */}
        <a
          href={dialablePhone}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[#17324D] hover:bg-[#F7F5F0] transition-colors"
          aria-label={`Call Clinic: ${clinicConfig.identity.phone.display}`}
        >
          <div className="w-7 h-7 rounded-full bg-[#17324D]/5 flex items-center justify-center text-[#17324D]">
            <Phone className="w-3.5 h-3.5 text-[#17324D]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-[#17324D] mt-0.5 whitespace-nowrap">Call Clinic</span>
        </a>

        {/* Action 2: WhatsApp Concierge via wa.me */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[#17324D] hover:bg-[#F7F5F0] transition-colors"
          aria-label="WhatsApp Concierge"
        >
          <div className="w-7 h-7 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-[#17324D] mt-0.5 whitespace-nowrap">WhatsApp</span>
        </a>

        {/* Action 3: Book Appointment Action */}
        <Link
          href="/contact"
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#C49A59] hover:bg-[#B08746] text-white shadow-sm active:scale-95 transition-all text-center whitespace-nowrap"
          aria-label="Book appointment consultation"
        >
          <Calendar className="w-4 h-4 text-white shrink-0" />
          <span className="text-xs font-bold tracking-tight">
            Appointment
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default MobileBottomBar;
