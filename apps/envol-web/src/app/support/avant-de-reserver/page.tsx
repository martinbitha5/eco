import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle, Plane, Shield, Clock, CreditCard } from "lucide-react";

const WHY_ENVOL = [
  {
    icon: "plane",
    title: "Accès à des centaines de vols",
    desc: "Depuis Kinshasa, comparez des vols vers toute l'Afrique et le monde entier. Trouvez le meilleur prix en quelques clics.",
  },
  {
    icon: "card",
    title: "Paiement flexible avec Frako",
    desc: "Étalez votre paiement en 3 ou 6 fois sans frais supplémentaires grâce à notre partenaire Frako.",
  },
  {
    icon: "shield",
    title: "Zéro compte requis",
    desc: "Réservez instantanément sans créer de compte. Votre référence Envol suffit pour retrouver votre billet.",
  },
  {
    icon: "clock",
    title: "Confirmation instantanée",
    desc: "Recevez votre confirmation de réservation par email en quelques secondes après le paiement.",
  },
];

const FAQ = [
  {
    q: "Comment fonctionne Envol ?",
    a: "Envol est une plateforme de réservation de vols basée à Kinshasa. Vous entrez votre trajet, choisissez votre vol, et payez en ligne. Vous recevez immédiatement votre billet par email.",
  },
  {
    q: "Dois-je créer un compte pour réserver ?",
    a: "Non, aucun compte n'est nécessaire. Vous réservez directement et recevez une référence unique pour retrouver votre billet.",
  },
  {
    q: "Quels modes de paiement sont acceptés ?",
    a: "Nous acceptons Frako (paiement différé), VISA, Mastercard, PayPal et Bitcoin.",
  },
  {
    q: "Les prix incluent-ils les taxes et frais ?",
    a: "Oui, tous les prix affichés incluent les taxes aéroportuaires et les frais de service.",
  },
  {
    q: "Puis-je réserver pour plusieurs passagers ?",
    a: "Oui, vous pouvez réserver jusqu'à 9 passagers (adultes, enfants et bébés) en une seule réservation.",
  },
];

export default function AvantDeReserverPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e1b4b] via-brand-700 to-brand-500 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-200 text-sm font-medium uppercase tracking-widest mb-4">Avant de réserver</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Pourquoi choisir<br />Envol ?
          </h1>
          <p className="text-brand-100 text-lg max-w-xl mx-auto leading-relaxed">
            Découvrez tout ce qui rend Envol unique et comment nous simplifions la réservation de vols depuis la RDC.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-7 py-3.5 rounded-full hover:bg-brand-50 transition-colors"
            >
              Réserver maintenant <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Envol */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Ce qui nous rend différents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_ENVOL.map((item) => (
              <div key={item.title} className="flex gap-5 p-6 bg-brand-50 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                  {item.icon === "plane" && <Plane className="w-6 h-6 text-brand-600" />}
                  {item.icon === "card" && <CreditCard className="w-6 h-6 text-brand-600" />}
                  {item.icon === "shield" && <Shield className="w-6 h-6 text-brand-600" />}
                  {item.icon === "clock" && <Clock className="w-6 h-6 text-brand-600" />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Comment ça marche ?
          </h2>
          <div className="space-y-6">
            {[
              { step: "01", title: "Recherchez votre vol", desc: "Entrez votre ville de départ, destination, dates et nombre de passagers." },
              { step: "02", title: "Comparez et choisissez", desc: "Parcourez les vols disponibles, filtrez par prix ou durée, et sélectionnez le meilleur." },
              { step: "03", title: "Entrez vos informations", desc: "Renseignez les détails des passagers. Aucun compte requis." },
              { step: "04", title: "Payez en toute sécurité", desc: "Choisissez votre mode de paiement. Paiement sécurisé par cryptage SSL." },
              { step: "05", title: "Recevez votre billet", desc: "Confirmation instantanée par email avec votre référence Envol et votre billet électronique." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  {item.step}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-brand-400 flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="group bg-brand-50 rounded-2xl p-5 cursor-pointer">
                <summary className="font-semibold text-gray-900 list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-brand-600 text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à réserver votre vol ?</h2>
          <p className="text-brand-200 mb-8">Des centaines de destinations vous attendent depuis Kinshasa.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-full hover:bg-brand-50 transition-colors"
          >
            <Plane className="w-5 h-5" />
            Rechercher un vol
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
