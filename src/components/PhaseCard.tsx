import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CyclePhase } from '../types/cycle.types';
import { IconSymbol } from '../../components/ui/icon-symbol';

interface PhaseCardProps {
  phase: CyclePhase;
  dayInCycle: number;
}

export function PhaseCard({ phase, dayInCycle }: PhaseCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: phase.color }]}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Fase {phase.name}</Text>
          <Text style={styles.subtitle}>Hari ke-{dayInCycle} dari Siklus</Text>
        </View>
        <View style={[styles.iconContainer, { backgroundColor: `${phase.color}20` }]}>
          <IconSymbol name="house.fill" size={24} color={phase.color} />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Yang dilakukan pasangan:</Text>
        {phase.partnerActions.map((action, index) => (
          <View key={index} style={styles.actionRow}>
            <View style={[styles.bullet, { backgroundColor: phase.color }]} />
            <Text style={styles.actionText}>{action}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3748',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#4a5568',
    flex: 1,
  },
});
