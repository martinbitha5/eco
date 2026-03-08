"use client";

import type { PassengerInfo } from "@/lib/types";

interface PassengerFormProps {
  value: PassengerInfo;
  onChange: (info: PassengerInfo) => void;
}

const NATIONALITIES = [
  "Congolaise (RDC)",
  "Française",
  "Belge",
  "Américaine",
  "Britannique",
  "Canadienne",
  "Camerounaise",
  "Ivoirienne",
  "Sénégalaise",
  "Marocaine",
  "Sud-Africaine",
  "Kenyane",
  "Éthiopienne",
  "Autre",
];

export default function PassengerForm({ value, onChange }: PassengerFormProps) {
  function set<K extends keyof PassengerInfo>(key: K, val: PassengerInfo[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Jean"
            value={value.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            required
            autoComplete="given-name"
          />
        </div>

        {/* Last name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de famille <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Kabila"
            value={value.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Adresse email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          className="input-field"
          placeholder="jean.kabila@email.com"
          value={value.email}
          onChange={(e) => set("email", e.target.value)}
          required
          autoComplete="email"
        />
        <p className="text-xs text-gray-400 mt-1">
          Votre billet et vos références seront envoyés à cet email.
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          className="input-field"
          placeholder="+243 81 000 0000"
          value={value.phone}
          onChange={(e) => set("phone", e.target.value)}
          required
          autoComplete="tel"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date of birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de naissance <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="input-field"
            value={value.dateOfBirth}
            onChange={(e) => set("dateOfBirth", e.target.value)}
            required
            autoComplete="bday"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationalité <span className="text-red-500">*</span>
          </label>
          <select
            className="input-field"
            value={value.nationality}
            onChange={(e) => set("nationality", e.target.value)}
            required
          >
            <option value="">Sélectionnez</option>
            {NATIONALITIES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Passport */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Numéro de passeport{" "}
          <span className="text-gray-400 font-normal">(optionnel)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="AB123456"
          value={value.passportNumber ?? ""}
          onChange={(e) => set("passportNumber", e.target.value)}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
