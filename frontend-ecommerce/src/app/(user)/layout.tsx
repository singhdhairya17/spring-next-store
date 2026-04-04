import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/context/AuthContext";
import { STORE_NAME } from "@/lib/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: { default: STORE_NAME, template: `%s | ${STORE_NAME}` },
  description:
    "Spring Next Store — browse products and categories, manage your cart, and checkout securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased">
        <AuthProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
