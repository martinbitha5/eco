"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <Plane className="w-4 h-4 text-white rotate-45" />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-gray-900 text-sm">Envol</p>
              <p className="text-gray-400 text-[10px]">depuis Kinshasa</p>
            </div>
          </Link>

          <div className="flex-1" />

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium">
              <span>��</span>
              <span>USD</span>
            </div>
            <Link
              href="/my-booking"
              className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors px-3 py-1.5"
            >
              Gérer mes réservations
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Menu className="w-3.5 h-3.5" />
              Menu
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / dropdown menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 space-y-1 animate-fade-in">
          <Link
            href="/my-booking"
            className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            onClick={() => setOpen(false)}
          >
            Gérer mes réservations
          </Link>
          <Link
            href="/#frako"
            className="block px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            onClick={() => setOpen(false)}
          >
            Paiement Frako
          </Link>
          <Link
            href="/#destinations"
            className="block px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            onClick={() => setOpen(false)}
          >
            Destinations
          </Link>
        </div>
      )}
    </header>
  );
}
