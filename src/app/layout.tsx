import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "../components/ui/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ChartHelp AI | AI-Powered Trading Chart Analysis",
    template: "%s | ChartHelp AI"
  },
  description: "Advanced AI-powered technical analysis and trade planning for traders. Get instant insights into market trends and patterns.",
  keywords: ["AI Trading", "Technical Analysis", "Crypto Analysis", "Stock Market AI", "Chart Patterns", "Trade Planning"],
  authors: [{ name: "Gorvu LLC" }],
  creator: "Gorvu LLC",
  publisher: "Gorvu LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://charthelpai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ChartHelp AI | AI-Powered Trading Chart Analysis",
    description: "Advanced AI-powered technical analysis and trade planning for traders.",
    url: "https://charthelpai.com",
    siteName: "ChartHelp AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChartHelp AI Analysis Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChartHelp AI | Neural Network Chart Analysis",
    description: "Advanced AI-powered technical analysis and trade planning for traders.",
    images: ["/og-image.png"],
    creator: "@charthelpai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${roboto.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
