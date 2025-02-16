import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/provider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blackbook",
  description: "A cmprehensive collection of all projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
