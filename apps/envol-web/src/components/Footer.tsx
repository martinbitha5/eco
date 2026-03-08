import Link from "next/link";
import { Plane } from "lucide-react";

const FOOTER_COLS = [
  {
    title: "Réserver avec Envol",
    links: [
      "Compagnies aériennes disponibles",
      "Paiement fractionné Frako",
      "Bagages & options",
      "Notre service client",
      "Politique tarifaire",
      "Payer en 3x ou 6x",
    ],
  },
  {
    title: "Ma réservation",
    links: [
      "Gérer ma réservation",
      "Récupérer mon billet",
      "Centre d'aide",
      "Contactez-nous",
    ],
  },
  {
    title: "L'entreprise",
    links: [
      "À propos d'Envol",
      "Blog",
      "Écosystème RDC",
      "Frako",
      "ScoreCongo",
    ],
  },
];

const SOCIAL = ["f", "x", "in", "ig"];

export default function Footer() {
  return (
    <footer className="bg-[#1e1b4b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-white rotate-45" />
              </div>
              <div className="leading-tight">
                <p className="font-bold text-sm">Envol</p>
                <p className="text-white/40 text-[10px]">depuis Kinshasa</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Réservation de vols depuis Kinshasa. Zéro compte requis.
              Paiement fractionné via Frako.
            </p>
            <div className="flex gap-2">
              {SOCIAL.map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors text-xs font-bold text-white/70"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-5 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white/70 transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-white/70 transition-colors">Plan du site</a>
          </div>
          <p className="text-xs text-white/30">
            Envol © {new Date().getFullYear()} · Ecosystème RDC · Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
