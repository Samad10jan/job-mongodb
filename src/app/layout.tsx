import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";


export const metadata: Metadata = {
  title: "HireStack",
  description: "Job finder app",
};

export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>

        {modal}
        {children}

      </body>
    </html>
  );
}
