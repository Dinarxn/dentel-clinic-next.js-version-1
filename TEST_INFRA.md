# Test Infrastructure Specification — Lumière Dental Studio E2E Suite

## 1. Test Philosophy: Opaque-Box & Requirement-Driven

The Lumière Dental Studio End-to-End (E2E) Test Suite is architected according to **opaque-box, requirement-driven principles**. 

- **Requirement-Driven**: Tests are derived directly from the authoritative specifications in `ORIGINAL_REQUEST.md` and architectural contracts in `PROJECT.md`. Tests verify what the system *must do* from a patient and dental practice perspective, rather than how internal functions are implemented.
- **Opaque-Box Independence**: The test suite does not couple itself to internal private implementation details or framework-specific internals. It evaluates observable artifacts: route endpoints, file structure contracts, CSS theme token registrations, exported configuration schemas, navigation links (`tel:`, `https://wa.me/`), form validation boundary behaviors, mobile collision padding (`pb-24`), and demonstration integrity disclaimers.
- **Progressive Testability**: Tests are stratified into executable tiers. As milestones progress (from M1 Foundation to M2 Navigation, M3 Content, M4 Secondary Pages, and M5 Quality Pass), the test runner progressively evaluates implemented features and provides precise, actionable feedback on completed dependencies.

---

## 2. Feature Inventory & Test Tier Mapping

The following matrix enumerates every core project feature and maps its verification across the four test tiers:
- **Tier 1 (Feature Coverage)**: Verification of existence, structure, contracts, and core happy paths.
- **Tier 2 (Boundary & Corner Cases)**: Viewport thresholds, invalid inputs, edge cases, error boundaries, and ethical content shields.
- **Tier 3 (Cross-Feature Combinations)**: Multi-page data consistency, dynamic rebrand reflection, and mobile navigation state transitions.
- **Tier 4 (Real-World Scenarios)**: Multi-step end-to-end patient journeys from discovery to lead capture.

| # | Feature Name | Category | Tier 1 (Features) | Tier 2 (Boundaries) | Tier 3 (Cross-Feature) | Tier 4 (Scenarios) | Total Tests | Milestone |
|---|--------------|----------|-------------------|---------------------|------------------------|--------------------|-------------|-----------|
| 1 | Toolchain & App Router Scaffold | Core Platform | 3 | 1 | 1 | 0 | 5 | M1 |
| 2 | Tailwind CSS v4 60/30/10 Color Tokens | Visual System | 4 | 2 | 1 | 0 | 7 | M1 |
| 3 | Centralized Clinic Configuration | Rebranding Engine | 5 | 2 | 2 | 0 | 9 | M1 |
| 4 | SEO Metadata, Sitemap & Robots | Discovery / SEO | 4 | 1 | 1 | 0 | 6 | M1 |
| 5 | Premium Sticky Navbar & Banner | Navigation | 3 | 2 | 1 | 1 | 7 | M2 |
| 6 | Mobile Navigation Drawer | Mobile UX | 3 | 2 | 2 | 1 | 8 | M2 |
| 7 | Fixed Mobile Bottom Action Bar | Mobile UX | 3 | 2 | 1 | 2 | 8 | M2 |
| 8 | Floating WhatsApp Concierge | Conversion Hub | 2 | 1 | 1 | 1 | 5 | M2 |
| 9 | Luxury Deep Navy Footer | Navigation & Trust | 3 | 1 | 1 | 0 | 5 | M2 |
| 10 | Reusable Section Heading | UI Components | 2 | 1 | 0 | 0 | 3 | M2 |
| 11 | Editorial Hero Section | Home Experience | 3 | 1 | 1 | 1 | 6 | M3 |
| 12 | Trust Introduction (3 Pillars) | Trust & Narrative | 2 | 1 | 0 | 0 | 3 | M3 |
| 13 | Reusable Treatment Card | UI Components | 3 | 1 | 2 | 1 | 7 | M3 |
| 14 | Treatments Preview (6 Items) | Home Experience | 3 | 1 | 2 | 1 | 7 | M3 |
| 15 | Why Choose Us (Navy Contrast) | Clinical Trust | 2 | 1 | 0 | 0 | 3 | M3 |
| 16 | Doctor Profile Spotlight | Doctor Branding | 3 | 1 | 2 | 1 | 7 | M3 |
| 17 | Clinic Gallery Preview | Media Showcase | 2 | 1 | 1 | 0 | 4 | M3 |
| 18 | Appointment CTA Banner | Conversion | 3 | 1 | 1 | 1 | 6 | M3 |
| 19 | Location & Visiting Info | Local Healthcare | 3 | 1 | 1 | 1 | 6 | M3 |
| 20 | Complete 10-Section Home Page | Master Landing | 5 | 2 | 2 | 1 | 10 | M3 |
| 21 | About Us Page (`/about`) | Narrative Route | 3 | 1 | 1 | 0 | 5 | M4 |
| 22 | Treatments Catalog (`/treatments`) | Service Directory | 3 | 1 | 2 | 1 | 7 | M4 |
| 23 | Dynamic Treatment Details (`/treatments/[slug]`) | Dynamic Routing | 4 | 3 | 2 | 2 | 11 | M4 |
| 24 | Our Doctor Page (`/doctor`) | Doctor Authority | 3 | 2 | 2 | 0 | 7 | M4 |
| 25 | Gallery Page (`/gallery`) | Visual Proof | 3 | 1 | 1 | 0 | 5 | M4 |
| 26 | Contact Us Page (`/contact`) | Inquiries & Maps | 4 | 2 | 2 | 1 | 9 | M4 |
| 27 | Appointment Inquiry Form & Validation | Form Validation | 5 | 5 | 2 | 2 | 14 | M4 |
| 28 | Direct `tel:` & WhatsApp Prefilled Links | Contact Actions | 4 | 3 | 2 | 2 | 11 | M4 |
| 29 | Demonstration Disclaimers & Ethical Content | Integrity Shield | 4 | 4 | 2 | 2 | 12 | M1-M4 |
| 30 | Quality Gates & Build Hardening | Production Ready | 4 | 2 | 2 | 1 | 9 | M5 |
| **Totals** | **Comprehensive E2E Test Suite** | — | **95** | **49** | **37** | **22** | **203** | **Tiers 1-4** |

---

## 3. Test Architecture & Runner Specification

### 3.1 Runner Engine
- **Engine**: Native Node.js test runner with zero third-party testing dependencies, ensuring 100% portability and instant startup.
- **Location**: `tests/e2e/run-tests.mjs`
- **Execution Command**: 
  ```bash
  node tests/e2e/run-tests.mjs
  ```
  Or via npm scripts:
  ```bash
  npm test
  ```
- **CLI Flags**:
  - `--tier=1` (or 2, 3, 4) — run only specific test tier.
  - `--milestone=m1` (or m2, m3, m4, m5) — run tests relevant to a specific milestone.
  - `--verbose` — display granular assertion traces.
  - `--json` — output results as machine-readable JSON to `tests/e2e/reports/e2e-report.json`.

### 3.2 Pass / Fail Semantics
- **Zero Tolerance Exit Codes**:
  - `0` (Success): All assertions pass; all required contracts, routes, and edge cases verified.
  - `1` (Failure): One or more assertions fail. Complete error backtrace, failed assertion expression, and file location are logged to `stderr`.
- **Structured Reporting**:
  - Rich ANSI color-coded terminal output summarizing:
    * Total test suites executed.
    * Assertions passed, failed, and skipped.
    * Execution duration in milliseconds.
    * Milestone breakdown.
  - Generates `tests/e2e/reports/e2e-report.json` containing timestamp, environment, summary metrics, and test-by-test breakdown.

---

## 4. Directory Layout

```text
tests/
└── e2e/
    ├── run-tests.mjs               # Master test runner CLI & reporter
    ├── runner.mjs                  # Assertion library, test harness & reporters
    ├── tier1-features.test.mjs     # Tier 1: Feature & contract coverage
    ├── tier2-boundaries.test.mjs   # Tier 2: Boundary, viewport & validation edge cases
    ├── tier3-combinations.test.mjs # Tier 3: Cross-feature & state transition flows
    ├── tier4-scenarios.test.mjs    # Tier 4: End-to-end real-world patient journeys
    ├── fixtures/
    │   ├── clinic-config.mock.mjs  # Valid/Invalid clinic configurations for rebrand testing
    │   └── inquiry-payloads.mjs    # Valid and adversarial form inputs
    ├── reports/
    │   └── e2e-report.json         # Automated execution output artifact
    └── utils/
        ├── validators.mjs          # Reference validators (Indian phone, date, whatsapp URL)
        └── static-ast.mjs          # Opaque-box file & route contract inspectors
```

---

## 5. Real-World Application Scenarios (Tier 4)

### Scenario 1: End-to-End Patient Inquiry Journey (Cosmetic Smile Makeover)
1. **Discovery**: Patient arrives on Home Page (`/`), observes Warm Ivory luxury design and Trust Introduction.
2. **Catalog Browsing**: Patient views Featured Treatments, clicks on **Porcelain Veneers & Bespoke Smile Makeovers**.
3. **Deep Dive**: Patient navigates to dynamic route `/treatments/porcelain-veneers-smile-makeovers`. The page displays procedural timeline (2 visits, 7-10 days), anesthesia details, and candidacy checklist.
4. **Action Initiation**: Patient clicks "Book Consultation" linking directly to `/contact#appointment` with the treatment pre-selected.
5. **Contact Submission**: Patient inputs Full Name ("Priya Sharma"), 10-digit Indian Mobile ("9820123456"), preferred date (tomorrow), and custom inquiry note.
6. **Demo Verification Feedback**: On submission, client-side validation executes. Because no backend CRM is attached, the system pops open the **Demonstration Notice Modal** explaining successful validation without presenting a deceptive "Booking Confirmed" message.

### Scenario 2: Direct Mobile Emergency Contact Journey
1. **Emergency Need**: Mobile patient experiencing acute dental pain visits the website on an iPhone (390px viewport).
2. **Persistent Accessibility**: The Fixed Mobile Bottom Action Bar is anchored at the bottom with three distinct touch targets: "Call Clinic", "WhatsApp", and "Book Now".
3. **Padding Clearance**: The container applies `pb-24` ensuring zero content clipping.
4. **1-Tap Direct Call**: Patient taps "Call Clinic", triggering the native operating system dialer via `tel:+919820012345`.

### Scenario 3: WhatsApp Concierge Lead Capture Journey
1. **Concierge Preference**: Patient prefers instant messaging over phone calls or forms.
2. **Trigger Engagement**: Patient clicks the Floating WhatsApp Concierge or Navbar WhatsApp button.
3. **Universal Link Launch**: Link opens `https://wa.me/919820012345?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20dental%20appointment`.
4. **Instant Context**: Pre-filled message allows the dental receptionist to immediately know the intent and initiate private booking on WhatsApp.

---

## 6. Coverage Thresholds & Quality Gates

The test suite enforces the following non-negotiable quality gates:

1. **Route Integrity**: 100% of the 7 designated routes (`/`, `/about`, `/treatments`, `/treatments/[slug]`, `/doctor`, `/gallery`, `/contact`) must exist and adhere to App Router conventions.
2. **Home Section Presence**: All 10 mandatory sections must be present on the Home landing page.
3. **Color System Compliance**: The 60/30/10 palette tokens (`#F7F5F0`, `#17324D`, `#C49A59`) must be defined as theme tokens in `src/app/globals.css`.
4. **Indian Mobile Validation**: Regex `/^[6-9]\d{9}$/` must accept valid 10-digit Indian mobile numbers and reject invalid prefixes (0-5), short numbers (<10 digits), long numbers (>10 digits), and non-numeric characters.
5. **Date Picker Min-Date**: Date inputs must reject past dates and enforce `min` date equal to current date.
6. **Dynamic Route Error Handling**: Unknown treatment slugs must trigger Next.js `notFound()`.
7. **Ethical Content Shields**: 
   - 0 fabricated credentials, 0 fake testimonials, 0 fake star reviews.
   - Demonstration notice must be clearly visible across Navbar banner, Footer, Doctor profile, and Appointment form.
