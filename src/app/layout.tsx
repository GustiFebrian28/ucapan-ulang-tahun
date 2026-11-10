import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ada kejutan kecil untuk Ebok",
  description:
    "Web app ucapan untuk Ibu dengan enam kartu, kolase foto, dan sentuhan hangat.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
