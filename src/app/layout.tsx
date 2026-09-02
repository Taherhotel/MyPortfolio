import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Taher's Portfolio | Developer & Cyber Expert",
  description: "Elite portfolio showcasing development, cybersecurity, and design with cutting-edge visual experiences.",
  keywords: ["cybersecurity", "developer", "designer", "portfolio", "threejs", "nextjs"],
  authors: [{ name: "Taher" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${vt323.className} antialiased bg-black text-gray-200`} suppressHydrationWarning>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
