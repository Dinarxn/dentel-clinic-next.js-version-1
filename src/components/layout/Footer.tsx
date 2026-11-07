import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, Mail, MapPin, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const dialablePhone = clinicConfig.identity.phone.dialable.startsWith('tel:')
    ? clinicConfig.identity.phone.dialable
    : `tel:${clinicConfig.identity.phone.dialable}`;

  return (
    <footer className="bg-[#17324D] text-[#F7F5F0] border-t border-[#C49A59]/30 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand Story & Heritage */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-full bg-[#0F2033] text-[#C49A59] border border-[#C49A59]/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-[#C49A59]" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#F7F5F0] block leading-tight">
                  Lumière Dental Studio
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#C49A59]">
                  Bandra West • Mumbai
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#F7F5F0]/80 leading-relaxed">
              Bespoke aesthetic and restorative dentistry situated on Turner Road, Bandra West.
              Dedicated to biomimetic tooth preservation, master porcelain artistry, and calm, unhurried care.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C49A59] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#C49A59] shrink-0" />
              <span>International Sterilization Protocols • NABH Standard Design</span>
            </div>
          </div>

          {/* Column 2: Navigation Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F7F5F0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A59]" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#F7F5F0]/80 hover:text-[#C49A59] transition-colors inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#F7F5F0]/80 hover:text-[#C49A59] transition-colors inline-block"
                >
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments"
                  className="text-[#F7F5F0]/80 hover:text-[#C49A59] transition-colors inline-block"
                >
                  Clinical Treatments
                </Link>
              </li>
              <li>
                <Link
                  href="/doctor"
                  className="text-[#F7F5F0]/80 hover:text-[#C49A59] transition-colors inline-block"
                >
                  Dr. Aanya Mehta
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-[#F7F5F0]/80 hover:text-[#C49A59] transition-colors inline-block"
                >
                  Studio & Technology Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#F7F5F0]/80 hover:text-[#C49A59] transition-colors inline-block"
                >
                  Contact & Appointments
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Treatments Catalog */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F7F5F0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A59]" />
              Treatments
            </h3>
            <ul className="space-y-2.5 text-sm">
              {clinicConfig.treatments.map((treatment) => (
                <li key={treatment.slug}>
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="text-[#F7F5F0]/80 hover:text-[#C49A59] transition-colors inline-block"
                  >
                    {treatment.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Visiting Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F7F5F0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A59]" />
              Visit Our Studio
            </h3>

            <div className="space-y-3 text-sm text-[#F7F5F0]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A59] shrink-0 mt-1" />
                <span>
                  {clinicConfig.identity.address.line1}, {clinicConfig.identity.address.line2},<br />
                  {clinicConfig.identity.address.locality}, {clinicConfig.identity.address.city} {clinicConfig.identity.address.postalCode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C49A59] shrink-0" />
                <a
                  href={dialablePhone}
                  className="hover:text-[#C49A59] transition-colors font-medium"
                >
                  {clinicConfig.identity.phone.display}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C49A59] shrink-0" />
                <a
                  href={`mailto:${clinicConfig.identity.email}`}
                  className="hover:text-[#C49A59] transition-colors"
                >
                  {clinicConfig.identity.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C49A59] shrink-0 mt-1" />
                <div className="text-xs space-y-1">
                  <div>{clinicConfig.identity.hours.weekday}</div>
                  <div className="text-[#C49A59]">{clinicConfig.identity.hours.weekend}</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={clinicConfig.identity.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C49A59] hover:underline font-semibold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Demonstration Disclaimer Callout Banner */}
        <div className="mt-12 pt-8 border-t border-[#F7F5F0]/10">
          <div className="bg-[#0F2033] p-5 rounded-2xl border border-[#C49A59]/30">
            <div className="flex items-center gap-2 mb-2 text-[#C49A59] font-bold tracking-wider uppercase text-xs">
              <Sparkles className="w-4 h-4 text-[#C49A59]" />
              <span>Demonstration Prototype Notice</span>
            </div>
            <p className="text-xs text-[#F7F5F0]/80 leading-relaxed">
              {clinicConfig.demoDisclaimers.footerNotice}
            </p>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#F7F5F0]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F5F0]/60">
          <p>
            © {currentYear} {clinicConfig.identity.name}. Demonstration Website — All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Turner Road, Bandra West, Mumbai 400050</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/contact" className="hover:text-[#C49A59] transition-colors">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
