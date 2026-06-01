# 🛍️ ShopAI - AI Powered E-Commerce Platform

A production-ready, full-stack, AI-powered e-commerce platform built with **Next.js 16 (App Router)**, **Prisma ORM**, **Tailwind CSS**, and **Groq AI (Llama 3)**.

ShopAI features an optimized folder structure designed for maximum separation of concerns, zero-bleed layouts, secure role-based routing, and a clean codebase.

---

## ✨ Features

- **🛍️ Public Product Catalog:** A beautiful, responsive catalog displaying storefront products via dynamic client cards.
- **🛒 Persistent Shopping Cart:** Client-side state-management cart with real-time quantity controls (powered by Zustand & LocalStorage).
- **🔐 Secure Role-Based Authentication:** Complete login/signup flows using NextAuth.js with JWT/Session database role propagation (Admin vs. User).
- **👨‍💼 Private Admin Control Panel:** A dedicated portal `/admin` for catalog management (adding, updating, and removing products) and order overview.
- **🪄 AI Product Description Generator:** Generates compelling, SEO-friendly descriptions inside the admin panel with a single click (powered by Groq API & Llama 3.3).
- **🤖 Context-Aware AI Chatbot:** Customer shopping assistant to recommend products and handle queries in real-time.
- **🎨 Isolated Layout Hierarchies:** Layout systems segmented using Next.js route groups (`(shop)` and `(auth)`) to prevent cross-route rendering conflicts.

---

## 🏗️ Folder Architecture

This project implements a highly organized folder structure designed to keep root directories clean and decouple storefront widgets from dashboard interfaces:

```
Satyamshiv0079/ecommerce-ai-platform/
├── app/
│   ├── (auth)/                    # Standalone layout route group for logins
│   │   ├── login/
│   │   └── signup/
│   ├── (shop)/                    # Public storefront route group (Navbar, Footer, Chatbot)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── products/              # User-facing product catalog & detailed page
│   ├── admin/                     # Private admin dashboard routes (Sidebar, Header)
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   └── products/              # Catalog management tables
│   ├── layout.tsx                 # HTML Shell and global Providers
│   └── globals.css
├── components/
│   ├── admin/                     # Dashboard-specific interface elements
│   ├── shop/                      # Storefront components (AddToCart, ProductCard)
│   ├── layout/                    # Global frame structures (Navbar, Footer)
│   ├── providers/                 # Global Client context managers
│   └── ui/                        # Shadcn primitive elements
├── lib/
│   ├── actions/                   # Server Actions (database mutations)
│   ├── ai/                        # Central AI configuration files
│   ├── store/                     # Global Client State Stores (Zustand)
│   ├── auth.ts                    # Central NextAuth config
│   ├── prisma.ts                  # Shared Prisma client connector
│   └── utils.ts
├── prisma/
│   ├── schema.prisma              # Unified database models
│   └── seed.ts                    # Seed script containing demo items
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (Turbopack, App Router)
- **Database:** PostgreSQL (Supabase) + Prisma ORM
- **Authentication:** NextAuth.js (Credentials Provider with Session Roles)
- **State Management:** Zustand (State persistence)
- **Styling:** Tailwind CSS + Shadcn/ui + Lucide Icons
- **AI Integrations:** Groq SDK + Vercel AI SDK (Llama 3.1 & Llama 3.3 models)

---

## 🚀 Getting Started

### 1. Clone the repository:
```bash
git clone https://github.com/Satyamshiv0079/ecommerce-ai-platform.git
cd ecommerce-ai-platform
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Configure Environment Variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@your-supabase-url:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://username:password@your-supabase-url:5432/postgres"
NEXTAUTH_SECRET="your-jwt-secure-session-key"
NEXTAUTH_URL="http://localhost:3000"
GROQ_API_KEY="your-groq-cloud-api-key"
```

### 4. Build and Seed the Database:
Generate Prisma Client types, push the schemas to your PostgreSQL instance, and run the product seed scripts:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Run the Local Server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your web browser.

---

## 📝 License

This project is licensed under the MIT License.