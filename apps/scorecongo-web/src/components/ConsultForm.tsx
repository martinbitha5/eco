'use client';

import { useState } from 'react';
import { consultScore, type CreditScore, type ConsultError } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

type Step = 'info' | 'otp' | 'result';

export default function ConsultForm() {
  const { signInWithPhone, verifyOtp } = useAuth();
  const [step, setStep] = useState<Step>('info');
  const [fullName, setFullName] = useState('');
  const [nin, setNin] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreditScore | null>(null);
  const [error, setError] = useState<ConsultError | string | null>(null);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signInWithPhone(phone);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setStep('otp');
  }

  async function handleVerifyAndConsult(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { session, error: verifyError } = await verifyOtp(phone, otp);
    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }
    const token = session?.access_token;

    const res = await consultScore(nin.trim(), fullName.trim(), token);
    setLoading(false);

    if (res.data) {
      setResult(res.data);
      setStep('result');
    } else if (res.error) {
      setError(res.error);
    }
  }

  function handleReset() {
    setStep('info');
    setFullName('');
    setNin('');
    setPhone('');
    setOtp('');
    setResult(null);
    setError(null);
  }

  return (
    <div className="w-full max-w-md">
      {step === 'info' && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <p className="text-sm text-slate-600 mb-4">
            Saisissez vos informations. Vous devrez valider votre numéro de téléphone pour confirmer votre identité avant d&apos;obtenir votre score.
          </p>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jean Kabongo"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="nin" className="block text-sm font-medium text-gray-700 mb-1">
              NIN (Numéro d&apos;Identification National)
            </label>
            <input
              id="nin"
              type="text"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              placeholder="001-1234567890-12"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone (pour vérification)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+243 812 345 678"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">
              {typeof error === "string" ? error : (error as ConsultError).message ?? (error as ConsultError).error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Envoi du code...' : 'Envoyer le code de vérification'}
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyAndConsult} className="space-y-4">
          <p className="text-sm text-slate-600 mb-4">
            Un code à 6 chiffres a été envoyé au <strong>{phone}</strong>. Saisissez-le pour confirmer votre identité et consulter votre score.
          </p>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Code de vérification
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">
              {typeof error === "string" ? error : (error as ConsultError).message ?? (error as ConsultError).error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setStep('info'); setOtp(''); setError(null); }}
              className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Retour
            </button>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Vérification...' : 'Vérifier et consulter'}
            </button>
          </div>
        </form>
      )}

      {step === 'result' && result && (
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Votre score</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-blue-600">{result.score}</div>
              <div className="text-2xl font-medium text-gray-600">/ 850</div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Grade {result.grade}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Consultation {result.consultationNumber} — {result.freeConsultationsRemaining} gratuite(s) restante(s)
            </p>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
          >
            Nouvelle consultation
          </button>
        </div>
      )}

      {error && step !== 'info' && step !== 'otp' && (
        <div className="mt-6 p-4 rounded-lg border border-amber-200 bg-amber-50">
          {typeof error === 'string' ? (
            <p className="text-amber-800">{error}</p>
          ) : (
            <>
              <p className="font-medium text-amber-800">{error.message ?? error.error}</p>
              {error.paymentRequired && (
                <p className="mt-2 text-sm text-amber-700">
                  Prix : {error.consultationPrice} USD — Paiement à implémenter
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
