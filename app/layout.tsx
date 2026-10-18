import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Google } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { APP_NAME } from "@/lib/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s ~ ${APP_NAME}` },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={cn("font-sans antialiased", geistSans.variable, geistMono.variable)}
      lang="es"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Google />
      </body>
    </html>
  );
}
