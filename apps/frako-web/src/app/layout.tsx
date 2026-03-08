import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frako — BNPL pour marchands",
  description: "Intégrez le paiement fractionné 3x ou 6x sur votre site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
