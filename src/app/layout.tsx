import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeContext from "./components/theme-context";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Job App",
  description: "Job finder app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       
          
        {children}
        
      </body>
    </html>
  );
}
