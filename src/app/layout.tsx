import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { CanvasContextProvider } from "@/contextProviders/useCanvasProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          "min-h-[100vh] bg-gray-950 flex items-center justify-center"
        }
      >
        <Navbar />
        <CanvasContextProvider>{children}</CanvasContextProvider>
      </body>
    </html>
  );
}
