import React from 'react';
import { Sparkles } from 'lucide-react';

export interface DemoDisclaimerBadgeProps {
  text?: string;
  className?: string;
  variant?: 'gold' | 'navy' | 'light';
  showIcon?: boolean;
}

/**
 * DemoDisclaimerBadge
 * Reusable demonstration disclaimer badge for transparent demo integrity.
 * Clearly informs patients and evaluators of prototype status without confusing real clinical operations.
 */
export function DemoDisclaimerBadge({
  text = 'Demonstration Prototype Notice',
  className = '',
  variant = 'gold',
  showIcon = true,
}: DemoDisclaimerBadgeProps) {
  const variantStyles = {
    gold: 'bg-[#C49A59]/15 text-[#C49A59] border-[#C49A59]/30',
    navy: 'bg-[#17324D]/10 text-[#17324D] border-[#17324D]/20',
    light: 'bg-white/10 text-[#F7F5F0] border-white/20',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${variantStyles[variant]} ${className}`}
      role="note"
      aria-label="Demonstration Notice"
    >
      {showIcon && (
        <Sparkles className="w-3.5 h-3.5 text-[#C49A59] shrink-0" aria-hidden="true" />
      )}
      <span>{text}</span>
    </div>
  );
}

export default DemoDisclaimerBadge;
