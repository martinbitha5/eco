/**
 * Backend API client — calls packages/api (Express)
 * Used server-side (Server Actions) and client-side.
 */
import type { BookingLookupResult, PassengerInfo, PaymentMethod } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body?.error ?? `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export interface CreateBookingInput {
  passenger: PassengerInfo;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  currency: string;
  offerId: string;
  airlineReference?: string;
  duffelOrderId?: string;
  frakoOrderId?: string;
  metadata?: Record<string, unknown>;
}

export async function createBooking(
  input: CreateBookingInput
): Promise<RawBookingRow & { message?: string }> {
  return apiFetch("/api/v1/envol/bookings", {
    method: "POST",
    body: JSON.stringify({
      passengerEmail: input.passenger.email,
      passengerName: `${input.passenger.firstName} ${input.passenger.lastName}`,
      amount: input.totalAmount,
      currency: input.currency,
      airlineReference: input.airlineReference,
      duffelOrderId: input.duffelOrderId,
      frakoOrderId: input.frakoOrderId,
      metadata: {
        offerId: input.offerId,
        paymentMethod: input.paymentMethod,
        passenger: input.passenger,
        ...input.metadata,
      },
    }),
  });
}

// Raw shape returned by the API (Supabase snake_case)
interface RawBookingRow {
  id: string;
  envol_reference: string;
  airline_reference?: string;
  passenger_email: string;
  passenger_name?: string;
  amount: number;
  currency: string;
  status: string;
  metadata?: {
    origin?: string;
    destination?: string;
    departureAt?: string;
    airline?: string;
    paymentMethod?: string;
  };
  created_at: string;
}

function mapBookingRow(row: RawBookingRow): BookingLookupResult {
  return {
    envolRef: row.envol_reference,
    airlineRef: row.airline_reference,
    passengerName: row.passenger_name ?? row.passenger_email,
    email: row.passenger_email,
    origin: row.metadata?.origin ?? "",
    destination: row.metadata?.destination ?? "",
    departureAt: row.metadata?.departureAt ?? "",
    airline: row.metadata?.airline ?? "",
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status,
    createdAt: row.created_at,
    metadata: row.metadata as Record<string, unknown>,
  };
}

export async function lookupBooking(
  ref: string,
  email: string
): Promise<BookingLookupResult> {
  const raw = await apiFetch<RawBookingRow>(
    `/api/v1/envol/bookings/${encodeURIComponent(ref.toUpperCase())}?email=${encodeURIComponent(email)}`
  );
  return mapBookingRow(raw);
}
