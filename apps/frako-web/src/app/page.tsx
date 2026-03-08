"use client";

import Link from "next/link";
import { useState } from "react";

// ─── Partner brands data ────────────────────────────────────────────────────
const PARTNERS = [
  { name: "TechShop Kinshasa", category: "Électronique", color: "bg-blue-600", initials: "TK", note: "Paiement en 3x sans frais" },
  { name: "Maison Élégance", category: "Mode & Vêtements", color: "bg-pink-500", initials: "ME", note: "Collections premium" },
  { name: "Foodie Market", category: "Alimentation", color: "bg-orange-500", initials: "FM", note: "Livraison express" },
  { name: "Auto Prestige RDC", category: "Automobile", color: "bg-gray-700", initials: "AP", note: "Paiement en 6x" },
  { name: "Pharma Plus", category: "Santé & Beauté", color: "bg-green-600", initials: "PP", note: "0% TAE pendant 3 mois" },
  { name: "Meubles Luxe", category: "Maison & Décor", color: "bg-yellow-600", initials: "ML", note: "Livraison offerte" },
  { name: "Voyages Kongo", category: "Voyage & Tourisme", color: "bg-teal-600", initials: "VK", note: "Paiement en 3x" },
  { name: "Sport Nation", category: "Sport & Loisirs", color: "bg-red-600", initials: "SN", note: "Équipement professionnel" },
];

// ─── Shopper view component ──────────────────────────────────────────────────
function ShopperView() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#3855f3] px-8 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Payez à votre<br />rythme
            </h1>
            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-md">
              Frako vous permet d'acheter maintenant et de payer plus tard dans vos boutiques préférées, sans frais cachés, sans frais de retard.
            </p>
            <button className="bg-white text-[#3855f3] px-7 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
              Découvrez l'expérience client
            </button>
          </div>
          {/* Visual placeholder */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
              <div className="bg-white rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900">Votre panier</span>
                  <span className="text-gray-400 text-sm">3 articles</span>
                </div>
                {[
                  { name: "Smartphone Galaxy A54", price: "320 $" },
                  { name: "Écouteurs Bluetooth", price: "45 $" },
                  { name: "Coque de protection", price: "12 $" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-3 font-bold text-gray-900">
                  <span>Total</span>
                  <span>377 $</span>
                </div>
                <div className="mt-3 bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-[#3855f3] text-sm font-medium">Ou 3 paiements de 125,67 $ avec</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="w-5 h-5 bg-[#3855f3] rounded-full flex items-center justify-center">
                      <span className="text-white font-black text-xs">F</span>
                    </div>
                    <span className="text-[#3855f3] font-bold">frako</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-[#3855f3] text-white py-2.5 rounded-xl font-semibold text-sm">
                  Passer la commande
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why you'll love Frako */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-14">
            Pourquoi vous allez adorer Frako
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-[#3855f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Aucun frais caché",
                desc: "Vous voyez exactement combien vous paierez dès le départ. Pas de mauvaises surprises.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-[#3855f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Approbation instantanée",
                desc: "Décision en quelques secondes. Aucun paperwork, aucune attente interminable.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-[#3855f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Flexibilité totale",
                desc: "Choisissez 3 ou 6 mensualités selon votre budget. Payez à votre propre rythme.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Choisissez simplement Frako<br />au moment du paiement.
          </h2>
          <p className="text-gray-500 text-center mb-12 text-base">
            Des centaines de boutiques partenaires acceptent Frako en RDC et en Afrique.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition cursor-pointer group"
              >
                <div className={`${partner.color} h-32 flex items-center justify-center`}>
                  <span className="text-white font-black text-4xl opacity-80">{partner.initials}</span>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-gray-900 text-sm">{partner.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{partner.category}</p>
                  {partner.note && (
                    <p className="text-xs text-[#3855f3] mt-1 font-medium">{partner.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="border-2 border-[#3855f3] text-[#3855f3] px-8 py-3 rounded-full font-semibold hover:bg-[#3855f3] hover:text-white transition text-sm">
              Voir tous les partenaires
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-14">Comment ça marche</h2>
          <div className="space-y-10">
            {[
              {
                n: "01",
                title: "Personnalisez votre solution",
                desc: "Choisissez la solution la plus adaptée à votre situation, avec des mensualités personnalisées, des durées plus longues et l'option d'un TAEG de 0 %.",
              },
              {
                n: "02",
                title: "Minimisez vos risques",
                desc: "Nous vous aidons à gérer les risques, qu'il s'agisse de restructurations coûteuses ou de fraudes.",
              },
              {
                n: "03",
                title: "Profitez de transactions sans encombre",
                desc: "Nous vous payons d'avance, dans un délai de 1 à 3 jours ouvrables suivant l'achat.",
              },
              {
                n: "04",
                title: "Démarrer est facile",
                desc: "De l'inscription au lancement, l'intégration avec Frako est simple — et nous sommes là pour vous aider.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-6 items-start">
                <span className="text-5xl font-black text-[#3855f3]/10 shrink-0 w-16 text-right">{item.n}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Business form view ──────────────────────────────────────────────────────
function BusinessView() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    industry: "",
    country: "",
    revenue: "",
    avgOrder: "",
    platform: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/v1/merchants/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error ?? "Une erreur est survenue. Veuillez réessayer.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  const sel = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#3855f3] text-gray-600";
  const inp = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3] placeholder-gray-400";
  const chevron = (
    <svg className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div>
      {/* Hero split */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="pt-4">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Achetez maintenant,<br />payez plus tard<br />pour votre<br />entreprise, mais<br />de façon plus<br />intelligente.
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-sm">
            Frako offre à vos clients une solution de paiement fractionné sans frais cachés ni mauvaises surprises. Proposez des plans flexibles pour élargir votre clientèle et augmenter le panier moyen.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-7">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée!</h3>
              <p className="text-gray-500 text-sm mb-1">Vérifiez votre boite email.</p>
              <p className="text-gray-400 text-xs mb-6">Notre équipe vous contactera dans les 24–48h.</p>
              <Link href="/login" className="bg-[#3855f3] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
                Se connecter
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Prénom" required value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inp} />
                <input type="text" placeholder="Nom de famille" required value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="email" placeholder="Courriel professionnel" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} className={inp} />
                <input type="url" placeholder="Site web" value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })} className={inp} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select required value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className={sel}>
                    <option value="" disabled>Industrie</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="retail">Commerce de détail</option>
                    <option value="fashion">Mode & Vêtements</option>
                    <option value="electronics">Électronique</option>
                    <option value="food">Alimentation</option>
                    <option value="services">Services</option>
                    <option value="health">Santé & Beauté</option>
                    <option value="other">Autre</option>
                  </select>{chevron}
                </div>
                <div className="relative">
                  <select required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={sel}>
                    <option value="" disabled>Pays</option>
                    <option value="cd">Congo (RDC)</option>
                    <option value="cg">Congo (Brazza)</option>
                    <option value="cm">Cameroun</option>
                    <option value="ci">Côte d'Ivoire</option>
                    <option value="sn">Sénégal</option>
                  </select>{chevron}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} className={sel}>
                    <option value="" disabled>Revenus annuels</option>
                    <option value="0-10k">Moins de 10 000 $</option>
                    <option value="10k-50k">10 000 – 50 000 $</option>
                    <option value="50k-200k">50 000 – 200 000 $</option>
                    <option value="200k+">Plus de 200 000 $</option>
                  </select>{chevron}
                </div>
                <div className="relative">
                  <select value={form.avgOrder} onChange={(e) => setForm({ ...form, avgOrder: e.target.value })} className={sel}>
                    <option value="" disabled>Valeur moyenne des commandes</option>
                    <option value="0-50">Moins de 50 $</option>
                    <option value="50-200">50 – 200 $</option>
                    <option value="200-500">200 – 500 $</option>
                    <option value="500+">Plus de 500 $</option>
                  </select>{chevron}
                </div>
              </div>
              <div className="relative">
                <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className={sel}>
                  <option value="" disabled>Plateforme de commerce électronique</option>
                  <option value="shopify">Shopify</option>
                  <option value="woocommerce">WooCommerce</option>
                  <option value="wix">Wix</option>
                  <option value="custom">Site personnalisé</option>
                  <option value="none">Aucune (physique)</option>
                </select>{chevron}
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border-2 shrink-0 transition ${form.consent ? "bg-[#3855f3] border-[#3855f3]" : "border-gray-400"}`}
                  onClick={() => setForm({ ...form, consent: !form.consent })}
                >
                  {form.consent && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  En cochant cette case, j'accepte de recevoir des courriels et communications de la part de Frako. Je peux retirer mon autorisation à tout moment.
                </p>
              </label>
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2">{submitError}</div>
              )}
              <button type="submit" disabled={loading || !form.consent}
                className="w-full bg-[#3855f3] text-white py-3 rounded-full font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition mt-2">
                {loading ? "Envoi en cours..." : "Commencer"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white/10 backdrop-blur border-t border-white/10 py-10">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-white">+30%</p>
            <p className="text-white/70 text-sm mt-1">Panier moyen</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-white">5 min</p>
            <p className="text-white/70 text-sm mt-1">Temps d'intégration</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-white">0 $</p>
            <p className="text-white/70 text-sm mt-1">Frais d'installation</p>
          </div>
        </div>
      </section>

      {/* Integration steps */}
      <section id="integration" className="bg-white py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Intégration en 3 étapes</h2>
          <p className="text-gray-500 text-center mb-12">Ajoutez le paiement fractionné à votre boutique en quelques minutes.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Inscrivez-vous", desc: "Créez votre compte marchand et obtenez votre Merchant ID et votre clé API.", code: null },
              { step: "02", title: "Installez le SDK", desc: "Ajoutez le package à votre projet.", code: "npm install @frako/sdk" },
              { step: "03", title: "Ajoutez le bouton", desc: "Intégrez FrakoButton sur vos pages de paiement.", code: '<FrakoButton amount={50000} currency="CDF" installments={3} />' },
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <span className="text-5xl font-black text-[#3855f3]/10">{item.step}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                {item.code && <code className="bg-gray-900 text-green-400 px-3 py-2 rounded-lg text-xs font-mono block overflow-x-auto">{item.code}</code>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Affirm-style footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-100">
          {/* Social + lang */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#3855f3] rounded-full flex items-center justify-center">
                <span className="text-white font-black text-sm">F</span>
              </div>
              <span className="text-gray-900 font-bold text-lg">frako</span>
            </div>
            <div className="flex gap-3 mb-6">
              {/* Instagram */}
              <a href="#" className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#3855f3] hover:text-[#3855f3] text-gray-500 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#3855f3] hover:text-[#3855f3] text-gray-500 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#3855f3] hover:text-[#3855f3] text-gray-500 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            {/* Language selector */}
            <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-600">
              <span>🇨🇩</span>
              <span>Congo (FR)</span>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* LES CONSOMMATEURS */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Les consommateurs</p>
            <ul className="space-y-2.5">
              {["Aide", "Comment ça marche", "Télécharger l'app", "Gérer mon compte"].map((l) => (
                <li key={l}><a href="#" className="text-sm text-gray-600 hover:text-[#3855f3] transition">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* POUR LES ENTREPRISES */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Pour les entreprises</p>
            <ul className="space-y-2.5">
              {[
                { label: "Pour les développeurs", href: "#integration" },
                { label: "Soutien aux entreprises", href: "#" },
                { label: "Devenir partenaire", href: "#" },
                { label: "Documentation API", href: "#" },
              ].map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm text-gray-600 hover:text-[#3855f3] transition">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* À PROPOS DE FRAKO */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">À propos de Frako</p>
            <ul className="space-y-2.5">
              {["À propos de nous", "Carrières", "Investisseurs", "Presse"].map((l) => (
                <li key={l}><a href="#" className="text-sm text-gray-600 hover:text-[#3855f3] transition">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-6">
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Options de paiement offertes par Frako Technologies SARL. Votre taux annuel en pourcentage (TAP) actu de 0% à 30% selon des restrictions réglementaires provinciales et selon la disponibilité. Le TAEG de 0% est basé sur votre solvabilité et est soumis à une vérification d'admissibilité.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 transition">Conditions d'utilisation de la confidentialité</a>
            <a href="#" className="hover:text-gray-600 transition">Politique relative aux cookies</a>
            <a href="#" className="hover:text-gray-600 transition">Gérer mes préférences de cookies</a>
            <span>© 2024 Frako Technologies. Tous droits réservés.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function FrakoMerchantHome() {
  const [activeTab, setActiveTab] = useState<"shoppers" | "business">("business");

  return (
    <div className={activeTab === "shoppers" ? "min-h-screen bg-white" : "min-h-screen bg-[#3855f3]"}>
      {/* Navigation */}
      <nav className={`flex items-center justify-between px-8 py-4 border-b ${activeTab === "shoppers" ? "bg-white border-gray-100" : "border-white/10"}`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activeTab === "shoppers" ? "bg-[#3855f3]" : "bg-white"}`}>
              <span className={`font-black text-lg ${activeTab === "shoppers" ? "text-white" : "text-[#3855f3]"}`}>F</span>
            </div>
            <span className={`font-bold text-2xl tracking-tight ${activeTab === "shoppers" ? "text-gray-900" : "text-white"}`}>frako</span>
          </div>
          <div className={`hidden md:flex border rounded-full overflow-hidden ${activeTab === "shoppers" ? "border-gray-200" : "border-white/30"}`}>
            <button
              onClick={() => setActiveTab("shoppers")}
              className={`px-5 py-2 text-sm font-medium transition ${
                activeTab === "shoppers"
                  ? "bg-[#3855f3] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Pour les acheteurs
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-5 py-2 text-sm font-medium transition ${
                activeTab === "business"
                  ? "bg-white text-[#3855f3]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Pour les entreprises
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition ${
              activeTab === "shoppers"
                ? "text-gray-700 border-gray-300 hover:bg-gray-50"
                : "text-white border-white/40 hover:bg-white/10"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Se connecter
          </Link>
        </div>
      </nav>

      {activeTab === "shoppers" ? <ShopperView /> : <BusinessView />}

      <Footer />
    </div>
  );
}
