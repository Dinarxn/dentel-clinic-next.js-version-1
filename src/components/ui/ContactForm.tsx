'use client';

import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { clinicConfig } from '@/config/clinic.config';
import { DemoDisclaimerBadge } from '@/components/ui/DemoDisclaimerBadge';

export interface ContactFormProps {
  initialTreatment?: string;
  className?: string;
  compact?: boolean;
}

interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredTreatment: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  preferredTreatment?: string;
  preferredDate?: string;
}

export function ContactForm({
  initialTreatment = '',
  className = '',
  compact = false,
}: ContactFormProps) {
  const todayIso = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredTreatment: initialTreatment || (clinicConfig.treatments[0]?.slug ?? ''),
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM – 1:00 PM)',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [validatedData, setValidatedData] = useState<FormState | null>(null);

  // Validate single field or entire form
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name: min 2 characters
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    // 2. Phone Number: 10-digit Indian mobile regex (/^[6-9]\d{9}$/)
    const cleanPhone = formData.phoneNumber.trim().replace(/[\s\-]/g, '');
    let digits = cleanPhone;
    if (digits.startsWith('+91')) {
      digits = digits.slice(3);
    } else if (digits.startsWith('91') && digits.length === 12) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0') && digits.length === 11) {
      digits = digits.slice(1);
    }

    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (!digits) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!indianMobileRegex.test(digits)) {
      if (digits.length !== 10) {
        newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
      } else if (!/^[6-9]/.test(digits)) {
        newErrors.phoneNumber = 'Indian mobile numbers must start with 6, 7, 8, or 9.';
      } else {
        newErrors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number.';
      }
    }

    // 3. Email (optional format check if filled, or required standard)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address (e.g. name@example.com).';
      }
    }

    // 4. Preferred Treatment
    if (!formData.preferredTreatment.trim()) {
      newErrors.preferredTreatment = 'Please select your preferred treatment.';
    }

    // 5. Preferred Date: today or future
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred consultation date.';
    } else {
      const selectedDate = new Date(`${formData.preferredDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selectedDate.getTime()) || selectedDate < today) {
        newErrors.preferredDate = 'Appointment date cannot be in the past.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user edits
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate genuine async validation process
    setTimeout(() => {
      setIsSubmitting(false);
      setValidatedData({ ...formData });
      setShowDemoModal(true);
    }, 450);
  };

  const handleReset = () => {
    setShowDemoModal(false);
    setValidatedData(null);
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      preferredTreatment: clinicConfig.treatments[0]?.slug ?? '',
      preferredDate: '',
      preferredTime: 'Morning (9:00 AM – 1:00 PM)',
      message: '',
    });
    setErrors({});
  };

  // Find treatment display title
  const selectedTreatmentObj = clinicConfig.treatments.find(
    (t) => t.slug === (validatedData?.preferredTreatment || formData.preferredTreatment)
  );
  const treatmentDisplayName = selectedTreatmentObj?.title || formData.preferredTreatment;

  // WhatsApp concierge prefilled message with submitted inquiry details
  const whatsappInquiryUrl = `https://wa.me/${clinicConfig.identity.whatsapp.cleanDigits}?text=${encodeURIComponent(
    `Hello Lumière Dental Studio, I submitted an appointment inquiry on your website.\n\nName: ${
      validatedData?.fullName || formData.fullName || 'Patient'
    }\nTreatment: ${treatmentDisplayName}\nDate: ${validatedData?.preferredDate || formData.preferredDate || 'Flexible'}\nTime: ${
      validatedData?.preferredTime || formData.preferredTime
    }`
  )}`;

  return (
    <div className={`relative ${className}`}>
      {/* Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E1D7] shadow-xl">
        {/* Form Title & Subtitle */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
            <span className="text-xs font-bold tracking-widest text-[#C49A59] uppercase">
              Private Consultation
            </span>
            <DemoDisclaimerBadge text="Demonstration Mode" variant="gold" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17324D] tracking-tight">
            Reserve Your Consultation
          </h3>
          <p className="text-sm text-[#687789] mt-2 leading-relaxed">
            Experience unhurried dental artistry in our Bandra West studio. Submit your preferred schedule below.
          </p>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#687789]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Dr. Rahul Verma"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7F5F0]/60 border text-sm text-[#243244] placeholder-[#687789]/60 transition-all focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-[#E7E1D7] focus:border-[#C49A59] focus:ring-[#C49A59]/20'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Grid: Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5"
              >
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#687789]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile (e.g. 9820012345)"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7F5F0]/60 border text-sm text-[#243244] placeholder-[#687789]/60 transition-all focus:outline-none focus:ring-2 ${
                    errors.phoneNumber
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-[#E7E1D7] focus:border-[#C49A59] focus:ring-[#C49A59]/20'
                  }`}
                />
              </div>
              <p className="text-[11px] text-[#687789] mt-1">
                Indian 10-digit mobile starting with 6, 7, 8, or 9
              </p>
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5"
              >
                Email Address <span className="text-[#687789] font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#687789]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#F7F5F0]/60 border text-sm text-[#243244] placeholder-[#687789]/60 transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-[#E7E1D7] focus:border-[#C49A59] focus:ring-[#C49A59]/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Preferred Treatment Dropdown */}
          <div>
            <label
              htmlFor="preferredTreatment"
              className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5"
            >
              Preferred Treatment <span className="text-rose-500">*</span>
            </label>
            <select
              id="preferredTreatment"
              name="preferredTreatment"
              value={formData.preferredTreatment}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-[#F7F5F0]/60 border text-sm text-[#243244] transition-all focus:outline-none focus:ring-2 ${
                errors.preferredTreatment
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-[#E7E1D7] focus:border-[#C49A59] focus:ring-[#C49A59]/20'
              }`}
            >
              {clinicConfig.treatments.map((treatment) => (
                <option key={treatment.slug} value={treatment.slug}>
                  {treatment.title} ({treatment.category})
                </option>
              ))}
            </select>
            {errors.preferredTreatment && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.preferredTreatment}
              </p>
            )}
          </div>

          {/* Grid: Preferred Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Preferred Date */}
            <div>
              <label
                htmlFor="preferredDate"
                className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5"
              >
                Preferred Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  min={todayIso}
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-[#F7F5F0]/60 border text-sm text-[#243244] transition-all focus:outline-none focus:ring-2 ${
                    errors.preferredDate
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-[#E7E1D7] focus:border-[#C49A59] focus:ring-[#C49A59]/20'
                  }`}
                />
              </div>
              {errors.preferredDate && (
                <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.preferredDate}
                </p>
              )}
            </div>

            {/* Preferred Time Window */}
            <div>
              <label
                htmlFor="preferredTime"
                className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5"
              >
                Preferred Time Window
              </label>
              <div className="relative">
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0]/60 border border-[#E7E1D7] text-sm text-[#243244] transition-all focus:outline-none focus:ring-2 focus:border-[#C49A59] focus:ring-[#C49A59]/20"
                >
                  <option value="Morning (9:00 AM – 1:00 PM)">Morning: 9:00 AM – 1:00 PM</option>
                  <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon: 2:00 PM – 5:00 PM</option>
                  <option value="Evening (5:00 PM – 8:00 PM)">Evening: 5:00 PM – 8:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message / Clinical Notes */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5"
            >
              Consultation Notes / Concerns <span className="text-[#687789] font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={compact ? 2 : 3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell Dr. Mehta about your clinical goals, dental concerns, or any previous treatments..."
              className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0]/60 border border-[#E7E1D7] text-sm text-[#243244] placeholder-[#687789]/60 transition-all focus:outline-none focus:ring-2 focus:border-[#C49A59] focus:ring-[#C49A59]/20 resize-none"
            />
          </div>

          {/* Demonstration Notice Strip */}
          <div className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E7E1D7] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#C49A59] shrink-0 mt-0.5" />
            <p className="text-xs text-[#687789] leading-relaxed">
              <strong className="text-[#17324D]">Demonstration Prototype:</strong>{' '}
              {clinicConfig.demoDisclaimers.formNotice}
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-[#C49A59] hover:bg-[#b08747] text-white font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Validating Consultation Details...</span>
                </>
              ) : (
                <>
                  <span>Request Studio Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Demonstration Validation Modal Dialog */}
      {showDemoModal && validatedData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17324D]/75 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#C49A59]/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={handleReset}
              className="absolute top-5 right-5 p-2 rounded-full text-[#687789] hover:text-[#17324D] hover:bg-[#F7F5F0] transition-colors"
              aria-label="Close Demonstration Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gold Header Accent */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C49A59]/15 flex items-center justify-center text-[#C49A59] shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-widest text-[#C49A59] uppercase block">
                  Demonstration Prototype
                </span>
                <h4
                  id="modal-title"
                  className="font-serif text-xl sm:text-2xl font-bold text-[#17324D]"
                >
                  Consultation Request Validated
                </h4>
              </div>
            </div>

            {/* Clear Demonstration Mode Explanation */}
            <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E7E1D7] mb-5 space-y-2">
              <p className="text-xs font-semibold text-[#17324D]">
                Demonstration Preview: Validation passed! In production, this connects to your clinic management API or WhatsApp Business. No real appointment was booked.
              </p>
              <p className="text-xs text-[#687789] leading-relaxed">
                This is a demonstration prototype website. Your request details have been validated successfully, but no real appointment has been scheduled on a live clinic calendar, and no personal medical data has been stored.
              </p>
            </div>

            {/* Validated Inquiry Card */}
            <div className="rounded-2xl border border-[#E7E1D7] p-4 bg-white/70 space-y-2.5 text-xs text-[#243244] mb-6">
              <div className="flex justify-between border-b border-[#E7E1D7]/60 pb-2">
                <span className="font-semibold text-[#687789]">Patient Name:</span>
                <span className="font-bold text-[#17324D]">{validatedData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-[#E7E1D7]/60 pb-2">
                <span className="font-semibold text-[#687789]">Contact Number:</span>
                <span className="font-bold text-[#17324D]">{validatedData.phoneNumber}</span>
              </div>
              {validatedData.email && (
                <div className="flex justify-between border-b border-[#E7E1D7]/60 pb-2">
                  <span className="font-semibold text-[#687789]">Email Address:</span>
                  <span className="text-[#17324D]">{validatedData.email}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-[#E7E1D7]/60 pb-2">
                <span className="font-semibold text-[#687789]">Treatment:</span>
                <span className="font-bold text-[#C49A59]">{treatmentDisplayName}</span>
              </div>
              <div className="flex justify-between border-b border-[#E7E1D7]/60 pb-2">
                <span className="font-semibold text-[#687789]">Preferred Schedule:</span>
                <span className="text-[#17324D]">
                  {validatedData.preferredDate} ({validatedData.preferredTime})
                </span>
              </div>
              {validatedData.message && (
                <div className="pt-1">
                  <span className="font-semibold text-[#687789] block mb-1">Clinical Notes:</span>
                  <p className="italic text-[#687789] bg-[#F7F5F0] p-2 rounded-lg">
                    &ldquo;{validatedData.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="space-y-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continue via WhatsApp Concierge</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-xl border border-[#E7E1D7] text-[#17324D] hover:bg-[#F7F5F0] font-semibold text-xs transition-colors cursor-pointer"
              >
                Dismiss & Reset Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactForm;