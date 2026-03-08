// ─── Search ──────────────────────────────────────────────────────────────────

export type CabinClass = "economy" | "premium_economy" | "business" | "first";
export type TripType = "one_way" | "round_trip";

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: CabinClass;
  tripType: TripType;
}

// ─── Airport ─────────────────────────────────────────────────────────────────

export interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
  countryName: string;
  countryCode: string;
}

// ─── Offer / Flight ──────────────────────────────────────────────────────────

export interface FlightOffer {
  id: string;
  totalAmount: number;
  currency: string;
  slices: FlightSlice[];
  validUntil: string;
  baggageIncluded: boolean;
  refundable: boolean;
  source: "duffel" | "mock";
}

export interface FlightSlice {
  id: string;
  origin: Airport;
  destination: Airport;
  departureAt: string;
  arrivalAt: string;
  durationMinutes: number;
  segments: FlightSegment[];
}

export interface FlightSegment {
  id: string;
  flightNumber: string;
  airlineIata: string;
  airlineName: string;
  aircraft?: string;
  departureAt: string;
  arrivalAt: string;
  durationMinutes: number;
  origin: Airport;
  destination: Airport;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export type PaymentMethod = "full" | "frako_3x" | "frako_6x";

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
}

export interface BookingPayload {
  offerId: string;
  passenger: PassengerInfo;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  currency: string;
  // Snapshot of offer for record
  offerSnapshot?: Partial<FlightOffer>;
}

export interface BookingConfirmation {
  envolRef: string;
  airlineRef?: string;
  duffelOrderId?: string;
  email: string;
  passengerName: string;
  origin: string;
  destination: string;
  departureAt: string;
  airline: string;
  totalAmount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  frakoOrderId?: string;
  status: "confirmed" | "pending" | "failed";
}

// ─── Retrieval ────────────────────────────────────────────────────────────────

export interface BookingLookupResult {
  envolRef: string;
  airlineRef?: string;
  passengerName: string;
  email: string;
  origin: string;
  destination: string;
  departureAt: string;
  airline: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

// ─── Duffel raw (minimal) ────────────────────────────────────────────────────

export interface DuffelOffer {
  id: string;
  total_amount: string;
  total_currency: string;
  valid_until: string;
  slices: DuffelSlice[];
  conditions: {
    change_before_departure?: { allowed: boolean };
    refund_before_departure?: { allowed: boolean };
  };
}

export interface DuffelSlice {
  id: string;
  origin: DuffelPlace;
  destination: DuffelPlace;
  departure_datetime: string;
  arrival_datetime: string;
  duration: string;
  segments: DuffelSegment[];
}

export interface DuffelSegment {
  id: string;
  marketing_carrier_flight_number: string;
  marketing_carrier: { iata_code: string; name: string };
  aircraft?: { name: string };
  departing_at: string;
  arriving_at: string;
  duration: string;
  origin: DuffelPlace;
  destination: DuffelPlace;
}

export interface DuffelPlace {
  iata_code: string;
  name: string;
  city_name: string;
  iata_country_code: string;
}
