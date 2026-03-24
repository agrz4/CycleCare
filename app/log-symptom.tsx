import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCycleStore } from '@/src/store/cycleStore';
import { format } from 'date-fns';
import { IconSymbol } from '@/components/ui/icon-symbol';

const MOODS = [
  { id: 'happy', label: '😊 Bahagia', color: '#48BB78' },
  { id: 'neutral', label: '😐 Biasa Saja', color: '#A0AEC0' },
  { id: 'sensitive', label: '🥺 Sensitif', color: '#ED8936' },
  { id: 'sad', label: '😢 Sedih', color: '#4299E1' },
  { id: 'angry', label: '😡 Marah', color: '#E53E3E' },
  { id: 'anxious', label: '😟 Cemas', color: '#805AD5' },
];

const SYMPTOMS = [
  { id: 'cramp', label: 'Kram Perut', icon: 'favorite' },
  { id: 'headache', label: 'Sakit Kepala', icon: 'info' },
  { id: 'bloating', label: 'Kembung', icon: 'info' },
  { id: 'acne', label: 'Jerawat', icon: 'face' },
  { id: 'fatigue', label: 'Lelah', icon: 'battery-alert' },
  { id: 'backpain', label: 'Sakit Punggung', icon: 'info' },
];

export default function LogSymptomScreen() {
  const router = useRouter();
  const { logSymptom, symptomLogs } = useCycleStore();
  
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const existingLog = symptomLogs[todayStr];

  const [selectedMood, setSelectedMood] = useState<string>(existingLog?.mood[0] || '');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(existingLog?.pain || []);
  const [notes, setNotes] = useState(existingLog?.notes || '');

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!selectedMood && selectedSymptoms.length === 0 && !notes) {
      Alert.alert('Kosong', 'Silahkan pilih setidaknya satu mood atau gejala.');
      return;
    }

    logSymptom(todayStr, {
      mood: selectedMood ? [selectedMood] : [],
      pain: selectedSymptoms,
      notes: notes
    });

    Alert.alert('Berhasil', 'Gejala hari ini telah dicatat!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <IconSymbol name="chevron.right" size={24} color="#4A5568" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Catat Gejala</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveHeaderButton}>
          <Text style={styles.saveHeaderText}>Simpan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.dateText}>{format(new Date(), 'EEEE, d MMMM yyyy')}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bagaimana perasaanmu?</Text>
          <View style={styles.moodGrid}>
            {MOODS.map((mood) => (
              <TouchableOpacity 
                key={mood.id} 
                style={[
                  styles.moodItem, 
                  selectedMood === mood.id && { backgroundColor: mood.color + '20', borderColor: mood.color }
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={[styles.moodLabel, selectedMood === mood.id && { color: mood.color, fontWeight: '700' }]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apa yang kamu rasakan?</Text>
          <View style={styles.symptomGrid}>
            {SYMPTOMS.map((symptom) => (
              <TouchableOpacity 
                key={symptom.id} 
                style={[
                  styles.symptomItem, 
                  selectedSymptoms.includes(symptom.id) && styles.symptomItemActive
                ]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <Text style={[
                  styles.symptomLabel, 
                  selectedSymptoms.includes(symptom.id) && styles.symptomLabelActive
                ]}>
                  {symptom.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catatan Tambahan</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tuliskan catatan lainnya di sini..."
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            placeholderTextColor="#A0AEC0"
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Simpan Catatan Hari Ini</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
  },
  saveHeaderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveHeaderText: {
    color: '#ED64A6',
    fontWeight: '700',
    fontSize: 16,
  },
  scrollContent: {
    padding: 24,
  },
  dateText: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 16,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  moodItem: {
    width: '46.5%',
    margin: 6,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#EDF2F7',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  moodLabel: {
    fontSize: 15,
    color: '#4A5568',
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  symptomItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#EDF2F7',
    backgroundColor: '#F7FAFC',
  },
  symptomItemActive: {
    backgroundColor: '#ED64A6',
    borderColor: '#ED64A6',
  },
  symptomLabel: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  symptomLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  textArea: {
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#2D3748',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  primaryButton: {
    backgroundColor: '#ED64A6',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#ED64A6',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
