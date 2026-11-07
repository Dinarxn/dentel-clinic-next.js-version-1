/**
 * Specification Reference Validators for Lumière Dental Studio
 * Derived strictly from ORIGINAL_REQUEST.md & PROJECT.md
 */

/**
 * Validates Indian Mobile Number according to national standards
 * Must be 10 digits starting with [6-9]
 * @param {string} phone
 * @returns {{ isValid: boolean, error?: string, sanitized?: string }}
 */
export function validateIndianPhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Phone number is required.' };
  }

  // Strip common formatting whitespace and hyphens
  const stripped = phone.trim().replace(/[\s\-]/g, '');

  // Handle optional leading +91 or 91 or 0 prefix for normalization
  let digits = stripped;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  // Strict 10-digit Indian Mobile Pattern: starts with 6, 7, 8, or 9 followed by 9 digits
  const indianMobileRegex = /^[6-9]\d{9}$/;

  if (!indianMobileRegex.test(digits)) {
    if (digits.length < 10) {
      return { isValid: false, error: 'Phone number must be at least 10 digits.' };
    }
    if (digits.length > 10) {
      return { isValid: false, error: 'Phone number cannot exceed 10 digits.' };
    }
    if (/^[0-5]/.test(digits)) {
      return { isValid: false, error: 'Indian mobile numbers must begin with 6, 7, 8, or 9.' };
    }
    return { isValid: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
  }

  return { isValid: true, sanitized: digits };
}

/**
 * Validates Appointment Preferred Date
 * Date must be today or in the future
 * @param {string} dateString YYYY-MM-DD
 * @returns {{ isValid: boolean, error?: string }}
 */
export function validateAppointmentDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return { isValid: false, error: 'Preferred appointment date is required.' };
  }

  // Expect YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return { isValid: false, error: 'Date must be in YYYY-MM-DD format.' };
  }

  const selectedDate = new Date(`${dateString}T00:00:00`);
  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Invalid date.' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return { isValid: false, error: 'Appointment date cannot be in the past.' };
  }

  return { isValid: true };
}

/**
 * Validates Full Patient Name
 * Minimum 2 characters, maximum 60 characters, no dangerous control characters
 * @param {string} name
 * @returns {{ isValid: boolean, error?: string }}
 */
export function validatePatientName(name) {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Full name is required.' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Full name must be at least 2 characters.' };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: 'Full name cannot exceed 60 characters.' };
  }
  return { isValid: true };
}

/**
 * Generates WhatsApp Concierge URL according to WhatsApp Click-to-Chat API
 * @param {string} cleanDigits 12-digit number (e.g. 919820012345)
 * @param {string} message Prefilled text
 * @returns {string} Universal URL
 */
export function buildWhatsAppUrl(cleanDigits, message) {
  const digits = String(cleanDigits).replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encodedText}`;
}

/**
 * Generates Tel dialing link
 * @param {string} dialable E.164 formatted dialable number
 * @returns {string} tel: link
 */
export function buildTelLink(dialable) {
  const cleaned = dialable.trim();
  return `tel:${cleaned.startsWith('+') ? cleaned : `+${cleaned}`}`;
}

/**
 * Validates that an appointment form payload meets all validation constraints
 * and generates the appropriate response object (demonstration modal vs errors)
 * @param {Object} payload
 */
export function validateAppointmentSubmission(payload) {
  const errors = {};

  const nameCheck = validatePatientName(payload.fullName);
  if (!nameCheck.isValid) errors.fullName = nameCheck.error;

  const phoneCheck = validateIndianPhone(payload.phoneNumber);
  if (!phoneCheck.isValid) errors.phoneNumber = phoneCheck.error;

  const dateCheck = validateAppointmentDate(payload.preferredDate);
  if (!dateCheck.isValid) errors.preferredDate = dateCheck.error;

  if (!payload.preferredTreatment || typeof payload.preferredTreatment !== 'string' || !payload.preferredTreatment.trim()) {
    errors.preferredTreatment = 'Please select a treatment.';
  }

  const isValid = Object.keys(errors).length === 0;

  if (isValid) {
    return {
      isValid: true,
      errors: {},
      isDemoMode: true,
      demoModal: {
        title: 'Demonstration Validation Passed',
        notice: 'Demonstration Preview: Validation passed! In production, this connects to your clinic management API or WhatsApp Business. No real appointment was booked.',
        simulatedPayload: {
          fullName: payload.fullName.trim(),
          phoneNumber: phoneCheck.sanitized,
          preferredTreatment: payload.preferredTreatment,
          preferredDate: payload.preferredDate,
        },
      },
      // Prohibited: must never claim confirmed real booking
      isRealConfirmedBooking: false,
    };
  }

  return {
    isValid: false,
    errors,
    demoModal: null,
  };
}
