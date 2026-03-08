import { format, parseISO, differenceInMinutes } from "date-fns";
import { fr } from "date-fns/locale";
import type { FlightOffer, CabinClass, PaymentMethod } from "./types";

// ─── Date / Time ──────────────────────────────────────────────────────────────

export function formatDateTime(iso: string): string {
  return format(parseISO(iso), "dd MMM yyyy, HH:mm", { locale: fr });
}

export function formatDate(iso: string): string {
  return format(parseISO(iso), "dd MMMM yyyy", { locale: fr });
}

export function formatTime(iso: string): string {
  return format(parseISO(iso), "HH:mm");
}

export function formatShortDate(iso: string): string {
  return format(parseISO(iso), "dd MMM", { locale: fr });
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h${m.toString().padStart(2, "0")}`;
}

export function parseDuffelDuration(iso8601: string): number {
  const match = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] ?? "0");
  const mins = parseInt(match[2] ?? "0");
  return hours * 60 + mins;
}

export function minutesBetween(dep: string, arr: string): number {
  return Math.abs(differenceInMinutes(parseISO(arr), parseISO(dep)));
}

// ─── Money ────────────────────────────────────────────────────────────────────

export function formatPrice(amount: number, currency: string = "USD"): string {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "CDF" ? "FC" : currency;
  return `${symbol}${amount.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function installmentAmount(total: number, installments: 3 | 6): number {
  return Math.ceil(total / installments);
}

// ─── Payment ──────────────────────────────────────────────────────────────────

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  full: "Paiement complet",
  frako_3x: "Payer en 3x avec Frako",
  frako_6x: "Payer en 6x avec Frako",
};

export const CABIN_LABELS: Record<CabinClass, string> = {
  economy: "Économique",
  premium_economy: "Économique Premium",
  business: "Affaires",
  first: "Première",
};

// ─── Offer ────────────────────────────────────────────────────────────────────

export function getOfferStops(offer: FlightOffer): number {
  return offer.slices.reduce((max, slice) => Math.max(max, slice.segments.length - 1), 0);
}

export function getOfferDuration(offer: FlightOffer): number {
  return offer.slices.reduce((sum, slice) => sum + slice.durationMinutes, 0);
}

export function getStopsLabel(stops: number): string {
  if (stops === 0) return "Direct";
  if (stops === 1) return "1 escale";
  return `${stops} escales`;
}

export function getMainAirline(offer: FlightOffer): string {
  return offer.slices[0]?.segments[0]?.airlineName ?? "Compagnie inconnue";
}

export function getAirlineIata(offer: FlightOffer): string {
  return offer.slices[0]?.segments[0]?.airlineIata ?? "XX";
}

// ─── Airline logos via Duffel CDN ────────────────────────────────────────────

export function airlineLogoUrl(iata: string): string {
  return `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${iata}.svg`;
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function getAirportLabel(code: string, name: string, city: string): string {
  return `${city} (${code}) — ${name}`;
}
