import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import Navigation from "./_components/ui/custom/Nav";

export const metadata = {
  title: "Fastway Screening",
  description: "Waybill tracking for Fastway",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-screen bg-black">
        <Navigation />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
