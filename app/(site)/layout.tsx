import type { Metadata } from "next";
import { getAppUrl } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(getAppUrl()),
  robots: { index: true, follow: true },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return children;
}
