/**
 * Dashboard marchand Frako
 * Route: /dashboard
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import type { Merchant, Order } from "@/lib/types";

// ─── Mock data ───────────────────────────────────────────────────────────────
const mockMerchant: Merchant = {
  id: "mock-id",
  name: "TechShop Kinshasa",
  email: "contact@techshop-kin.cd",
  phone: "+243 81 234 5678",
  businessNumber: "CD/KIN/RCCM/2023-B-0412",
  status: "active",
  merchantId: "merch_TSK2024",
  apiKey: "frk_live_sk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  apiKeyHash: "hash_xxx",
  webhookUrl: "https://techshop-kin.cd/api/frako/webhook",
  successUrl: "https://techshop-kin.cd/commande/merci",
  cancelUrl: "https://techshop-kin.cd/commande/annulee",
  createdAt: "2024-01-15",
  updatedAt: "2024-03-10",
};

const mockOrders: Order[] = [
  {
    id: "ord_1",
    merchantId: "merch_TSK2024",
    orderToken: "tok_a1b2c3",
    amount: 450000,
    currency: "CDF",
    installments: 3,
    status: "completed",
    externalOrderId: "CMD-2024-0089",
    createdAt: "2024-03-08T09:12:00Z",
    updatedAt: "2024-03-08T09:18:00Z",
    completedAt: "2024-03-08T09:18:00Z",
  },
  {
    id: "ord_2",
    merchantId: "merch_TSK2024",
    orderToken: "tok_d4e5f6",
    amount: 750,
    currency: "USD",
    installments: 6,
    status: "pending",
    externalOrderId: "CMD-2024-0090",
    createdAt: "2024-03-08T14:30:00Z",
    updatedAt: "2024-03-08T14:30:00Z",
  },
  {
    id: "ord_3",
    merchantId: "merch_TSK2024",
    orderToken: "tok_g7h8i9",
    amount: 280000,
    currency: "CDF",
    installments: 3,
    status: "completed",
    externalOrderId: "CMD-2024-0091",
    createdAt: "2024-03-07T16:05:00Z",
    updatedAt: "2024-03-07T16:10:00Z",
    completedAt: "2024-03-07T16:10:00Z",
  },
  {
    id: "ord_4",
    merchantId: "merch_TSK2024",
    orderToken: "tok_j0k1l2",
    amount: 1200,
    currency: "USD",
    installments: 3,
    status: "failed",
    externalOrderId: "CMD-2024-0092",
    createdAt: "2024-03-06T11:22:00Z",
    updatedAt: "2024-03-06T11:23:00Z",
  },
  {
    id: "ord_5",
    merchantId: "merch_TSK2024",
    orderToken: "tok_m3n4o5",
    amount: 95000,
    currency: "CDF",
    installments: 3,
    status: "completed",
    externalOrderId: "CMD-2024-0093",
    createdAt: "2024-03-05T08:45:00Z",
    updatedAt: "2024-03-05T08:52:00Z",
    completedAt: "2024-03-05T08:52:00Z",
  },
  {
    id: "ord_6",
    merchantId: "merch_TSK2024",
    orderToken: "tok_p6q7r8",
    amount: 320,
    currency: "USD",
    installments: 6,
    status: "cancelled",
    externalOrderId: "CMD-2024-0094",
    createdAt: "2024-03-04T17:00:00Z",
    updatedAt: "2024-03-04T17:15:00Z",
  },
];

// ─── Copy icon ────────────────────────────────────────────────────────────────
function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

// ─── Live "Payer avec Frako" demo ─────────────────────────────────────────────
function FrakoButtonPreview() {
  const [step, setStep] = useState<"idle" | "modal" | "loading" | "success">("idle");
  const [plan, setPlan] = useState<3 | 6>(3);
  const amount = 450000;
  const per = (n: number) => Math.ceil(amount / n).toLocaleString("fr-FR");

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-[#3855f3] rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Aperçu — Bouton «Payer avec Frako»</h2>
          <p className="text-xs text-gray-500">Simulation exacte de ce que vos clients verront</p>
        </div>
      </div>

      {/* Simulated product card */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <div className="max-w-xs mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-36 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <span className="text-5xl">📱</span>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-gray-900 text-sm mb-0.5">Smartphone Galaxy A54 — 128 Go</h3>
            <p className="text-xs text-gray-400 mb-3">Garantie 1 an · Stock disponible</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-extrabold text-gray-900">450 000 CDF</span>
              <span className="text-xs text-gray-400 line-through">520 000 CDF</span>
            </div>
            <div className="flex gap-2 mb-3">
              {([3, 6] as const).map((n) => (
                <button key={n} onClick={() => setPlan(n)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${plan === n ? "bg-[#3855f3] text-white border-[#3855f3]" : "border-gray-200 text-gray-600"}`}>
                  {n}x versements
                </button>
              ))}
            </div>
            <div className="bg-blue-50 rounded-lg px-3 py-2 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1"><div className="w-4 h-4 bg-[#3855f3] rounded-full flex items-center justify-center"><span className="text-white font-black text-[9px]">F</span></div><span className="text-xs font-bold text-[#3855f3]">frako</span></div>
              <span className="text-xs text-[#3855f3] font-medium">{plan}x {per(plan)} CDF · 0% intérêt</span>
            </div>
            <button onClick={() => setStep("modal")}
              className="w-full bg-[#3855f3] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition flex items-center justify-center gap-2">
              <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center"><span className="font-black text-[9px]">F</span></div>
              Payer avec Frako
            </button>
          </div>
        </div>
      </div>

      {/* Checkout modal */}
      {step !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-[#3855f3] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-white rounded-full flex items-center justify-center"><span className="text-[#3855f3] font-black text-xs">F</span></div><span className="text-white font-bold">frako</span></div>
              <button onClick={() => setStep("idle")} className="text-white/70 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-5">
              {step === "success" ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Paiement approuvé !</h3>
                  <p className="text-sm text-gray-500 mb-4">1er versement de <strong>{per(plan)} CDF</strong> débité avec succès.</p>
                  <button onClick={() => setStep("idle")} className="bg-[#3855f3] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition">Fermer la démo</button>
                </div>
              ) : (
                <>
                  <div className="bg-gray-50 rounded-xl p-3 mb-4 flex justify-between text-sm"><span className="text-gray-600">Galaxy A54</span><span className="font-bold">450 000 CDF</span></div>
                  <div className="flex gap-2 mb-4">
                    {([3, 6] as const).map((n) => (
                      <button key={n} onClick={() => setPlan(n)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition ${plan === n ? "bg-[#3855f3] text-white border-[#3855f3]" : "border-gray-200 text-gray-600"}`}>
                        {n}x · {per(n)} CDF
                      </button>
                    ))}
                  </div>
                  <div className="space-y-1.5 text-sm mb-4">
                    {[["Mensualité", `${per(plan)} CDF`], ["Durée", `${plan} mois`], ["Intérêts", "0 % offert"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between"><span className="text-gray-500">{k}</span><span className={`font-semibold ${k === "Intérêts" ? "text-green-600" : "text-gray-900"}`}>{v}</span></div>
                    ))}
                    <div className="border-t pt-1.5 flex justify-between font-bold text-sm"><span>Total</span><span>450 000 CDF</span></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <input type="text" placeholder="Nom complet" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3]" />
                    <input type="tel" placeholder="Numéro Mobile Money (ex: +243 81…)" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3]" />
                  </div>
                  <button onClick={() => { setStep("loading"); setTimeout(() => setStep("success"), 1800); }} disabled={step === "loading"}
                    className="w-full bg-[#3855f3] text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-60 transition">
                    {step === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                        Traitement…
                      </span>
                    ) : `Confirmer · ${per(plan)} CDF`}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-2">Sécurisé par <span className="font-bold text-[#3855f3]">frako</span></p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mt-4">
        ☝️ Cliquez sur «Payer avec Frako» ci-dessus pour voir la démo complète du tunnel de paiement.
      </p>
    </div>
  );
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    key: "overview",
    label: "Vue d'ensemble",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: "orders",
    label: "Transactions",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    key: "integrations",
    label: "Intégrations",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    key: "settings",
    label: "Paramètres",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "integrations" | "settings">("overview");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");

  const copy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const stats = {
    total: mockOrders.length,
    completed: mockOrders.filter((o) => o.status === "completed").length,
    pending: mockOrders.filter((o) => o.status === "pending").length,
    revenue: mockOrders
      .filter((o) => o.status === "completed")
      .reduce((acc, o) => acc + (o.currency === "USD" ? o.amount * 2700 : o.amount), 0),
  };

  const filteredOrders = mockOrders.filter((o) => {
    const matchSearch =
      orderSearch === "" ||
      (o.externalOrderId ?? "").toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.id.includes(orderSearch);
    const matchFilter = orderFilter === "all" || o.status === orderFilter;
    return matchSearch && matchFilter;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Transactions totales", value: stats.total,                                 color: "text-gray-900",    icon: "📊", sub: "toutes périodes" },
          { label: "Payées",               value: stats.completed,                             color: "text-green-600",   icon: "✅", sub: "complétées" },
          { label: "En attente",           value: stats.pending,                               color: "text-amber-500",   icon: "⏳", sub: "en cours" },
          { label: "Revenus (CDF)",        value: stats.revenue.toLocaleString("fr-FR"),       color: "text-[#3855f3]",   icon: "💰", sub: "paiements reçus" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
              <span className="text-lg">{s.icon}</span>
            </div>
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Onboarding checklist */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900">Checklist d'intégration</h3>
          <span className="text-xs text-gray-400">2 / 4 complétés</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
          <div className="bg-[#3855f3] h-1.5 rounded-full" style={{ width: "50%" }} />
        </div>
        <div className="space-y-3">
          {[
            { done: true,  label: "Créer votre compte marchand",        action: null },
            { done: true,  label: "Obtenir vos clés API",               action: null },
            { done: false, label: "Intégrer le SDK sur votre boutique", action: () => setActiveTab("integrations") },
            { done: false, label: "Effectuer un test de paiement",      action: () => setActiveTab("integrations") },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-green-500" : "border-2 border-gray-300"}`}>
                {item.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className={`text-sm flex-1 ${item.done ? "text-gray-400 line-through" : "text-gray-700"}`}>{item.label}</span>
              {!item.done && item.action && <button onClick={item.action} className="text-xs text-[#3855f3] font-semibold hover:underline">Faire →</button>}
            </div>
          ))}
        </div>
      </div>

      {/* Quick code */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Démarrage rapide</h3>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">SDK v1.0.0</span>
        </div>
        <div className="bg-[#0d1117] rounded-xl p-5 text-sm font-mono leading-relaxed overflow-x-auto">
          <div className="text-gray-500 mb-1">{"// 1. Installation"}</div>
          <div className="text-green-400 mb-4">npm install @frako/sdk</div>
          <div className="text-gray-500 mb-1">{"// 2. Initialisation"}</div>
          <div>
            <span className="text-purple-400">import </span>
            <span className="text-blue-300">{"{ initFrako, FrakoButton } "}</span>
            <span className="text-purple-400">from </span>
            <span className="text-amber-300">&apos;@frako/sdk&apos;;</span>
          </div>
          <div className="mt-2 mb-4">
            <span className="text-yellow-300">initFrako</span>
            <span className="text-white">{"({ merchantId: "}</span>
            <span className="text-amber-300">&apos;{mockMerchant.merchantId}&apos;</span>
            <span className="text-white">{" });"}</span>
          </div>
          <div className="text-gray-500 mb-1">{"// 3. Bouton dans votre JSX"}</div>
          <div>
            <span className="text-blue-300">{"<FrakoButton "}</span>
            <span className="text-green-300">amount</span><span className="text-white">{"={450000} "}</span>
            <span className="text-green-300">currency</span><span className="text-amber-300">=&quot;CDF&quot; </span>
            <span className="text-green-300">installments</span><span className="text-white">{"={3} "}</span>
            <span className="text-blue-300">{"/>"}</span>
          </div>
        </div>
        <button onClick={() => setActiveTab("integrations")} className="mt-4 text-sm text-[#3855f3] font-semibold hover:underline">
          Documentation complète + démo du bouton →
        </button>
      </div>

      {/* Recent transactions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Transactions récentes</h3>
          <button onClick={() => setActiveTab("orders")} className="text-xs text-[#3855f3] font-medium hover:underline">Voir tout →</button>
        </div>
        <OrderTable orders={mockOrders.slice(0, 4)} />
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Rechercher par référence…" value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3]" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[{ key: "all", label: "Toutes" }, { key: "completed", label: "Payées" }, { key: "pending", label: "En attente" }, { key: "failed", label: "Échouées" }].map((f) => (
            <button key={f.key} onClick={() => setOrderFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${orderFilter === f.key ? "bg-[#3855f3] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400 ml-auto">{filteredOrders.length} résultat(s)</span>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm text-gray-400">Aucune transaction ne correspond à votre recherche.</p>
          </div>
        ) : <OrderTable orders={filteredOrders} />}
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      {/* Live button demo */}
      <FrakoButtonPreview />

      {/* SDK guide */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-[#3855f3]/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-[#3855f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Guide d'intégration SDK</h2>
            <p className="text-xs text-gray-500">3 étapes — copiez-collez, c'est prêt</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Step 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Étape 1 — Installation</p>
              <button onClick={() => copy("npm install @frako/sdk", "s1")} className="text-xs text-[#3855f3] flex items-center gap-1 hover:underline">
                <CopyIcon copied={copiedField === "s1"} /> Copier
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
              <span className="text-gray-500">$ </span><span className="text-green-400">npm install</span> <span className="text-blue-300">@frako/sdk</span>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Étape 2 — Initialisation (une seule fois)</p>
              <button onClick={() => copy(`import { initFrako } from '@frako/sdk';\n\ninitFrako({\n  merchantId: '${mockMerchant.merchantId}',\n  environment: 'sandbox',\n});`, "s2")} className="text-xs text-[#3855f3] flex items-center gap-1 hover:underline">
                <CopyIcon copied={copiedField === "s2"} /> Copier
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm leading-relaxed">
              <span className="text-purple-400">import</span> <span className="text-blue-300">{"{ initFrako }"}</span> <span className="text-purple-400">from</span> <span className="text-amber-300">&apos;@frako/sdk&apos;</span><span className="text-white">;</span>
              <br /><br />
              <span className="text-yellow-300">initFrako</span><span className="text-white">{"({"}</span>
              <br />
              <span className="text-white">{"  "}</span><span className="text-green-300">merchantId</span><span className="text-white">{": "}</span><span className="text-amber-300">&apos;{mockMerchant.merchantId}&apos;</span><span className="text-gray-400">,</span>
              <br />
              <span className="text-white">{"  "}</span><span className="text-green-300">environment</span><span className="text-white">{": "}</span><span className="text-amber-300">&apos;sandbox&apos;</span><span className="text-gray-400">,  {"// 'production' au lancement"}</span>
              <br />
              <span className="text-white">{"});"}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Étape 3 — Bouton de paiement</p>
              <button onClick={() => copy(`import { FrakoButton } from '@frako/sdk';\n\n<FrakoButton\n  amount={450000}\n  currency="CDF"\n  installments={3}\n  orderId="votre_ref"\n  onSuccess={(token) => console.log(token)}\n  onCancel={() => {}}\n/>`, "s3")} className="text-xs text-[#3855f3] flex items-center gap-1 hover:underline">
                <CopyIcon copied={copiedField === "s3"} /> Copier
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm leading-relaxed">
              <span className="text-purple-400">import</span> <span className="text-blue-300">{"{ FrakoButton }"}</span> <span className="text-purple-400">from</span> <span className="text-amber-300">&apos;@frako/sdk&apos;</span><span className="text-white">;</span>
              <br /><br />
              <span className="text-blue-300">{"<FrakoButton"}</span>
              <br />
              <span className="text-white">{"  "}</span><span className="text-green-300">amount</span><span className="text-white">{"={"}</span><span className="text-orange-300">450000</span><span className="text-white">{"}"}</span>
              <br />
              <span className="text-white">{"  "}</span><span className="text-green-300">currency</span><span className="text-white">=</span><span className="text-amber-300">&quot;CDF&quot;</span>
              <br />
              <span className="text-white">{"  "}</span><span className="text-green-300">installments</span><span className="text-white">{"={"}</span><span className="text-orange-300">3</span><span className="text-white">{"}"}</span>
              <br />
              <span className="text-white">{"  "}</span><span className="text-green-300">orderId</span><span className="text-white">=</span><span className="text-amber-300">&quot;votre_ref&quot;</span>
              <br />
              <span className="text-white">{"  "}</span><span className="text-green-300">onSuccess</span><span className="text-white">{"={(token) => handleSuccess(token)}"}</span>
              <br />
              <span className="text-white">{"  "}</span><span className="text-green-300">onCancel</span><span className="text-white">{"={() => handleCancel()}"}</span>
              <br />
              <span className="text-blue-300">{"/>"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">Plugins & plateformes supportées</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "React / Next.js", badge: "Disponible", bc: "bg-green-100 text-green-700", icon: "⚛️", desc: "SDK natif React avec hooks et FrakoButton" },
            { name: "WooCommerce",     badge: "Bientôt",    bc: "bg-yellow-100 text-yellow-700", icon: "🛒", desc: "Plugin WordPress en développement" },
            { name: "Shopify",         badge: "Bientôt",    bc: "bg-yellow-100 text-yellow-700", icon: "🏪", desc: "App Shopify — liste d'attente ouverte" },
          ].map((p) => (
            <div key={p.name} className="border border-gray-100 rounded-xl p-4 hover:border-[#3855f3]/40 hover:shadow-sm transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{p.icon}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.bc}`}>{p.badge}</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
              <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook events */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-1">Événements webhook</h2>
        <p className="text-xs text-gray-500 mb-4">Configurez votre URL webhook dans Paramètres — Frako vous envoie ces événements en POST JSON.</p>
        <div className="space-y-2">
          {[
            { event: "order.created",   color: "text-blue-600 bg-blue-50",   payload: '{ "event": "order.created",   "orderId": "ord_...", "amount": 450000 }' },
            { event: "order.completed", color: "text-green-600 bg-green-50", payload: '{ "event": "order.completed", "orderToken": "tok_...", "status": "paid" }' },
            { event: "order.failed",    color: "text-red-600 bg-red-50",     payload: '{ "event": "order.failed",    "reason": "insufficient_funds" }' },
            { event: "order.cancelled", color: "text-gray-600 bg-gray-100",  payload: '{ "event": "order.cancelled", "cancelledAt": "2024-..." }' },
          ].map((w) => (
            <div key={w.event} className="rounded-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5">
                <code className={`text-xs font-mono font-semibold px-2 py-1 rounded shrink-0 ${w.color}`}>{w.event}</code>
              </div>
              <div className="bg-gray-900 px-4 py-2 font-mono text-xs text-gray-400 overflow-x-auto">{w.payload}</div>
            </div>
          ))}
        </div>
      </div>

      {/* API Reference */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-1">Référence API REST</h2>
        <p className="text-xs text-gray-500 mb-4">
          Base URL: <code className="font-mono bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-gray-700">https://frako.cd</code>
          {" · "}Header: <code className="font-mono bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-gray-700">X-Frako-Key: frk_live_…</code>
        </p>
        <div className="space-y-2">
          {[
            { method: "POST", path: "/api/v1/merchants/register",  auth: false, desc: "Inscription d'un nouveau marchand" },
            { method: "POST", path: "/api/v1/orders/create",       auth: true,  desc: "Créer une commande → orderToken" },
            { method: "GET",  path: "/api/v1/orders/status",       auth: true,  desc: "Statut d'une commande (?token=…)" },
            { method: "POST", path: "/api/v1/webhooks/notify",     auth: true,  desc: "Notif marchand (usage interne)" },
          ].map((r) => (
            <div key={r.path} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition">
              <span className={`text-xs font-bold px-2 py-1 rounded font-mono shrink-0 w-14 text-center ${r.method === "POST" ? "bg-[#3855f3] text-white" : "bg-green-500 text-white"}`}>{r.method}</span>
              <code className="text-xs font-mono text-gray-700 flex-1">{r.path}</code>
              {r.auth && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">Auth</span>}
              <span className="text-xs text-gray-400 shrink-0 hidden md:block">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-5">
      {/* Account info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Informations du compte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Nom de l'entreprise", val: mockMerchant.name },
            { label: "Email de contact",     val: mockMerchant.email },
            { label: "Téléphone",            val: mockMerchant.phone },
            { label: "N° RCCM / Business",   val: mockMerchant.businessNumber },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{f.label}</label>
              <input defaultValue={f.val ?? ""} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3]" />
            </div>
          ))}
        </div>
        <button className="mt-4 bg-[#3855f3] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Mettre à jour</button>
      </div>

      {/* API Credentials */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Clés API</h3>
        <p className="text-sm text-gray-500 mb-5">Utilisez ces clés pour authentifier vos requêtes à l'API Frako.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Merchant ID</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg font-mono text-sm text-gray-800">{mockMerchant.merchantId}</code>
              <button onClick={() => copy(mockMerchant.merchantId, "mid")} className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-500">
                <CopyIcon copied={copiedField === "mid"} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Identifiant public — utilisez-le pour initialiser le SDK côté client.</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Clé API secrète</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg font-mono text-sm text-gray-800 overflow-hidden truncate">
                {showApiKey ? mockMerchant.apiKey : "frk_live_••••••••••••••••••••••••••••••••••"}
              </code>
              <button onClick={() => setShowApiKey(!showApiKey)} className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-500">
                {showApiKey
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
              </button>
              <button onClick={() => copy(mockMerchant.apiKey, "key")} className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-500">
                <CopyIcon copied={copiedField === "key"} />
              </button>
            </div>
            <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Ne jamais exposer cette clé dans votre frontend ou un dépôt public.
            </p>
          </div>
        </div>
      </div>

      {/* Webhooks & URLs */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Webhooks & Redirections</h3>
        <p className="text-sm text-gray-500 mb-5">Frako appellera votre URL webhook pour chaque événement de paiement (POST JSON).</p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">URL Webhook</label>
            <input type="url" defaultValue={mockMerchant.webhookUrl} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3]" placeholder="https://votresite.com/webhook/frako" />
            <p className="text-xs text-gray-400 mt-1">Consultez l'onglet Intégrations pour voir les payloads d'événements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">URL de succès</label>
              <input type="url" defaultValue={mockMerchant.successUrl} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3]" placeholder="https://votresite.com/merci" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">URL d'annulation</label>
              <input type="url" defaultValue={mockMerchant.cancelUrl} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3]" placeholder="https://votresite.com/annule" />
            </div>
          </div>
          <button className="bg-[#3855f3] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Sauvegarder</button>
        </div>
      </div>

      {/* Environment */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Environnement d'exécution</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Sandbox", desc: "Tests sans vrais paiements", active: true },
            { label: "Production", desc: "Paiements réels — contactez Frako", active: false },
          ].map((env) => (
            <div key={env.label} className={`p-4 rounded-xl border-2 cursor-pointer transition ${env.active ? "border-[#3855f3] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-gray-900">{env.label}</span>
                {env.active && <span className="text-xs bg-[#3855f3] text-white px-2 py-0.5 rounded-full">Actif</span>}
              </div>
              <p className="text-xs text-gray-500">{env.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Pour activer la production : <a href="mailto:support@frako.cd" className="text-[#3855f3] font-medium">support@frako.cd</a>
        </p>
      </div>
    </div>
  );

  const pageLabel: Record<string, { title: string; sub: string }> = {
    overview:     { title: "Vue d'ensemble",  sub: `Bienvenue sur votre espace marchand, ${mockMerchant.name}` },
    orders:       { title: "Transactions",    sub: "Historique complet de vos paiements Frako" },
    integrations: { title: "Intégrations",   sub: "SDK, bouton de démo, plugins et documentation API" },
    settings:     { title: "Paramètres",     sub: "Clés API, webhooks, redirections et préférences" },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 flex items-center justify-between px-6 py-3 sticky top-0 z-10 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#3855f3] rounded-full flex items-center justify-center">
            <span className="text-white font-black text-base">F</span>
          </div>
          <span className="text-gray-900 font-bold text-lg tracking-tight">frako</span>
          <span className="text-gray-300 mx-1.5 text-sm">/</span>
          <span className="text-gray-500 text-sm hidden sm:inline">Dashboard marchand</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Sandbox
          </span>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
            <div className="w-6 h-6 bg-[#3855f3] rounded-full flex items-center justify-center text-white text-xs font-bold">{mockMerchant.name[0]}</div>
            <span className="text-sm text-gray-700 font-medium hidden sm:inline">{mockMerchant.name}</span>
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
          <Link href="/login" className="text-sm text-gray-400 hover:text-red-500 transition flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="hidden sm:inline">Déconnexion</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ────────────────────────────────────────── */}
        <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-5 shrink-0">
          <nav className="space-y-0.5 px-3 flex-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.key} onClick={() => setActiveTab(item.key as typeof activeTab)}
                style={activeTab === item.key ? { backgroundColor: "rgba(56,85,243,0.08)" } : {}}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === item.key ? "text-[#3855f3]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}>
                <span className={activeTab === item.key ? "text-[#3855f3]" : "text-gray-400"}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="px-3 mt-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                <p className="text-xs font-bold text-[#3855f3]">Mode sandbox</p>
              </div>
              <p className="text-xs text-blue-600 leading-relaxed mb-2">Testez sans vrais paiements.</p>
              <button onClick={() => setActiveTab("settings")} className="text-xs text-[#3855f3] font-semibold hover:underline">Passer en prod →</button>
            </div>
          </div>
        </aside>

        {/* ── Main ───────────────────────────────────────────── */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900">{pageLabel[activeTab].title}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{pageLabel[activeTab].sub}</p>
            </div>
            {activeTab === "overview"     && renderOverview()}
            {activeTab === "orders"       && renderOrders()}
            {activeTab === "integrations" && renderIntegrations()}
            {activeTab === "settings"     && renderSettings()}
          </div>
        </main>
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#3855f3] rounded-full flex items-center justify-center">
                <span className="text-white font-black text-[9px]">F</span>
              </div>
              <span className="text-gray-600 text-sm font-semibold">frako</span>
              <span className="text-gray-400 text-xs ml-1">Dashboard v1.0</span>
            </div>
            <div className="hidden md:flex gap-4 text-xs text-gray-400">
              <button onClick={() => setActiveTab("integrations")} className="hover:text-[#3855f3] transition">Documentation</button>
              <button onClick={() => setActiveTab("settings")} className="hover:text-[#3855f3] transition">Paramètres</button>
              <a href="mailto:support@frako.cd" className="hover:text-[#3855f3] transition">Support</a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Tous les services opérationnels
            </span>
            <span>© 2024 Frako Technologies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const statusStyle: Record<string, string> = {
  completed:  "bg-green-50 text-green-700 border border-green-100",
  pending:    "bg-amber-50 text-amber-700 border border-amber-100",
  failed:     "bg-red-50 text-red-700 border border-red-100",
  cancelled:  "bg-gray-100 text-gray-500",
  processing: "bg-blue-50 text-blue-700 border border-blue-100",
};
const statusLabel: Record<string, string> = {
  completed:  "Payé",
  pending:    "En attente",
  failed:     "Échoué",
  cancelled:  "Annulé",
  processing: "En cours",
};

function OrderTable({ orders }: { orders: Order[] }) {

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/80">
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Réf.</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Montant</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Plan</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50/50 transition">
              <td className="px-5 py-3.5 text-sm font-mono text-gray-700">
                {order.externalOrderId || order.id.slice(0, 8)}
              </td>
              <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">
                {order.amount.toLocaleString("fr-FR")} {order.currency}
              </td>
              <td className="px-5 py-3.5">
                <span className="bg-[#3855f3]/8 text-[#3855f3] text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(56,85,243,0.08)" }}>
                  {order.installments}x
                </span>
              </td>
              <td className="px-5 py-3.5">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyle[order.status] ?? ""}`}>
                  {statusLabel[order.status] ?? order.status}
                </span>
              </td>
              <td className="px-5 py-3.5 text-sm text-gray-400">
                {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
