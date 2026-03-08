'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInWithPhone: (phone: string) => Promise<{ error?: Error }>;
  verifyOtp: (phone: string, token: string) => Promise<{ session?: Session; error?: Error }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function formatPhoneForSupabase(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('243')) return `+${cleaned}`;
  if (cleaned.startsWith('0')) return `+243${cleaned.slice(1)}`;
  return `+243${cleaned}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithPhone = useCallback(async (phone: string) => {
    const formatted = formatPhoneForSupabase(phone);
    const { error } = await supabase.auth.signInWithOtp({
      phone: formatted,
      options: { channel: 'sms' },
    });
    return { error: error ?? undefined };
  }, []);

  const verifyOtp = useCallback(async (phone: string, token: string) => {
    const formatted = formatPhoneForSupabase(phone);
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formatted,
      token,
      type: 'sms',
    });
    return { session: data?.session, error: error ?? undefined };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value: AuthContextType = {
    session,
    user: session?.user ?? null,
    loading,
    signInWithPhone,
    verifyOtp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
