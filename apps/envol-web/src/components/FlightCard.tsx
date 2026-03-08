"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Plane, Clock, Luggage, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { FlightOffer } from "@/lib/types";
import {
  formatTime,
  formatShortDate,
  formatDuration,
  formatPrice,
  getOfferStops,
  getStopsLabel,
  airlineLogoUrl,
  getMainAirline,
  getAirlineIata,
} from "@/lib/utils";

interface FlightCardProps {
  offer: FlightOffer;
}

export default function FlightCard({ offer }: FlightCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(false);

  const slice = offer.slices[0]!;
  const stops = getOfferStops(offer);
  const airlineIata = getAirlineIata(offer);
  const airlineName = getMainAirline(offer);

  function handleBook() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("offer", encodeURIComponent(JSON.stringify(offer)));
    router.push(`/booking/${offer.id}?${params.toString()}`);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Airline logo + name */}
          <div className="flex items-center gap-3 md:w-36 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={airlineLogoUrl(airlineIata)}
                alt={airlineName}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 leading-tight">{airlineName}</p>
              <p className="text-xs text-gray-400">
                {slice.segments[0]?.flightNumber}
              </p>
            </div>
          </div>

          {/* Flight times */}
          <div className="flex-1 flex items-center gap-4">
            {/* Departure */}
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatTime(slice.departureAt)}</p>
              <p className="text-xs text-gray-500 font-medium">{slice.origin.iataCode}</p>
              <p className="text-xs text-gray-400">{formatShortDate(slice.departureAt)}</p>
            </div>

            {/* Duration + stops */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="text-xs text-gray-500 font-medium">{formatDuration(slice.durationMinutes)}</p>
              <div className="relative w-full flex items-center">
                <div className="h-px flex-1 bg-gray-200" />
                <Plane className="w-3.5 h-3.5 text-brand-500 mx-2 rotate-90" />
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stops === 0
                    ? "bg-emerald-50 text-emerald-700"
                    : stops === 1
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {getStopsLabel(stops)}
              </span>
            </div>

            {/* Arrival */}
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatTime(slice.arrivalAt)}</p>
              <p className="text-xs text-gray-500 font-medium">{slice.destination.iataCode}</p>
              <p className="text-xs text-gray-400">{formatShortDate(slice.arrivalAt)}</p>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex flex-col items-end gap-2 md:w-40 flex-shrink-0">
            <div className="text-right">
              <p className="text-2xl font-bold text-brand-700">
                {formatPrice(offer.totalAmount, offer.currency)}
              </p>
              <p className="text-xs text-gray-400">par personne</p>
            </div>
            <div className="flex flex-wrap gap-1 justify-end">
              {offer.baggageIncluded && (
                <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <Luggage className="w-3 h-3" /> Bagage inclus
                </span>
              )}
              {offer.refundable && (
                <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  <RefreshCw className="w-3 h-3" /> Remboursable
                </span>
              )}
            </div>
            <button
              onClick={handleBook}
              className="btn-primary w-full text-sm py-2.5 px-4"
            >
              Choisir
            </button>
          </div>
        </div>
      </div>

      {/* Expandable details */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-6 py-2.5 flex items-center justify-between text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Détails du vol
          </span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {expanded && (
          <div className="px-6 pb-5 space-y-4 animate-fade-in">
            {slice.segments.map((seg, i) => (
              <div key={seg.id} className="flex gap-4">
                <div className="flex flex-col items-center gap-1 w-6 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5" />
                  {i < slice.segments.length - 1 && (
                    <div className="flex-1 w-px bg-gray-200" />
                  )}
                  {i === slice.segments.length - 1 && (
                    <div className="w-2 h-2 rounded-full border-2 border-brand-500 mt-auto" />
                  )}
                </div>
                <div className="flex-1 space-y-2 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {formatTime(seg.departureAt)}{" "}
                        <span className="font-normal text-gray-500">·</span>{" "}
                        {seg.origin.cityName} ({seg.origin.iataCode})
                      </p>
                      <p className="text-xs text-gray-400">{seg.origin.name}</p>
                    </div>
                    <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      {seg.flightNumber}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 pl-2 border-l border-gray-200">
                    <Clock className="w-3 h-3" />
                    Durée : {formatDuration(seg.durationMinutes)}
                    {seg.aircraft && (
                      <span className="ml-2 text-gray-400">· {seg.aircraft}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {formatTime(seg.arrivalAt)}{" "}
                      <span className="font-normal text-gray-500">·</span>{" "}
                      {seg.destination.cityName} ({seg.destination.iataCode})
                    </p>
                    <p className="text-xs text-gray-400">{seg.destination.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
