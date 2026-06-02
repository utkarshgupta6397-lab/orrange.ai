import type { Metadata } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import BrandIntro from "@/components/ui/BrandIntro";

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
  metadataBase: new URL("https://orrange.ai"),
  title: "orrange.ai — AI-Powered Systems That Adapt To Your Business",
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
  authors: [{ name: "orrange.ai" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orrange.ai",
    siteName: "orrange.ai",
    title: "orrange.ai — AI-Powered Systems That Adapt To Your Business",
    description:
      "Instead of forcing your team into rigid ERP systems and disconnected tools, we build AI-powered software around the way your business already operates.",
    images: [
      {
        url: "/og-image-placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "orrange.ai",
      }
    ]
  },
  alternates: {
    canonical: "https://orrange.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "orrange.ai — Software That Eliminates Operational Bottlenecks",
    description:
      "Custom software and workflow automation for businesses that need real engineering, not demos.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon-light.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/favicon-dark.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
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
      suppressHydrationWarning
    >
      <body className="antialiased bg-bg-primary text-text-primary font-sans" suppressHydrationWarning>
        <BrandIntro />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
