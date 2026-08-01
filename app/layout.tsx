import type { Metadata, Viewport } from "next";
import { Great_Vibes, Poppins, Dancing_Script } from "next/font/google";
import NavigationProvider from "../components/NavigationProvider";
import ErrorLogger from "../components/ErrorLogger";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Forever Us ❤️",
  description: "A dynamic romantic website designed for my girl.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${greatVibes.variable} ${dancingScript.variable} font-sans bg-[#0D0D14] text-white antialiased overflow-x-hidden`}
      >
        <ErrorLogger />
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
