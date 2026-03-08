import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MyBookingContent from "./MyBookingContent";

const ADVANTAGES = [
  {
    title: "Choisis ton siège",
    desc: "Garantis la meilleure place dans l’avion en réservant ton siège à l’avance.",
  },
  {
    title: "Suivi en temps réel",
    desc: "Suis l’état de ta réservation et reçois des mises à jour instantanées.",
  },
  {
    title: "Télécharge ton billet",
    desc: "Télécharge ton billet électronique directement depuis ton espace.",
  },
  {
    title: "Contacte notre équipe",
    desc: "Notre service client est disponible pour t’aider à chaque étape.",
  },
];

export default function MyBookingPage() {
  return (
    <>
      <Navbar />

      <div className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — form */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Gère ta réservation
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                Si tu as déjà fait une réservation avec nous, entre les détails
                de ta réservation ci-dessous pour obtenir des conseils sur
                mesure.
              </p>
              <Suspense
                fallback={
                  <div className="py-8 flex justify-center">
                    <div className="animate-spin w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full" />
                  </div>
                }
              >
                <MyBookingContent />
              </Suspense>
            </div>

            {/* Right — purple gradient card */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-[#1e1b4b] via-brand-700 to-brand-400 rounded-3xl p-8 min-h-[520px] flex flex-col">
                <p className="text-white/60 text-sm font-medium mb-8">
                  Avantages de gérer ma réservation
                </p>

                {/* Feature card carousel (static first item) */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl">
                    <h3 className="font-bold text-gray-900 mb-2">{ADVANTAGES[0].title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {ADVANTAGES[0].desc}
                    </p>
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-1.5 mt-6">
                  {ADVANTAGES.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === 0
                          ? "w-5 bg-white"
                          : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
