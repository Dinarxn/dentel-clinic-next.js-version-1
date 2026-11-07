import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Stethoscope,
  Phone
} from 'lucide-react';
import { clinicConfig, getTreatmentBySlug } from '@/config/clinic.config';
import { DemoDisclaimerBadge } from '@/components/ui/DemoDisclaimerBadge';

interface TreatmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clinicConfig.treatments.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({
  params,
}: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug) || clinicConfig.treatments.find((t) => t.slug === slug);

  if (!treatment) {
    return {
      title: 'Treatment Not Found | Lumière Dental Studio',
      description: 'The requested treatment detail page could not be found.',
    };
  }

  return {
    title: `${treatment.title} | ${clinicConfig.identity.name}`,
    description: treatment.shortDescription,
    openGraph: {
      title: `${treatment.title} | ${clinicConfig.identity.name}`,
      description: treatment.shortDescription,
      images: [
        {
          url: treatment.heroImage || treatment.image,
          width: 1200,
          height: 630,
          alt: treatment.imageAlt || treatment.title,
        },
      ],
    },
  };
}

export default async function TreatmentDetailPage({ params }: TreatmentPageProps) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug) || clinicConfig.treatments.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  // Related treatments (other treatments from catalog)
  const relatedTreatments = clinicConfig.treatments
    .filter((t) => t.slug !== treatment.slug)
    .slice(0, 3);

  // Extract steps safely
  const steps = treatment.procedureSteps || treatment.proceduralSteps || [];

  // Extract benefits safely
  const clinicalBenefits = Array.isArray(treatment.benefits)
    ? treatment.benefits
    : treatment.benefits?.clinical || [];
  const aestheticBenefits = Array.isArray(treatment.benefits)
    ? []
    : treatment.benefits?.aesthetic || [];

  return (
    <div className="bg-[#F7F5F0] min-h-screen">
      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumbs"
        className="bg-white/80 border-b border-[#E7E1D7] py-3 sticky top-16 sm:top-20 z-20 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-xs font-semibold text-[#687789] overflow-x-auto whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-[#C49A59] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#E7E1D7]">
              <ChevronRight className="w-3.5 h-3.5 text-[#687789]" />
            </li>
            <li>
              <Link href="/treatments" className="hover:text-[#C49A59] transition-colors">
                Treatments
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#E7E1D7]">
              <ChevronRight className="w-3.5 h-3.5 text-[#687789]" />
            </li>
            <li className="text-[#17324D] font-bold" aria-current="page">
              {treatment.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-white to-[#F7F5F0] border-b border-[#E7E1D7] pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#17324D] text-[#E8D3B0] border border-[#C49A59]/40">
                  <Sparkles className="w-3 h-3 text-[#C49A59]" />
                  {treatment.category} Protocol
                </span>
                <DemoDisclaimerBadge text="Demonstration Prototype" variant="gold" />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17324D] tracking-tight leading-[1.15]">
                {treatment.title}
              </h1>

              <p className="font-serif text-lg sm:text-xl text-[#C49A59] font-medium leading-relaxed italic">
                {treatment.tagline}
              </p>

              <p className="text-base text-[#243244] leading-relaxed">
                {treatment.shortDescription}
              </p>

              {/* Treatment Quick Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#E7E1D7] shadow-sm">
                  <div className="flex items-center gap-2 text-[#C49A59] mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Duration</span>
                  </div>
                  <p className="text-sm font-bold text-[#17324D]">{treatment.duration}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7E1D7] shadow-sm">
                  <div className="flex items-center gap-2 text-[#C49A59] mb-1">
                    <HeartPulse className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Recovery</span>
                  </div>
                  <p className="text-sm font-bold text-[#17324D]">{treatment.recoveryTime}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7E1D7] shadow-sm">
                  <div className="flex items-center gap-2 text-[#C49A59] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Comfort</span>
                  </div>
                  <p className="text-sm font-bold text-[#17324D]">{treatment.anesthesia}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={`/contact?treatment=${treatment.slug}`}
                  className="px-6 py-3.5 rounded-xl bg-[#C49A59] hover:bg-[#b08747] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Consultation</span>
                </Link>

                <a
                  href={`https://wa.me/${clinicConfig.identity.whatsapp.cleanDigits}?text=${encodeURIComponent(
                    `Hello Lumière Dental Studio, I am interested in learning more about ${treatment.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#17324D] hover:bg-[#1f4266] text-[#E8D3B0] font-bold text-xs uppercase tracking-wider border border-[#C49A59]/40 transition-colors inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative p-2 rounded-3xl bg-white border border-[#E7E1D7] shadow-xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#17324D]">
                  <Image
                    src={treatment.heroImage || treatment.image}
                    alt={treatment.imageAlt || treatment.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* Section 1: Clinical Overview */}
        <section aria-labelledby="overview-heading" className="space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
              Clinical Architecture
            </span>
            <h2
              id="overview-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]"
            >
              Treatment Overview & Biological Philosophy
            </h2>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-5 text-[#243244] leading-relaxed text-base">
            <p className="font-serif text-lg sm:text-xl text-[#17324D] leading-relaxed italic border-l-4 border-[#C49A59] pl-4">
              &ldquo;{treatment.shortDescription}&rdquo;
            </p>
            <p>{treatment.fullDescription}</p>
            {treatment.overview && treatment.overview !== treatment.fullDescription && (
              <p>{treatment.overview}</p>
            )}
          </div>
        </section>

        {/* Section 2: Procedural Steps Timeline */}
        {steps.length > 0 && (
          <section aria-labelledby="steps-heading" className="space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
                Precision Workflow
              </span>
              <h2
                id="steps-heading"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]"
              >
                The Step-by-Step Clinical Journey
              </h2>
              <p className="text-sm text-[#687789] mt-2">
                Every appointment is orchestrated with unhurried precision, utilizing high-magnification clinical loupes and digital imaging.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((st, idx) => (
                <div
                  key={st.step || idx + 1}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] hover:border-[#C49A59]/60 shadow-sm transition-all duration-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-full bg-[#17324D] text-[#E8D3B0] font-serif font-bold text-sm flex items-center justify-center border border-[#C49A59]/40">
                      0{st.stepNumber || st.step || idx + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-[#687789] uppercase tracking-wider">
                      Stage {st.stepNumber || st.step || idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#17324D]">
                    {st.title}
                  </h3>

                  <p className="text-sm text-[#243244] leading-relaxed">
                    {st.description}
                  </p>

                  {st.clinicalDetail && (
                    <div className="pt-2 border-t border-[#E7E1D7]/70 text-xs text-[#687789] leading-relaxed flex items-start gap-2">
                      <Stethoscope className="w-3.5 h-3.5 text-[#C49A59] shrink-0 mt-0.5" />
                      <span>{st.clinicalDetail}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Candidacy & Suitability */}
        <section aria-labelledby="candidacy-heading" className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
              Patient Candidacy
            </span>
            <h2
              id="candidacy-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]"
            >
              Is This Protocol Ideal for You?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Ideal Candidates */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-[#17324D]">
                <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                <h3 className="font-serif text-xl font-bold">Ideal Candidates</h3>
              </div>
              <p className="text-xs text-[#687789]">
                Recommended for individuals with the following aesthetic or restorative conditions:
              </p>
              <ul className="space-y-3 pt-2">
                {(treatment.candidacy?.idealFor || treatment.idealFor || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#243244]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C49A59] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contraindications or Considerations */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-[#17324D]">
                <AlertTriangle className="w-5 h-5 text-[#C49A59]" />
                <h3 className="font-serif text-xl font-bold">Clinical Considerations</h3>
              </div>
              <p className="text-xs text-[#687789]">
                Dr. Mehta evaluates patient biology carefully. We prioritize conservative pre-treatments when necessary:
              </p>
              <ul className="space-y-3 pt-2">
                {(
                  treatment.candidacy?.contraindications || [
                    'Active untreated periodontal infection requires stabilization first',
                    'Severe nocturnal clenching or bruxism requires calibrated nightguard protection',
                    'Comprehensive 3D CBCT imaging confirms adequate bone and enamel margins',
                  ]
                ).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#243244]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#687789] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Clinical & Aesthetic Benefits */}
        <section aria-labelledby="benefits-heading" className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
              Proven Outcomes
            </span>
            <h2
              id="benefits-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]"
            >
              Clinical & Aesthetic Advantages
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Clinical Benefits */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#17324D] text-white border border-[#C49A59]/30 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-[#E8D3B0]">
                <ShieldCheck className="w-5 h-5 text-[#C49A59]" />
                <h3 className="font-serif text-xl font-bold text-white">Biological & Structural Benefits</h3>
              </div>
              <ul className="space-y-3 pt-2">
                {clinicalBenefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#F7F5F0]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A59] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aesthetic Benefits */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#17324D]">
                <Sparkles className="w-5 h-5 text-[#C49A59]" />
                <h3 className="font-serif text-xl font-bold">Aesthetic & Emotional Rejuvenation</h3>
              </div>
              <ul className="space-y-3 pt-2">
                {(aestheticBenefits.length > 0
                  ? aestheticBenefits
                  : [
                      'Facial proportion alignment complementing your unique lip and smile arc',
                      'Natural multi-layered optical translucency indistinguishable from virgin enamel',
                      'Stain-resistant ceramic glaze maintaining brilliant luster permanently',
                      'Renewed social and professional confidence with a harmonious smile',
                    ]
                ).map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#243244]">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A59] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Recovery & Aftercare */}
        {treatment.recoveryAndAftercare && (
          <section aria-labelledby="aftercare-heading" className="space-y-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
                Post-Care Protocols
              </span>
              <h2
                id="aftercare-heading"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]"
              >
                Recovery Timeline & Maintenance
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E1D7] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-[#F7F5F0]">
                <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1">
                  Expected Downtime
                </h3>
                <p className="text-sm font-semibold text-[#C49A59]">
                  {treatment.recoveryAndAftercare.downtime}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F5F0]">
                <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1">
                  Sensory Adaptation
                </h3>
                <p className="text-sm text-[#243244]">
                  {treatment.recoveryAndAftercare.sensoryPhase}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F5F0]">
                <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1">
                  Maintenance Support
                </h3>
                <p className="text-sm text-[#243244]">
                  Biannual hygiene checkups & custom nightguards if indicated.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Frequently Asked Questions */}
        {treatment.faqs && treatment.faqs.length > 0 && (
          <section aria-labelledby="faqs-heading" className="space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
                Clinical Transparency
              </span>
              <h2
                id="faqs-heading"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]"
              >
                Frequently Asked Clinical Questions
              </h2>
              <p className="text-sm text-[#687789] mt-2">
                Honest, evidence-based answers to help you make informed decisions regarding your oral health.
              </p>
            </div>

            <div className="space-y-4">
              {treatment.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#E7E1D7] shadow-sm space-y-2"
                >
                  <h3 className="font-serif text-lg font-bold text-[#17324D] flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#C49A59] shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm text-[#243244] leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: Consultation Booking CTA Card */}
        <section aria-labelledby="cta-heading" className="relative rounded-3xl bg-[#17324D] text-white p-8 sm:p-12 border border-[#C49A59]/40 shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <DemoDisclaimerBadge text="Demonstration Prototype" variant="light" />
            <h2 id="cta-heading" className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Begin Your Smile Journey with Dr. Aanya Mehta
            </h2>
            <p className="text-sm sm:text-base text-[#F7F5F0]/80 leading-relaxed">
              Experience the tranquility of our Bandra West studio. Unhurried consultations, digital diagnostics, and conservative biomimetic care.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/contact?treatment=${treatment.slug}`}
                className="px-6 py-3.5 rounded-xl bg-[#C49A59] hover:bg-[#b08747] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation</span>
              </Link>

              <a
                href={`tel:${clinicConfig.identity.phone.dialable}`}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F7F5F0] font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C49A59]" />
                <span>{clinicConfig.identity.phone.display}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 8: Related Treatments */}
        {relatedTreatments.length > 0 && (
          <section aria-labelledby="related-heading" className="space-y-8 pt-8 border-t border-[#E7E1D7]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase block mb-1">
                  Explore Further
                </span>
                <h2
                  id="related-heading"
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D]"
                >
                  Other Specialized Treatments
                </h2>
              </div>
              <Link
                href="/treatments"
                className="text-xs font-bold uppercase tracking-wider text-[#C49A59] hover:text-[#b08747] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTreatments.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/treatments/${rel.slug}`}
                  className="group p-5 rounded-3xl bg-white border border-[#E7E1D7] hover:border-[#C49A59]/60 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F7F5F0] text-[#17324D] border border-[#E7E1D7]">
                      {rel.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#17324D] group-hover:text-[#C49A59] transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#687789] line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#E7E1D7]/60 flex items-center justify-between text-xs font-bold text-[#C49A59]">
                    <span>Learn Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
