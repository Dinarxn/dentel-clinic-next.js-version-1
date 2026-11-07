import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

/**
 * SectionHeading
 * Reusable editorial heading block for Lumière Dental Studio sections.
 * Features Champagne Gold pill badge, luxury Playfair serif title, and balanced descriptive subtitle.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`space-y-3 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}
    >
      {/* Champagne Gold Eyebrow Pill Badge */}
      {eyebrow && (
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase border ${
              light
                ? 'bg-white/10 text-[#C49A59] border-[#C49A59]/40'
                : 'bg-[#C49A59]/15 text-[#C49A59] border-[#C49A59]/30'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A59]" />
            {eyebrow}
          </span>
        </div>
      )}

      {/* Luxury Serif Title */}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
          light ? 'text-[#F7F5F0]' : 'text-[#17324D]'
        }`}
      >
        {title}
      </h2>

      {/* Muted Descriptive Subtitle */}
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          } ${light ? 'text-[#F7F5F0]/80' : 'text-[#687789]'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
