import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Platform, StatusBar } from 'react-native';
import { useCycleStore } from '@/src/store/cycleStore';
import { getCurrentPhaseDayNumber, getPhaseByDay } from '@/src/utils/cycleCalculator';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function PartnerScreen() {
  const { profile, phases } = useCycleStore();
  const [dayInCycle, setDayInCycle] = useState(1);
  const [currentPhase, setCurrentPhase] = useState(phases[0]);

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
          <Text style={styles.title}>Mode Pasangan</Text>
          <Text style={styles.subtitle}>Fase pasanganmu hari ini: {currentPhase.name}</Text>
        </View>

        <View style={[styles.mainCard, { backgroundColor: currentPhase.color }]}>
           <Text style={styles.cardHeader}>Dia ada di fase ini</Text>
           <Text style={styles.cardTitle}>{currentPhase.name.toUpperCase()}</Text>
           <Text style={styles.cardDesc}>
              {currentPhase.name === 'Menstruasi' ? 'Energinya lagi rendah nih. Butuh disayang ekstra.' : 
               currentPhase.name === 'Folikuler' ? 'Banyak energi, mood yang optimal!' : 
               currentPhase.name === 'Ovulasi' ? 'Puncak kesuburan. Waktu yang baik untuk berduaan.' : 
               'Masa rawan PMS. Butuh pengertian lebih.'}
           </Text>
        </View>

        <Text style={styles.guideTitle}>Panduan Tindakan</Text>
        
        <View style={styles.actionsBox}>
           {currentPhase.partnerActions.map((action, idx) => (
             <View key={idx} style={styles.actionRow}>
                <View style={[styles.iconBox, { backgroundColor: currentPhase.color + '40' }]}>
                    <IconSymbol name="heart.fill" size={20} color={currentPhase.color} />
                </View>
                <Text style={styles.actionItem}>{action}</Text>
             </View>
           ))}
        </View>

        <View style={styles.tipCard}>
            <Text style={styles.tipHeader}>💡 Tips Cerdas</Text>
            <Text style={styles.tipText}>Jangan menanyakan "Kamu lagi PMS ya?" ketika mood-nya sedang turun. Hadir saja untuknya.</Text>
        </View>

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
  mainCard: {
      padding: 24,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 15,
      shadowOffset: { width: 0, height: 10 },
      elevation: 5,
      marginBottom: 32,
  },
  cardHeader: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1
  },
  cardTitle: {
      color: '#fff',
      fontSize: 36,
      fontWeight: '900',
      marginVertical: 8,
  },
  cardDesc: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: 16,
      lineHeight: 24,
  },
  guideTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: 16,
  },
  actionsBox: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.03,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
      marginBottom: 24,
  },
  actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
  },
  iconBox: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
  },
  actionItem: {
      fontSize: 16,
      color: '#4A5568',
      flex: 1,
      fontWeight: '500'
  },
  tipCard: {
      backgroundColor: '#FEFCBF',
      borderRadius: 12,
      padding: 20,
      borderLeftWidth: 4,
      borderLeftColor: '#D69E2E'
  },
  tipHeader: {
      fontSize: 16,
      fontWeight: '700',
      color: '#975A16',
      marginBottom: 8,
  },
  tipText: {
      fontSize: 15,
      color: '#744210',
      lineHeight: 22,
  }
});
