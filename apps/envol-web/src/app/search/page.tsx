import { Suspense } from "react";
import { searchFlights } from "@/lib/duffel";
import type { FlightSearchParams, CabinClass, TripType } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlightCard from "@/components/FlightCard";
import SearchForm from "@/components/SearchForm";
import { Plane, SlidersHorizontal, AlertCircle } from "lucide-react";

interface SearchPageProps {
  searchParams: {
    origin?: string;
    destination?: string;
    departureDate?: string;
    returnDate?: string;
    passengers?: string;
    cabinClass?: string;
    tripType?: string;
  };
}

async function FlightResults({ params }: { params: FlightSearchParams }) {
  let offers = await searchFlights(params);

  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Plane className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Aucun vol trouvé
        </h3>
        <p className="text-gray-500 max-w-sm">
          Aucun vol disponible pour cette recherche. Essayez une autre date ou
          destination.
        </p>
      </div>
    );
  }

  // Sort by price ascending by default
  offers = offers.sort((a, b) => a.totalAmount - b.totalAmount);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{offers.length} vol{offers.length > 1 ? "s" : ""}</span>{" "}
          trouvé{offers.length > 1 ? "s" : ""}
          {offers[0]?.source === "mock" && (
            <span className="ml-2 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
              Données démo
            </span>
          )}
        </p>
      </div>
      {offers.map((offer) => (
        <FlightCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

function FlightSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"
        >
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 flex items-center gap-6">
              <div className="space-y-2">
                <div className="h-7 w-16 bg-gray-200 rounded" />
                <div className="h-3 w-10 bg-gray-100 rounded" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-100 rounded mx-auto" />
              </div>
              <div className="space-y-2">
                <div className="h-7 w-16 bg-gray-200 rounded" />
                <div className="h-3 w-10 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="w-32 space-y-2">
              <div className="h-8 w-full bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const origin = searchParams.origin ?? "FIH";
  const destination = searchParams.destination ?? "";
  const departureDate = searchParams.departureDate ?? "";
  const passengers = parseInt(searchParams.passengers ?? "1");
  const cabinClass = (searchParams.cabinClass ?? "economy") as CabinClass;
  const tripType = (searchParams.tripType ?? "one_way") as TripType;
  const returnDate = searchParams.returnDate;

  const flightParams: FlightSearchParams = {
    origin,
    destination,
    departureDate,
    passengers,
    cabinClass,
    tripType,
    returnDate,
  };

  const hasValidSearch = origin && destination && departureDate;

  return (
    <>
      <Navbar />

      {/* Search header */}
      <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6 text-sm text-brand-200">
            <span>{origin}</span>
            <Plane className="w-4 h-4 text-gold-400" />
            <span>{destination || "—"}</span>
            {departureDate && (
              <>
                <span className="text-brand-400">·</span>
                <span>{departureDate}</span>
              </>
            )}
            <span className="text-brand-400">·</span>
            <span>{passengers} passager{passengers > 1 ? "s" : ""}</span>
          </div>
          <SearchForm compact />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasValidSearch ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Paramètres de recherche incomplets
            </h3>
            <p className="text-gray-500">
              Veuillez renseigner l'origine, la destination et la date de départ.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar filters (static for now) */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">Filtres</h3>
                </div>

                {/* Stops */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Escales
                  </p>
                  <div className="space-y-1.5">
                    {["Tous les vols", "Direct uniquement", "1 escale max"].map((label) => (
                      <label key={label} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          defaultChecked={label === "Tous les vols"}
                          className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Airlines */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Compagnies
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "Air France",
                      "Brussels Airlines",
                      "Ethiopian Airlines",
                      "Kenya Airways",
                      "Royal Air Maroc",
                      "Emirates",
                    ].map((airline) => (
                      <label key={airline} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {airline}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Flight list */}
            <div className="flex-1 min-w-0">
              <Suspense fallback={<FlightSkeleton />}>
                <FlightResults params={flightParams} />
              </Suspense>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
