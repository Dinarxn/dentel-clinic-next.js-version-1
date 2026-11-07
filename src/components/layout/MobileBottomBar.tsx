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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E1D7] px-3 sm:px-4 py-2 pb-safe shadow-[0_-4px_20px_rgba(23,50,77,0.08)]"
      aria-label="Mobile Quick Action Bar"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2 items-center">
        {/* Action 1: Call Clinic via tel: */}
        <a
          href={dialablePhone}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[#17324D] hover:text-[#C49A59] hover:bg-[#F7F5F0] transition-colors group text-center"
          aria-label={`Call Clinic: ${clinicConfig.identity.phone.display}`}
        >
          <div className="w-8 h-8 rounded-full bg-[#17324D]/5 flex items-center justify-center group-hover:bg-[#C49A59]/10 transition-colors">
            <Phone className="w-4 h-4 text-[#17324D] group-hover:text-[#C49A59]" />
          </div>
          <span className="text-[11px] font-semibold tracking-tight mt-1">Call Clinic</span>
        </a>

        {/* Action 2: WhatsApp Concierge via wa.me */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[#17324D] hover:text-[#25D366] hover:bg-[#F7F5F0] transition-colors group text-center"
          aria-label="WhatsApp Concierge"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </div>
          <span className="text-[11px] font-semibold tracking-tight mt-1">WhatsApp</span>
        </a>

        {/* Action 3: Book Appointment Action */}
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#C49A59] hover:bg-[#B08746] text-white shadow-sm active:scale-95 transition-all text-center"
          aria-label="Book appointment consultation"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span className="text-[11px] font-bold tracking-tight mt-1 whitespace-nowrap">
            Appointment
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default MobileBottomBar;
