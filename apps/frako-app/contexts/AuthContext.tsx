'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { MOCK_MODE } from '../lib/config';
import type { Session, User } from '@supabase/supabase-js';

const MOCK_SESSION_KEY = '@frako_mock_session';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInWithPhone: (phone: string) => Promise<{ error?: Error }>;
  verifyOtp: (phone: string, token: string) => Promise<{ session?: Session; error?: Error }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('243')) return `+${cleaned}`;
  if (cleaned.startsWith('0')) return `+243${cleaned.slice(1)}`;
  return `+243${cleaned}`;
}

function createMockSession(phone: string): Session {
  return {
    access_token: 'mock-token',
    refresh_token: 'mock-refresh',
    expires_in: 3600,
    token_type: 'bearer',
    user: {
      id: 'mock-user-id',
      phone: formatPhone(phone),
      aud: 'authenticated',
      role: 'authenticated',
      email: undefined,
      app_metadata: {},
      user_metadata: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as User,
  } as Session;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (MOCK_MODE) {
      AsyncStorage.getItem(MOCK_SESSION_KEY).then((stored) => {
        setSession(stored ? JSON.parse(stored) : null);
        setLoading(false);
      });
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signInWithPhone = useCallback(async (phone: string) => {
    if (MOCK_MODE) return {}; // Toujours OK en mock
    const formatted = formatPhone(phone);
    const { error } = await supabase.auth.signInWithOtp({
      phone: formatted,
      options: { channel: 'sms' },
    });
    return { error: error ?? undefined };
  }, []);

  const verifyOtp = useCallback(async (phone: string, token: string) => {
    if (MOCK_MODE) {
      const mockSession = createMockSession(phone);
      await AsyncStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(mockSession));
      setSession(mockSession);
      return { session: mockSession };
    }
    const formatted = formatPhone(phone);
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formatted,
      token,
      type: 'sms',
    });
    return { session: data?.session, error: error ?? undefined };
  }, []);

  const signOut = useCallback(async () => {
    if (MOCK_MODE) {
      await AsyncStorage.removeItem(MOCK_SESSION_KEY);
      setSession(null);
    } else {
      await supabase.auth.signOut();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signInWithPhone,
        verifyOtp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
