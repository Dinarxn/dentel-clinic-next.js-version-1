import Link from 'next/link';
import { clinicConfig } from '@/config/clinic.config';

export default function NotFound() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-16 text-center bg-[#F7F5F0]">
      <div className="max-w-xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-[#C49A59] bg-[#C49A59]/10 border border-[#C49A59]/30 uppercase mb-6">
          404 • Page Not Found
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#17324D] font-bold tracking-tight mb-4">
          The Suite You Are Seeking Is Unavailable
        </h1>
        <p className="text-[#687789] text-base sm:text-lg mb-8 leading-relaxed">
          The page or dental clinical service you requested may have moved or been updated.
          Please return to our main reception or browse our comprehensive treatment catalog.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#17324D] text-[#F7F5F0] text-sm font-medium hover:bg-[#0F2033] transition-colors shadow-sm"
          >
            Return to Reception
          </Link>
          <Link
            href="/treatments"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#C49A59] text-white text-sm font-medium hover:bg-[#B08746] transition-colors shadow-sm"
          >
            View Treatments Catalog
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#E7E1D7] text-[#17324D] text-sm font-medium hover:bg-white transition-colors"
          >
            Contact Concierge
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E7E1D7] text-xs text-[#687789]">
          <p>{clinicConfig.demoDisclaimers.footerNotice}</p>
        </div>
      </div>
    </div>
  );
}
