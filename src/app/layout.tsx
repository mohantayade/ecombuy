import type { Metadata } from "next";
import { Glory } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartProvider from "@/components/Providers";
import ShoppingCartModel from "@/components/ShoppingCartModel";

const inter = Glory({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcomBuyIndia",
  description: "This app create by Mohan Tayade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
        <Navbar/>
        <ShoppingCartModel />
        {children}
        </CartProvider>
        
        </body>
    </html>
  );
}
