import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Google } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { APP_NAME } from "@/lib/config";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s ~ ${APP_NAME}` },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={cn("antialiased", GeistSans.variable, GeistMono.variable)}
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
