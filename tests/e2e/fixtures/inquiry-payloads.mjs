/**
 * Test Payloads & Fixtures for E2E Form Validation and Corner Case Testing
 */

export const validInquiryPayloads = [
  {
    name: 'Priya Sharma (Standard Mumbai Patient)',
    fullName: 'Priya Sharma',
    phoneNumber: '9820012345',
    email: 'priya.sharma@example.com',
    preferredTreatment: 'porcelain-veneers',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    preferredTime: 'Morning: 9:00 AM – 1:00 PM',
    message: 'Interested in bespoke porcelain veneers consultation.',
  },
  {
    name: 'Rohan Mehra (Starting with 8)',
    fullName: 'Rohan Mehra',
    phoneNumber: '8123456789',
    email: 'rohan.m@example.com',
    preferredTreatment: 'dental-implants',
    preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // in 3 days
    preferredTime: 'Evening: 5:00 PM – 8:00 PM',
    message: 'Seeking implant consultation for lower molar.',
  },
  {
    name: 'Ananya Iyer (Starting with 7)',
    fullName: 'Ananya Iyer',
    phoneNumber: '7000000000',
    email: 'ananya.iyer@example.com',
    preferredTreatment: 'invisible-aligners',
    preferredDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // in 7 days
    preferredTime: 'Afternoon: 2:00 PM – 5:00 PM',
    message: 'Inquiry for clear aligners treatment duration.',
  },
  {
    name: 'Vikram Singhania (Starting with 6)',
    fullName: 'Vikram Singhania',
    phoneNumber: '6999999999',
    email: 'vikram.s@example.com',
    preferredTreatment: 'laser-teeth-whitening',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: 'Morning: 9:00 AM – 1:00 PM',
    message: 'Teeth whitening inquiry before wedding event.',
  },
];

export const adversarialPhoneCases = [
  // Short / incomplete numbers
  { input: '98200', reason: 'Too short (5 digits)', expectedValid: false },
  { input: '982001234', reason: 'Too short (9 digits)', expectedValid: false },
  { input: '12345', reason: '5 digits starting with 1', expectedValid: false },
  
  // Numbers with invalid starting digit for Indian Mobile
  { input: '5820012345', reason: 'Starts with 5 (invalid Indian mobile prefix)', expectedValid: false },
  { input: '0820012345', reason: 'Starts with 0 (unhandled without country code logic)', expectedValid: false },
  { input: '1234567890', reason: 'Starts with 1', expectedValid: false },
  { input: '2234567890', reason: 'Starts with 2 (landline prefix, not mobile)', expectedValid: false },
  { input: '3334567890', reason: 'Starts with 3', expectedValid: false },
  { input: '4444567890', reason: 'Starts with 4', expectedValid: false },
  
  // Length exceeding 10 digits without prefix
  { input: '98200123456', reason: 'Too long (11 digits without prefix)', expectedValid: false },
  { input: '9820012345678', reason: 'Too long (13 digits)', expectedValid: false },
  
  // Non-numeric strings
  { input: '98200ABCDE', reason: 'Contains alphabetical characters', expectedValid: false },
  { input: 'call-me-now', reason: 'Pure text', expectedValid: false },
  { input: '', reason: 'Empty string', expectedValid: false },
  { input: '   ', reason: 'Whitespace only', expectedValid: false },
  
  // Valid formatted inputs that should sanitize to 10 digits
  { input: '+91 98200 12345', reason: 'Valid Indian mobile with +91 and spaces', expectedValid: true, expectedClean: '9820012345' },
  { input: '+919820012345', reason: 'Valid with +91 attached', expectedValid: true, expectedClean: '9820012345' },
  { input: '98200-12345', reason: 'Valid with hyphen', expectedValid: true, expectedClean: '9820012345' },
];

export const adversarialDateCases = [
  {
    date: '2020-01-01',
    description: 'Historical date (Year 2020)',
    expectedValid: false,
  },
  {
    date: '2023-12-31',
    description: 'Past date (Year 2023)',
    expectedValid: false,
  },
  {
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    description: 'Yesterday',
    expectedValid: false,
  },
  {
    date: new Date().toISOString().split('T')[0],
    description: 'Today (current day)',
    expectedValid: true,
  },
  {
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    description: 'Tomorrow',
    expectedValid: true,
  },
  {
    date: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
    description: '30 days in the future',
    expectedValid: true,
  },
  {
    date: 'not-a-date',
    description: 'Malformed date string',
    expectedValid: false,
  },
];
