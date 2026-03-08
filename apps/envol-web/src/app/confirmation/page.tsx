import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CopyButton from "@/components/CopyButton";
import { CheckCircle, Plane, Mail, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDateTime, formatPrice, PAYMENT_LABELS } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/types";

interface ConfirmationPageProps {
  searchParams: {
    ref?: string;
    airlineRef?: string;
    email?: string;
    name?: string;
    origin?: string;
    destination?: string;
    departureAt?: string;
    airline?: string;
    amount?: string;
    currency?: string;
    paymentMethod?: string;
  };
}

export default function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const {
    ref,
    airlineRef,
    email,
    name,
    origin,
    destination,
    departureAt,
    airline,
    amount,
    currency = "USD",
    paymentMethod = "full",
  } = searchParams;

  if (!ref) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 text-center">
          <div>
            <p className="text-gray-600 mb-4">Page de confirmation invalide.</p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isFrako = paymentMethod === "frako_3x" || paymentMethod === "frako_6x";
  const paymentLabel = PAYMENT_LABELS[paymentMethod as PaymentMethod] ?? paymentMethod;

  return (
    <>
      <Navbar />

      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Success header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Réservation confirmée !
            </h1>
            <p className="text-gray-500">
              {name ? `Félicitations ${name.split(" ")[0]}, votre vol a été réservé.` : "Votre vol a été réservé avec succès."}
            </p>
          </div>

          {/* References card — the most important */}
          <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white rounded-3xl p-8 mb-6 animate-slide-up">
            <p className="text-brand-200 text-sm font-semibold uppercase tracking-wide mb-6 text-center">
              Conservez précieusement ces références
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Envol reference */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <p className="text-xs font-semibold text-brand-300 uppercase tracking-wide mb-2">
                  Référence Envol
                </p>
                <div className="flex items-center">
                  <p className="text-2xl font-extrabold tracking-widest text-white font-mono">
                    {ref}
                  </p>
                  <CopyButton text={ref} />
                </div>
                <p className="text-xs text-brand-300 mt-2">
                  Pour récupérer votre billet sur Envol
                </p>
              </div>

              {/* Airline reference */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <p className="text-xs font-semibold text-brand-300 uppercase tracking-wide mb-2">
                  Référence compagnie
                </p>
                {airlineRef ? (
                  <div className="flex items-center">
                    <p className="text-2xl font-extrabold tracking-widest text-white font-mono">
                      {airlineRef}
                    </p>
                    <CopyButton text={airlineRef} />
                  </div>
                ) : (
                  <p className="text-white/70 text-sm">
                    Sera communiquée par email dans les 24h
                  </p>
                )}
                <p className="text-xs text-brand-300 mt-2">
                  À présenter à l'aéroport
                </p>
              </div>
            </div>
          </div>

          {/* Flight details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4 animate-slide-up">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Plane className="w-4 h-4 text-brand-600" />
              Détails du vol
            </h2>
            <div className="space-y-3">
              {origin && destination && (
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-800">{origin}</span>
                  <ArrowRight className="w-4 h-4 text-brand-500" />
                  <span className="text-lg font-bold text-gray-800">{destination}</span>
                </div>
              )}
              {departureAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date de départ</span>
                  <span className="font-medium text-gray-800">{formatDateTime(departureAt)}</span>
                </div>
              )}
              {airline && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Compagnie</span>
                  <span className="font-medium text-gray-800">{airline}</span>
                </div>
              )}
              {email && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-800">{email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4 animate-slide-up">
            <h2 className="font-bold text-gray-900 mb-4">Paiement</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Méthode</span>
                <span className="font-medium text-gray-800">{paymentLabel}</span>
              </div>
              {amount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Montant total</span>
                  <span className="font-bold text-brand-700 text-base">
                    {formatPrice(parseFloat(amount), currency)}
                  </span>
                </div>
              )}
            </div>

            {isFrako && (
              <div className="mt-4 p-4 bg-gold-50 rounded-xl border border-gold-100 flex gap-3">
                <Zap className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Finalisez votre paiement Frako
                  </p>
                  <p className="text-xs text-gray-600">
                    Vous allez recevoir un lien par SMS pour finaliser le paiement
                    fractionné via l'application Frako. Ouvrez l'app Frako pour
                    confirmer vos mensualités.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Email notification */}
          <div className="bg-brand-50 rounded-2xl border border-brand-100 p-5 mb-6 flex gap-3 animate-slide-up">
            <Mail className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-brand-900 mb-1">
                Billet envoyé par email
              </p>
              <p className="text-xs text-brand-700">
                Votre billet et toutes les informations de voyage ont été envoyés à{" "}
                <strong>{email}</strong>. Pensez à vérifier vos spams.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/my-booking?ref=${ref}&email=${encodeURIComponent(email ?? "")}`}
              className="btn-primary flex-1 text-center flex items-center justify-center gap-2"
            >
              <Plane className="w-4 h-4" />
              Voir mon billet
            </Link>
            <Link
              href="/"
              className="btn-secondary flex-1 text-center flex items-center justify-center gap-2"
            >
              Nouvelle recherche
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
