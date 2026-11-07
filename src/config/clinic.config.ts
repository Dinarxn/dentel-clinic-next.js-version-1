import { ClinicConfig, TreatmentItem } from '@/types';

export const clinicConfig: ClinicConfig = {
  isDemoMode: true,
  demoDisclaimers: {
    navbarBanner: "Lumière Dental Studio • Demonstration Prototype for Premium Dental Practices Across India",
    footerNotice: "Notice: This website is a live demonstration prototype developed to showcase modern web architecture for dental clinics across India. Clinic names, doctor profiles, and telephone numbers are demonstration placeholders.",
    formNotice: "Demonstration Preview: Validation passed! In production, this connects to your clinic management API or WhatsApp Business. No real appointment was booked.",
    doctorNotice: "Fictional Demonstration Profile: Dr. Aanya Mehta represents a demonstration clinician profile created for layout presentation. Real clinical credentials, registrations, and certifications are provided upon production clinic deployment.",
    generalNotice: "Demonstration Mode: All clinical services, credentials, and appointments are for presentation and evaluation purposes only."
  },
  identity: {
    name: "Lumière Dental Studio",
    tagline: "Artistry Meets Precision in Modern Dental Care",
    foundedYear: 2014,
    address: {
      line1: "2nd Floor, Heritage Boulevard",
      line2: "Turner Road, off Waterfield Road",
      landmark: "Near Talao Pali & Perry Cross Road Junction",
      locality: "Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400050",
      country: "India",
      fullFormatted: "Lumière Dental Studio, 2nd Floor, Heritage Boulevard, Turner Road, Bandra West, Mumbai, Maharashtra 400050"
    },
    phone: {
      display: "+91 98200 12345",
      dialable: "+919820012345",
      cleanDigits: "919820012345"
    },
    email: "concierge@lumieredental.in",
    whatsapp: {
      number: "+91 98200 12345",
      cleanDigits: "919820012345",
      defaultMessage: "Hello, I would like to enquire about a dental appointment",
      prefilledUrl: "https://wa.me/919820012345?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20dental%20appointment"
    },
    hours: {
      weekday: "Monday – Saturday: 9:00 AM – 8:00 PM",
      weekend: "Sunday: By Prior Appointment Only",
      emergency: "24/7 Dental Emergency On-Call for Registered Patients",
      fullDisplay: [
        "Monday – Saturday: 9:00 AM – 8:00 PM",
        "Sunday: By Prior Appointment Only",
        "Emergency Concierge: 24/7 Priority Support"
      ]
    },
    maps: {
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.218889812497!2d72.82914187595567!3d19.054117352668585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c943b1234567%3A0x123456789abcdef!2sTurner%20Rd%2C%20Bandra%20West%2C%20Mumbai%2C%20Maharashtra%20400050!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=Lumiere+Dental+Studio+Turner+Road+Bandra+West+Mumbai",
      coordinates: {
        lat: 19.0541,
        lng: 72.8291
      }
    }
  },
  doctor: {
    name: "Dr. Aanya Mehta",
    title: "Founder & Lead Aesthetic Prosthodontist",
    credentials: [
      "BDS (Mumbai)",
      "MDS (Prosthodontics, Crown & Bridge)",
      "Fellow, International Congress of Oral Implantologists (ICOI)",
      "Member, Indian Prosthodontic Society (IPS)",
      "Affiliate Member, American Academy of Cosmetic Dentistry (AACD)"
    ],
    experienceYears: 12,
    specialties: [
      "Aesthetic Porcelain Veneers",
      "Digital Smile Design (DSD)",
      "Computer-Guided Implantology",
      "Microscopic Endodontics",
      "Full-Mouth Rehabilitation"
    ],
    philosophy: "A smile should look radiantly healthy, never artificial. Our responsibility is to elevate your natural beauty while protecting your biological tooth structure for decades to come.",
    bioParagraphs: [
      "Dr. Aanya Mehta founded Lumière Dental Studio with a distinct clinical conviction: modern dental care should be an unhurried, serene, and biomimetic discipline. Trained at premier medical institutions in Mumbai and Zurich, she specializes in aesthetic prosthodontics and micro-invasive smile reconstructions.",
      "With over twelve years of focused private practice in Bandra West, Dr. Mehta has designed more than 2,500 natural, harmonious smiles. Her clinical philosophy integrates facial proportion mapping, high-definition 3D digital impressions, and gentle conservative protocols that preserve maximum biological tooth structure.",
      "Beyond cosmetic transformations, Dr. Mehta is committed to compassionate patient comfort. Every treatment suite is calibrated for psychological calm, ensuring that patients with dental anxieties feel completely respected, unhurried, and at ease."
    ],
    educationTimeline: [
      {
        year: "2012",
        degree: "Bachelor of Dental Surgery (BDS)",
        institution: "Government Dental College & Hospital, Mumbai"
      },
      {
        year: "2015",
        degree: "Master of Dental Surgery (MDS) — Prosthodontics",
        institution: "Nair Hospital Dental College, Mumbai"
      },
      {
        year: "2017",
        degree: "Advanced Fellowship in Ceramo-Aesthetic Dentistry",
        institution: "Zurich Aesthetic Center, Switzerland"
      },
      {
        year: "2020",
        degree: "Digital Smile Design Master Certificate",
        institution: "DSD International Academy"
      }
    ],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Dr. Aanya Mehta, MDS Aesthetic Prosthodontist and Clinical Director at Lumière Dental Studio, Bandra West Mumbai",
    isDemoProfile: true,
    demoDisclaimer: "Fictional Demonstration Profile: Dr. Aanya Mehta represents a demonstration clinician profile created for layout presentation. Real clinical credentials, registrations, and certifications are provided upon production clinic deployment."
  },
  treatments: [
    {
      id: "treatment-1",
      slug: "porcelain-veneers",
      title: "Porcelain Veneers & Smile Makeovers",
      name: "Porcelain Veneers & Smile Makeovers",
      category: "Cosmetic",
      tagline: "Master-Crafted Ceramo-Aesthetic Transformations",
      shortDescription: "Hand-crafted, ultra-thin porcelain laminates custom-sculpted to harmonise tooth proportions, shade, and symmetry while conserving natural tooth enamel.",
      shortSummary: "Hand-crafted, ultra-thin porcelain laminates custom-sculpted to harmonise tooth proportions, shade, and symmetry while conserving natural tooth enamel.",
      fullDescription: "At Lumière Dental Studio, our porcelain veneer protocols represent the synthesis of biological architecture and bespoke cosmetic artistry. Designed for patients seeking a radiant, symmetrical smile, each veneer is custom-milled from high-translucency lithium disilicate (E.max) or layered feldspathic porcelain. Rather than applying generic 'one-size-fits-all' templates, our facial-driven smile design evaluates facial symmetry, lip dynamics, interpupillary lines, and skin undertones to curate a smile that looks organically luminous and age-defying.",
      overview: "At Lumière Dental Studio, our porcelain veneer protocols represent the synthesis of biological architecture and bespoke cosmetic artistry. Designed for patients seeking a radiant, symmetrical smile, each veneer is custom-milled from high-translucency lithium disilicate (E.max) or layered feldspathic porcelain.",
      duration: "2 visits over 7–10 days",
      recoveryTime: "Immediate (0 days downtime)",
      anesthesia: "Gentle local anesthesia during micro-preparation",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
      heroImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Radiant, natural smile makeover highlighting porcelain veneer translucency and symmetrical smile arc",
      idealFor: [
        "Persistent tetracycline or fluorosis staining",
        "Chipped, fractured, or worn incisal edges",
        "Diastema (unwanted gaps between front teeth)",
        "Mild crowding or rotated teeth without braces",
        "Asymmetrical smile arcs and uneven tooth lengths"
      ],
      candidacy: {
        idealFor: [
          "Individuals with persistent deep staining resistant to whitening",
          "Chipped, worn, or naturally uneven tooth shapes",
          "Patients desiring a permanent, harmonious smile arc"
        ],
        contraindications: [
          "Severe active periodontal disease",
          "Severe untreated nocturnal bruxism without nightguard",
          "Insufficient remaining enamel for predictable bonding"
        ]
      },
      procedureSteps: [
        {
          step: 1,
          stepNumber: 1,
          title: "Digital Smile Design & 3D Intraoral Scanning",
          description: "High-definition 3D optical impressions and facial photographic mapping generate a virtual 3D simulation of your prospective smile before any treatment begins.",
          clinicalDetail: "We capture 3D stereophotogrammetry and intraoral scans to build a virtual patient avatar, calculating aesthetic tooth proportions based on golden ratio principles."
        },
        {
          step: 2,
          stepNumber: 2,
          title: "Conservative Enamel Preservation & Direct Mock-up",
          description: "Micro-preparation of enamel (typically 0.3mm to 0.5mm), maintaining biological tooth structure. A trial composite mock-up is placed in mouth for aesthetic evaluation.",
          clinicalDetail: "Sub-millimeter enamel recontouring is guided by diagnostic silicone stents to ensure zero over-reduction."
        },
        {
          step: 3,
          stepNumber: 3,
          title: "Master Ceramist Hand-Fabrication",
          description: "Our master ceramists hand-layer high-translucency lithium disilicate porcelain, capturing natural opalescence, mamelons, and subtle incisal halo effects.",
          clinicalDetail: "Every unit is hand-characterized with individualized surface texture to eliminate artificial flatness."
        },
        {
          step: 4,
          stepNumber: 4,
          title: "Aesthetic Bonding & Occlusal Calibration",
          description: "Under high dental magnification, each veneer is bonded with dual-cure resin cements. Occlusal forces are balanced with digital pressure mapping.",
          clinicalDetail: "Silane coupling and 10-MDP adhesive bonding create a permanent chemical union between porcelain and enamel."
        }
      ],
      benefits: {
        clinical: [
          "Biomimetic resin-enamel bonding reinforces remaining tooth structure",
          "Glazed ceramic surface repels plaque bacteria and resists decay",
          "Preserves over 90% of your living tooth structure"
        ],
        aesthetic: [
          "Natural light refraction matching pristine enamel",
          "Permanently stain-resistant against coffee, wine, and turmeric",
          "Custom-calibrated to facial proportions and skin undertones"
        ]
      },
      recoveryAndAftercare: {
        downtime: "Zero downtime — resume normal activities immediately",
        sensoryPhase: "Mild thermal sensitivity for 3–5 days as tissues adapt",
        protocols: [
          "Brush twice daily with non-abrasive fluoride toothpaste",
          "Daily flossing or water jet irrigation",
          "Wear protective nocturnal splint if recommended",
          "Routine professional polish every 6 months"
        ]
      },
      faqs: [
        {
          question: "Will my porcelain veneers look unnaturally thick or fake?",
          answer: "Never at Lumière Dental Studio. We utilize ultra-thin (0.3mm–0.5mm) layered lithium disilicate ceramics calibrated to your unique facial features and skin undertones, guaranteeing organic translucency, natural light reflection, and depth."
        },
        {
          question: "Is the veneer placement procedure painful?",
          answer: "The entire preparation and bonding process is performed under gentle, computer-controlled local anaesthesia. Most patients report feeling only mild vibration and zero sharp discomfort throughout both appointments."
        },
        {
          question: "Can porcelain veneers chip or fall off while eating?",
          answer: "Contemporary resin-enamel bonding creates an ultra-durable chemical and mechanical union. Normal eating of cooked foods, fruits, and meals is completely safe. We advise simply avoiding biting directly into non-food items or unyielding ice cubes."
        }
      ]
    },
    {
      id: "treatment-2",
      slug: "dental-implants",
      title: "Advanced Dental Implants & Full-Arch Restorations",
      name: "Advanced Dental Implants & Full-Arch Restorations",
      category: "Restorative",
      tagline: "Permanent Biocompatible Titanium & Zirconia Tooth Replacement",
      shortDescription: "Precision-guided titanium and zirconia implant restorations that replace missing teeth from root to crown, restoring full chewing power and preventing jawbone resorption.",
      shortSummary: "Precision-guided titanium and zirconia implant restorations that replace missing teeth from root to crown, restoring full chewing power and preventing jawbone resorption.",
      fullDescription: "Tooth loss undermines both chewing function and structural facial aesthetics by initiating progressive alveolar bone loss. At Lumière Dental Studio, our dental implant therapies employ computer-guided 3D surgical templates generated from low-dose Cone Beam Computed Tomography (CBCT) scans. We place medical-grade titanium or metal-free zirconia fixtures that fuse biologically with living bone (osseointegration), capped with custom-milled zirconia crowns that emerge seamlessly from the gum line.",
      overview: "Tooth loss undermines both chewing function and structural facial aesthetics by initiating progressive alveolar bone loss. At Lumière Dental Studio, our dental implant therapies employ computer-guided 3D surgical templates generated from low-dose CBCT scans.",
      duration: "1–2 surgical appointments + 8–12 weeks osseointegration",
      recoveryTime: "24–48 hours mild rest",
      anesthesia: "Computer-controlled local anesthesia with optional twilight sedation",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      heroImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Specialist performing dental implant procedure using surgical precision instruments",
      idealFor: [
        "Single missing teeth from trauma or fracture",
        "Multiple missing teeth in upper or lower arches",
        "Patients with failing fixed bridges or uncomfortable dentures",
        "Active individuals seeking permanent chewing restoration"
      ],
      candidacy: {
        idealFor: [
          "Healthy adults with missing single or multiple teeth",
          "Patients with adequate jawbone density or willingness for bone grafting",
          "Individuals desiring permanent non-removable tooth replacements"
        ],
        contraindications: [
          "Uncontrolled diabetes mellitus (HbA1c > 8.0%)",
          "Active bisphosphonate IV therapies",
          "Heavy active smoking without willingness to taper"
        ]
      },
      procedureSteps: [
        {
          step: 1,
          stepNumber: 1,
          title: "3D CBCT Imaging & Virtual Guided Planning",
          description: "High-resolution 3D volumetric tomography accurately maps bone density, nerve canals, and sinus floors to sub-millimeter tolerances.",
          clinicalDetail: "Virtual surgical planning software simulates optimal fixture trajectory to maximize cortical bone contact."
        },
        {
          step: 2,
          stepNumber: 2,
          title: "Computer-Guided Implant Placement",
          description: "Under profound local anesthesia, a 3D printed surgical template positions the medical-grade fixture with minimal soft-tissue disruption.",
          clinicalDetail: "Flapless or micro-incision techniques preserve periosteal blood supply, accelerating healing."
        },
        {
          step: 3,
          stepNumber: 3,
          title: "Biological Osseointegration Period",
          description: "Over 8 to 12 weeks, trabecular bone cells fuse directly to the hydrophilic microporous implant surface.",
          clinicalDetail: "Direct bone-to-implant contact reaches over 75%, establishing a rock-solid foundation."
        },
        {
          step: 4,
          stepNumber: 4,
          title: "Digital Abutment & Monolithic Zirconia Crown",
          description: "A digital scan body records the 3D fixture coordinates. A screw-retained zirconia crown is torqued into place with customized gingival emergence.",
          clinicalDetail: "Screw-retained restorations eliminate submucosal cement, preventing peri-implantitis."
        }
      ],
      benefits: {
        clinical: [
          "Stops alveolar bone loss and prevents premature facial sagging",
          "98.4% long-term clinical integration success rate",
          "Adjacent healthy natural teeth remain 100% untouched and uncut"
        ],
        aesthetic: [
          "Natural emergence profile virtually indistinguishable from real teeth",
          "Restores 100% of natural bite force for unhindered nutrition",
          "Eliminates slipping, clicking, or adhesive requirements"
        ]
      },
      recoveryAndAftercare: {
        downtime: "24 to 48 hours of light activity; return to desk work next day",
        sensoryPhase: "Mild localized ache controlled with standard anti-inflammatory tablets for 2–3 days",
        protocols: [
          "Soft diet for 7 days post-placement",
          "Gentle warm salt water mouth rinses after 24 hours",
          "Daily water flossing around the implant neck",
          "Biannual maintenance check-ups"
        ]
      },
      faqs: [
        {
          question: "How long do dental implants last?",
          answer: "With meticulous oral hygiene and bi-annual dental check-ups, dental implants are engineered to last 25 years to a lifetime. The ceramic crown may require re-polishing or replacement after 15–20 years of normal biting wear."
        },
        {
          question: "Is dental implant surgery painful?",
          answer: "Surprisingly, placing an implant involves less post-operative discomfort than a standard tooth extraction because jawbone tissue has very few pain receptors. Gentle computer-controlled local anesthesia ensures complete comfort throughout."
        },
        {
          question: "What if I have bone loss from a tooth missing for years?",
          answer: "Our clinic routinely performs targeted sinus augmentations and particulate bone grafts using growth factors, safely rebuilding the anatomical bone foundation required for predictable implant anchorage."
        }
      ]
    },
    {
      id: "treatment-3",
      slug: "invisible-aligners",
      title: "Invisalign® Clear Aligners & Digital Orthodontics",
      name: "Invisalign® Clear Aligners & Digital Orthodontics",
      category: "Orthodontics",
      tagline: "Discreet Alignment Driven by SmartTrack® Technology",
      shortDescription: "Custom-engineered transparent medical-grade aligners that gently guide teeth into optimal alignment without metal brackets, wires, or dietary restrictions.",
      shortSummary: "Custom-engineered transparent medical-grade aligners that gently guide teeth into optimal alignment without metal brackets, wires, or dietary restrictions.",
      fullDescription: "For adult executives, creative professionals, and style-conscious individuals in Mumbai, traditional metal braces present unwanted aesthetic compromises. Lumière Dental Studio provides comprehensive clear aligner therapy using the globally recognized Invisalign® system. Utilizing high-resolution iTero Element® 3D intraoral optical scanners, we eliminate uncomfortable silicone putty impressions. Dr. Aanya Mehta crafts a bespoke ClinCheck® 3D treatment plan calculating exact micro-movements for each tooth, ensuring predictable alignment, optimal airway posture, and harmonious smile curves.",
      overview: "Lumière Dental Studio provides comprehensive clear aligner therapy using the globally recognized Invisalign® system. Utilizing high-resolution iTero Element® 3D intraoral optical scanners, we eliminate uncomfortable silicone putty impressions.",
      duration: "6–14 months (case dependent)",
      recoveryTime: "Zero downtime (daily wear 20–22 hours)",
      anesthesia: "None required",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Digital orthodontic consultation reviewing 3D clear aligner digital treatment trajectory",
      idealFor: [
        "Crowded, rotated, or overlapping front teeth",
        "Spacing and unwanted gaps between teeth",
        "Overbites, underbites, and crossbites in adults",
        "Orthodontic relapse after teenage braces"
      ],
      candidacy: {
        idealFor: [
          "Adults seeking discreet alignment without metal brackets",
          "Patients disciplined to wear removable trays 20–22 hours daily",
          "Individuals with mild to moderate malocclusions"
        ],
        contraindications: [
          "Severe complex skeletal discrepancies requiring orthognathic surgery",
          "Non-compliant patients unable to commit to daily wear requirements"
        ]
      },
      procedureSteps: [
        {
          step: 1,
          stepNumber: 1,
          title: "iTero 3D Optical Scan & ClinCheck Simulation",
          description: "High-speed intraoral scanning captures 6,000 optical frames per second, generating an instant 3D model of your dentition and a simulated outcome roadmap.",
          clinicalDetail: "Predictive digital software calculates precise tooth movements down to hundredths of a millimeter."
        },
        {
          step: 2,
          stepNumber: 2,
          title: "SmartTrack® Aligner Precision Fabrication",
          description: "A sequence of custom-milled medical-grade aligners is laser-trimmed to your exact gingival margin for superior comfort.",
          clinicalDetail: "Multi-layer polyurethane material delivers constant, gentle orthodontic forces."
        },
        {
          step: 3,
          stepNumber: 3,
          title: "SmartForce® Micro-Attachment Placement",
          description: "Tiny, tooth-coloured aesthetic composite attachments are bonded to designated teeth to serve as gentle directional anchors.",
          clinicalDetail: "Aesthetic attachments match natural enamel shade, remaining invisible during conversation."
        },
        {
          step: 4,
          stepNumber: 4,
          title: "Bi-Weekly Progression & Vivera® Retention",
          description: "Patients advance to a new aligner tray every 7 to 14 days, culminating in custom Vivera retainers to protect alignment permanently.",
          clinicalDetail: "Retention maintains bone density and stabilizes periodontal ligaments against relapse."
        }
      ],
      benefits: {
        clinical: [
          "Significantly lower risk of enamel decalcification compared to brackets",
          "Removable design allows effortless, unhindered flossing and brushing",
          "Zero emergency appointments for broken wires or loose brackets"
        ],
        aesthetic: [
          "Virtually invisible in meetings, social settings, and photography",
          "Zero dietary restrictions — enjoy all your favorite foods",
          "Smooth comfortable plastic with zero cheek or lip irritation"
        ]
      },
      recoveryAndAftercare: {
        downtime: "Zero downtime; clear speech adaptation in 24–48 hours",
        sensoryPhase: "Mild pressure sensation for 24 hours when starting each new tray",
        protocols: [
          "Wear aligners 20–22 hours daily, removing only to eat and drink hot liquids",
          "Clean trays daily with lukewarm water and soft toothbrush",
          "Store aligners in protective case when not in mouth"
        ]
      },
      faqs: [
        {
          question: "How many hours per day must I wear my aligners?",
          answer: "Aligners must be worn for 20 to 22 hours per day. You only remove them when eating meals, drinking hot beverages, and completing your daily morning and evening oral hygiene routines."
        },
        {
          question: "How long does the entire treatment take?",
          answer: "Mild alignment corrections typically finish within 6 to 9 months, while comprehensive multi-stage alignment plans average 10 to 14 months depending on individual biology."
        },
        {
          question: "Will wearing aligners cause a speech lisp during meetings?",
          answer: "Most patients notice a minor adaptation for the first 24 to 48 hours as the tongue adjusts to the smooth plastic. Within two days, speech is completely natural and clear."
        }
      ]
    },
    {
      id: "treatment-4",
      slug: "single-visit-root-canal",
      title: "Micro-Endodontics & Single-Visit Root Canal",
      name: "Micro-Endodontics & Single-Visit Root Canal",
      category: "Restorative",
      tagline: "Painless Pulp Therapy Under High-Magnification Surgical Optics",
      shortDescription: "Gentle, microscope-guided therapy that cleanses infected root canals in a single tranquil visit, relieving acute pain and permanently preserving your natural tooth.",
      shortSummary: "Gentle, microscope-guided therapy that cleanses infected root canals in a single tranquil visit, relieving acute pain and permanently preserving your natural tooth.",
      fullDescription: "Modern endodontics has completely eliminated the outdated stigma of painful root canals. At Lumière Dental Studio, our endodontic therapy is executed under high-magnification surgical operating microscopes (Zeiss optics), illuminating anatomical intricacies and accessory canals invisible to the naked eye. Utilizing motorized nickel-titanium (NiTi) rotary files and ultrasonic irrigation protocols, we thoroughly debride infected pulp tissue and hermetically seal the canal system in a single, relaxed 60-to-90 minute appointment.",
      overview: "At Lumière Dental Studio, our endodontic therapy is executed under high-magnification surgical operating microscopes (Zeiss optics), illuminating anatomical intricacies and accessory canals invisible to the naked eye.",
      duration: "Single 60–90 minute session",
      recoveryTime: "24–48 hours mild ligament tenderness",
      anesthesia: "Computer-controlled profound local anesthesia",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      heroImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Precision micro-endodontic treatment setup with advanced diagnostic instruments",
      idealFor: [
        "Acute throbbing toothache or persistent pressure sensitivity",
        "Prolonged sensitivity to hot and cold liquids",
        "Deep dental decay nearing or compromising the nerve chamber",
        "Traumatic impact causing tooth fracture or pulp necrosis"
      ],
      candidacy: {
        idealFor: [
          "Teeth with reversible or irreversible pulpitis",
          "Teeth with periapical abscess requiring non-surgical disinfection",
          "Structurally restorable teeth requiring internal preservation"
        ],
        contraindications: [
          "Vertical root fractures extending beneath alveolar bone crest",
          "Unrestorable teeth with non-negotiable crown-to-root ratios"
        ]
      },
      procedureSteps: [
        {
          step: 1,
          stepNumber: 1,
          title: "Microscopic Diagnosis & 3D Anatomy Mapping",
          description: "High-magnification surgical optics and digital periapical sensors confirm canal anatomy and apical boundaries.",
          clinicalDetail: "Zeiss dental operating microscope provides up to 25x magnification with coaxial xenon illumination."
        },
        {
          step: 2,
          stepNumber: 2,
          title: "Computer-Controlled Painless Anaesthesia",
          description: "Profound local anaesthetic delivery ensures the pulp chamber is completely numb before treatment begins.",
          clinicalDetail: "Computerized micro-delivery achieves target receptor blockade without uncomfortable tissue stinging."
        },
        {
          step: 3,
          stepNumber: 3,
          title: "Rotary NiTi Instrumentation & Ultrasonic Irrigation",
          description: "Flexible nickel-titanium files and continuous ultrasonic fluid irrigation flush out bacteria and necrotic pulp tissue.",
          clinicalDetail: "Acoustic micro-streaming cleans accessory lateral canals and isthmuses inaccessible to manual tools."
        },
        {
          step: 4,
          stepNumber: 4,
          title: "3D Bioceramic Hermetic Seal & Crown Restoration",
          description: "Canals are sealed using warm gutta-percha and biocompatible ceramic sealer, followed by a core build-up and ceramic crown.",
          clinicalDetail: "Bioceramics stimulate hydroxyapatite precipitation, permanently preventing bacterial microleakage."
        }
      ],
      benefits: {
        clinical: [
          "100% biological preservation of your natural tooth and root ligament",
          "Halts bacterial infection from entering deep jawbone spaces",
          "Single-visit completion eliminates inter-appointment bacterial exposure"
        ],
        aesthetic: [
          "Tooth is restored with lifelike, natural shade matching",
          "Preserves original chewing proprioception and bite sensation",
          "Avoids invasive surgical extraction and socket bone loss"
        ]
      },
      recoveryAndAftercare: {
        downtime: "Immediate return to work; local numbness subsides in 2–3 hours",
        sensoryPhase: "Mild ligament tenderness when biting for 48–72 hours",
        protocols: [
          "Avoid chewing hard foods on treated tooth until final crown placement",
          "Standard mild over-the-counter anti-inflammatories if needed",
          "Maintain regular brushing and flossing routine"
        ]
      },
      faqs: [
        {
          question: "Is a root canal actually painful?",
          answer: "No. With contemporary computer-controlled local anaesthesia and gentle micro-endodontic rotary systems, the procedure is as comfortable and calm as receiving a routine dental filling."
        },
        {
          question: "Can a root canal really be completed in one visit?",
          answer: "Yes. In over 90% of cases, single-visit micro-endodontics yields superior clinical outcomes by cleaning, shaping, and hermetically sealing the canal in one sterile session without risk of inter-appointment leakage."
        },
        {
          question: "Why is a protective crown necessary after a root canal?",
          answer: "A root-canal-treated tooth loses vital pulp circulation and can become brittle under heavy biting forces over time. A precision ceramic crown shields and reinforces the remaining tooth against accidental fracture."
        }
      ]
    },
    {
      id: "treatment-5",
      slug: "laser-teeth-whitening",
      title: "In-Clinic Laser Teeth Whitening & Enamel Brightening",
      name: "In-Clinic Laser Teeth Whitening & Enamel Brightening",
      category: "Cosmetic",
      tagline: "Immediate 6 to 8 Shade Brightening with Zero Sensitivity Protocols",
      shortDescription: "Advanced laser-activated photo-oxidation treatment that safely dissolves deep enamel pigmentation in 45 minutes, delivering a radiant, naturally luminous smile.",
      shortSummary: "Advanced laser-activated photo-oxidation treatment that safely dissolves deep enamel pigmentation in 45 minutes, delivering a radiant, naturally luminous smile.",
      fullDescription: "Daily consumption of espresso, tea, rich Indian spices (turmeric), and red wine inevitably deposits chromogenic stains into enamel micro-pores. Lumière Dental Studio offers medical-grade in-clinic laser teeth whitening. Unlike generic over-the-counter strips or abrasive charcoal powders that damage enamel, our protocol utilizes concentrated hydrogen peroxide gel activated by a specific wavelength cold laser. Combined with pre-treatment desensitizing remineralization pastes, this breaks down organic stain molecules while protecting the dental pulp and preserving surface micro-hardness.",
      overview: "Daily consumption of espresso, tea, rich Indian spices (turmeric), and red wine inevitably deposits chromogenic stains into enamel micro-pores. Lumière Dental Studio offers medical-grade in-clinic laser teeth whitening.",
      duration: "Single 45-minute clinical appointment",
      recoveryTime: "Zero downtime (48-hour 'White Diet')",
      anesthesia: "None required (protective gingival barrier applied)",
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80",
      heroImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Patient smiling during in-clinic laser teeth whitening and enamel brightening consultation",
      idealFor: [
        "Teeth stained by coffee, tea, red wine, or dietary spices",
        "Upcoming weddings, major career presentations, or media appearances",
        "Age-related yellowing of natural enamel",
        "Patients seeking rapid, predictable cosmetic rejuvenation"
      ],
      candidacy: {
        idealFor: [
          "Adults with extrinsic enamel staining",
          "Patients with sound tooth enamel and healthy gums",
          "Individuals desiring noticeable shade improvement in under an hour"
        ],
        contraindications: [
          "Pregnant or lactating mothers",
          "Untreated severe enamel erosion or open carious lesions",
          "Patients expecting existing ceramic crowns or veneers to change shade"
        ]
      },
      procedureSteps: [
        {
          step: 1,
          stepNumber: 1,
          title: "Pre-Whitening Enamel Shade Evaluation",
          description: "Standardized 5500K daylight photographic assessment documents your baseline tooth shade against a calibrated clinical guide.",
          clinicalDetail: "Digital spectrophotometer reading records baseline CIE L*a*b* values for accurate post-treatment delta-E comparison."
        },
        {
          step: 2,
          stepNumber: 2,
          title: "Gingival Barrier & Soft-Tissue Shielding",
          description: "A liquid resin barrier is cured along the gum line to protect delicate soft tissues from active whitening agents.",
          clinicalDetail: "Polymerized resin creates an impenetrable boundary, eliminating risk of gingival blanching."
        },
        {
          step: 3,
          stepNumber: 3,
          title: "Laser-Activated Photo-Oxidation Cycles",
          description: "Medical-grade whitening gel is applied in three 15-minute cycles, activated by specific cold laser wavelengths to dissolve deep stains.",
          clinicalDetail: "Laser photons break long conjugated double bonds in organic chromophores without thermal pulp elevation."
        },
        {
          step: 4,
          stepNumber: 4,
          title: "Enamel Remineralization & Fluoride Infusion",
          description: "An amorphous calcium phosphate (ACP) and fluoride complex is applied to close enamel tubules, ensuring comfort.",
          clinicalDetail: "Re-precipitates mineral ions into enamel prisms, preventing post-treatment hydraulic sensitivity."
        }
      ],
      benefits: {
        clinical: [
          "Controlled medical-grade chemistry preserves enamel micro-hardness",
          "Pre- and post-desensitization protocols eliminate sharp post-bleach zingers",
          "Conducted safely under licensed clinical supervision"
        ],
        aesthetic: [
          "Lifts natural enamel shade by 6 to 8 shades in a single 45-minute visit",
          "Even, radiant brightening across the entire aesthetic smile zone",
          "Custom touch-up trays provided for long-term at-home maintenance"
        ]
      },
      recoveryAndAftercare: {
        downtime: "Zero downtime — immediate return to meetings and daily routine",
        sensoryPhase: "Negligible sensitivity thanks to our remineralization protocol",
        protocols: [
          "Adhere to the 'White Diet' for 48 hours (avoid coffee, turmeric, red wine, colas)",
          "Use non-abrasive sensitivity toothpaste for 3 days",
          "Use supplied custom home touch-up trays as directed"
        ]
      },
      faqs: [
        {
          question: "Does laser teeth whitening damage or thin out my enamel?",
          answer: "Absolutely not. In-clinic laser whitening uses photo-oxidation to selectively break down organic pigment molecules trapped within enamel micropores. The crystalline mineral structure of the tooth remains completely intact and undamaged."
        },
        {
          question: "Will I experience painful zingers or cold sensitivity afterwards?",
          answer: "Our clinic applies a proprietary calcium-phosphate remineralization paste both before and immediately after the laser cycles. This seals open dentinal tubules and reduces post-treatment sensitivity to near zero."
        },
        {
          question: "How long will my teeth whitening results last?",
          answer: "Results typically remain radiant for 12 to 24 months, depending on lifestyle factors such as coffee, tea, and spice consumption. Your included take-home maintenance kit allows you to refresh your shade effortlessly whenever desired."
        }
      ]
    },
    {
      id: "treatment-6",
      slug: "preventive-periodontics",
      title: "Preventive Periodontics & Laser Gum Contouring",
      name: "Preventive Periodontics & Laser Gum Contouring",
      category: "Preventive",
      tagline: "Harmonious Gingival Architecture & Deep Sub-Gingival Detoxification",
      shortDescription: "Gentle diode laser gum recontouring for 'gummy smiles' combined with ultrasonic periodontal therapy to protect your teeth's supporting bone foundation.",
      shortSummary: "Gentle diode laser gum recontouring for 'gummy smiles' combined with ultrasonic periodontal therapy to protect your teeth's supporting bone foundation.",
      fullDescription: "A dazzling smile depends as much on the healthy pink frame of gingiva as it does on the teeth themselves. Aesthetic periodontics at Lumière Dental Studio addresses both biological wellness and cosmetic gum architecture. For patients troubled by excessive gum display ('gummy smile') or uneven gingival margins, our precision soft-tissue diode laser sculpts symmetrical gum contours with pinpoint accuracy and immediate coagulation. For preventive periodontal health, our painless ultrasonic piezo-scalers and guided biofilm therapy thoroughly eliminate deep sub-gingival calculus, reversing gingivitis and safeguarding alveolar bone.",
      overview: "A dazzling smile depends as much on the healthy pink frame of gingiva as it does on the teeth themselves. Aesthetic periodontics at Lumière Dental Studio addresses both biological wellness and cosmetic gum architecture.",
      duration: "45–60 minutes",
      recoveryTime: "24–48 hours mild healing",
      anesthesia: "Topical anesthetic gel + localized micro-infiltration",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
      heroImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
      thumbnailImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Healthy gum architecture and aesthetic periodontic care examination",
      idealFor: [
        "Excessive gum display ('gummy smile') when smiling",
        "Uneven or asymmetrical gum line across front teeth",
        "Bleeding or swollen gums during routine brushing",
        "Halitosis (persistent bad breath) or tartar accumulation"
      ],
      candidacy: {
        idealFor: [
          "Individuals desiring longer, more symmetrical tooth appearance",
          "Patients with gingivitis or mild to moderate periodontitis",
          "Anyone seeking thorough, gentle subgingival plaque detoxification"
        ],
        contraindications: [
          "Acute systemic necrotizing ulcerative periodontal disease",
          "Uncontrolled bone metabolic disorders"
        ]
      },
      procedureSteps: [
        {
          step: 1,
          stepNumber: 1,
          title: "Periodontal Charting & Proportion Analysis",
          description: "Digital evaluation of tooth-to-gum zenith proportions and 6-point microscopic periodontal pocket depth measurements.",
          clinicalDetail: "Proportion analysis confirms whether biological width can accommodate laser recontouring without osseous resection."
        },
        {
          step: 2,
          stepNumber: 2,
          title: "Piezoelectric Ultrasonic Debridement",
          description: "Gentle high-frequency micro-vibrations dissolve hardened calculus and plaque without scratching root cementum.",
          clinicalDetail: "Guided biofilm therapy uses fine erythritol powder to dislodge pathogenic bacterial matrices painlessly."
        },
        {
          step: 3,
          stepNumber: 3,
          title: "Diode Laser Gingival Sculpting",
          description: "A focused soft-tissue diode laser gently sculpts excess gum tissue, sealing micro-vessels instantaneously with zero bleeding or sutures.",
          clinicalDetail: "980nm wavelength specifically vaporizes hyperplastic tissue while sterilizing the operative margin."
        },
        {
          step: 4,
          stepNumber: 4,
          title: "Therapeutic Subgingival Irrigation",
          description: "Pockets are flushed with soothing antimicrobial solutions to encourage rapid cellular reattachment and tissue tone recovery.",
          clinicalDetail: "Ozone and chlorhexidine irrigation accelerates fibroblast migration and collagen formation."
        }
      ],
      benefits: {
        clinical: [
          "Eradicates pathogenic sub-gingival bacteria and arrests bone resorption",
          "Laser energy sterilizes gingival sulcus, accelerating natural healing",
          "Painless ultrasonic cleaning protects delicate tooth root surfaces"
        ],
        aesthetic: [
          "Instantly reveals longer, graceful teeth by balancing excessive gum display",
          "Restores healthy coral-pink stippled gingival appearance",
          "Balances smile symmetry across all anterior aesthetic teeth"
        ]
      },
      recoveryAndAftercare: {
        downtime: "Zero downtime — no scalpels, incisions, or sutures required",
        sensoryPhase: "Minor sensation akin to a warm soup sip for 24 hours",
        protocols: [
          "Warm salt water rinses 2–3 times daily for 3 days",
          "Use ultra-soft surgical toothbrush near contoured areas",
          "Avoid spicy, highly acidic, or crunchy foods for 48 hours",
          "Attend routine periodontal maintenance every 6 months"
        ]
      },
      faqs: [
        {
          question: "Does diode laser gum contouring hurt during or after the visit?",
          answer: "The procedure is completely comfortable under topical and light local anaesthetic. Because the laser seals nerve endings and tiny blood vessels instantly, there is zero bleeding and post-operative sensation is minor, feeling like a slight warm beverage burn."
        },
        {
          question: "Will my gums grow back after laser recontouring?",
          answer: "When performed by a qualified specialist respecting your biological width (the natural bone and tissue junction), laser gum contouring results are stable and permanent."
        },
        {
          question: "How frequently should I undergo deep periodontal maintenance?",
          answer: "For optimal preventive oral health and fresh breath, we recommend a clinical periodontal hygiene and biofilm detox session every 6 months (or every 3 to 4 months for patients managing chronic periodontitis)."
        }
      ]
    }
  ],
  galleryCategories: ["all", "clinic", "technology", "smiles"],
  galleryItems: [
    {
      id: "gal-1",
      title: "Boutique Reception & Patient Welcome Lounge",
      category: "clinic",
      imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
      alt: "Boutique waiting lounge with tranquil aesthetic design, plush seating, and warm acoustic lighting at Lumière Dental Studio Bandra West",
      caption: "Tranquil, hotel-inspired reception lounge designed to eliminate clinical anxiety",
      aspectRatio: "16/9"
    },
    {
      id: "gal-2",
      title: "Private Operatory Suite with Natural Sunlight",
      category: "clinic",
      imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern luxury dental operatory suite with ergonomic treatment chair and digital diagnostic monitors at Lumière Dental Studio",
      caption: "Ergonomic treatment suite with ceiling entertainment screens and noise-cancelling amenities",
      aspectRatio: "16/9"
    },
    {
      id: "gal-3",
      title: "Class-B Autoclave & 7-Stage Sterilization Bay",
      category: "technology",
      imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      alt: "Hospital-grade Class-B autoclave sterilization protocol maintaining 7-stage sterile chain",
      caption: "Hospital-grade sterilization bay adhering strictly to international CDC and DCI hygiene standards",
      aspectRatio: "16/9"
    },
    {
      id: "gal-4",
      title: "3D Digital Intraoral Optical Scanner Suite",
      category: "technology",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      alt: "High-resolution 3D digital intraoral scanner generating optical impressions without physical trays",
      caption: "High-speed optical scanning replacing messy physical impression trays with instant 3D accuracy",
      aspectRatio: "16/9"
    },
    {
      id: "gal-5",
      title: "Radiant Porcelain Veneer Smile Transformation",
      category: "smiles",
      imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
      alt: "Radiant, natural smile makeover highlighting porcelain veneer translucency and symmetrical smile arc",
      caption: "Natural smile rejuvenation utilizing hand-layered feldspathic porcelain laminates",
      aspectRatio: "16/9"
    },
    {
      id: "gal-6",
      title: "Architectural Clinic Entrance & Corridor",
      category: "clinic",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      alt: "Architecturally designed clinic entrance and reception corridor in Bandra West Mumbai",
      caption: "Architectural foyer on Turner Road, Bandra West, greeting patients with warmth and serenity",
      aspectRatio: "16/9"
    }
  ]
};

// Helper function to resolve treatments by slug with full backwards compatibility
export function getTreatmentBySlug(slug: string): TreatmentItem | undefined {
  const cleanSlug = slug.toLowerCase().trim();
  return clinicConfig.treatments.find(t => 
    t.slug.toLowerCase() === cleanSlug ||
    t.slug.toLowerCase().replace(/-/g, '') === cleanSlug.replace(/-/g, '') ||
    // handle potential variations like porcelain-veneers-smile-makeovers
    (cleanSlug.includes('veneers') && t.slug.includes('veneers')) ||
    (cleanSlug.includes('implant') && t.slug.includes('implant')) ||
    (cleanSlug.includes('aligner') && t.slug.includes('aligner')) ||
    (cleanSlug.includes('root-canal') && t.slug.includes('root-canal')) ||
    (cleanSlug.includes('whitening') && t.slug.includes('whitening')) ||
    (cleanSlug.includes('periodontic') && t.slug.includes('periodontic'))
  );
}
