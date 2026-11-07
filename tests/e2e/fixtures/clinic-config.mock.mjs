/**
 * Mock Rebranding Configurations for Tier 3 Cross-Feature Testing
 * Proves the single-source-of-truth rebrandability of Lumière Dental Studio
 */

export const mockRebrandedClinicConfig = {
  isDemoMode: true,
  demoDisclaimers: {
    navbarBanner: "Apex Dental Studio • Demonstration Prototype for Premium Dental Practices",
    footerNotice: "Notice: Live demonstration prototype for Apex Dental Studio.",
    formNotice: "Demonstration Preview: Validation passed! Simulated booking only.",
    doctorNotice: "Fictional Demonstration Profile: Dr. Rajesh Varma is a placeholder.",
    generalNotice: "Demonstration Mode."
  },
  identity: {
    name: "Apex Dental Studio",
    tagline: "Excellence in Precision Dentistry",
    foundedYear: 2018,
    address: {
      line1: "45/1 100 Feet Road",
      line2: "HAL 2nd Stage",
      locality: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560038",
      country: "India",
      fullFormatted: "Apex Dental Studio, 45/1 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038"
    },
    phone: {
      display: "+91 99887 76655",
      dialable: "+919988776655",
      cleanDigits: "919988776655"
    },
    email: "concierge@apexdental.in",
    whatsapp: {
      number: "+91 99887 76655",
      cleanDigits: "919988776655",
      defaultMessage: "Hello, I would like to enquire about a dental consultation at Apex Dental Studio",
      prefilledUrl: "https://wa.me/919988776655?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20dental%20consultation%20at%20Apex%20Dental%20Studio"
    },
    hours: {
      weekday: "Monday – Saturday: 10:00 AM – 7:00 PM",
      weekend: "Sunday: Closed",
      emergency: "24/7 Dental Emergency On-Call",
      fullDisplay: [
        "Monday – Saturday: 10:00 AM – 7:00 PM",
        "Sunday: Closed"
      ]
    },
    maps: {
      embedUrl: "https://www.google.com/maps/embed?mock=apex",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=Apex+Dental+Studio+Indiranagar+Bengaluru",
      coordinates: {
        lat: 12.9716,
        lng: 77.5946
      }
    }
  },
  doctor: {
    name: "Dr. Rajesh Varma",
    title: "Chief Prosthodontist & Implantologist",
    credentials: ["BDS", "MDS", "FICOI"],
    experienceYears: 15,
    specialties: ["Ceramic Restorations", "Implant Reconstructions"],
    philosophy: "Precision guided biological dentistry designed to stand the test of time.",
    bioParagraphs: ["Dr. Rajesh Varma is a pioneer in digital guided restorative workflows."],
    educationTimeline: [],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80",
    isDemoProfile: true,
    demoDisclaimer: "Fictional Demonstration Profile for Apex Dental Studio."
  },
  treatments: [
    {
      id: "treatment-1",
      slug: "ceramic-veneers",
      title: "Ceramic Veneers",
      category: "Cosmetic",
      tagline: "Custom milled lithium disilicate restorations",
      shortDescription: "Precision ceramic veneers.",
      fullDescription: "Full details for ceramic veneers.",
      duration: "2 visits",
      recoveryTime: "Immediate",
      anesthesia: "Local",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Ceramic veneers",
      idealFor: ["Discoloration"],
      procedureSteps: [],
      benefits: { clinical: ["Enamel bond"], aesthetic: ["Natural sheen"] },
      faqs: []
    }
  ],
  galleryCategories: ["all", "clinic", "technology"],
  galleryItems: []
};
