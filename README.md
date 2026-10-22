# 🌿 Etherische Oliën Database & Roomspray Studio
### *Essential Oils Inventory, Synergy Blends & Roomspray Calculator*

<div align="center">

[![Firebase Hosting](https://img.shields.io/badge/Hosted%20on-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://etherischeoliesdatabase.web.app)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[**🌐 Bekijk de Live Applicatie / View Live App**](https://etherischeoliesdatabase.web.app)

</div>

---

## 🇳🇱 Nederlands

### 📖 Over dit project
De **Etherische Oliën Database** is een moderne, interactieve webapplicatie voor liefhebbers van aromatherapie, parfumerie en holistisch welzijn. De applicatie combineert een uitgebreide inventaris van zowel 100% zuivere etherische oliën als synthetische geurmoleculen met praktische tools zoals een **Symptomenzoeker**, een **Synergie- & Diffuser-blender** en een geavanceerde **Roomspray Studio**.

### ✨ Belangrijkste Functies

#### 🗂️ 1. Complete Oliën Inventaris & Voorraadbeheer
- **67+ Etherische & Synthetische Oliën** gecategoriseerd op Bloemen, Citrus, Kruiden, Houtachtig, Hars, Specerijen en Moleculair.
- **38+ Op Maat Gemaakte Cartoon-illustraties**: Herkenbare, uniforme illustraties van glazen flesjes met Nederlandstalige etiketten en bijbehorende botanische planten/bloemen.
- **Uitgebreide Botanische Profielen**: Latijnse naam, geurnoot (Top, Midden, Basis), aromaprofiel, therapeutische eigenschappen en veiligheidsmaatregelen.
- **Voorraadstatus & Beoordeling**: Houd bij of een olie *Voldoende*, *Bijna op*, *Op* of *Niet in bezit* is, inclusief persoonlijke reviews en sterbeoordelingen.
- **Snel Zoeken & Filteren**: Filter direct op categorie, geurnoot, voorraadstatus of zoek vrij op werking (bijv. "slaap", "focus").

#### 🩺 2. Slimme Symptomen- & Stemmingszoeker
- Selecteer fysieke of emotionele behoeften (zoals *Diepe Slaap*, *Stressverlichting*, *Hoofdpijn & Spanning*, *Focus*, *Luchtwegen*, *Spierontspanning*).
- Krijg direct gerichte olie-aanbevelingen met doseringen en toepassingstips (diffuser, inhalatie, bad, massage).

#### 💧 3. Synergie & Diffuser Blends
- Kant-en-klare synergierecepten met exacte druppelverhoudingen.
- **Slimme voorraadcontrole**: Ziet automatisch of je alle ingrediënten in huis hebt (*"Beschikbaar"*) of welke olie ontbreekt (*"Niet compleet"*).
- Maak en bewaar je eigen synergierecepten in je browser.

#### 🌸 4. Roomspray Studio (Nieuw!)
- **Recepten-Calculator**: Berekent exact de benodigde hoeveelheid water, alcohol (70-96% voor solubilisatie) en aantal druppels op basis van flesgrootte (30ml, 50ml, 100ml) en gewenste geursterkte (Subtiel, Standaard, Intens).
- **Geurcombinatie-assistent**: Ontdek direct welke oliën harmonieus matchen in geurnoten (Top + Midden + Basis).
- **Printklare Etiketten**: Exporteer en print professionele receptkaartjes en flesetiketten met ingrediënten en schud-instructies.

#### 💾 5. Veilig & Lokaal
- Alle persoonlijke voorraadwijzigingen, eigen recepten en notities worden automatisch opgeslagen in `localStorage`.
- Mogelijkheid om je database te exporteren naar CSV of met één klik te resetten naar de standaardcollectie.

---

### 🚀 Lokaal Installeren & Starten

#### Vereisten
- [Node.js](https://nodejs.org/) (v18 of hoger aanbevolen)
- [npm](https://www.npmjs.com/)

```bash
# 1. Clone de repository
git clone https://github.com/slashbot28/Etherischeoliesdatabase.git
cd Etherischeoliesdatabase

# 2. Installeer dependencies
npm install

# 3. Start de lokale ontwikkelserver
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

#### Productiebuild & Test
```bash
# Typecheck uitvoeren
npm run lint

# Bouwen voor productie
npm run build

# Preview van de productiebuild lokaal bekijken
npm run preview
```

#### Deployen naar Firebase Hosting
```bash
npx firebase-tools deploy --only hosting
```

---
---

## 🇬🇧 English

### 📖 About this Project
The **Essential Oil Inventory & Roomspray Studio** is a modern, interactive web application tailored for aromatherapy practitioners, perfumers, and holistic wellness enthusiasts. It seamlessly pairs an extensive database of 100% natural essential oils and artisanal molecular aroma accords with smart tools including a **Symptom & Mood Matcher**, a **Synergy Blend Composer**, and a full-featured **Roomspray Studio**.

### ✨ Core Features

#### 🗂️ 1. Comprehensive Oil Inventory & Stock Tracking
- **67+ Botanicals & Molecular Accords** covering Florals, Citrus, Herbs, Woods, Resins, Spices, and Modern Molecules.
- **38+ Custom Cartoon Illustrations**: Cohesive, modern vector artworks featuring amber dropper bottles with localized Dutch labels and framing botanicals.
- **Detailed Botanical Data**: Latin botanical names, scent note tiers (Top, Middle, Base), aromatic facets, holistic applications, and contraindications/safety advisories.
- **Real-Time Stock & Rating Tracking**: Easily track availability (*In Stock*, *Low*, *Empty*, *Not Owned*) along with personal star ratings and notes.
- **Multi-Facet Search & Filtering**: Instant filter by category, note type, stock level, or keyword queries.

#### 🩺 2. Smart Symptom & Mood Matcher
- Choose physical and emotional concerns (e.g., *Deep Sleep*, *Stress Relief*, *Headache & Tension*, *Mental Focus*, *Clear Breathing*, *Muscle Comfort*).
- Receive curated, evidence-informed oil pairings and practical application guidelines.

#### 💧 3. Synergy Blends & Diffuser Studio
- Pre-formulated aromatherapy synergy recipes with balanced drop ratios.
- **Inventory Awareness**: Instantly flags whether blends are fully makeable from your personal stock or displays which components are missing.
- Save and edit custom synergy formulations locally.

#### 🌸 4. Roomspray Studio
- **Accurate Dilution Calculator**: Automatically calculates required distilled water volume, high-proof alcohol/dispersant (for oil solubilization), and precise drop counts based on spray bottle volume (30ml, 50ml, 100ml) and scent intensity.
- **Fragrance Pairing Advisor**: Discover harmonious top, middle, and base note complements for every oil.
- **Printable Bottle Labels & Formula Cards**: Formats ready-to-print recipe cards and bottle labels with safety instructions.

#### 💾 5. Offline & Local Storage First
- Zero server database lock-in: personal stock modifications, custom formulations, and user ratings persist directly in browser `localStorage`.
- One-click CSV database export and instant factory database restore.

---

### 🚀 Local Development & Setup

#### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

```bash
# 1. Clone the repository
git clone https://github.com/slashbot28/Etherischeoliesdatabase.git
cd Etherischeoliesdatabase

# 2. Install dependencies
npm install

# 3. Start local Vite development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

#### Building for Production
```bash
# Run TypeScript validation
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

#### Deploy to Firebase Hosting
```bash
npx firebase-tools deploy --only hosting
```

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6.4](https://vitejs.dev/) + [@tailwindcss/vite](https://tailwindcss.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom glassmorphism effects (`glass-card`, `glass-panel`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visuals**: 38+ custom AI-crafted botanical cartoon vector illustrations in `/public/images/`
- **Deployment**: [Firebase Hosting](https://firebase.google.com/products/hosting) via global CDN

---

## 📄 Licentie / License
This project is open-source under the [MIT License](LICENSE).
Feel free to customize, extend, and share!
