# ShopAI - AI Powered E-Commerce Platform

A full-stack AI-powered e-commerce platform built with Next.js 16, Prisma, and Groq AI.

## Features

- 🛍️ Product listing and detail pages
- 🛒 Shopping cart with quantity management
- 🔐 User authentication (Login/Signup)
- 🤖 AI chatbot assistant (powered by Groq/Llama)
- 👨‍💼 Admin dashboard
- 📦 Order management
- 💳 Checkout flow

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase) + Prisma ORM
- **Auth:** NextAuth.js
- **AI:** Groq API (Llama 3.1)
- **State:** Zustand
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:
\```bash
git clone https://github.com/Satyamshiv0079/ecommerce-ai-platform.git
cd ecommerce-ai-platform
\```

2. Install dependencies:
\```bash
npm install
\```

3. Create `.env` file:
\```
DATABASE_URL="your_supabase_url"
DIRECT_URL="your_supabase_direct_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
GROQ_API_KEY="your_groq_key"
\```

4. Setup database:
\```bash
npx prisma db push
npx tsx prisma/seed.ts
\```

5. Run the development server:
\```bash
npm run dev
\```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Demo

[Coming soon on Vercel]

## Screenshots

### Home Page
![Home Page](public/screenshots/home.png)

### Products Page
![Products Page](public/screenshots/products.png)

### AI Chatbot
![AI Chatbot](public/screenshots/chatbot.png)

## License

MIT