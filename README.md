<div align="center">
<img width="1200" height="475" alt="Anesthesia Banner" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=475&q=80" />

# Anesthesia — Clinical Decision Support & Acute Care Suite

*A modern, 100% offline-first clinical decision support system, crisis pharmacopeia, and reference suite engineered for anesthesiologists, intensivists, and healthcare professionals.*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.3-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.43.0-f43f5e?style=flat)](https://motion.dev/)
[![Offline PWA](https://img.shields.io/badge/PWA-Offline--First-emerald?style=flat)](https://dexie.org/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

</div>

---

## Overview

**Anesthesia** is an open-source, offline-first clinical decision support suite designed for zero-latency execution in high-stakes clinical environments such as operating rooms, intensive care units, and emergency resuscitation bays.

It combines the power of **Vargo Anesthesia**, **ASRA Coags**, **Pedi Crisis**, and **MDCalc** into a unified, high-performance web PWA.

---

## Key Features

### 1. Decoupled Route Architecture
* **Public Landing Page (`/` — Persuade Mode):** Authoritative orientation surface featuring an interactive real-time patient weight slider, instant induction dosing preview (Propofol, Rocuronium, Fentanyl, Sugammadex), and an animated programmatic SVG sinus rhythm monitor.
* **Clinical Command Center (`/dashboard` — Operate Mode):** A distraction-free workspace organized into functional clinical workspaces: *Acute Care & Crisis Protocols*, *Intra-Operative & Critical Calculators*, and *Pre-Operative Assessment & Pharmacology*.

### 2. Emergency OR Crisis Card (`/emergency`)
* Instant weight-calculated rapid push doses with one-tap copy-to-clipboard:
  * **Cardiac Arrest:** Epinephrine ($0.01\text{ mg/kg}$ / $0.1\text{ mg/mL}$ volume calculation), Amiodarone ($300\text{ mg} \to 150\text{ mg}$).
  * **Hemodynamic Instability:** Ephedrine, Phenylephrine, Atropine.
  * **Severe Anaphylaxis:** Epinephrine IM ($0.01\text{ mg/kg}$ up to $0.5\text{ mg}$), Diphenhydramine, Hydrocortisone.
  * **Airway Crisis & Laryngospasm:** Succinylcholine, Sugammadex routine ($2\text{ mg/kg}$) vs immediate rescue ($16\text{ mg/kg}$).
  * **Malignant Hyperthermia (MH):** Dantrolene $2.5\text{ mg/kg}$ bolus with $20\text{ mg}$ vial counter and sterile water reconstitution volume.
  * **LAST (Local Anesthetic Toxicity):** 20% Lipid Emulsion bolus ($1.5\text{ mL/kg}$) and infusion ($0.25\text{ mL/kg/min}$).

### 3. Active Case Session Tray
* Persistent patient parameters (`Weight`, `Height`, `Age`, `Sex`, `ASA Class`, `Mallampati`) stored locally in Zustand and displayed in the header.
* Features tactile weight steppers (`-5kg`, `-1kg`, `+1kg`, `+5kg`) and quick presets (`10kg` to `100kg`).
* Automatically pre-populates all formulas in Medical Calculators and Drug Dosing without re-entering numbers.

### 4. 12-Lead ECG Simulator & Case Quiz
* Calibrated SVG waveform generator simulating 1mm/5mm pink grid paper.
* Interactive pathologies: STEMI, Wellens Syndrome, Brugada Type 1 & 2, Hyperkalemia, Pericarditis, and continuous rhythm strips.
* Integrated clinical case quiz with progressive hint reveals.

### 5. Universal Command Palette (`Cmd + K` / `Ctrl + K`)
* Keyboard-driven instant navigation across all 19 tools, calculators, crisis protocols, guidelines, and diagnostic coding.

### 6. Zero-Latency Offline Engine
* Client-side IndexedDB database powered by Dexie.
* 14,000+ searchable ICD-10 diagnostic codes, structured Clinical Practice Guidelines (CPGs), and drug formularies function seamlessly in Faraday-shielded OR basements without cellular connection.

### 7. Impeccable Motion & Modern Design System
* Complies with the Impeccable design standard (zero AI-slop tells, no decorative gradient text clips, no rainbow neon cards).
* Restrained surgical slate palette (`#080c15` / `#0e1424`) with tabular monospace typography for numerical dosages.
* Hardware-accelerated transitions respecting `useReducedMotion()`.

### 8. Bilingual Support
* Full clinical parity in **English (`en`)** and **Indonesian (`id`)**.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16.4.2 (App Router with Turbopack) |
| **UI & Styling** | React 19.3.1, Tailwind CSS 4.3.3, Lucide React |
| **Motion Engine** | Motion 12.43.0 (hardware-accelerated transforms, layoutId FLIP) |
| **State & Session** | Zustand 5.0.15 (with local storage persistence) |
| **Offline Storage** | Dexie 4.4.6, idb-keyval 6.3.0 |
| **AI Integration** | Google Gemini API, GROQ, OpenAI-compatible endpoints |
| **Reports & Export** | pdfmake, html-to-pdfmake |

---

## Strategic Product Roadmap

Benchmarked against leading tools in anesthesia (**Vargo Anesthesia**, **ASRA Coags**, **Pedi Crisis SPA**, and **MDCalc**):

- [ ] **ASRA Anticoagulation & Regional Block Matrix:** Interactive hold and restart intervals for DOACs, LMWH, Heparin, and Warfarin before spinal/epidural needle insertion or catheter removal.
- [ ] **Vasoactive Syringe Pump Infusion Titrator:** Real-time conversion between $\text{mcg/kg/min}$ and pump $\text{mL/hr}$ for Norepinephrine, Epinephrine, Vasopressin, Nicardipine, and Remifentanil/Propofol TCI.
- [ ] **Pediatric Equipment Sizing & Critical Airway Tray:** Age/weight-derived equipment sizing (cuffed vs uncuffed ETT, insertion depth, blade types, and defib joules).
- [ ] **Perioperative Risk Scores Suite:** Validated clinical calculators for STOP-BANG (OSA), Apfel PONV risk, Revised Cardiac Risk Index (RCRI), and Caprini VTE score.
- [ ] **Voice-Activated Hands-Free Lookups:** PWA voice recognition for sterile and scrubbed operating room environments.

---

## Getting Started

### Prerequisites
* Node.js v20+
* npm or yarn
* Optional: GROQ API Key or Gemini API Key for AI features

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rizqihan/Anesthesia.git
   cd Anesthesia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment (Optional for AI features):**
   Create a `.env.local` file:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.
