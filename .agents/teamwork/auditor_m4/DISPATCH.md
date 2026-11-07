# Dispatch Assignment: Forensic Auditor (Milestone 4 — Secondary Pages & Dynamic Routes)

## Mission
Conduct an independent forensic integrity audit of Milestone 4 deliverables:
- `src/components/ui/ContactForm.tsx`
- `src/app/about/page.tsx`
- `src/app/treatments/page.tsx`
- `src/app/treatments/[slug]/page.tsx`
- `src/app/doctor/page.tsx`
- `src/app/gallery/page.tsx`
- `src/app/contact/page.tsx`

## Mandatory Checks
1. Anti-deception:
   - Check for fake patient reviews, fake star ratings, fabricated medical degrees or certifications, and fake confirmed bookings. All must be strictly ZERO.
2. Demonstration notice surfacing:
   - Verify prominent demo disclaimer on `DoctorProfile` / `doctor/page.tsx` (`clinicConfig.demoDisclaimers.doctorNotice`).
   - Verify demonstration modal in `ContactForm.tsx` explaining request was validated without fake booking.
   - Verify demo notice strips on page footers / bottoms.
3. Code hygiene & secrets:
   - Zero secrets or API keys in `src/`.
   - Zero source/tests placed in `.agents/teamwork/`.
   - Zero `AGENTS.md` or `GEMINI.md` files.
4. Independent behavioral verification:
   - `npx tsc --noEmit` -> 0 errors.
   - `npm run lint` -> 0 warnings/errors.
   - Clean Next.js build: `if (Test-Path .next) { Remove-Item -Recurse -Force .next }; npm run build` -> all 17 static pages generated.
   - `node tests/e2e/run-tests.mjs` -> all 26 assertions pass 100%.

Write your full 5-component report in `handoff.md` in your state folder with an explicit Verdict (CLEAN or INTEGRITY VIOLATION), and notify the orchestrator via send_message.


## 2026-11-07T16:48:35Z
You are the Forensic Auditor for Milestone 4 (Secondary Pages & Dynamic Routes).
Working directory: c:\Users\Admin\Desktop\all project\dentel website next.js
Your state folder: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\auditor_m4\
Dispatch instructions: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\auditor_m4\DISPATCH.md
Original user request: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\ORIGINAL_REQUEST.md
Project blueprint: c:\Users\Admin\Desktop\all project\dentel website next.js\PROJECT.md
Worker M4 handoff report: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\worker_m4\handoff.md

Conduct an independent forensic integrity audit of Milestone 4 deliverables. Verify Demo Mode compliance: zero fake reviews, zero fake star ratings, zero fake awards, zero fake confirmed bookings; verify prominent demo notices on DoctorProfile, ContactForm, and page bottoms; verify code hygiene (no secrets, no code/tests in .agents/teamwork/, no AGENTS.md / GEMINI.md); independently run verification commands (`npx tsc --noEmit`, `npm run lint`, clean `npm run build`, `node tests/e2e/run-tests.mjs`). Write handoff.md with an explicit Verdict (CLEAN or INTEGRITY VIOLATION) and notify the orchestrator via send_message.
