import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HireStack",
  description: "One place for Job Posting and Finding."
};

export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode
}>) {
  return (
    <html lang="en" >
      
      <body>

        {modal}
        {children}

      </body>
    </html>
  );
}
