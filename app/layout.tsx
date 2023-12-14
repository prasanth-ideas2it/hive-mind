import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/core/header/app-header";
import CreateProposal from "@/components/ui/create-proposal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HiveMind",
  description: "HiveMind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#EFFFF9] relative`}>
        <div className="bg-[url('/assets/images/background.jpg')] w-full bg-cover bg-no-repeat h-[285px] shadow-[0_0_8px_0_rgba(0,0,0,0.14)]">
          <AppHeader />
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[96px] w-[800px]">
            {children}
          </div>
          <CreateProposal />
        </div>
      </body>
    </html>
  );
}
