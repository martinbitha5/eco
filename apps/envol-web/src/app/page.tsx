import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import { Plane, ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

// ─── Static data ──────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "plane" as const,
    title: "Trouvez votre vol idéal",
    desc: "Comparez des vols depuis Kinshasa vers plus de 600 destinations mondiales et choisissez parmi les meilleures options.",
  },
  {
    icon: "card" as const,
    title: "Payez en plusieurs fois",
    desc: "Nos partenariats exclusifs avec Frako vous donnent le pouvoir de répartir les coûts ou de payer plus tard.",
  },
  {
    icon: "shield" as const,
    title: "Réservez en toute confiance",
    desc: "Zéro compte requis. Confirmation instantanée avec votre référence Envol. Votre billet toujours accessible.",
  },
];

const DESTINATIONS_RDC = [
  { name: "Lubumbashi", sub: "Katanga", code: "FBM", flag: "🇨🇩", img: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=160&h=120&fit=crop&auto=format" },
  { name: "Goma", sub: "Nord-Kivu", code: "GOM", flag: "🇨🇩", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=160&h=120&fit=crop&auto=format" },
  { name: "Kisangani", sub: "Tshopo", code: "FKI", flag: "🇨🇩", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=160&h=120&fit=crop&auto=format" },
  { name: "Mbuji-Mayi", sub: "Kasaï Oriental", code: "MJM", flag: "🇨🇩", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=160&h=120&fit=crop&auto=format" },
  { name: "Bukavu", sub: "Sud-Kivu", code: "BKY", flag: "🇨🇩", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=160&h=120&fit=crop&auto=format" },
  { name: "Kolwezi", sub: "Lualaba", code: "KWZ", flag: "🇨🇩", img: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=160&h=120&fit=crop&auto=format" },
  { name: "Bunia", sub: "Ituri", code: "BUX", flag: "🇨🇩", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=160&h=120&fit=crop&auto=format" },
  { name: "Gbadolite", sub: "Nord-Ubangi", code: "BDT", flag: "🇨🇩", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=160&h=120&fit=crop&auto=format" },
];

const DESTINATIONS_INTL = [
  { name: "Lagos", sub: "Nigeria", code: "LOS", flag: "🇳🇬", img: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=160&h=120&fit=crop&auto=format" },
  { name: "Nairobi", sub: "Kenya", code: "NBO", flag: "🇰🇪", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=160&h=120&fit=crop&auto=format" },
  { name: "Johannesburg", sub: "Afrique du Sud", code: "JNB", flag: "🇿🇦", img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=160&h=120&fit=crop&auto=format" },
  { name: "Addis-Abeba", sub: "Éthiopie", code: "ADD", flag: "🇪🇹", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=160&h=120&fit=crop&auto=format" },
  { name: "Le Caire", sub: "Égypte", code: "CAI", flag: "🇪🇬", img: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=160&h=120&fit=crop&auto=format" },
  { name: "Casablanca", sub: "Maroc", code: "CMN", flag: "🇲🇦", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=160&h=120&fit=crop&auto=format" },
  { name: "Dakar", sub: "Sénégal", code: "DKR", flag: "🇸🇳", img: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=160&h=120&fit=crop&auto=format" },
  { name: "Abidjan", sub: "Côte d'Ivoire", code: "ABJ", flag: "🇨🇮", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=160&h=120&fit=crop&auto=format" },
  { name: "Douala", sub: "Cameroun", code: "DLA", flag: "🇨🇲", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=160&h=120&fit=crop&auto=format" },
  { name: "Brazzaville", sub: "Congo", code: "BZV", flag: "🇨🇬", img: "https://images.unsplash.com/photo-1569863959165-56dae551d4fc?w=160&h=120&fit=crop&auto=format" },
  { name: "Libreville", sub: "Gabon", code: "LBV", flag: "🇬🇦", img: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=160&h=120&fit=crop&auto=format" },
  { name: "Luanda", sub: "Angola", code: "LAD", flag: "🇦🇴", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=160&h=120&fit=crop&auto=format" },
  { name: "Dubaï", sub: "Émirats arabes unis", code: "DXB", flag: "🇦🇪", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=160&h=120&fit=crop&auto=format" },
];

const AIRLINES = ["AF", "SN", "EK", "ET", "KQ", "AT", "QR", "LH", "BA", "MS", "TK", "RB"];

const SUPPORT_CARDS = [
  {
    title: "Avant de réserver",
    desc: "Ce qui nous rend uniques et pourquoi vous devriez commencer à réserver vos vols avec Envol.",
    cta: "À propos de nous",
    href: "/support/avant-de-reserver",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=320&fit=crop&auto=format",
  },
  {
    title: "Après avoir réservé",
    desc: "Notre équipe de support est à votre disposition et disponible à chaque étape de votre voyage.",
    cta: "Notre service",
    href: "/support/apres-avoir-reserve",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=320&fit=crop&auto=format",
  },
  {
    title: "Besoin d'aide ?",
    desc: "Vous cherchez de l'aide supplémentaire ? Consultez notre centre d'aide pour toutes vos questions.",
    cta: "Centre d'aide",
    href: "/support/aide",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=320&fit=crop&auto=format",
  },
];

const PAYMENT_LOGOS = [
  { id: "frako" },
  { id: "visa" },
  { id: "paypal" },
  { id: "mastercard" },
  { id: "bitcoin" },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function EnvolHome() {
  const today = new Date().toISOString().split("T")[0]!;

  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#1e1b4b] via-[#4c1d95] to-[#c4b5fd] flex flex-col items-center pt-20 pb-0">
        {/* Headline */}
        <div className="text-center px-4 mb-8 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            Réservez vos vols.<br />Payez plus tard.
          </h1>
          <p className="text-brand-200 text-lg">
            Réservez votre vol idéal en toute confiance
          </p>
        </div>

        {/* Search form */}
        <div className="w-full max-w-4xl px-4 z-10">
          <SearchForm />
        </div>

        {/* Trust badge */}
        <div className="mt-5 mb-10 flex items-center gap-2 text-sm text-white/80">
          <span className="text-yellow-400">★★★★★</span>
          <span>Approuvé par plus de 10 000 clients chaque année</span>
        </div>

        {/* Cloud wave SVG */}
        <div className="w-full -mb-px">
          <svg viewBox="0 0 1440 100" fill="white" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
            <path d="M0,60 Q90,20 180,60 Q270,100 360,60 Q450,20 540,55 Q630,90 720,55 Q810,20 900,55 Q990,90 1080,55 Q1170,20 1260,55 Q1350,90 1440,60 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* ── Payment partners marquee ──────────────────────────────────────── */}
      <section className="py-5 border-b border-gray-100 bg-white overflow-hidden">
        <div className="flex items-center gap-8 animate-marquee w-max">
          {[...PAYMENT_LOGOS, ...PAYMENT_LOGOS].map((p, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center h-14 px-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              {p.id === "frako" && (
                <span className="text-brand-600 font-black text-xl tracking-tight">frako</span>
              )}
              {p.id === "visa" && (
                <span className="text-[#1a1f71] font-black text-2xl italic tracking-widest">VISA</span>
              )}
              {p.id === "paypal" && (
                <span className="text-lg font-black">
                  <span className="text-[#003087]">Pay</span><span className="text-[#009cde]">Pal</span>
                </span>
              )}
              {p.id === "mastercard" && (
                <span className="flex items-center gap-2">
                  <span className="flex -space-x-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#eb001b] inline-block" />
                    <span className="w-7 h-7 rounded-full bg-[#f79e1b] inline-block opacity-90" />
                  </span>
                  <span className="text-gray-700 font-semibold text-sm">Mastercard</span>
                </span>
              )}
              {p.id === "bitcoin" && (
                <span className="flex items-center gap-1.5">
                  <span className="text-orange-500 font-black text-xl">₿</span>
                  <span className="text-gray-700 font-semibold text-sm">Bitcoin</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 max-w-lg mx-auto leading-tight">
            L'avenir de la réservation de vols est arrivé
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-brand-50 rounded-3xl p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-5">
                  {f.icon === "plane" && <Plane className="w-8 h-8 text-brand-600" />}
                  {f.icon === "card" && <CreditCard className="w-8 h-8 text-brand-600" />}
                  {f.icon === "shield" && <ShieldCheck className="w-8 h-8 text-brand-600" />}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Frako split section ───────────────────────────────────────────── */}
      <section id="frako" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-14">
          <div className="flex-1 rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&h=560&fit=crop&auto=format"
              alt="Voyageurs heureux"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Étalez vos paiements, pas vos projets
            </h2>
            <p className="text-gray-500 leading-relaxed mb-7 text-base">
              La vie nous réserve des surprises et les plans changent. Mais cela ne devrait pas
              vous empêcher d'explorer le monde. Grâce à nos options de paiement flexibles avec
              Frako, retardez le coût, pas votre aventure, et voyagez quand vous êtes prêt.
            </p>
            <Link
              href="/my-booking"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Découvrez les options de paiement
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Destinations ─────────────────────────────────────────────────── */}
      <section id="destinations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 leading-tight">
            Destinations prêtes à être explorées
          </h2>
          <p className="text-center text-gray-500 mb-14 text-base">
            Depuis Kinshasa, volez partout en RDC et à travers toute l'Afrique
          </p>

          {/* RDC Domestic */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🇨🇩</span>
              <h3 className="text-xl font-bold text-gray-900">Vols intérieurs — RDC</h3>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {DESTINATIONS_RDC.map((d) => {
                const params = new URLSearchParams({ origin: "FIH", destination: d.code, departureDate: today, passengers: "1", cabinClass: "economy", tripType: "one_way" });
                return (
                  <Link key={d.code} href={`/search?${params.toString()}`}
                    className="flex items-center gap-3 p-3.5 bg-white border border-gray-100 rounded-2xl hover:border-brand-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-14 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">{d.name}</p>
                      <p className="text-xs text-gray-400">{d.sub}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* International Africa + Dubai */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🌍</span>
              <h3 className="text-xl font-bold text-gray-900">International — Afrique &amp; Dubaï</h3>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {DESTINATIONS_INTL.map((d) => {
                const params = new URLSearchParams({ origin: "FIH", destination: d.code, departureDate: today, passengers: "1", cabinClass: "economy", tripType: "one_way" });
                return (
                  <Link key={d.code} href={`/search?${params.toString()}`}
                    className="flex items-center gap-3 p-3.5 bg-white border border-gray-100 rounded-2xl hover:border-brand-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-14 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">{d.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <span>{d.flag}</span>{d.sub}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <Link href="/search"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Explorer toutes les destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Airlines marquee ─────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center leading-tight">
            Accédez aux compagnies<br />aériennes du monde entier
          </h2>
        </div>

        {/* Row 1 */}
        <div className="animate-marquee flex gap-4 mb-4 w-max">
          {[...AIRLINES, ...AIRLINES].map((iata, i) => (
            <div key={i} className="flex-shrink-0 w-44 h-24 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center px-4">
              <img
                src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${iata}.svg`}
                alt={iata}
                className="max-w-[120px] max-h-12 object-contain"
              />
            </div>
          ))}
        </div>

        {/* Row 2 (offset) */}
        <div className="animate-marquee flex gap-4 w-max" style={{ animationDelay: "-17s" }}>
          {[...AIRLINES.slice(5), ...AIRLINES.slice(0, 5), ...AIRLINES].map((iata, i) => (
            <div key={i} className="flex-shrink-0 w-44 h-24 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center px-4">
              <img
                src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${iata}.svg`}
                alt={iata}
                className="max-w-[120px] max-h-12 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors">
            Découvrez toutes les compagnies aériennes
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── Support section ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 leading-tight">
            Nous sommes à vos côtés<br />à chaque étape
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUPPORT_CARDS.map((s) => (
              <Link key={s.title} href={s.href} className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-100 transition-all group block">
                <div className="h-52 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 border border-brand-200 px-4 py-2 rounded-full group-hover:bg-brand-50 transition-colors">
                    {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── My booking CTA ───────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vous avez déjà une réservation ?</h2>
          <p className="text-gray-500 mb-6">Récupérez votre billet avec votre référence Envol et votre email.</p>
          <Link
            href="/my-booking"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
          >
            <Plane className="w-4 h-4" />
            Récupérer mon billet
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
