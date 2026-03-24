import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { useCycleStore } from '@/src/store/cycleStore';
import { PhaseCard } from '@/src/components/PhaseCard';
import { getCurrentPhaseDayNumber, getPhaseByDay } from '@/src/utils/cycleCalculator';

export default function DashboardScreen() {
  const router = useRouter();
  const { profile, phases, setProfile, symptomLogs } = useCycleStore();
  const [dayInCycle, setDayInCycle] = useState(1);
  const [currentPhase, setCurrentPhase] = useState(phases[0]);
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const hasLoggedToday = symptomLogs[todayStr];

  useEffect(() => {
    // For demo purposes, if profile doesn't exist, we set one up automatically.
    if (!profile) {
      const msInDay = 24 * 60 * 60 * 1000;
      const fakeLastPeriod = new Date(Date.now() - 10 * msInDay).toISOString(); // 10 days ago -> FOLLICULAR
      setProfile({
        name: 'Sayang',
        role: 'female',
        cycleLength: 28,
        periodDuration: 5,
        lastPeriodStart: fakeLastPeriod,
      });
    }
  }, [profile, setProfile]);

  useEffect(() => {
    if (profile?.lastPeriodStart) {
      const day = getCurrentPhaseDayNumber(profile.lastPeriodStart, new Date(), profile.cycleLength);
      setDayInCycle(day);
      const phase = getPhaseByDay(day, phases);
      if (phase) {
        setCurrentPhase(phase);
      }
    }
  }, [profile, phases]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Halo, {profile?.name || 'Sayang'}</Text>
          <Text style={styles.subGreeting}>Lihat siklusmu hari ini.</Text>
        </View>

        <View style={styles.dayCircleContainer}>
          <View style={[styles.dayCircle, { borderColor: currentPhase.color }]}>
            <Text style={styles.dayText}>Hari {dayInCycle}</Text>
            <Text style={[styles.phaseText, { color: currentPhase.color }]}>{currentPhase.name}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Status Hari Ini</Text>
        <PhaseCard phase={currentPhase} dayInCycle={dayInCycle} />

        {hasLoggedToday && (
          <View style={styles.loggedSummary}>
            <Text style={styles.summaryTitle}>Gejala yang dicatat:</Text>
            <View style={styles.summaryTags}>
              {hasLoggedToday.mood.map(m => (
                <View key={m} style={styles.tag}><Text style={styles.tagText}>{m}</Text></View>
              ))}
              {hasLoggedToday.pain.map(p => (
                <View key={p} style={[styles.tag, { backgroundColor: '#FEE2E2' }]}><Text style={[styles.tagText, { color: '#E53E3E' }]}>{p}</Text></View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.logButton, hasLoggedToday && styles.logButtonActive]}
          onPress={() => router.push('/log-symptom')}
        >
          <Text style={[styles.logButtonText, hasLoggedToday && styles.logButtonTextActive]}>
            {hasLoggedToday ? '✓ Edit Catatan Hari Ini' : '+ Catat Gejala Hari Ini'}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 32,
    marginTop: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3748',
  },
  subGreeting: {
    fontSize: 16,
    color: '#718096',
    marginTop: 6,
  },
  dayCircleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dayCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  dayText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2D3748',
  },
  phaseText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 16,
    marginTop: 24,
  },
  logButton: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
  },
  logButtonActive: {
    backgroundColor: '#E6FFFA',
    borderColor: '#38B2AC',
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A5568',
  },
  logButtonTextActive: {
    color: '#2C7A7B',
  },
  loggedSummary: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 10,
  },
  summaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A5568',
  },
});
