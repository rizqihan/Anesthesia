<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Anesthesia

*A comprehensive, offline-capable suite of medical tools and mini-apps tailored for healthcare professionals.*

</div>

## Overview

Anesthesia is a modern web application built with Next.js, providing a collection of medical mini-apps including dosage calculators, drug interaction checkers, and a symptom checker. It is designed to work seamlessly offline and supports both English and Indonesian languages.

## Key Features

- 🧮 **Medical Calculators:** Essential calculators including BMI, Creatinine Clearance, and more (Offline capable).
- 💊 **Interaction Checker:** AI-powered tool to check interactions between multiple drugs.
- 🩺 **Symptom Checker:** AI-powered symptom analysis for clinical decision support.
- 📚 **ICD-10 Search:** Quick, offline dictionary for ICD-10 codes.
- 💉 **Dosage Calculator:** Weight-based pediatric and adult dosing (Offline capable).
- 📖 **Drug Formulary:** Search drugs, indications, and formulations offline.
- 📋 **Clinical Guidelines:** Access standard clinical guidelines completely offline.
- 🌐 **Bilingual Support:** Full support for English and Indonesian (`id`).
- ⚡ **Offline-First:** Critical tools work without an internet connection using local storage technologies.

## Tech Stack

- **Framework:** Next.js 15
- **UI:** React 19, Tailwind CSS, Framer Motion, Lucide React
- **State Management:** Zustand
- **Offline Storage:** Dexie, localForage, idb-keyval
- **AI Integration:** Google Gemini API (`@google/genai`)

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm or yarn
- Google Gemini API Key (for AI features)

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
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## License

This project is licensed under the **GNU General Public License v3.0**. See the `LICENSE` file for more details.
