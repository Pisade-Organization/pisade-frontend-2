import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import React from "react";
import { Noto_Sans_Thai, Rethink_Sans } from "next/font/google";

const rethink = Rethink_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rethink",
});

const thai = Noto_Sans_Thai({
  subsets: ["thai"],
  display: "swap",
  variable: "--font-thai",
});

export const metadata: Metadata = {
  title: "Pisade",
  description: "The Future of Thailand",
  manifest: "/manifest.json",
  themeColor: "#4f46e5",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pisade",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "Pisade",
    title: "Pisade - Online Tutoring Platform",
    description:
      "Connect with qualified tutors for personalized learning experiences",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pisade - Online Tutoring Platform",
    description:
      "Connect with qualified tutors for personalized learning experiences",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string }; // ✅ no Promise
}) {
  const { locale }: any = params;

  // ✅ Safe fallback locale
  const safeLocale = routing.locales.includes(locale)
    ? locale
    : routing.defaultLocale;

  const messages = await getMessages({ locale: safeLocale });

  return (
    <html
      lang={safeLocale}
      className={`${rethink.variable} ${thai.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="/logos/pisade-mobile.svg"
          type="image/svg+xml"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logos/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logos/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logos/apple-touch-icon.png"
        />
      </head>
      <body className={safeLocale === "th" ? "font-thai" : "font-rethink"}>
        <NextIntlClientProvider messages={messages} locale={safeLocale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
