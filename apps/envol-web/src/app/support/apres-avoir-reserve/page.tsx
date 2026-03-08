import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Plane, Download, Phone, Mail, MessageCircle, RefreshCw, AlertTriangle } from "lucide-react";

const SERVICES = [
  {
    icon: "download",
    title: "Télécharger votre billet",
    desc: "Retrouvez et téléchargez votre billet électronique à tout moment avec votre référence Envol et votre email.",
    cta: "Gérer ma réservation",
    href: "/my-booking",
  },
  {
    icon: "refresh",
    title: "Modifier votre réservation",
    desc: "Besoin de changer votre date de départ ou le nom d'un passager ? Contactez notre équipe dans les 24h.",
    cta: "Contacter le support",
    href: "/support/aide",
  },
  {
    icon: "alert",
    title: "Annulation et remboursement",
    desc: "Consultez notre politique d'annulation et faites une demande de remboursement selon les conditions de votre billet.",
    cta: "Politique d'annulation",
    href: "/support/aide",
  },
];

const CONTACT_OPTIONS = [
  {
    icon: "phone",
    title: "Téléphone",
    value: "+243 XXX XXX XXX",
    sub: "Lun–Ven, 8h–18h (heure de Kinshasa)",
  },
  {
    icon: "mail",
    title: "Email",
    value: "support@envol.cd",
    sub: "Réponse sous 2 heures ouvrées",
  },
  {
    icon: "chat",
    title: "Chat en direct",
    value: "Disponible sur le site",
    sub: "7j/7, 8h–22h",
  },
];

const CHECKLIST = [
  "Vérifiez que les noms correspondent exactement à vos documents d'identité",
  "Arrivez à l'aéroport au moins 2h avant pour les vols intérieurs RDC",
  "Arrivez 3h avant pour les vols internationaux",
  "Imprimez votre billet ou gardez-le accessible sur votre téléphone",
  "Vérifiez les exigences de visa pour votre destination",
  "Assurez-vous que votre passeport est valide pour au moins 6 mois",
];

export default function ApresAvoirReservePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e1b4b] via-brand-700 to-brand-500 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-200 text-sm font-medium uppercase tracking-widest mb-4">Après avoir réservé</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Votre voyage commence<br />maintenant
          </h1>
          <p className="text-brand-100 text-lg max-w-xl mx-auto leading-relaxed">
            Tout ce que vous devez savoir après votre réservation Envol — gestion, modifications et préparation au voyage.
          </p>
          <div className="mt-8">
            <Link
              href="/my-booking"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-7 py-3.5 rounded-full hover:bg-brand-50 transition-colors"
            >
              Gérer ma réservation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Gérez votre réservation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-brand-50 rounded-2xl p-6 flex flex-col">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                  {s.icon === "download" && <Download className="w-6 h-6 text-brand-600" />}
                  {s.icon === "refresh" && <RefreshCw className="w-6 h-6 text-brand-600" />}
                  {s.icon === "alert" && <AlertTriangle className="w-6 h-6 text-brand-600" />}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{s.desc}</p>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                >
                  {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-flight checklist */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Checklist avant le départ
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            Ne rien oublier pour un voyage sans stress
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4">
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-600 text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Contactez notre équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT_OPTIONS.map((c) => (
              <div key={c.title} className="flex flex-col items-center text-center p-6 bg-brand-50 rounded-2xl">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                  {c.icon === "phone" && <Phone className="w-7 h-7 text-brand-600" />}
                  {c.icon === "mail" && <Mail className="w-7 h-7 text-brand-600" />}
                  {c.icon === "chat" && <MessageCircle className="w-7 h-7 text-brand-600" />}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-sm font-semibold text-brand-600 mb-1">{c.value}</p>
                <p className="text-xs text-gray-400">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Retrouvez votre réservation</h2>
          <p className="text-brand-200 mb-8">Utilisez votre référence Envol et votre email pour accéder à votre billet.</p>
          <Link
            href="/my-booking"
            className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-full hover:bg-brand-50 transition-colors"
          >
            <Plane className="w-5 h-5" />
            Gérer ma réservation
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
