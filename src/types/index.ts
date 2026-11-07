export interface ClinicAddress {
  line1: string;
  line2: string;
  landmark?: string;
  locality: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  fullFormatted: string;
}

export interface ClinicPhone {
  display: string;     // e.g. "+91 98200 12345"
  dialable: string;    // e.g. "+919820012345"
  cleanDigits: string; // e.g. "919820012345"
}

export interface TreatmentStep {
  step: number;
  stepNumber?: number;
  title: string;
  description: string;
  clinicalDetail?: string;
}

export interface TreatmentFaq {
  question: string;
  answer: string;
}

export interface TreatmentItem {
  id?: string;
  slug: string;
  title: string;
  name?: string; // convenient alias for title
  category: 'Cosmetic' | 'Restorative' | 'Orthodontics' | 'Preventive' | string;
  tagline: string;
  shortDescription: string;
  shortSummary?: string; // convenient alias
  fullDescription: string;
  overview?: string; // convenient alias
  duration: string;
  recoveryTime: string;
  anesthesia: string;
  image: string;
  heroImage?: string;
  thumbnailImage?: string;
  imageAlt: string;
  idealFor: string[];
  procedureSteps: TreatmentStep[];
  proceduralSteps?: TreatmentStep[];
  benefits: {
    clinical: string[];
    aesthetic: string[];
  } | string[];
  candidacy?: {
    idealFor: string[];
    contraindications: string[];
  };
  recoveryAndAftercare?: {
    downtime: string;
    sensoryPhase: string;
    protocols: string[];
  };
  faqs: TreatmentFaq[];
}

export interface DoctorEducation {
  year: string;
  degree: string;
  institution: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  credentials: string[];
  experienceYears: number;
  specialties: string[];
  philosophy: string;
  bioParagraphs: string[];
  educationTimeline: DoctorEducation[];
  image: string;
  imageAlt?: string;
  isDemoProfile: boolean;
  demoDisclaimer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'clinic' | 'technology' | 'smiles' | string;
  imageUrl: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
}

export interface AppointmentFormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  preferredTreatment: string;
  preferredDate: string;
  preferredTime?: string;
  message?: string;
}

export interface ClinicConfig {
  isDemoMode: boolean;
  demoDisclaimers: {
    navbarBanner: string;
    footerNotice: string;
    formNotice: string;
    doctorNotice: string;
    generalNotice: string;
  };
  identity: {
    name: string;
    tagline: string;
    foundedYear: number;
    address: ClinicAddress;
    phone: ClinicPhone;
    email: string;
    whatsapp: {
      number: string;
      cleanDigits: string;
      defaultMessage: string;
      prefilledUrl: string;
    };
    hours: {
      weekday: string;
      weekend: string;
      emergency: string;
      fullDisplay: string[];
    };
    maps: {
      embedUrl: string;
      directionsUrl: string;
      coordinates: { lat: number; lng: number };
    };
  };
  doctor: DoctorProfile;
  treatments: TreatmentItem[];
  galleryCategories: string[];
  galleryItems: GalleryItem[];
}
