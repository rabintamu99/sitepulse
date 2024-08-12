import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Dock from "@/components/sidebar/dock";
import { SessionProvider } from 'next-auth/react';
import { auth } from '../auth'

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Site Pulse",
  description: "Monitor your website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en" >
      <body className={`${dm_sans.className} h-screen`} suppressHydrationWarning>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
          </ThemeProvider>
        </body>
        
    </html>
  );
}