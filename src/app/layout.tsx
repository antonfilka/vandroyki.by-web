import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import { Header } from "@/modules/header";
import { Toaster } from "sonner";

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
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <Toaster richColors />
          <main className="relative bg-background text-foreground flex w-screen min-h-screen h-screen flex-col items-center">
            <Header />
            <div className="w-full h-full mt-[80px]">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
