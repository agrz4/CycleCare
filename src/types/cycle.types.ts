export interface CyclePhase {
  name: string;
  startDay: number;
  endDay: number;
  color: string;
  partnerActions: string[];
}

export interface UserProfile {
  name: string;
  role: 'female' | 'partner';
  partnerCode?: string;
  partnerName?: string;
  partnerMessage?: string;
  cycleLength: number;
  periodDuration: number;
  lastPeriodStart: string; // ISO String
}

export interface SymptomLog {
  date: string;
  mood: string[];
  pain: string[];
  notes: string;
}
