# HireStack 🎯  
*A modern Job Application platform built with Next.js*  

🔗 **Live Website:** [HireStack](https://hire-stack.vercel.app)  

## 🚀 Overview  

**HireStack** is a comprehensive job application and recruitment platform designed to connect companies with top talent. It offers job seekers a seamless way to explore opportunities and employers a smart way to manage job postings and applicants.  

Built with **Next.js**, it ensures high performance, scalability, and a smooth developer experience.  

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
<img width="1896" height="907" alt="image" src="https://github.com/user-attachments/assets/30f8e533-218f-4f2c-9cfc-0da9d4e49e67" />

### 📋 Job Listings  
<img width="1908" height="914" alt="image" src="https://github.com/user-attachments/assets/d4a9f41b-8e3e-4c42-99c6-7b5624ae3cc7" />

### 📑 Job Details Page  
<img width="1897" height="907" alt="image" src="https://github.com/user-attachments/assets/a7b73b6c-84bd-45af-bd4a-5a177a3865d9" />

### 🏢 Company Openings  
<img width="1905" height="913" alt="image" src="https://github.com/user-attachments/assets/34781eca-6437-419e-a7f5-33d116ceb1be" />

### ⭐ Company Reviews  
<img width="1906" height="911" alt="image" src="https://github.com/user-attachments/assets/a74970f8-897a-4da6-8558-11cc06d45582" />

### 🔎 Search Page  
<img width="1899" height="908" alt="image" src="https://github.com/user-attachments/assets/d287a8b0-6da1-4448-abc7-1d2912fe552a" />

### 📃 Side Menu (When user is Recruiter)
<img width="1907" height="641" alt="image" src="https://github.com/user-attachments/assets/2cfb9a3a-aca4-4cb6-81d2-4a7419b3c4a8" />

### 👤 User Profile Page
<img width="1900" height="910" alt="image" src="https://github.com/user-attachments/assets/2538ffa5-f7b3-4d4a-8f68-291bfc015635" />

---

## 🛠️ Tech Stack  

- [Next.js](https://nextjs.org) – React Framework  
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  
- [Radix UI](https://www.radix-ui.com/) – Accessible UI primitives  
- [Prisma](https://www.prisma.io/) – Database ORM   
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
DATABASE_URL="your_mongodb_connection_string"
KEY="your_nextauth_secret"
//NEXTAUTH_URL="http://localhost:3000"
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




