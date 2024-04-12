import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { Header } from "@/modules/header";
import { Toaster } from "sonner";
import { Modals } from "@/modules/modals";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vandroyki.by",
  description: "Vandroyki app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <Providers>
          <Toaster richColors />
          <Modals />
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
