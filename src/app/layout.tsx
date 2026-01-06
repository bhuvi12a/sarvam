"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { usePathname } from "next/navigation";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" className="scroll-smooth">
      <body className={outfit.className}>
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppButton />}
      </body>
    </html>
  );
}
