"use client";
import React, { useState } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import CartContext from "./_context/CartContext";

// Importing the Roboto font with specified weights
const roboto = Roboto({ subsets: ["latin"], weight: ["500", "700", "900"] });

// Metadata for the application
// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// RootLayout component
export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <html lang="en">
          <body className={roboto.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </CartContext.Provider>
    </ClerkProvider>
  );
}
