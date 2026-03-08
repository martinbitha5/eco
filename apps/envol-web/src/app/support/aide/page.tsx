import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Plane, Phone, Mail, MessageCircle, Search, FileText, CreditCard, AlertTriangle } from "lucide-react";

const TOPICS = [
  {
    icon: "search",
    title: "Recherche et réservation",
    items: [
      "Comment rechercher un vol depuis Kinshasa ?",
      "Comment comparer les prix ?",
      "Comment réserver pour un groupe ?",
      "Puis-je choisir mes sièges ?",
    ],
  },
  {
    icon: "card",
    title: "Paiement",
    items: [
      "Quels modes de paiement acceptez-vous ?",
      "Comment fonctionne le paiement Frako ?",
      "Mon paiement a échoué, que faire ?",
      "Où trouver ma facture ?",
    ],
  },
  {
    icon: "file",
    title: "Billets et réservations",
    items: [
      "Comment télécharger mon billet ?",
      "J'ai perdu ma référence Envol",
      "Comment modifier ma réservation ?",
      "Comment annuler et obtenir un remboursement ?",
    ],
  },
  {
    icon: "alert",
    title: "Problèmes et urgences",
    items: [
      "Mon vol a été annulé par la compagnie",
      "J'ai raté mon vol, que faire ?",
      "Bagage perdu — qui contacter ?",
      "Signaler un problème technique",
    ],
  },
];

const FAQ_AIDE = [
  {
    q: "Comment retrouver ma réservation si j'ai perdu ma référence ?",
    a: "Cherchez dans votre boîte email un message de confirmation envoyé depuis noreply@envol.cd. Votre référence commence par ENV. Si vous ne retrouvez pas l'email, contactez notre support avec votre nom complet et la date de réservation.",
  },
  {
    q: "Quel est le délai de remboursement ?",
    a: "Les remboursements sont traités dans un délai de 7 à 14 jours ouvrés après validation de votre demande, selon la politique d'annulation de la compagnie aérienne.",
  },
  {
    q: "Puis-je changer le nom d'un passager sur le billet ?",
    a: "Les changements de nom sont soumis aux politiques de la compagnie aérienne et peuvent entraîner des frais. Contactez notre équipe dans les 24h suivant la réservation pour toute modification.",
  },
  {
    q: "Mon vol a du retard, comment être informé ?",
    a: "Inscrivez-vous aux alertes de votre compagnie aérienne avec votre numéro de vol. Vous pouvez aussi vérifier le statut en temps réel sur le site de la compagnie.",
  },
  {
    q: "Comment obtenir une facture pour ma réservation ?",
    a: "Votre facture est jointe à l'email de confirmation. Vous pouvez également la télécharger depuis la page 'Gérer ma réservation' avec votre référence Envol.",
  },
];

export default function AidePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e1b4b] via-brand-700 to-brand-500 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-200 text-sm font-medium uppercase tracking-widest mb-4">Centre d&apos;aide</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Comment pouvons-nous<br />vous aider ?
          </h1>
          <p className="text-brand-100 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Trouvez rapidement une réponse à votre question ou contactez directement notre équipe.
          </p>
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une réponse..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-sm outline-none focus:ring-2 focus:ring-brand-300 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Parcourir les sujets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOPICS.map((topic) => (
              <div key={topic.title} className="bg-brand-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    {topic.icon === "search" && <Search className="w-5 h-5 text-brand-600" />}
                    {topic.icon === "card" && <CreditCard className="w-5 h-5 text-brand-600" />}
                    {topic.icon === "file" && <FileText className="w-5 h-5 text-brand-600" />}
                    {topic.icon === "alert" && <AlertTriangle className="w-5 h-5 text-brand-600" />}
                  </div>
                  <h3 className="font-bold text-gray-900">{topic.title}</h3>
                </div>
                <ul className="space-y-2">
                  {topic.items.map((item) => (
                    <li key={item}>
                      <button className="w-full text-left text-sm text-gray-600 hover:text-brand-600 flex items-center gap-2 py-1.5 transition-colors">
                        <ArrowRight className="w-3 h-3 flex-shrink-0 text-brand-300" />
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {FAQ_AIDE.map((item) => (
              <details key={item.q} className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer">
                <summary className="font-semibold text-gray-900 list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-brand-600 text-xl font-light group-open:rotate-45 transition-transform inline-block">+</span>
                </summary>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Vous n&apos;avez pas trouvé votre réponse ?
          </h2>
          <p className="text-center text-gray-500 mb-12">Notre équipe est disponible pour vous aider directement.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "phone", title: "Appelez-nous", value: "+243 XXX XXX XXX", sub: "Lun–Ven, 8h–18h", color: "bg-green-50", iconColor: "text-green-600" },
              { icon: "mail", title: "Envoyez un email", value: "support@envol.cd", sub: "Réponse sous 2h", color: "bg-blue-50", iconColor: "text-blue-600" },
              { icon: "chat", title: "Chat en direct", value: "Ouvrir le chat", sub: "7j/7 disponible", color: "bg-brand-50", iconColor: "text-brand-600" },
            ].map((c) => (
              <div key={c.title} className={`flex flex-col items-center text-center p-6 ${c.color} rounded-2xl`}>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                  {c.icon === "phone" && <Phone className={`w-7 h-7 ${c.iconColor}`} />}
                  {c.icon === "mail" && <Mail className={`w-7 h-7 ${c.iconColor}`} />}
                  {c.icon === "chat" && <MessageCircle className={`w-7 h-7 ${c.iconColor}`} />}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                <p className={`text-sm font-semibold ${c.iconColor} mb-1`}>{c.value}</p>
                <p className="text-xs text-gray-400">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Besoin de réserver ?</h2>
          <p className="text-brand-200 mb-8">Retournez à l&apos;accueil pour rechercher votre prochain vol.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-full hover:bg-brand-50 transition-colors"
          >
            <Plane className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
