-- Ecosysteme RDC - Initial Schema
-- ScoreCongo, Frako, Envol

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone VARCHAR(20) UNIQUE NOT NULL,
  nin VARCHAR(20),
  full_name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ScoreCongo: Credit scores
CREATE TABLE public.credit_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nin VARCHAR(20) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 850),
  raw_data JSONB,
  source VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_credit_scores_nin ON public.credit_scores(nin);
CREATE INDEX idx_credit_scores_created ON public.credit_scores(created_at DESC);

-- ScoreCongo: Consultation history (for free tier limit)
CREATE TABLE public.score_consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nin VARCHAR(20) NOT NULL,
  requester_id UUID REFERENCES auth.users(id),
  paid BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_consultations_nin ON public.score_consultations(nin);

-- Frako: Merchants
CREATE TABLE public.frako_merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  api_key_hash VARCHAR(255) NOT NULL,
  webhook_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Frako: User BNPL accounts
CREATE TABLE public.frako_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bank_account_id VARCHAR(100),
  debit_card_token VARCHAR(255),
  credit_limit DECIMAL(12, 2) DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Frako: BNPL orders
CREATE TABLE public.frako_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  frako_account_id UUID NOT NULL REFERENCES public.frako_accounts(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES public.frako_merchants(id),
  amount DECIMAL(12, 2) NOT NULL,
  installments INTEGER NOT NULL CHECK (installments IN (3, 6)),
  status VARCHAR(50) DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Frako: Installment payments
CREATE TABLE public.frako_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.frako_orders(id) ON DELETE CASCADE,
  installment_number INTEGER NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  status VARCHAR(50) DEFAULT 'pending',
  late_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Envol: Flight bookings
CREATE TABLE public.envol_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  envol_reference VARCHAR(50) UNIQUE NOT NULL,
  airline_reference VARCHAR(100),
  duffel_order_id VARCHAR(100),
  passenger_email VARCHAR(255) NOT NULL,
  passenger_name VARCHAR(255),
  amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  frako_order_id UUID REFERENCES public.frako_orders(id),
  status VARCHAR(50) DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_envol_reference ON public.envol_bookings(envol_reference);
CREATE INDEX idx_envol_email ON public.envol_bookings(passenger_email);

-- RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.score_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.frako_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.frako_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.frako_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.envol_bookings ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
