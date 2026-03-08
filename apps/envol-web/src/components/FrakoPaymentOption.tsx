"use client";

import { CreditCard, Zap, Shield } from "lucide-react";
import type { PaymentMethod } from "@/lib/types";
import { formatPrice, installmentAmount } from "@/lib/utils";

interface FrakoPaymentOptionProps {
  totalAmount: number;
  currency: string;
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

interface Option {
  id: PaymentMethod;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  badge?: string;
  highlight?: boolean;
}

export default function FrakoPaymentOption({
  totalAmount,
  currency,
  selected,
  onChange,
}: FrakoPaymentOptionProps) {
  const inst3 = installmentAmount(totalAmount, 3);
  const inst6 = installmentAmount(totalAmount, 6);

  const options: Option[] = [
    {
      id: "full",
      label: "Paiement complet",
      sublabel: `${formatPrice(totalAmount, currency)} en une seule fois`,
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "frako_3x",
      label: "Payer en 3× avec Frako",
      sublabel: `3 × ${formatPrice(inst3, currency)} — sans frais`,
      icon: <Zap className="w-5 h-5" />,
      badge: "Populaire",
      highlight: true,
    },
    {
      id: "frako_6x",
      label: "Payer en 6× avec Frako",
      sublabel: `6 × ${formatPrice(inst6, currency)} — sans frais`,
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <label
          key={opt.id}
          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selected === opt.id
              ? opt.highlight
                ? "border-gold-500 bg-gold-50"
                : "border-brand-500 bg-brand-50"
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment-method"
            value={opt.id}
            checked={selected === opt.id}
            onChange={() => onChange(opt.id)}
            className="sr-only"
          />
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              selected === opt.id
                ? opt.highlight
                  ? "bg-gold-400 text-white"
                  : "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {opt.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p
                className={`font-semibold text-sm ${
                  selected === opt.id ? "text-gray-900" : "text-gray-700"
                }`}
              >
                {opt.label}
              </p>
              {opt.badge && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gold-400 text-white">
                  {opt.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{opt.sublabel}</p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selected === opt.id
                ? opt.highlight
                  ? "border-gold-500"
                  : "border-brand-600"
                : "border-gray-300"
            }`}
          >
            {selected === opt.id && (
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  opt.highlight ? "bg-gold-500" : "bg-brand-600"
                }`}
              />
            )}
          </div>
        </label>
      ))}

      {(selected === "frako_3x" || selected === "frako_6x") && (
        <div className="mt-3 p-3 bg-brand-50 rounded-xl border border-brand-100 text-xs text-brand-800">
          <p className="font-semibold mb-1">Comment ça marche avec Frako ?</p>
          <ol className="space-y-1 list-decimal list-inside text-brand-700">
            <li>Vous confirmez la réservation ici</li>
            <li>Vous recevez un lien pour finaliser le paiement sur l'app Frako</li>
            <li>
              Vos mensualités sont prélevées automatiquement —{" "}
              <strong>sans frais supplémentaires</strong>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
