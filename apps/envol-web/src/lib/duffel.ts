/**
 * Duffel API client for Envol.
 * Falls back to realistic mock data when DUFFEL_API_KEY is not set.
 * All calls are server-side only (no NEXT_PUBLIC_ key exposure).
 */
import type {
  FlightOffer,
  FlightSearchParams,
  FlightSegment,
  DuffelOffer,
  Airport,
} from "./types";
import { parseDuffelDuration, minutesBetween } from "./utils";

const DUFFEL_BASE = "https://api.duffel.com";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function duffelHeaders() {
  return {
    Authorization: `Bearer ${process.env.DUFFEL_API_KEY}`,
    "Duffel-Version": "v2",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function mapDuffelOffer(raw: DuffelOffer): FlightOffer {
  return {
    id: raw.id,
    totalAmount: parseFloat(raw.total_amount),
    currency: raw.total_currency,
    validUntil: raw.valid_until,
    baggageIncluded: false,
    refundable: raw.conditions?.refund_before_departure?.allowed ?? false,
    source: "duffel",
    slices: raw.slices.map((s) => ({
      id: s.id,
      origin: {
        iataCode: s.origin.iata_code,
        name: s.origin.name,
        cityName: s.origin.city_name,
        countryName: "",
        countryCode: s.origin.iata_country_code,
      },
      destination: {
        iataCode: s.destination.iata_code,
        name: s.destination.name,
        cityName: s.destination.city_name,
        countryName: "",
        countryCode: s.destination.iata_country_code,
      },
      departureAt: s.departure_datetime,
      arrivalAt: s.arrival_datetime,
      durationMinutes: parseDuffelDuration(s.duration),
      segments: s.segments.map((seg) => ({
        id: seg.id,
        flightNumber: seg.marketing_carrier_flight_number,
        airlineIata: seg.marketing_carrier.iata_code,
        airlineName: seg.marketing_carrier.name,
        aircraft: seg.aircraft?.name,
        departureAt: seg.departing_at,
        arrivalAt: seg.arriving_at,
        durationMinutes: parseDuffelDuration(seg.duration),
        origin: {
          iataCode: seg.origin.iata_code,
          name: seg.origin.name,
          cityName: seg.origin.city_name,
          countryName: "",
          countryCode: seg.origin.iata_country_code,
        },
        destination: {
          iataCode: seg.destination.iata_code,
          name: seg.destination.name,
          cityName: seg.destination.city_name,
          countryName: "",
          countryCode: seg.destination.iata_country_code,
        },
      })),
    })),
  };
}

// ─── Real Duffel Search ───────────────────────────────────────────────────────

async function searchDuffel(params: FlightSearchParams): Promise<FlightOffer[]> {
  const passengers = Array.from({ length: params.passengers }, () => ({
    type: "adult",
  }));

  const slices: object[] = [
    {
      origin: params.origin,
      destination: params.destination,
      departure_date: params.departureDate,
    },
  ];

  if (params.tripType === "round_trip" && params.returnDate) {
    slices.push({
      origin: params.destination,
      destination: params.origin,
      departure_date: params.returnDate,
    });
  }

  // Step 1: Create offer request
  const reqRes = await fetch(`${DUFFEL_BASE}/air/offer_requests`, {
    method: "POST",
    headers: duffelHeaders(),
    body: JSON.stringify({
      data: {
        slices,
        passengers,
        cabin_class: params.cabinClass,
        return_offers: false,
      },
    }),
  });

  if (!reqRes.ok) {
    const err = await reqRes.text();
    throw new Error(`Duffel offer_request failed: ${err}`);
  }

  const reqData = await reqRes.json();
  const offerRequestId: string = reqData.data.id;

  // Step 2: Get offers
  const offersRes = await fetch(
    `${DUFFEL_BASE}/air/offers?offer_request_id=${offerRequestId}&limit=20`,
    { headers: duffelHeaders() }
  );

  if (!offersRes.ok) {
    const err = await offersRes.text();
    throw new Error(`Duffel offers fetch failed: ${err}`);
  }

  const offersData = await offersRes.json();
  return (offersData.data as DuffelOffer[]).map(mapDuffelOffer);
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const AIRPORTS: Record<string, Airport> = {
  FIH: { iataCode: "FIH", name: "Aéroport International de N'Djili", cityName: "Kinshasa", countryName: "République démocratique du Congo", countryCode: "CD" },
  CDG: { iataCode: "CDG", name: "Charles de Gaulle", cityName: "Paris", countryName: "France", countryCode: "FR" },
  BRU: { iataCode: "BRU", name: "Brussels Airport", cityName: "Bruxelles", countryName: "Belgique", countryCode: "BE" },
  JNB: { iataCode: "JNB", name: "O.R. Tambo International", cityName: "Johannesburg", countryName: "Afrique du Sud", countryCode: "ZA" },
  NBO: { iataCode: "NBO", name: "Jomo Kenyatta International", cityName: "Nairobi", countryName: "Kenya", countryCode: "KE" },
  ADD: { iataCode: "ADD", name: "Bole International", cityName: "Addis-Abeba", countryName: "Éthiopie", countryCode: "ET" },
  CMN: { iataCode: "CMN", name: "Mohammed V International", cityName: "Casablanca", countryName: "Maroc", countryCode: "MA" },
  DXB: { iataCode: "DXB", name: "Dubai International", cityName: "Dubaï", countryName: "Émirats arabes unis", countryCode: "AE" },
  LOS: { iataCode: "LOS", name: "Murtala Muhammed International", cityName: "Lagos", countryName: "Nigeria", countryCode: "NG" },
  LBV: { iataCode: "LBV", name: "Léon-Mba International", cityName: "Libreville", countryName: "Gabon", countryCode: "GA" },
  DLA: { iataCode: "DLA", name: "Aéroport de Douala", cityName: "Douala", countryName: "Cameroun", countryCode: "CM" },
  ABJ: { iataCode: "ABJ", name: "Félix Houphouët-Boigny", cityName: "Abidjan", countryName: "Côte d'Ivoire", countryCode: "CI" },
};

function getAirport(code: string): Airport {
  return AIRPORTS[code] ?? {
    iataCode: code, name: code, cityName: code, countryName: "Unknown", countryCode: "XX",
  };
}

interface MockFlightTemplate {
  airlineIata: string;
  airlineName: string;
  flightNumber: string;
  depHour: number;
  depMin: number;
  durationMinutes: number;
  stopIata?: string;
  stopDuration?: number;
  priceBase: number;
  refundable: boolean;
  baggageIncluded: boolean;
}

const ROUTE_TEMPLATES: Record<string, MockFlightTemplate[]> = {
  "FIH-CDG": [
    { airlineIata: "AF", airlineName: "Air France", flightNumber: "AF880", depHour: 22, depMin: 30, durationMinutes: 480, priceBase: 850, refundable: false, baggageIncluded: true },
    { airlineIata: "SN", airlineName: "Brussels Airlines", flightNumber: "SN355", depHour: 10, depMin: 0, durationMinutes: 600, stopIata: "BRU", stopDuration: 90, priceBase: 780, refundable: true, baggageIncluded: true },
    { airlineIata: "AT", airlineName: "Royal Air Maroc", flightNumber: "AT508", depHour: 6, depMin: 45, durationMinutes: 720, stopIata: "CMN", stopDuration: 120, priceBase: 650, refundable: false, baggageIncluded: false },
  ],
  "FIH-BRU": [
    { airlineIata: "SN", airlineName: "Brussels Airlines", flightNumber: "SN353", depHour: 9, depMin: 50, durationMinutes: 510, priceBase: 720, refundable: true, baggageIncluded: true },
    { airlineIata: "SN", airlineName: "Brussels Airlines", flightNumber: "SN355", depHour: 22, depMin: 15, durationMinutes: 510, priceBase: 690, refundable: false, baggageIncluded: true },
    { airlineIata: "AF", airlineName: "Air France", flightNumber: "AF882", depHour: 14, depMin: 30, durationMinutes: 600, stopIata: "CDG", stopDuration: 80, priceBase: 800, refundable: false, baggageIncluded: true },
  ],
  "FIH-JNB": [
    { airlineIata: "ET", airlineName: "Ethiopian Airlines", flightNumber: "ET844", depHour: 7, depMin: 0, durationMinutes: 390, priceBase: 420, refundable: false, baggageIncluded: true },
    { airlineIata: "KQ", airlineName: "Kenya Airways", flightNumber: "KQ417", depHour: 11, depMin: 30, durationMinutes: 480, stopIata: "NBO", stopDuration: 90, priceBase: 380, refundable: false, baggageIncluded: true },
    { airlineIata: "QR", airlineName: "Qatar Airways", flightNumber: "QR1365", depHour: 2, depMin: 15, durationMinutes: 600, stopIata: "DXB", stopDuration: 110, priceBase: 550, refundable: true, baggageIncluded: true },
  ],
  "FIH-ADD": [
    { airlineIata: "ET", airlineName: "Ethiopian Airlines", flightNumber: "ET848", depHour: 6, depMin: 30, durationMinutes: 180, priceBase: 310, refundable: false, baggageIncluded: true },
    { airlineIata: "ET", airlineName: "Ethiopian Airlines", flightNumber: "ET850", depHour: 16, depMin: 0, durationMinutes: 180, priceBase: 340, refundable: true, baggageIncluded: true },
  ],
  "FIH-NBO": [
    { airlineIata: "KQ", airlineName: "Kenya Airways", flightNumber: "KQ415", depHour: 8, depMin: 15, durationMinutes: 240, priceBase: 290, refundable: false, baggageIncluded: true },
    { airlineIata: "ET", airlineName: "Ethiopian Airlines", flightNumber: "ET849", depHour: 13, depMin: 45, durationMinutes: 300, stopIata: "ADD", stopDuration: 60, priceBase: 270, refundable: false, baggageIncluded: true },
  ],
  "FIH-CMN": [
    { airlineIata: "AT", airlineName: "Royal Air Maroc", flightNumber: "AT504", depHour: 7, depMin: 0, durationMinutes: 360, priceBase: 480, refundable: false, baggageIncluded: false },
    { airlineIata: "AT", airlineName: "Royal Air Maroc", flightNumber: "AT506", depHour: 19, depMin: 30, durationMinutes: 360, priceBase: 510, refundable: true, baggageIncluded: true },
  ],
  "FIH-DXB": [
    { airlineIata: "EK", airlineName: "Emirates", flightNumber: "EK723", depHour: 1, depMin: 45, durationMinutes: 540, priceBase: 680, refundable: false, baggageIncluded: true },
    { airlineIata: "QR", airlineName: "Qatar Airways", flightNumber: "QR1362", depHour: 23, depMin: 55, durationMinutes: 600, stopIata: "NBO", stopDuration: 90, priceBase: 590, refundable: true, baggageIncluded: true },
  ],
  "FIH-LOS": [
    { airlineIata: "ET", airlineName: "Ethiopian Airlines", flightNumber: "ET844", depHour: 9, depMin: 0, durationMinutes: 210, priceBase: 220, refundable: false, baggageIncluded: true },
    { airlineIata: "KQ", airlineName: "Kenya Airways", flightNumber: "KQ417", depHour: 14, depMin: 30, durationMinutes: 240, priceBase: 195, refundable: false, baggageIncluded: false },
  ],
};

function buildMockOffer(
  tpl: MockFlightTemplate,
  origin: string,
  destination: string,
  depDateStr: string,
  idx: number
): FlightOffer {
  const id = `mock_${tpl.airlineIata}_${tpl.flightNumber}_${idx}`;
  const priceVariation = 1 + (Math.sin(idx * 13.7) * 0.08);
  const price = Math.round(tpl.priceBase * priceVariation);

  const depDate = new Date(depDateStr + "T" + String(tpl.depHour).padStart(2, "0") + ":" + String(tpl.depMin).padStart(2, "0") + ":00Z");

  const segments: FlightSegment[] = [];

  if (tpl.stopIata && tpl.stopDuration) {
    const leg1Dur = Math.round((tpl.durationMinutes - tpl.stopDuration) * 0.55);
    const arrStop = new Date(depDate.getTime() + leg1Dur * 60000);
    const depStop = new Date(arrStop.getTime() + tpl.stopDuration * 60000);
    const finalArr = new Date(depStop.getTime() + (tpl.durationMinutes - tpl.stopDuration - leg1Dur) * 60000);

    segments.push({
      id: `${id}_seg1`,
      flightNumber: tpl.flightNumber,
      airlineIata: tpl.airlineIata,
      airlineName: tpl.airlineName,
      departureAt: depDate.toISOString(),
      arrivalAt: arrStop.toISOString(),
      durationMinutes: leg1Dur,
      origin: getAirport(origin),
      destination: getAirport(tpl.stopIata),
    });
    segments.push({
      id: `${id}_seg2`,
      flightNumber: tpl.flightNumber + "X",
      airlineIata: tpl.airlineIata,
      airlineName: tpl.airlineName,
      departureAt: depStop.toISOString(),
      arrivalAt: finalArr.toISOString(),
      durationMinutes: tpl.durationMinutes - tpl.stopDuration - leg1Dur,
      origin: getAirport(tpl.stopIata),
      destination: getAirport(destination),
    });
  } else {
    const arrDate = new Date(depDate.getTime() + tpl.durationMinutes * 60000);
    segments.push({
      id: `${id}_seg1`,
      flightNumber: tpl.flightNumber,
      airlineIata: tpl.airlineIata,
      airlineName: tpl.airlineName,
      departureAt: depDate.toISOString(),
      arrivalAt: arrDate.toISOString(),
      durationMinutes: tpl.durationMinutes,
      origin: getAirport(origin),
      destination: getAirport(destination),
    });
  }

  const totalDep = segments[0]!.departureAt;
  const totalArr = segments[segments.length - 1]!.arrivalAt;

  return {
    id,
    totalAmount: price,
    currency: "USD",
    validUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    baggageIncluded: tpl.baggageIncluded,
    refundable: tpl.refundable,
    source: "mock",
    slices: [
      {
        id: `${id}_slice`,
        origin: getAirport(origin),
        destination: getAirport(destination),
        departureAt: totalDep,
        arrivalAt: totalArr,
        durationMinutes: minutesBetween(totalDep, totalArr),
        segments,
      },
    ],
  };
}

function searchMock(params: FlightSearchParams): FlightOffer[] {
  const key = `${params.origin}-${params.destination}`;
  const reverseKey = `${params.destination}-${params.origin}`;
  const templates = ROUTE_TEMPLATES[key] ?? ROUTE_TEMPLATES[reverseKey] ?? [];

  if (templates.length === 0) {
    const genericOffer: FlightOffer = {
      id: `mock_generic_${params.origin}_${params.destination}`,
      totalAmount: 590,
      currency: "USD",
      validUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      baggageIncluded: true,
      refundable: false,
      source: "mock",
      slices: [
        {
          id: "mock_generic_slice",
          origin: getAirport(params.origin),
          destination: getAirport(params.destination),
          departureAt: params.departureDate + "T08:00:00Z",
          arrivalAt: params.departureDate + "T16:00:00Z",
          durationMinutes: 480,
          segments: [
            {
              id: "mock_generic_seg",
              flightNumber: "XX100",
              airlineIata: "ET",
              airlineName: "Ethiopian Airlines",
              departureAt: params.departureDate + "T08:00:00Z",
              arrivalAt: params.departureDate + "T16:00:00Z",
              durationMinutes: 480,
              origin: getAirport(params.origin),
              destination: getAirport(params.destination),
            },
          ],
        },
      ],
    };
    return [genericOffer];
  }

  return templates.map((tpl, idx) =>
    buildMockOffer(tpl, params.origin, params.destination, params.departureDate, idx)
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function searchFlights(params: FlightSearchParams): Promise<FlightOffer[]> {
  const apiKey = process.env.DUFFEL_API_KEY;

  if (!apiKey) {
    return searchMock(params);
  }

  try {
    return await searchDuffel(params);
  } catch (err) {
    console.warn("[Duffel] Falling back to mock data:", err);
    return searchMock(params);
  }
}

export async function getOffer(offerId: string): Promise<FlightOffer | null> {
  if (offerId.startsWith("mock_")) {
    return null;
  }

  const apiKey = process.env.DUFFEL_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`${DUFFEL_BASE}/air/offers/${offerId}`, {
      headers: duffelHeaders(),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return mapDuffelOffer(data.data as DuffelOffer);
  } catch {
    return null;
  }
}

export { AIRPORTS };
