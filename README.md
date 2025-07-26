# 📚 Booker – University Book Borrowing System

## 🌟 Library Access for Students & Admins 🌟

**Booker** is a web-based platform built for universities to simplify and digitize their library systems.  
It provides a seamless experience for both students and administrators, combining convenience, speed, and control — all from one clean interface.

<div align="right">
  <img width="683" height="647" alt="Student login view" src="https://github.com/user-attachments/assets/d0a6c65c-56bf-4ad4-aee6-813a7c80e291" />
</div>

Students can securely log in and explore the full library catalog through an intuitive, responsive interface.  
📖 The system is designed to simplify future book borrowing workflows, with an emphasis on accessibility, speed, and ease of use.

🛠️ On the administrative side, staff have access to a robust dashboard where they can manage inventory, add new titles, update book information, and monitor the catalog in real time.

<div align="left">
  <img width="683" height="699" alt="Admin dashboard view" src="https://github.com/user-attachments/assets/3f48177c-0a17-4760-9439-9aa2fca12e23" />
</div>

With real-time performance, optimized image delivery , background task handling, and built-in rate limiting ,  
**Booker** lays a strong foundation for a fully interactive university library experience — and continues to evolve to meet the needs of both students and staff.

# 🛠️ Tech Stack
<details open> <summary>🔹 Core Technologies</summary> <ul style="margin-left: 20px;"> <li>⚛️ <b>Next.js</b> → Full-stack React framework for frontend & API routes</li> <li>🔐 <b>Auth.js</b> → Authentication for students and admins</li> <li>🧠 <b>Upstash</b> → Redis for caching, queues, workflows, and rate limiting</li> <li>🗄️ <b>Prisma ORM</b> → Type-safe database access layer with seed support</li> <li>🛢️ <b>NeoDB PostgreSQL</b> → Serverless PostgreSQL database for reliable storage</li> <li>🖼️ <b>ImageKit.io</b> → Image upload, optimization, and CDN delivery</li> </ul> </details>

# 🚀 Features

- ✅ **Student Login** with Role-Based Access  
- 🛠️ **Admin Dashboard** to manage books
- 📸 **Book Cover Uploads** using [ImageKit.io](https://imagekit.io)  
- ⚡ **Caching & Background Workflows** with [Upstash Redis](https://upstash.com)  
- 🚦 **API Rate Limiting** – 3 requests/min per user (via Upstash)  
- 🗃️ **PostgreSQL Database** via [NeoDB](https://neon.tech)  
- 🌱 **Prisma Seeding** Support for Development & Testing  

---

# ⚡ Quick Start Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/kh-mahmoud/Booker.git
cd booker
```

## 2️⃣ Install Dependencies

```bash
# ======================
# 🔐 Authentication & Security
# ======================
AUTH_SECRET=your_auth_secret_here

# ======================
# 🗄️ Database (NeoDB / Neon)
# ======================
DATABASE_URL=postgresql://username:password@db.neon.tech/dbname?sslmode=require

# ======================
# 📸 ImageKit Configuration
# ======================
NEXT_PUBLIC_IMAGEKIT_PUBLIC_ENDPOINT=https://ik.imagekit.io/your_id/
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key

# ======================
# ⚡ Upstash Redis (Caching, Rate Limiting)
# ======================
UPSTASH_REDIS_REST_URL=https://your-region.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# ======================
# 📬 QStash (Background Jobs, Queues)
# ======================
QSTASH_URL=https://qstash.upstash.io/v2/publish
QSTASH_TOKEN=your_qstash_token
QSTASH_CURRENT_SIGNING_KEY=your_current_signing_key
QSTASH_NEXT_SIGNING_KEY=your_next_signing_key

# ======================
# 📧 Email (e.g. for password recovery or notifications)
# ======================
GMAIL_ACCESS_PASSWORD=your_gmail_app_password

# ======================
# 🌐 App Config
# ======================
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
```

## 🧪 Seed the Database

```bash
npx prisma generate
npm run push
npm run seed
```

## 🚀 Launch the App
```bash
npm run dev
```

[![Visit Live App](https://img.shields.io/badge/🚀%20Visit%20Live%20App-booker--bice.vercel.app-brightgreen?style=for-the-badge)](https://booker-bice.vercel.app)





