# 🚀 LinkedIn AI – Personal Branding Platform

> An enterprise-grade AI SaaS web application empowering founders, executives, creators, developers, and marketers to build an authoritative personal brand on LinkedIn.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://linkedin-ai-branding-platform.vercel.app)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Live Production Demo
👉 **[https://linkedin-ai-branding-platform.vercel.app](https://linkedin-ai-branding-platform.vercel.app)**

---

## ✨ Features Breakdown

### ✍️ 1. AI Post Generator & Hook A/B Testing Lab
- **Structured Inputs**: Topic/Achievement, Target Audience, Industry Sector, Tone Persona, Writing Framework, Length, Emoji Level, CTA Strategy, Content Goal.
- **1-Click Proven Creator Templates**: *SaaS ARR Milestones*, *Hiring Lessons*, *Contrarian Takes*, *Feature Launches*, *Productivity Playbooks*.
- **Hook A/B Testing Lab**: Generates 3 headline variations side-by-side (*Metric Contrast*, *Pattern Interrupt*, *Authority Curiosity Loop*) with individual dwell-time scores.
- **Structured Output Cards**: Instant copy buttons for **Hook**, **Body**, **CTA**, and **Hashtags**.

### 📸 2. Photo Attachment & Image Generator Manager
- **Custom Photo Upload**: Attach custom `.png` or `.jpg` files.
- **Stock Photo Selector**: 1-click curated business & tech stock photos.
- **AI Post Graphic Generator**: Automatically generates 1080x1080 visual image banners.

### 🔍 3. AI Post Analyzer & Sentence Dwell-Time Heatmap
- **4-Metric Quality Score**: Hook Impact, Readability, Engagement, Algorithm Fit.
- **🔥 Sentence Dwell Heatmap**: Visual color-coding line-by-line:
  - 🟢 **High Dwell Hooks** (Green): Curiosity loops & dollar metrics.
  - 🔵 **Good Body Text** (Blue): Balanced narrative flow.
  - 🔴 **Drop-off Risks** (Red): Sentences exceeding 20 words.
- **1-Click Auto-Fix**: Automatically reformats run-on sentences into single-sentence lines.

### ⚡ 4. Rewrite Assistant & Native PDF Carousel Builder
- **Multi-Format Rewriter**: Dual-pane comparison layout (*Storytelling*, *Listicle*, *Concise*, *Executive Summary*).
- **📑 Native PDF Carousel Builder**: Converts post text into 4:5 aspect ratio multi-slide PDF documents with slide pagination and custom author branding. 1-click download for direct LinkedIn document upload.

### 🛡️ 5. AI Fact-Checking Claim Verifier
- Scans generated post text for numerical claims (`$1,000,000 ARR`, `9 months`, `42 seconds`) and provides a **Verify & Lock Claims** sign-off panel to shield against AI hallucinations.

### 🏢 6. Multi-Account Agency Workspace Switcher
- Switch between agency team workspaces (*Personal Executive Brand*, *ScaleMetric GTM Team*, *Apex VC Portfolio Fund*) with custom role permissions (*Owner*, *Admin*, *Writer*, *Approver*).

### 📁 7. Saved Drafts & Content Calendar Grid
- **List View** & **Interactive Monthly Calendar Grid** (July 2026 content planner showing status pills for Draft, Scheduled, and Published items).

### 📊 8. Analytics Performance Dashboard
- Track reach trends, quality growth, and engagement metrics via interactive **Recharts** Area and Bar charts.

### 🎯 9. Brand Voice & Persona Settings
- Custom persona headline, core brand pillars, tone parameter sliders (*Formality*, *Humor*, *Storytelling*), and **Excluded AI Buzzwords Shield** (banning words like *"synergy"*, *"delve"*).

### ⚙️ 10. Profile & Token Health Monitor
- **LinkedIn OAuth 2.0 Authorization Modal** (`w_member_social`).
- **Automated Publishing Queue Engine Modal** (4-step API handshake simulator ➔ `201 Created`).
- **OAuth Token Health Status**: 60-day token expiration countdown and daily share limit meter.
- **Centralized Database Backup Manager**: 1-click JSON backup export & device restore.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 18 (Functional Components, Custom Context Hooks)
- **Language**: TypeScript 5.3
- **Build Tool**: Vite 5.4
- **Styling**: Vanilla Tailwind CSS 3.4 (Custom color tokens, rounded corners, glassmorphism, radial glow utilities)
- **Data Visualization**: Recharts 2.12
- **Iconography**: Lucide React
- **PDF Generation**: Native Client-Side SVG/Canvas Exporter
- **Deployment**: Vercel Serverless

---

## 🚀 Quick Start (Local Development)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bhawesh-x1/linkedin-ai-platform.git
   cd linkedin-ai-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
