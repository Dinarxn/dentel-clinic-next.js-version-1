'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone, MessageCircle, Calendar, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: '/', label: 'Home', subtitle: 'Overview & Aesthetic Sanctuary' },
  { href: '/about', label: 'About Us', subtitle: 'Philosophy & 7-Step Sterilization' },
  { href: '/treatments', label: 'Treatments', subtitle: '6 Master Clinical Disciplines' },
  { href: '/doctor', label: 'Our Doctor', subtitle: 'Dr. Aanya Mehta • Prosthodontist' },
  { href: '/gallery', label: 'Gallery', subtitle: 'Suites, Technology & Smiles' },
  { href: '/contact', label: 'Contact Us', subtitle: 'Turner Road Suites & Booking' },
];

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();

  const dialablePhone = clinicConfig.identity.phone.dialable.startsWith('tel:')
    ? clinicConfig.identity.phone.dialable
    : `tel:${clinicConfig.identity.phone.dialable}`;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      aria-hidden={!isOpen}
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#17324D]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content panel */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#F7F5F0] shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E7E1D7] z-50">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E7E1D7] flex items-center justify-between bg-white/60">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#17324D] text-[#C49A59] border border-[#C49A59]/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#C49A59]" />
            </div>
            <div>
              <span className="font-serif text-base font-bold text-[#17324D] block leading-tight">
                Lumière Dental Studio
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-[#687789]">
                Bandra West • Mumbai
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full text-[#17324D] hover:text-[#C49A59] hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C49A59]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1" aria-label="Mobile Menu Links">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`group flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#17324D] text-[#F7F5F0] shadow-sm'
                    : 'text-[#243244] hover:bg-white hover:text-[#C49A59]'
                }`}
              >
                <div>
                  <div
                    className={`text-base font-semibold ${
                      isActive ? 'text-[#F7F5F0]' : 'text-[#17324D] group-hover:text-[#C49A59]'
                    }`}
                  >
                    {link.label}
                  </div>
                  <div
                    className={`text-xs mt-0.5 ${
                      isActive ? 'text-[#C49A59]' : 'text-[#687789]'
                    }`}
                  >
                    {link.subtitle}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isActive ? 'text-[#C49A59]' : 'text-[#687789]'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Contact Cluster at Drawer Bottom */}
        <div className="p-5 border-t border-[#E7E1D7] bg-white/70 space-y-3.5">
          {/* Direct Actions Grid */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={dialablePhone}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#17324D] text-[#F7F5F0] text-xs font-semibold hover:bg-[#0F2033] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C49A59]" />
              <span>Call Clinic</span>
            </a>
            <a
              href={clinicConfig.identity.whatsapp.prefilledUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Primary Appointment Action */}
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C49A59] hover:bg-[#B08746] text-white text-sm font-semibold shadow-md active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>

          {/* Bandra West Address Summary */}
          <div className="pt-2 flex items-start gap-2 text-[11px] text-[#687789] leading-relaxed">
            <MapPin className="w-3.5 h-3.5 text-[#C49A59] shrink-0 mt-0.5" />
            <span>
              {clinicConfig.identity.address.line1}, {clinicConfig.identity.address.line2},{' '}
              {clinicConfig.identity.address.locality}, {clinicConfig.identity.address.city}{' '}
              {clinicConfig.identity.address.postalCode}
            </span>
          </div>

          {/* Demonstration Notice */}
          <div className="text-[10px] text-center text-[#687789] border-t border-[#E7E1D7] pt-2">
            Demonstration Website — Bandra West Boutique Dental Studio
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigation;
