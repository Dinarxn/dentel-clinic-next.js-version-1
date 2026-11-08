'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, Sparkles, Calendar } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { MobileNavigation } from './MobileNavigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/treatments', label: 'Treatments' },
  { href: '/doctor', label: 'Our Doctor' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const dialablePhone = clinicConfig.identity.phone.dialable.startsWith('tel:')
    ? clinicConfig.identity.phone.dialable
    : `tel:${clinicConfig.identity.phone.dialable}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Demonstration Disclaimer Banner */}
      <div className="bg-[#17324D] text-[#F7F5F0] border-b border-[#C49A59]/30 text-xs py-1.5 px-4 text-center tracking-wide font-medium flex flex-wrap items-center justify-center gap-2 leading-tight relative z-50">
        <span className="inline-flex items-center gap-1.5 bg-[#C49A59]/20 text-[#C49A59] border border-[#C49A59]/40 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-[#C49A59]" />
          Demo Notice
        </span>
        <span className="hidden sm:inline text-[#F7F5F0]/90">
          {clinicConfig.demoDisclaimers.navbarBanner}
        </span>
        <span className="sm:hidden text-[#F7F5F0]/90">
          Lumière Dental Studio • Demonstration Prototype Website
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F5F0]/95 backdrop-blur-md shadow-sm border-b border-[#E7E1D7]'
            : 'bg-[#F7F5F0]/90 backdrop-blur-sm border-b border-[#E7E1D7]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A59] rounded-lg p-1 shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-[#17324D] text-[#C49A59] border border-[#C49A59]/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform shrink-0">
                <Sparkles className="w-5 h-5 text-[#C49A59]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#17324D] group-hover:text-[#C49A59] transition-colors leading-tight whitespace-nowrap">
                  Lumière Dental Studio
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#687789] whitespace-nowrap">
                  Bandra West • Mumbai
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[#17324D] font-semibold bg-[#C49A59]/15 border border-[#C49A59]/30'
                        : 'text-[#243244] hover:text-[#C49A59] hover:bg-[#17324D]/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions (Direct Call via tel: + Book Appointment) */}
            <div className="hidden md:flex items-center gap-2 xl:gap-3 shrink-0">
              <a
                href={dialablePhone}
                className="hidden xl:inline-flex items-center gap-2 text-xs font-semibold text-[#17324D] hover:text-[#C49A59] transition-colors py-2 px-3.5 rounded-full border border-[#E7E1D7] hover:border-[#C49A59] bg-white/70 shadow-2xs whitespace-nowrap shrink-0"
                title={`Call ${clinicConfig.identity.phone.display}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#C49A59] shrink-0" />
                <span className="whitespace-nowrap">{clinicConfig.identity.phone.display}</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#C49A59] hover:bg-[#B08746] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle & tel: Call Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={dialablePhone}
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E7E1D7] text-[#17324D] hover:text-[#C49A59]"
                aria-label={`Call ${clinicConfig.identity.phone.display}`}
              >
                <Phone className="w-4 h-4 text-[#C49A59]" />
              </a>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-[#17324D] hover:text-[#C49A59] hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C49A59]"
                aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Slide-Out Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;
