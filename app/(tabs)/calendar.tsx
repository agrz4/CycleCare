import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Platform, StatusBar } from 'react-native';
import { CycleCalendar } from '@/src/components/CycleCalendar';
import { PhaseCard } from '@/src/components/PhaseCard';
import { useCycleStore } from '@/src/store/cycleStore';
import { getCurrentPhaseDayNumber, getPhaseByDay } from '@/src/utils/cycleCalculator';

export default function CalendarScreen() {
  const { profile, phases } = useCycleStore();
  const [selectedDayInfo, setSelectedDayInfo] = useState<{
    dateStr: string;
    dayInCycle: number;
    phase: typeof phases[0] | null;
  } | null>(null);

  const handleDayPress = (day: any) => {
    if (!profile?.lastPeriodStart) return;
    const selectedDate = new Date(day.dateString);
    const dayInCycle = getCurrentPhaseDayNumber(profile.lastPeriodStart, selectedDate, profile.cycleLength);
    const phase = getPhaseByDay(dayInCycle, phases);
    
    setSelectedDayInfo({
      dateStr: day.dateString,
      dayInCycle,
      phase: phase || phases[0],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Kalender Siklus</Text>
          <Text style={styles.subtitle}>Lihat & prediksi fasemu ke depan</Text>
        </View>

        <CycleCalendar onDayPress={handleDayPress} />

        {selectedDayInfo && selectedDayInfo.phase && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedDateText}>Prediksi untuk {selectedDayInfo.dateStr}</Text>
            <PhaseCard phase={selectedDayInfo.phase} dayInCycle={selectedDayInfo.dayInCycle} />
          </View>
        )}
        
        {!selectedDayInfo && (
           <View style={styles.tipContainer}>
               <Text style={styles.tipText}>Tap tanggal mana saja untuk melihat prediksi fase hari itu.</Text>
           </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAFC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginTop: 6,
  },
  selectedContainer: {
    marginTop: 32,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 12,
  },
  tipContainer: {
      marginTop: 32,
      padding: 16,
      backgroundColor: '#EBF8FF',
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#3182CE'
  },
  tipText: {
      color: '#2B6CB0',
      fontSize: 15,
      fontWeight: '500'
  }
});
