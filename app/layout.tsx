import type { Metadata } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xyz-labs.com"),
  title: "XYZ Labs — AI-Powered Systems That Adapt To Your Business",
  description:
    "Instead of forcing your team into rigid ERP systems and disconnected tools, we build AI-powered software around the way your business already operates.",
  keywords: [
    "software development",
    "business automation",
    "operational software",
    "workflow automation",
    "internal tools",
    "custom software",
    "AI automation"
  ],
  authors: [{ name: "XYZ Labs" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xyz-labs.com",
    siteName: "XYZ Labs",
    title: "XYZ Labs — AI-Powered Systems That Adapt To Your Business",
    description:
      "Instead of forcing your team into rigid ERP systems and disconnected tools, we build AI-powered software around the way your business already operates.",
    images: [
      {
        url: "/og-image-placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "XYZ Labs",
      }
    ]
  },
  alternates: {
    canonical: "https://xyz-labs.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "XYZ Labs — Software That Eliminates Operational Bottlenecks",
    description:
      "Custom software and workflow automation for businesses that need real engineering, not demos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-bg-primary text-text-primary font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
