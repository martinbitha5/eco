"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { lookupBooking } from "@/lib/api";
import type { BookingLookupResult } from "@/lib/types";
import { formatDateTime, formatPrice } from "@/lib/utils";
import {
  Search,
  Plane,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  confirmed: {
    label: "Confirmé",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
  },
  pending: {
    label: "En attente",
    color: "text-amber-700 bg-amber-50 border-amber-200",
    icon: <Clock className="w-4 h-4 text-amber-600" />,
  },
  failed: {
    label: "Échoué",
    color: "text-red-700 bg-red-50 border-red-200",
    icon: <XCircle className="w-4 h-4 text-red-600" />,
  },
};

export default function MyBookingContent() {
  const searchParams = useSearchParams();

  const [ref, setRef] = useState(searchParams.get("ref") ?? "");
  const [email, setEmail] = useState(
    decodeURIComponent(searchParams.get("email") ?? "")
  );
  const [booking, setBooking] = useState<BookingLookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!ref.trim() || !email.trim()) return;

    setLoading(true);
    setError(null);
    setBooking(null);
    setSearched(false);

    try {
      const result = await lookupBooking(ref.trim(), email.trim());
      setBooking(result);
      setSearched(true);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Réservation introuvable";
      setError(msg);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  const statusConfig =
    booking?.status
      ? STATUS_CONFIG[booking.status] ?? STATUS_CONFIG["pending"]
      : null;

  return (
    <div>
      {/* Search form — AA Image 3 style */}
      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div className="relative">
          <input
            type="text"
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-200 transition font-mono uppercase tracking-widest pr-10"
            placeholder="Numéro de réservation"
            value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())}
            required
            maxLength={15}
          />
          <button
            type="button"
            title="Format : ENV suivi de 8 caractères"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>

        <input
          type="email"
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-200 transition"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <button
          type="submit"
          disabled={loading || !ref.trim() || !email.trim()}
          className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Recherche en cours…
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Error */}
      {searched && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800 mb-1">
              Réservation introuvable
            </p>
            <p className="text-sm text-red-700">{error}</p>
            <p className="text-sm text-red-600 mt-2">
              Vérifiez la référence et l'email utilisés lors de la réservation.
            </p>
          </div>
        </div>
      )}

      {/* Result */}
      {booking && (
        <div className="space-y-4 animate-slide-up">
          {/* Status banner */}
          <div
            className={`flex items-center gap-3 p-4 rounded-2xl border ${statusConfig?.color ?? ""}`}
          >
            {statusConfig?.icon}
            <div>
              <p className="font-semibold text-sm">
                Réservation {statusConfig?.label ?? booking.status}
              </p>
              <p className="text-xs opacity-75">
                Créée le {formatDateTime(booking.createdAt)}
              </p>
            </div>
          </div>

          {/* References */}
          <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white rounded-2xl p-6">
            <p className="text-brand-200 text-xs font-semibold uppercase tracking-wide mb-4">
              Vos références
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-xs text-brand-300 mb-1">Référence Envol</p>
                <div className="flex items-center gap-1">
                  <p className="font-mono font-bold tracking-wider">
                    {booking.envolRef}
                  </p>
                  <CopyButton text={booking.envolRef} />
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-xs text-brand-300 mb-1">Réf. compagnie</p>
                {booking.airlineRef ? (
                  <div className="flex items-center gap-1">
                    <p className="font-mono font-bold tracking-wider">
                      {booking.airlineRef}
                    </p>
                    <CopyButton text={booking.airlineRef} />
                  </div>
                ) : (
                  <p className="text-white/60 text-sm">En attente</p>
                )}
              </div>
            </div>
          </div>

          {/* Flight details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Plane className="w-4 h-4 text-brand-600" />
              Détails du vol
            </h3>
            <div className="space-y-3">
              {booking.origin && booking.destination && (
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-800">
                    {booking.origin}
                  </span>
                  <ArrowRight className="w-4 h-4 text-brand-500" />
                  <span className="text-lg font-bold text-gray-800">
                    {booking.destination}
                  </span>
                </div>
              )}
              {booking.departureAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Départ</span>
                  <span className="font-medium">
                    {formatDateTime(booking.departureAt)}
                  </span>
                </div>
              )}
              {booking.airline && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Compagnie</span>
                  <span className="font-medium">{booking.airline}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Passager</span>
                <span className="font-medium">{booking.passengerName}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-gray-500">Montant</span>
                <span className="font-bold text-brand-700">
                  {formatPrice(booking.amount, booking.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help */}
      {!searched && (
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Vous n'avez pas encore de réservation ?{" "}
            <a
              href="/"
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Rechercher un vol →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
