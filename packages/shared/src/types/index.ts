// ScoreCongo
export interface CreditScore {
  nin: string;
  score: number; // 0-850
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  factors: ScoreFactor[];
  lastUpdated: string;
}

export interface ScoreFactor {
  name: string;
  weight: number;
  impact: 'positive' | 'negative' | 'neutral';
}

// Frako BNPL
export interface FrakoUser {
  id: string;
  phone: string;
  nin?: string;
  bankAccountId?: string;
  debitCardId?: string;
  scoreId?: string;
  createdAt: string;
}

export interface FrakoInstallment {
  orderId: string;
  amount: number;
  installments: 3 | 6;
  status: 'pending' | 'paid' | 'overdue';
  dueDates: string[];
}

// Envol
export interface FlightBooking {
  id: string;
  envolRef: string;
  airlineRef: string;
  email: string;
  passengerName: string;
  flightDetails: FlightDetails;
  amount: number;
  frakoEnabled?: boolean;
}

export interface FlightDetails {
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  airline: string;
}
