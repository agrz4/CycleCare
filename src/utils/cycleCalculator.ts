import { CyclePhase } from '../types/cycle.types';
import { addDays, differenceInDays, startOfDay, subDays } from 'date-fns';

export function calculateCyclePhases(
  cycleLength: number = 28,
  periodDuration: number = 5
): CyclePhase[] {
  return [
    {
      name: 'Menstruasi',
      startDay: 1,
      endDay: periodDuration,
      color: '#E53E3E', // Merah
      partnerActions: [
        'Siapkan heating pad',
        'Sediakan makanan favoritnya',
        'Berikan pelukan tanpa kata-kata',
      ],
    },
    {
      name: 'Folikuler',
      startDay: periodDuration + 1,
      endDay: 13,
      color: '#ECC94B', // Kuning
      partnerActions: [
        'Ajak date menyenangkan',
        'Diskusi rencana ke depan',
        'Dukung aktivitas dan hobinya',
      ],
    },
    {
      name: 'Ovulasi',
      startDay: 14,
      endDay: 16,
      color: '#48BB78', // Hijau
      partnerActions: [
        'Waktu terbaik untuk keintiman',
        'Rencanakan momen romantis',
        'Berikan perhatian ekstra',
      ],
    },
    {
      name: 'Luteal',
      startDay: 17,
      endDay: cycleLength,
      color: '#ED8936', // Oranye
      partnerActions: [
        'Lebih sabar dan pengertian',
        'Bantu pekerjaan rumah',
        'Validasi perasaannya',
      ],
    },
  ];
}

export function getOvulationDate(lastPeriodStart: string | Date, cycleLength: number = 28): Date {
  const start = typeof lastPeriodStart === 'string' ? new Date(lastPeriodStart) : lastPeriodStart;
  const ovulationDay = cycleLength - 14;
  return addDays(startOfDay(start), ovulationDay - 1);
}

export function getFertileWindow(ovulationDate: Date): { start: Date; end: Date } {
  const start = subDays(startOfDay(ovulationDate), 5);
  const end = addDays(startOfDay(ovulationDate), 1);
  return { start, end };
}

export function getCurrentPhaseDayNumber(lastPeriodStart: string | Date, currentDay: string | Date = new Date(), cycleLength: number = 28): number {
    const start = startOfDay(typeof lastPeriodStart === 'string' ? new Date(lastPeriodStart) : lastPeriodStart);
    const current = startOfDay(typeof currentDay === 'string' ? new Date(currentDay) : currentDay);
    const diff = differenceInDays(current, start);
    // Jika lewat dari panjang siklus, anggap siklus baru mulai
    const dayInCycle = (diff % cycleLength) + 1;
    return dayInCycle > 0 ? dayInCycle : 1; 
}

export function getPhaseByDay(day: number, phases: CyclePhase[]): CyclePhase | undefined {
  return phases.find(phase => day >= phase.startDay && day <= phase.endDay) || phases[phases.length - 1];
}
