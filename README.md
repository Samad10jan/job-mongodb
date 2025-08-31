# HireStack 🎯  
*A modern Job Application platform built with Next.js*  

![HireStack Banner](./assets/banner.png)

---

## 🚀 Overview  

**HireStack** is a comprehensive job application and recruitment platform designed to connect companies with top talent. It offers job seekers a seamless way to explore opportunities and employers a smart way to manage job postings and applicants.  

Built with **Next.js 13 (App Router)**, it ensures high performance, scalability, and a smooth developer experience.  

---

## ✨ Features  

- 🔎 **Advanced Job Search** – Search by keywords, filters, and company  
- 🏢 **Company Profiles** – Showcase company details, openings, and reviews  
- 📄 **Job Applications** – Seamless job application process with tracking  
- 💼 **Employer Dashboard** – Post and manage job openings easily  
- ⭐ **Company Reviews** – Share feedback and ratings on employers  
- 👤 **User Profiles** – Personalize and manage your job applications  
- ⚡ **Fast & Responsive** – Powered by Next.js & Tailwind CSS  

---

## 📸 Screenshots  

### 🏠 Landing Page  
<img width="1911" height="910" alt="image" src="https://github.com/user-attachments/assets/8732343f-764e-4252-8fe7-19732901fea2" />

### 📋 Job Listings  
<img width="1901" height="915" alt="Job Listings Page" src="https://github.com/user-attachments/assets/e6e73c7e-7982-4938-adf7-cc49a1c21c66" />

### 📑 Job Details Page  
<img width="1902" height="911" alt="Job Details Page" src="https://github.com/user-attachments/assets/e7bb463a-1cd0-46dd-9482-29485046ccd1" />

### 🏢 Company Openings  
<img width="1901" height="912" alt="Company Openings Page" src="https://github.com/user-attachments/assets/8c88555a-eb92-4063-a158-650c710db0c0" />

### ⭐ Company Reviews  
<img width="1897" height="909" alt="Company Reviews Page" src="https://github.com/user-attachments/assets/d93aa98b-3c13-423d-9e69-4e397d5df8ea" />

### 🔎 Search Page  
<img width="1906" height="915" alt="Search Page" src="https://github.com/user-attachments/assets/fb451cf0-21d9-4f10-84af-1027bdd1a5d3" />

### 👤 User Profile Page  
<img width="1900" height="905" alt="User Profile Page" src="https://github.com/user-attachments/assets/7535068b-0be5-45ba-bb68-78a1a90bf3f9" />

---

## 🛠️ Tech Stack  

- [Next.js](https://nextjs.org) – React Framework  
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  
- [Radix UI](https://www.radix-ui.com/) – Accessible UI primitives  
- [Prisma](https://www.prisma.io/) – Database ORM  
- [PostgreSQL](https://www.postgresql.org/) – Relational Database  
- [Vercel](https://vercel.com/) – Deployment & Hosting  

---




---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/HireStack.git
cd HireStack
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```
Configure your `.env.local` file with your database connection and other environment variables.

4. **Set up the database:**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🧑‍💻 Development

### Key Files
- Entry point: `app/page.tsx`
- API routes: `app/api/`
- Database schema: `prisma/schema.prisma`
- Global styles: `app/globals.css`

### Environment Variables
Create a `.env.local` file with:
```env
DATABASE_URL="your_postgresql_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API
- [Prisma Documentation](https://www.prisma.io/docs) – Database toolkit and ORM
- [Radix UI Documentation](https://www.radix-ui.com/docs) – Accessible component primitives
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) – Utility-first CSS framework

---

## 🚀 Deployment

The easiest way to deploy HireStack is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure your environment variables
4. Deploy with one click!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---




