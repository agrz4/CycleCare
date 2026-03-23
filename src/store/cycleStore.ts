import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, CyclePhase, SymptomLog } from '../types/cycle.types';
import { calculateCyclePhases } from '../utils/cycleCalculator';
import { startOfDay, format } from 'date-fns';

interface CycleState {
  profile: UserProfile | null;
  symptomLogs: Record<string, SymptomLog>;
  phases: CyclePhase[];
  setProfile: (profile: Partial<UserProfile>) => void;
  logSymptom: (date: string, log: Omit<SymptomLog, 'date'>) => void;
  reset: () => void;
}

export const useCycleStore = create<CycleState>()(
  persist(
    (set, get) => ({
      profile: null,
      symptomLogs: {},
      phases: calculateCyclePhases(), // Default

      setProfile: (newProfile) => {
        set((state) => {
          const updatedProfile = { ...state.profile, ...newProfile } as UserProfile;
          const phases = calculateCyclePhases(
            updatedProfile.cycleLength || 28,
            updatedProfile.periodDuration || 5
          );
          return { profile: updatedProfile, phases };
        });
      },

      logSymptom: (dateStr: string, log: Omit<SymptomLog, 'date'>) => {
        set((state) => ({
          symptomLogs: {
            ...state.symptomLogs,
            [dateStr]: { ...log, date: dateStr },
          },
        }));
      },

      reset: () => {
        set({ profile: null, symptomLogs: {}, phases: calculateCyclePhases() });
      },
    }),
    {
      name: 'cyclecare-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
