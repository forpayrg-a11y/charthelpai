# ChartHelp AI

AI-powered technical analysis for retail traders.

### 🎯 Project Aim and Vision
It is an AI-powered web application that aims to bridge the gap between individual investors (retail traders) and complex technical analysis processes.

### 🛠 Technology Stack
- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Authentication:** [Clerk](https://clerk.com)
- **Payments:** [Stripe](https://stripe.com)
- **AI Engine:** [Google Gemini API](https://ai.google.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)

### 🐳 Docker and Deployment
- **Containerization:** The application is fully Dockerized.
- **Docker Image:** `mrgurpinar/charthelpai:latest`
- **Reverse Proxy:** Secure SSL management with Nginx Proxy Manager (NPM) integration.
- **Security & DNS:** Optimized and secure external access with Cloudflare integration.

### 📊 API and Analytics Infrastructure
- **AI Analysis Routes:** APIs have been created to enable AI analysis of graphical images.
- **Security Mechanism:** Rate-limiting and database logging logic have been developed for system security and continuity.
- **Standard Data Structure:** Technical analysis results (support/resistance points, trend analysis, etc.) are presented in a professional and standardized JSON format.

### 🚀 Getting Started

First, install the dependencies:
```bash
pnpm install
```
Then start the development server:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
*Created by **Gorvu LLC***