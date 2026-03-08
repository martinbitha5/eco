import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Envol — Réservation de vols depuis Kinshasa",
  description:
    "Réservez vos vols depuis Kinshasa sans créer de compte. Paiement fractionné 3x ou 6x via Frako.",
  keywords: ["vols Kinshasa", "réservation vol RDC", "Envol", "Duffel", "Frako BNPL"],
  openGraph: {
    title: "Envol — Vols depuis Kinshasa",
    description: "Sans compte requis. Paiement fractionné via Frako.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased font-sans min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
