import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink, Car } from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * LocationSection
 * Bandra West Turner Road address details, consultation hours, telephone, email,
 * and styled interactive Google Maps embed with directions link.
 */
export function LocationSection() {
  const { identity } = clinicConfig;
  const dialablePhone = identity.phone.dialable.startsWith('tel:')
    ? identity.phone.dialable
    : `tel:${identity.phone.dialable}`;

  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-b border-[#E7E1D7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Visiting Our Atelier"
          title="Centrally Located on Turner Road, Bandra West"
          subtitle="Situated in the vibrant cultural heart of Bandra West, our studio offers serene private suites, valet parking assistance, and seamless accessibility across Mumbai."
          align="center"
          className="mb-16"
        />

        {/* 2-Column Responsive Layout: Details Card + Interactive Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Column 1: Studio Details & Consultation Hours (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address & Landmark Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E1D7] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#17324D]">
                <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E7E1D7] flex items-center justify-center text-[#C49A59]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#17324D]">
                    Studio Address
                  </h3>
                  <p className="text-xs text-[#C49A59] font-semibold uppercase tracking-wider">
                    {identity.address.locality}, {identity.address.city}
                  </p>
                </div>
              </div>

              <div className="text-sm text-[#243244] leading-relaxed space-y-1 pt-1">
                <p className="font-semibold text-[#17324D]">{identity.name}</p>
                <p>{identity.address.line1}</p>
                <p>{identity.address.line2}</p>
                <p className="text-xs text-[#687789] pt-1">
                  <strong>Landmark:</strong> {identity.address.landmark}
                </p>
                <p className="text-xs text-[#687789]">
                  {identity.address.city}, {identity.address.state} — {identity.address.postalCode}
                </p>
              </div>

              {/* Valet Assistance Note */}
              <div className="pt-3 border-t border-[#E7E1D7] flex items-center gap-2 text-xs text-[#243244]/80">
                <Car className="w-4 h-4 text-[#C49A59] shrink-0" />
                <span>Complimentary Valet Parking Available at Building Entrance</span>
              </div>
            </div>

            {/* Consultation Hours Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E1D7] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#17324D]">
                <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E7E1D7] flex items-center justify-center text-[#C49A59]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#17324D]">
                    Consultation Hours
                  </h3>
                  <p className="text-xs text-[#C49A59] font-semibold uppercase tracking-wider">
                    By Appointment
                  </p>
                </div>
              </div>

              <ul className="text-sm text-[#243244] space-y-2 pt-1">
                {identity.hours.fullDisplay.map((schedule) => (
                  <li key={schedule} className="flex items-start justify-between text-xs sm:text-sm">
                    <span>{schedule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact & Directions Action */}
            <div className="p-6 rounded-2xl bg-[#17324D] text-[#F7F5F0] border border-[#C49A59]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-[#E8D3B0] font-semibold uppercase tracking-wider">Direct Concierge</p>
                <a
                  href={dialablePhone}
                  className="inline-flex items-center gap-2 font-serif text-lg font-bold text-white hover:text-[#C49A59] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C49A59]" />
                  <span>{identity.phone.display}</span>
                </a>
                <div>
                  <a
                    href={`mailto:${identity.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#F7F5F0]/70 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C49A59]" />
                    <span>{identity.email}</span>
                  </a>
                </div>
              </div>

              <a
                href={identity.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C49A59] hover:bg-[#B08746] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Column 2: Styled Interactive Google Maps Embed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[420px] lg:min-h-full">
            <div className="p-2 sm:p-2.5 rounded-3xl bg-white border border-[#E7E1D7] shadow-md flex-1 flex flex-col">
              <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden border border-[#E7E1D7] bg-[#F7F5F0]">
                <iframe
                  title="Lumière Dental Studio Location Map, Bandra West Mumbai"
                  src={identity.maps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full inset-0 absolute"
                />
              </div>

              {/* Bottom Quick Map Link */}
              <div className="p-3 text-center">
                <a
                  href={identity.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17324D] hover:text-[#C49A59] transition-colors"
                >
                  <span>Open in Google Maps Application</span>
                  <ExternalLink className="w-3 h-3 text-[#C49A59]" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default LocationSection;
