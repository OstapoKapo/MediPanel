import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./styles/reset.css";
import { ApolloWrapper } from "./components/layout/apollowraper/apollowraper";


// const geistManrope = Geist({
//   variable: "--font-geist-manrope",
//   subsets: ["latin"],
// });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MEDIPANEL",
  description: "A simple and intuitive medical panel for managing in patients, doctors, and appointments.",
  icons: {
    icon: "/icon/dashboard-growth.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloWrapper>
      <body className={`${geistMono.variable}`}>
        {children}
      </body>
      </ApolloWrapper>
    </html>
  );
}