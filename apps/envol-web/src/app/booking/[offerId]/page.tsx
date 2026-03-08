"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PassengerForm from "@/components/PassengerForm";
import FrakoPaymentOption from "@/components/FrakoPaymentOption";
import type { FlightOffer, PassengerInfo, PaymentMethod } from "@/lib/types";
import {
  formatTime,
  formatDate,
  formatDuration,
  formatPrice,
  getStopsLabel,
  getOfferStops,
  getMainAirline,
  getAirlineIata,
  airlineLogoUrl,
  installmentAmount,
} from "@/lib/utils";
import { createBooking } from "@/lib/api";
import { Plane, ArrowLeft, Clock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

const EMPTY_PASSENGER: PassengerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  nationality: "",
  passportNumber: "",
};

export default function BookingPage() {
  const { offerId } = useParams<{ offerId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [offer, setOffer] = useState<FlightOffer | null>(null);
  const [passenger, setPassenger] = useState<PassengerInfo>(EMPTY_PASSENGER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("full");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    const raw = searchParams.get("offer");
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw)) as FlightOffer;
        setOffer(parsed);
      } catch {
        setError("Impossible de charger les détails du vol.");
      }
    } else {
      setError("Vol introuvable. Veuillez relancer une recherche.");
    }
  }, [searchParams]);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!offer) return;

    setLoading(true);
    setError(null);

    try {
      const slice = offer.slices[0]!;
      const result = await createBooking({
        offerId: offer.id,
        passenger,
        paymentMethod,
        totalAmount: offer.totalAmount,
        currency: offer.currency,
        metadata: {
          origin: slice.origin.iataCode,
          destination: slice.destination.iataCode,
          departureAt: slice.departureAt,
          airline: getMainAirline(offer),
          airlineIata: getAirlineIata(offer),
        },
      });

      const envolRef = result.envol_reference;
      const params = new URLSearchParams({
        ref: envolRef,
        email: passenger.email,
        name: `${passenger.firstName} ${passenger.lastName}`,
        origin: slice.origin.iataCode,
        destination: slice.destination.iataCode,
        departureAt: slice.departureAt,
        airline: getMainAirline(offer),
        amount: String(offer.totalAmount),
        currency: offer.currency,
        paymentMethod,
        ...(result.airline_reference ? { airlineRef: result.airline_reference } : {}),
      });

      router.push(`/confirmation?${params.toString()}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur lors de la réservation";
      setError(msg);
      setLoading(false);
    }
  }

  function isPassengerValid(): boolean {
    return !!(
      passenger.firstName &&
      passenger.lastName &&
      passenger.email &&
      passenger.phone &&
      passenger.dateOfBirth &&
      passenger.nationality
    );
  }

  if (error && !offer) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-4">{error}</p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour à la recherche
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!offer) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full" />
        </div>
        <Footer />
      </>
    );
  }

  const slice = offer.slices[0]!;
  const stops = getOfferStops(offer);
  const airlineIata = getAirlineIata(offer);
  const airlineName = getMainAirline(offer);
  const inst3 = installmentAmount(offer.totalAmount, 3);
  const inst6 = installmentAmount(offer.totalAmount, 6);

  return (
    <>
      <Navbar />

      <div className="bg-brand-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/search?origin=${slice.origin.iataCode}&destination=${slice.destination.iataCode}`}
            className="inline-flex items-center gap-2 text-brand-200 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux résultats
          </Link>
          <h1 className="text-2xl font-bold">Finaliser la réservation</h1>
          <p className="text-brand-200 text-sm mt-1">
            {slice.origin.cityName} → {slice.destination.cityName} ·{" "}
            {formatDate(slice.departureAt)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-8">
          {[
            { n: 1, label: "Informations passager" },
            { n: 2, label: "Paiement" },
          ].map((s) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s.n
                    ? "bg-brand-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s.n ? <CheckCircle className="w-4 h-4" /> : s.n}
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= s.n ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
              {s.n < 2 && (
                <div className={`w-8 h-px mx-1 ${step > s.n ? "bg-brand-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleConfirm}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: form steps */}
            <div className="flex-1 space-y-6">
              {/* Step 1: Passenger info */}
              {step === 1 && (
                <div className="card">
                  <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Informations passager
                  </h2>
                  <PassengerForm value={passenger} onChange={setPassenger} />
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      disabled={!isPassengerValid()}
                      onClick={() => setStep(2)}
                      className="btn-primary w-full"
                    >
                      Continuer vers le paiement
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="card">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      Méthode de paiement
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-brand-600 hover:text-brand-800 font-medium"
                    >
                      Modifier les infos
                    </button>
                  </div>

                  {/* Passenger summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Passager</p>
                    <p className="font-semibold text-gray-900">{passenger.firstName} {passenger.lastName}</p>
                    <p className="text-sm text-gray-500">{passenger.email}</p>
                  </div>

                  <FrakoPaymentOption
                    totalAmount={offer.totalAmount}
                    currency={offer.currency}
                    selected={paymentMethod}
                    onChange={setPaymentMethod}
                  />

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100 flex gap-2 text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Montant total</span>
                      <span className="font-bold text-gray-900 text-base">
                        {formatPrice(offer.totalAmount, offer.currency)}
                      </span>
                    </div>
                    {paymentMethod === "frako_3x" && (
                      <p className="text-xs text-gray-500">
                        3 × {formatPrice(inst3, offer.currency)} prélevés automatiquement
                      </p>
                    )}
                    {paymentMethod === "frako_6x" && (
                      <p className="text-xs text-gray-500">
                        6 × {formatPrice(inst6, offer.currency)} prélevés automatiquement
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Confirmation en cours…
                        </>
                      ) : (
                        <>
                          <Plane className="w-4 h-4" />
                          Confirmer la réservation
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-400">
                      En confirmant, vous acceptez nos conditions générales.
                      Aucun compte requis.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: flight summary */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="card sticky top-20">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  Récapitulatif du vol
                </h3>

                {/* Airline */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={airlineLogoUrl(airlineIata)}
                      alt={airlineName}
                      className="w-7 h-7 object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{airlineName}</p>
                    <p className="text-xs text-gray-400">{slice.segments[0]?.flightNumber}</p>
                  </div>
                </div>

                {/* Route */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">{formatTime(slice.departureAt)}</p>
                      <p className="text-xs text-gray-500">{slice.origin.cityName} ({slice.origin.iataCode})</p>
                      <p className="text-xs text-gray-400">{formatDate(slice.departureAt)}</p>
                    </div>
                  </div>
                  <div className="ml-1 pl-3 border-l border-dashed border-gray-200 py-1">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(slice.durationMinutes)} · {getStopsLabel(stops)}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full border-2 border-brand-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">{formatTime(slice.arrivalAt)}</p>
                      <p className="text-xs text-gray-500">{slice.destination.cityName} ({slice.destination.iataCode})</p>
                      <p className="text-xs text-gray-400">{formatDate(slice.arrivalAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Prix du billet</span>
                    <span>{formatPrice(offer.totalAmount, offer.currency)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 pt-1.5 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-brand-700 text-lg">{formatPrice(offer.totalAmount, offer.currency)}</span>
                  </div>
                </div>

                {offer.baggageIncluded && (
                  <p className="text-xs text-emerald-600 mt-3 font-medium">✓ Bagage inclus</p>
                )}
                {offer.refundable && (
                  <p className="text-xs text-blue-600 mt-1 font-medium">✓ Billet remboursable</p>
                )}
              </div>
            </aside>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
