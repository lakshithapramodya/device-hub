import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";

import "./globals.css";
import ModalProvider from "@/components/providers/ModalProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Device Hub",
  description:
    "A centralized hub for managing and monitoring location based devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.className)}>
        {children}
        <Toaster
          position="top-right"
          containerStyle={{
            zIndex: 2147483647,
          }}
        />
        <ModalProvider />
      </body>
    </html>
  );
}
