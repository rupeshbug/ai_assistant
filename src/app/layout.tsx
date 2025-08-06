import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "AI assitant that gets things done.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${notoSans.className} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
