<div align="center">
<img width="1200" height="475" alt="Anesthesia Banner" src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=475&q=80" />

# Anesthesia — AI-Powered Clinical Assistant

*A premium, offline-capable suite of intelligent medical tools and reference apps tailored for MDs and healthcare professionals.*

</div>

## Overview

Anesthesia is a state-of-the-art web application built with Next.js 16, featuring a premium dark-mode glassmorphism design. It serves as a comprehensive clinical assistant, providing medical professionals with AI-driven insights, interactive physical exam guidance, structured clinical guidelines, context-aware calculators, and an up-to-date offline medical reference database.

## Key Features

- 🧠 **AI-Powered Clinical Tools:** Leverages Google Gemini, GROQ, and OpenAI compatible endpoints for advanced symptom analysis, drug interaction checking, and clinical decision support, with responses beautifully rendered in rich markdown.
- 📄 **PDF Report Export:** Download dynamically generated clinical reports (such as symptom checker results or drug interaction charts) directly as formatted PDFs for patient documentation or clinical sharing.
- 🧍 **Interactive Physical Exam Guidelines:** Locate physical exam procedures and guidelines using an interactive, clickable 2D body selector map coupled with AI-driven documentation sync.
- 📋 **Structured Clinical Practice Guidelines (CPGs):** Offline access to comprehensive guidelines structured by specialties (including Psychiatry, Orthopedics, Interventional Radiology). Features direct hyperlinking to clinical PDFs or a smart Google Search query builder fallback.
- 🔄 **Intelligent Clinical Data Sync:** Features an AI-driven pipeline that searches for updated clinical data and enforces strict human-in-the-loop review through side-by-side diffing, ensuring your offline medical reference stays accurate and current.
- 🧮 **Context-Aware Medical Calculators:** Essential calculators (BMI, Creatinine Clearance, Pediatric/Adult dosing) enhanced with clinical context cards that explain limitations and appropriate use cases.
- 🧭 **Clinical Onboarding & FAQ:** Integrated sidebar tutorial and clinical FAQ system for quick onboarding and guidance on application usage.
- ⚡ **Offline-First Architecture:** Critical reference tools (ICD-10 dictionary, drug formulary, calculators) work flawlessly without an internet connection, ensuring reliability in clinical environments like operating rooms.
- 🎨 **Premium UI/UX:** A stunning, responsive dark-mode dashboard featuring glassmorphism elements, modern typography, and smooth stagger-delay list animations with Framer Motion.
- 🌐 **Bilingual Support:** Full support for English and Indonesian (`id`).

## Tech Stack

- **Framework:** Next.js 16 (v16.2.6)
- **UI & Styling:** React 19, Tailwind CSS, Framer Motion, Lucide React, Glassmorphism Aesthetics
- **PDF Generation:** pdfmake, html-to-pdfmake (dynamically imported to optimize bundle sizes)
- **State Management:** Zustand
- **Offline Storage:** Dexie, localForage, idb-keyval
- **AI Integration:** Google Gemini API, GROQ, and OpenAI compatible endpoints

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm or yarn
- GROQ API Key (required for built-in default AI features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Anesthesia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your GROQ API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## License

This project is licensed under the **GNU General Public License v3.0**. See the `LICENSE` file for more details.
