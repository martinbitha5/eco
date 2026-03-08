"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeftRight, Users, CalendarDays, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { CabinClass, TripType } from "@/lib/types";
import { CABIN_LABELS } from "@/lib/utils";

// ── Airport data ─────────────────────────────────────────────────────────────

const AIRPORTS = [
  // ── RDC (Domestic) ─────────────────────────────────────────────────────────
  { iataCode: "FIH", cityName: "Kinshasa",     airportName: "Aéroport de N'Djili",          countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "FBM", cityName: "Lubumbashi",   airportName: "Aéroport de Luano",             countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "GOM", cityName: "Goma",         airportName: "Aéroport International de Goma", countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "FKI", cityName: "Kisangani",    airportName: "Aéroport de Bangoka",           countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "MJM", cityName: "Mbuji-Mayi",   airportName: "Aéroport de Mbuji-Mayi",        countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "BKY", cityName: "Bukavu",       airportName: "Aéroport de Kavumu",            countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "KWZ", cityName: "Kolwezi",      airportName: "Aéroport de Kolwezi",           countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "BUX", cityName: "Bunia",        airportName: "Aéroport de Bunia",             countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "BDT", cityName: "Gbadolite",    airportName: "Aéroport de Gbadolite",         countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "MDK", cityName: "Mbandaka",     airportName: "Aéroport de Mbandaka",          countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  { iataCode: "KNM", cityName: "Kaniama",      airportName: "Aéroport de Kaniama",           countryName: "Rép. Dém. du Congo", countryCode: "CD" },
  // ── Afrique ────────────────────────────────────────────────────────────────
  { iataCode: "LOS", cityName: "Lagos",        airportName: "Murtala Muhammed International", countryName: "Nigeria",            countryCode: "NG" },
  { iataCode: "ABV", cityName: "Abuja",        airportName: "Nnamdi Azikiwe International",  countryName: "Nigeria",            countryCode: "NG" },
  { iataCode: "NBO", cityName: "Nairobi",      airportName: "Jomo Kenyatta International",   countryName: "Kenya",              countryCode: "KE" },
  { iataCode: "JNB", cityName: "Johannesburg", airportName: "O.R. Tambo International",      countryName: "Afrique du Sud",     countryCode: "ZA" },
  { iataCode: "CPT", cityName: "Le Cap",       airportName: "Cape Town International",       countryName: "Afrique du Sud",     countryCode: "ZA" },
  { iataCode: "ADD", cityName: "Addis-Abeba",  airportName: "Bole International",            countryName: "Éthiopie",           countryCode: "ET" },
  { iataCode: "CAI", cityName: "Le Caire",     airportName: "Cairo International",           countryName: "Égypte",             countryCode: "EG" },
  { iataCode: "CMN", cityName: "Casablanca",   airportName: "Mohammed V International",      countryName: "Maroc",              countryCode: "MA" },
  { iataCode: "RAK", cityName: "Marrakech",    airportName: "Marrakech Menara",              countryName: "Maroc",              countryCode: "MA" },
  { iataCode: "DKR", cityName: "Dakar",        airportName: "Blaise Diagne International",   countryName: "Sénégal",            countryCode: "SN" },
  { iataCode: "ABJ", cityName: "Abidjan",      airportName: "Félix Houphouët-Boigny",        countryName: "Côte d'Ivoire",      countryCode: "CI" },
  { iataCode: "DLA", cityName: "Douala",       airportName: "Douala International",          countryName: "Cameroun",           countryCode: "CM" },
  { iataCode: "NSI", cityName: "Yaoundé",      airportName: "Yaoundé Nsimalen",              countryName: "Cameroun",           countryCode: "CM" },
  { iataCode: "BZV", cityName: "Brazzaville",  airportName: "Aéroport Maya-Maya",            countryName: "Congo",              countryCode: "CG" },
  { iataCode: "PNR", cityName: "Pointe-Noire", airportName: "Pointe Noire Airport",          countryName: "Congo",              countryCode: "CG" },
  { iataCode: "LBV", cityName: "Libreville",   airportName: "Léon-Mba International",         countryName: "Gabon",              countryCode: "GA" },
  { iataCode: "LAD", cityName: "Luanda",       airportName: "Quatro de Fevereiro International", countryName: "Angola",         countryCode: "AO" },
  { iataCode: "ACC", cityName: "Accra",        airportName: "Kotoka International",          countryName: "Ghana",              countryCode: "GH" },
  { iataCode: "LFW", cityName: "Lomé",         airportName: "Gnássingébé Eyadéma International", countryName: "Togo",           countryCode: "TG" },
  { iataCode: "COO", cityName: "Cotonou",      airportName: "Cadjehoun Airport",             countryName: "Bénin",             countryCode: "BJ" },
  { iataCode: "SSG", cityName: "Malabo",       airportName: "Santa Isabel Airport",          countryName: "Guinée équatoriale", countryCode: "GQ" },
  { iataCode: "BGF", cityName: "Bangui",       airportName: "M'Poko International",          countryName: "Centrafrique",       countryCode: "CF" },
  { iataCode: "TNR", cityName: "Antananarivo", airportName: "Ivato International",           countryName: "Madagascar",         countryCode: "MG" },
  { iataCode: "MRU", cityName: "Maurice",      airportName: "Sir Seewoosagur Ramgoolam",     countryName: "Île Maurice",        countryCode: "MU" },
  // ── Moyen-Orient ────────────────────────────────────────────────────────────
  { iataCode: "DXB", cityName: "Dubaï",        airportName: "Dubaï International",            countryName: "Émirats arabes unis", countryCode: "AE" },
  { iataCode: "AUH", cityName: "Abu Dhabi",    airportName: "Abu Dhabi International",       countryName: "Émirats arabes unis", countryCode: "AE" },
  { iataCode: "DOH", cityName: "Doha",         airportName: "Hamad International",           countryName: "Qatar",              countryCode: "QA" },
  // ── Europe ──────────────────────────────────────────────────────────────────
  { iataCode: "CDG", cityName: "Paris",        airportName: "Charles de Gaulle",             countryName: "France",             countryCode: "FR" },
  { iataCode: "ORY", cityName: "Paris Orly",   airportName: "Paris Orly",                    countryName: "France",             countryCode: "FR" },
  { iataCode: "BRU", cityName: "Bruxelles",    airportName: "Aéroport de Bruxelles",          countryName: "Belgique",           countryCode: "BE" },
  { iataCode: "LHR", cityName: "Londres",      airportName: "Heathrow",                      countryName: "Royaume-Uni",        countryCode: "GB" },
  { iataCode: "IST", cityName: "Istanbul",     airportName: "Istanbul Airport",              countryName: "Turquie",            countryCode: "TR" },
  // ── Amérique ─────────────────────────────────────────────────────────────────
  { iataCode: "JFK", cityName: "New York",     airportName: "John F. Kennedy International", countryName: "États-Unis",         countryCode: "US" },
];

// ── Utilities ─────────────────────────────────────────────────────────────────

function flagEmoji(cc: string) {
  return cc.toUpperCase().replace(/./g, (c) =>
    String.fromCodePoint(c.charCodeAt(0) + 127397)
  );
}

function toDateStr(date: Date): string {
  return date.toISOString().split("T")[0]!;
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(d);
}

const MONTHS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const DAYS_FR = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

// ── AirportModal ─────────────────────────────────────────────────────────────

function AirportModal({
  onSelect,
  onClose,
}: {
  onSelect: (code: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered =
    query.length === 0
      ? AIRPORTS
      : AIRPORTS.filter(
          (a) =>
            a.cityName.toLowerCase().includes(query.toLowerCase()) ||
            a.iataCode.toLowerCase().includes(query.toLowerCase()) ||
            a.countryName.toLowerCase().includes(query.toLowerCase()) ||
            a.airportName.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <p className="text-sm text-gray-500 font-medium">
            Veuillez sélectionner un aéroport
          </p>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="px-5 pb-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un aéroport ou une ville"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-200 transition"
          />
        </div>
        <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
          {filtered.map((a) => (
            <li key={a.iataCode}>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-brand-50 transition-colors text-left"
                onClick={() => {
                  onSelect(a.iataCode);
                  onClose();
                }}
              >
                <span className="text-2xl flex-shrink-0">
                  {flagEmoji(a.countryCode)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    {a.cityName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {a.countryName}
                  </p>
                </div>
                <span className="flex-shrink-0 bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  {a.iataCode}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-gray-400">
              Aucun résultat pour &ldquo;{query}&rdquo;
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

// ── Calendar ──────────────────────────────────────────────────────────────────

function CalendarMonth({
  year,
  month,
  startDate,
  endDate,
  hovered,
  today,
  onSelect,
  onHover,
}: {
  year: number;
  month: number;
  startDate: string;
  endDate: string;
  hovered: string;
  today: string;
  onSelect: (d: string) => void;
  onHover: (d: string) => void;
}) {
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(firstDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const effectiveEnd = endDate || hovered;

  return (
    <div>
      <p className="font-semibold text-gray-800 text-center mb-3 capitalize text-sm">
        {MONTHS_FR[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-0.5">
        {DAYS_FR.map((d) => (
          <div
            key={d}
            className="text-center text-xs text-gray-400 py-1.5 font-medium"
          >
            {d}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date)
            return <div key={`empty-${i}`} className="h-9" />;
          const ds = toDateStr(date);
          const isPast = ds < today;
          const isStart = ds === startDate;
          const isEnd = ds === effectiveEnd && !!effectiveEnd;
          const isRange =
            !!startDate &&
            !!effectiveEnd &&
            ds > startDate &&
            ds < effectiveEnd;
          const isToday = ds === today;

          return (
            <div
              key={ds}
              className={`flex items-center justify-center ${
                isRange ? "bg-brand-100" : ""
              }`}
            >
              <button
                type="button"
                disabled={isPast}
                onMouseEnter={() => !isPast && onHover(ds)}
                onClick={() => !isPast && onSelect(ds)}
                className={[
                  "w-9 h-9 rounded-full text-sm transition-colors",
                  isPast
                    ? "text-gray-300 cursor-default"
                    : "cursor-pointer",
                  isStart || isEnd
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "",
                  !isStart && !isEnd && !isPast
                    ? "hover:bg-brand-200 text-gray-800"
                    : "",
                  isToday && !isStart && !isEnd
                    ? "font-bold text-brand-700"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarPicker({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
  showReturn,
  onToggleReturn,
  onClose,
}: {
  startDate: string;
  endDate: string;
  onChangeStart: (d: string) => void;
  onChangeEnd: (d: string) => void;
  showReturn: boolean;
  onToggleReturn: (v: boolean) => void;
  onClose: () => void;
}) {
  const today = toDateStr(new Date());
  const [viewOffset, setViewOffset] = useState(0);
  const [hovered, setHovered] = useState("");
  const [selecting, setSelecting] = useState<"start" | "end">(
    startDate ? "end" : "start"
  );
  const ref = useRef<HTMLDivElement>(null);

  const base = new Date();
  const leftYear = new Date(
    base.getFullYear(),
    base.getMonth() + viewOffset
  ).getFullYear();
  const leftMonth = new Date(
    base.getFullYear(),
    base.getMonth() + viewOffset
  ).getMonth();
  const rightYear = new Date(
    base.getFullYear(),
    base.getMonth() + viewOffset + 1
  ).getFullYear();
  const rightMonth = new Date(
    base.getFullYear(),
    base.getMonth() + viewOffset + 1
  ).getMonth();

  function handleSelect(ds: string) {
    if (selecting === "start" || ds < startDate) {
      onChangeStart(ds);
      onChangeEnd("");
      setSelecting("end");
    } else {
      if (ds === startDate) return;
      onChangeEnd(ds);
      setSelecting("start");
    }
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 w-[660px] max-w-[95vw]"
    >
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setViewOffset((v) => v - 1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="text-sm font-semibold text-gray-700">
          {selecting === "start" ? "Sélectionnez la date de départ" : "Sélectionnez la date de retour"}
        </p>
        <button
          type="button"
          onClick={() => setViewOffset((v) => v + 1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <CalendarMonth
          year={leftYear}
          month={leftMonth}
          startDate={startDate}
          endDate={endDate}
          hovered={hovered}
          today={today}
          onSelect={handleSelect}
          onHover={setHovered}
        />
        <CalendarMonth
          year={rightYear}
          month={rightMonth}
          startDate={startDate}
          endDate={endDate}
          hovered={hovered}
          today={today}
          onSelect={handleSelect}
          onHover={setHovered}
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <button
            type="button"
            onClick={() => onToggleReturn(!showReturn)}
            className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${
              showReturn ? "bg-brand-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                showReturn ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm text-gray-700">Vol retour</span>
        </label>
        <button
          type="button"
          onClick={onClose}
          className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

// ── PassengerRow ──────────────────────────────────────────────────────────────

function PassengerRow({
  label,
  sub,
  count,
  setCount,
  min = 0,
}: {
  label: string;
  sub: string;
  count: number;
  setCount: (n: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCount(Math.max(min, count - 1))}
          disabled={count <= min}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 disabled:opacity-30 disabled:cursor-default transition-colors text-lg font-light leading-none"
        >
          −
        </button>
        <span className="w-5 text-center font-semibold text-gray-900 text-sm">
          {count}
        </span>
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg font-light leading-none"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ── PassengersDropdown ────────────────────────────────────────────────────────

function PassengersDropdown({
  adults,
  setAdults,
  childCount,
  setChildCount,
  infants,
  setInfants,
  cabinClass,
  setCabinClass,
  onClose,
}: {
  adults: number;
  setAdults: (n: number) => void;
  childCount: number;
  setChildCount: (n: number) => void;
  infants: number;
  setInfants: (n: number) => void;
  cabinClass: CabinClass;
  setCabinClass: (c: CabinClass) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 w-72"
    >
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold text-gray-900">Passagers</p>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <PassengerRow
        label="Adultes"
        sub="12+"
        count={adults}
        setCount={setAdults}
        min={1}
      />
      <PassengerRow
        label="Enfants"
        sub="2 - 11 ans"
        count={childCount}
        setCount={setChildCount}
      />
      <PassengerRow
        label="Bébés"
        sub="0 - 1 an"
        count={infants}
        setCount={setInfants}
      />
      <div className="mt-3">
        <select
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value as CabinClass)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-500 transition bg-white"
        >
          {(Object.keys(CABIN_LABELS) as CabinClass[]).map((c) => (
            <option key={c} value={c}>
              {CABIN_LABELS[c]}
            </option>
          ))}
        </select>
      </div>
      <div className="text-right mt-3">
        <button
          type="button"
          onClick={onClose}
          className="text-brand-600 font-semibold text-sm hover:text-brand-800 transition-colors"
        >
          Terminé
        </button>
      </div>
    </div>
  );
}

// ── Main SearchForm ───────────────────────────────────────────────────────────

export default function SearchForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>("one_way");
  const [origin, setOrigin] = useState("FIH");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");
  const [loading, setLoading] = useState(false);

  const [airportTarget, setAirportTarget] = useState<
    "origin" | "destination" | null
  >(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);

  const originInfo = AIRPORTS.find((a) => a.iataCode === origin);
  const destInfo = AIRPORTS.find((a) => a.iataCode === destination);

  const totalPax = adults + childCount + infants;
  const paxLabel = `${totalPax} ${totalPax === 1 ? "Adulte" : "Adultes"}${
    childCount > 0 ? `, ${childCount} enf.` : ""
  }${infants > 0 ? `, ${infants} bébé${infants > 1 ? "s" : ""}` : ""}, ${
    CABIN_LABELS[cabinClass]
  }`;

  const datesLabel = departureDate
    ? tripType === "round_trip" && returnDate
      ? `${formatDateDisplay(departureDate)} – ${formatDateDisplay(returnDate)}`
      : formatDateDisplay(departureDate)
    : "Dates";

  function swapAirports() {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  }

  function handleShowReturn(show: boolean) {
    setTripType(show ? "round_trip" : "one_way");
    if (!show) setReturnDate("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!origin || !destination || !departureDate) return;
    setLoading(true);
    const params = new URLSearchParams({
      origin,
      destination,
      departureDate,
      passengers: String(adults + childCount + infants),
      cabinClass,
      tripType,
    });
    if (tripType === "round_trip" && returnDate)
      params.set("returnDate", returnDate);
    router.push(`/search?${params.toString()}`);
  }

  const TRIP_TABS = [
    { key: "round_trip" as TripType, label: "Aller-retour" },
    { key: "one_way" as TripType, label: "Aller simple" },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Trip type tabs */}
      {!compact && (
        <div className="flex gap-1 mb-3 justify-center">
          {TRIP_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTripType(t.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                tripType === t.key
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            type="button"
            className="px-5 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            Multi-destinations
          </button>
        </div>
      )}

      {/* Search card */}
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row md:items-stretch overflow-visible">
        {/* Origin */}
        <button
          type="button"
          onClick={() => {
            setShowCalendar(false);
            setShowPassengers(false);
            setAirportTarget("origin");
          }}
          className="flex-1 flex flex-col justify-center px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors rounded-t-2xl md:rounded-t-none md:rounded-l-2xl text-left min-w-0"
        >
          <p className="text-xs text-gray-400 font-medium mb-0.5">Où ?</p>
          <div className="flex items-center gap-2 min-w-0">
            <p className="font-semibold text-gray-900 truncate text-sm">
              {originInfo ? originInfo.cityName : "Sélectionner"}
            </p>
            {originInfo && (
              <span className="flex-shrink-0 text-[10px] font-bold bg-brand-600 text-white px-1.5 py-0.5 rounded">
                {originInfo.iataCode}
              </span>
            )}
          </div>
        </button>

        {/* Swap */}
        <div className="hidden md:flex items-center justify-center px-1 border-r border-gray-100 flex-shrink-0 bg-white">
          <button
            type="button"
            onClick={swapAirports}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-brand-600"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Destination */}
        <button
          type="button"
          onClick={() => {
            setShowCalendar(false);
            setShowPassengers(false);
            setAirportTarget("destination");
          }}
          className="flex-1 flex flex-col justify-center px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors text-left min-w-0"
        >
          <p className="text-xs text-gray-400 font-medium mb-0.5">
            Où allez-vous ?
          </p>
          <div className="flex items-center gap-2 min-w-0">
            <p
              className={`font-semibold truncate text-sm ${
                destInfo ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {destInfo ? destInfo.cityName : "Destination"}
            </p>
            {destInfo && (
              <span className="flex-shrink-0 text-[10px] font-bold bg-brand-600 text-white px-1.5 py-0.5 rounded">
                {destInfo.iataCode}
              </span>
            )}
          </div>
        </button>

        {/* Dates */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-gray-100">
          <button
            type="button"
            onClick={() => {
              setShowPassengers(false);
              setShowCalendar((v) => !v);
            }}
            className="w-full h-full flex flex-col justify-center px-5 py-4 hover:bg-gray-50 transition-colors text-left"
          >
            <p className="text-xs text-gray-400 font-medium mb-0.5 flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              Dates
            </p>
            <p
              className={`font-semibold text-sm ${
                departureDate ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {datesLabel}
            </p>
          </button>
          {showCalendar && (
            <CalendarPicker
              startDate={departureDate}
              endDate={returnDate}
              onChangeStart={setDepartureDate}
              onChangeEnd={setReturnDate}
              showReturn={tripType === "round_trip"}
              onToggleReturn={handleShowReturn}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        {/* Passengers & Class */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-gray-100">
          <button
            type="button"
            onClick={() => {
              setShowCalendar(false);
              setShowPassengers((v) => !v);
            }}
            className="w-full h-full flex flex-col justify-center px-5 py-4 hover:bg-gray-50 transition-colors text-left"
          >
            <p className="text-xs text-gray-400 font-medium mb-0.5 flex items-center gap-1">
              <Users className="w-3 h-3" />
              Passagers &amp; Classe
            </p>
            <p className="font-semibold text-gray-900 text-sm truncate">
              {paxLabel}
            </p>
          </button>
          {showPassengers && (
            <PassengersDropdown
              adults={adults}
              setAdults={setAdults}
              childCount={childCount}
              setChildCount={setChildCount}
              infants={infants}
              setInfants={setInfants}
              cabinClass={cabinClass}
              setCabinClass={setCabinClass}
              onClose={() => setShowPassengers(false)}
            />
          )}
        </div>

        {/* Search button */}
        <div className="flex items-center justify-center px-4 py-3 flex-shrink-0">
          <button
            type="submit"
            disabled={loading || !origin || !destination || !departureDate}
            className="w-12 h-12 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 rounded-full flex items-center justify-center transition-colors shadow-md"
            aria-label="Rechercher"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <Search className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Airport modal — rendered at root level to escape overflow constraints */}
      {airportTarget && (
        <AirportModal
          onSelect={(code) => {
            if (airportTarget === "origin") setOrigin(code);
            else setDestination(code);
          }}
          onClose={() => setAirportTarget(null)}
        />
      )}
    </form>
  );
}
