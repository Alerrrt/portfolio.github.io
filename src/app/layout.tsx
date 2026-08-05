import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SensoryUIProvider } from "@/components/ui/sensory-ui/config/provider";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { profile } from "@/data/resume-data";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SensoryUIProvider>
            <div className="flex min-h-screen w-full flex-col">
              <NavBar />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
            </div>
          </SensoryUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}