'use client';

import ConsultForm from '@/components/ConsultForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">ScoreCongo</h1>
        <p className="text-lg text-slate-600 max-w-md">
          Premier bureau de crédit de la RDC. Consultez votre score consolidé (0-850) par nom et NIN.
        </p>
        <p className="mt-2 text-sm text-slate-500">3 consultations gratuites puis payant</p>
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <ConsultForm />
      </div>
    </main>
  );
}
