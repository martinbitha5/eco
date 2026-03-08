"use client";

import Link from "next/link";
import { useState } from "react";

const LANGUAGES = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ln", label: "Lingala", flag: "🇨🇩" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("fr");
  const [showLang, setShowLang] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");
  const [password, setPassword] = useState("");

  const selectedLang = LANGUAGES.find((l) => l.code === lang)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email") {
      setStep("password");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#3855f3] rounded-full flex items-center justify-center">
            <span className="text-white font-black text-base">F</span>
          </div>
          <span className="text-gray-900 font-bold text-xl tracking-tight">frako</span>
          <span className="text-gray-400 font-normal text-xl ml-0.5">for business</span>
        </Link>
        <a
          href="mailto:support@frako.com"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Aide
        </a>
      </header>

      {/* Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[420px] border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Connexion à votre compte marchand
          </h1>

          {/* Language selector */}
          <div className="relative mb-5">
            <button
              type="button"
              onClick={() => setShowLang(!showLang)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-gray-400 transition"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mr-1">Langue</span>
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.label}</span>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${showLang ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLang && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => { setLang(l.code); setShowLang(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 transition ${
                      lang === l.code ? "bg-blue-50 text-[#3855f3] font-medium" : "text-gray-700"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.code && (
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Adresse courriel"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3] placeholder-gray-400 transition"
              />
            </div>

            {step === "password" && (
              <div>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3855f3] placeholder-gray-400 transition"
                />
                <div className="text-right mt-1">
                  <a href="#" className="text-xs text-[#3855f3] hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-[#3855f3] text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {loading ? "Connexion en cours..." : step === "email" ? "Continuer" : "Se connecter"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Se connecter avec Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte?{" "}
            <Link href="/" className="text-[#3855f3] font-medium hover:underline">
              Commencer
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
