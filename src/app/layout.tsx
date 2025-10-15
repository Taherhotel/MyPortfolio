import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Akbar's Portfolio | Cybersecurity Expert & Developer",
  description: "Elite cybersecurity portfolio showcasing penetration testing, ethical hacking, and secure development with cutting-edge 3D visualizations",
  keywords: ["cybersecurity", "penetration testing", "ethical hacking", "security", "developer", "portfolio", "threejs", "cyber"],
  authors: [{ name: "Taher" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-black text-green-400 overflow-x-hidden`}>
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900 opacity-50 pointer-events-none"></div>
        <div className="relative z-10">
          <Navigation />
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
