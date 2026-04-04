import { useCycleStore } from '@/src/store/cycleStore';
import { getCurrentPhaseDayNumber, getPhaseByDay } from '@/src/utils/cycleCalculator';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { addDays, eachDayOfInterval, format, isSameDay, startOfWeek } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { profile, phases, setProfile, symptomLogs } = useCycleStore();
  const [dayInCycle, setDayInCycle] = useState(1);
  const [currentPhase, setCurrentPhase] = useState(phases[0]);
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const hasLoggedToday = symptomLogs[todayStr];
  
  const hour = today.getHours();
  const isNight = hour >= 18 || hour < 6;
  const greeting = isNight ? 'Good Night, ' : 'Good Morning, ';
  const timeIcon = isNight ? 'moon-o' : 'sun-o';

  // State for animated metric cards
  const [activeCard, setActiveCard] = useState<'sleep' | 'together' | null>(null);
  const sleepAnim = useRef(new Animated.Value(110)).current; // Start hidden below
  const togetherAnim = useRef(new Animated.Value(110)).current;

  // Calendar days for the current week
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: addDays(weekStart, -1), end: addDays(weekStart, 7) });

  useEffect(() => {
    if (!profile) {
      const msInDay = 24 * 60 * 60 * 1000;
      const fakeLastPeriod = new Date(Date.now() - 5 * msInDay).toISOString();
      setProfile({
        name: 'Chacha',
        role: 'female',
        cycleLength: 28,
        periodDuration: 5,
        lastPeriodStart: fakeLastPeriod,
        partnerName: 'Agra',
        partnerMessage: "Don't forget to stay hydrated!",
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

  useEffect(() => {
    Animated.spring(sleepAnim, {
      toValue: activeCard === 'sleep' ? 0 : 110,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();

    Animated.spring(togetherAnim, {
      toValue: activeCard === 'together' ? 0 : 110,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [activeCard]);

  const handleCogPress = () => {
    Alert.alert('Settings', 'User profile and notification settings will be available soon!');
  };

  const handlePartnerNotify = () => {
    Alert.alert('Notified!', `We've sent your current mood and phase status to ${profile?.partnerName || 'your partner'}.`);
  };

  const handleDayPress = (day: Date) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const log = symptomLogs[formattedDate];
    if (log) {
      Alert.alert('Day Log', `Mood: ${log.mood.join(', ') || 'N/A'}\nSymptoms: ${log.pain.join(', ') || 'None'}`);
    } else {
      Alert.alert('No Log', `You haven't logged anything for ${format(day, 'MMMM d')}. Would you like to log now?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Now', onPress: () => router.push('/log-symptom') }
      ]);
    }
  };

  const handleMiniCardPress = (type: 'sleep' | 'together') => {
    if (activeCard === type) {
      setActiveCard(null);
    } else {
      setActiveCard(type);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Pink Gradient Background */}
      <LinearGradient
        colors={['#FFC0CB', '#FFB6C1', '#FF99AA']}
        style={styles.backgroundGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header: Greeting + Cog */}
            <View style={styles.header}>
              <View style={styles.greetingRow}>
                <Text style={styles.greetingPrefix}>{greeting}</Text>
                <Text style={styles.greetingName}>{profile?.name || 'Sayang'}!</Text>
                <TouchableOpacity style={styles.cogButton} onPress={handleCogPress}>
                  <FontAwesome name={timeIcon} size={24} color="#E45D5D" />
                </TouchableOpacity>
              </View>

              <Text style={styles.mainTitle}>How Do You Feel Today?</Text>

              <TouchableOpacity style={styles.knowMoreButton} onPress={handlePartnerNotify}>
                <Text style={styles.knowMoreText}>Let's {profile?.partnerName?.split(' ')[0] || 'Agra'} know</Text>
              </TouchableOpacity>
            </View>

            {/* Partner Message Card */}
            {(profile?.partnerName || profile?.partnerMessage) && (
              <View style={styles.reminderCardContainer}>
                <View style={styles.reminderCard}>
                  <View style={styles.reminderHeader}>
                    <View style={styles.avatarCircle}>
                      <Ionicons name="person" size={24} color="#FF99AA" />
                    </View>
                    <Text style={styles.partnerNameText}>{profile.partnerName}</Text>
                  </View>
                  <Text style={styles.reminderMessageText}>{profile.partnerMessage}</Text>

                  {/* Heart Icon Overlay */}
                  <View style={styles.heartOverlay}>
                    <Ionicons name="heart" size={24} color="#FF0000" />
                  </View>
                </View>
              </View>
            )}

            {/* Central Circle Arch for Phase */}
            <View style={styles.centerSection}>
              <View style={styles.phaseArch}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)']}
                  style={styles.archInner}
                >
                  <Text style={styles.phaseLabel}>PHASE</Text>
                  <Text style={styles.phaseName}>{currentPhase.name.toUpperCase()}</Text>
                  <Text style={styles.daySubLabel}>
                    {currentPhase.name === 'Menstruasi'
                      ? `Day - ${dayInCycle}`
                      : `Period in ${profile?.cycleLength ? profile.cycleLength - dayInCycle + 1 : 0} Days`}
                  </Text>

                  <TouchableOpacity
                    style={styles.logPill}
                    onPress={() => router.push('/log-symptom')}
                  >
                    <Text style={styles.logPillText}>Log</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            {/* Bottom Card - Floating Style */}
            <View style={styles.bottomCard}>
              <View style={styles.handle} />

              {/* Weekly Calendar - Aligned with 3-tab layout */}
              <View style={styles.calendarContainer}>
                {calendarDays.map((day, index) => {
                  const isToday = isSameDay(day, today);
                  // Icons are at roughly indices 0, 4, 8 of the 9-day strip
                  const hasStripDots = index === 0 || index === 4 || index === 8;

                  return (
                    <View key={index} style={styles.calendarDayCol}>
                      {hasStripDots && (
                        <View style={styles.stripDots}>
                          <View style={styles.stripDot} />
                          <View style={styles.stripDot} />
                          <View style={styles.stripDot} />
                        </View>
                      )}

                      <TouchableOpacity 
                        style={[styles.dayWrapper, isToday && styles.activeDayWrapper]}
                        onPress={() => handleDayPress(day)}
                      >
                        <Text style={[styles.dayLetter, isToday && styles.activeDayLetter]}>
                          {format(day, 'EEEEE')}
                        </Text>
                        <View style={[styles.dateCircle, isToday && styles.activeDateCircle]}>
                          <Text style={[styles.dateText, isToday && styles.activeDateText]}>
                            {format(day, 'd')}
                          </Text>
                        </View>
                        {/* Dot indicator below non-active days if they have symptoms? 
                            Using a simple dot for indices 1-5 as per mockup image */}
                        {(index >= 1 && index <= 5 && !isToday) && (
                          <View style={styles.dotIndicator} />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>

              {/* Bottom Mini Cards */}
              <View style={styles.miniCardsRow}>
                <TouchableOpacity 
                  style={[styles.miniCard, styles.sleepCard]}
                  onPress={() => handleMiniCardPress('sleep')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.miniCardTitle}>Sleep Track</Text>
                  <Text style={styles.miniCardValue}>3,35 Hr</Text>
                  <View style={styles.cardAccent} />
                  
                  <Animated.View style={[
                    styles.cardInfoOverlay, 
                    { transform: [{ translateY: sleepAnim }] }
                  ]}>
                    <Text style={styles.cardInfoText}>Avg: 3.35hr. Target: 7-8hr for recovery.</Text>
                  </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.miniCard, styles.daysTogetherCard]}
                  onPress={() => handleMiniCardPress('together')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.miniCardTitle}>Days Together</Text>
                  <Text style={styles.miniCardValue}>1035</Text>
                  <View style={styles.cardAccent} />

                  <Animated.View style={[
                    styles.cardInfoOverlay, 
                    { transform: [{ translateY: togetherAnim }] }
                  ]}>
                    <Text style={styles.cardInfoText}>You & {profile?.partnerName || 'Agra'} have shared 1035 days!</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  greetingPrefix: {
    fontSize: 20,
    color: '#8A1C1C',
    fontFamily: 'Domine-Bold',
    fontWeight: '700',
  },
  greetingName: {
    fontSize: 20,
    color: '#8A1C1C',
    fontFamily: 'Chonburi',
    fontWeight: '700',
  },
  cogButton: {
    marginLeft: 10,
    backgroundColor: '#FFD1D9',
    padding: 4,
    borderRadius: 8,
  },
  mainTitle: {
    fontSize: 48,
    color: '#8A1C1C',
    fontFamily: 'Chonburi',
    fontWeight: 'bold',
    lineHeight: 52,
    marginTop: 10,
    marginBottom: 20,
  },
  knowMoreButton: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 20,
  },
  knowMoreText: {
    color: '#8A1C1C',
    fontFamily: 'Domine-Bold',
    fontWeight: '600',
    fontSize: 16,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -40, // Let the arch overlap the bottom card
  },
  phaseArch: {
    width: width * 1.1,
    height: width * 0.8,
    backgroundColor: '#F56C6C',
    borderTopLeftRadius: width * 0.55,
    borderTopRightRadius: width * 0.55,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  archInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  phaseLabel: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Domine-Bold',
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 5,
  },
  phaseName: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'Chonburi',
  },
  daySubLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Domine-Bold',
    fontWeight: '600',
    marginBottom: 20,
  },
  logPill: {
    backgroundColor: '#FFD1DC',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  logPillText: {
    color: '#8A1C1C',
    fontWeight: '700',
  },
  bottomCard: {
    backgroundColor: '#FFF9E1',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 15,
    minHeight: 300,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  calendarDayCol: {
    alignItems: 'center',
    width: (width - 40) / 9.5,
  },
  dayWrapper: {
    alignItems: 'center',
    paddingVertical: 4,
    width: '100%',
    borderRadius: 20,
  },
  activeDayWrapper: {
    backgroundColor: '#F56C6C',
  },
  dayLetter: {
    fontSize: 13,
    color: '#A0AEC0',
    marginBottom: 4,
    textAlign: 'center',
  },
  activeDayLetter: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDateCircle: {
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    textAlign: 'center',
  },
  activeDateText: {
    color: '#F56C6C',
    fontWeight: 'bold',
  },
  dotIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F56C6C',
    marginTop: 4,
  },
  miniCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  miniCard: {
    backgroundColor: 'white',
    width: '47%',
    padding: 16,
    borderRadius: 24,
    height: 110,
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  miniCardTitle: {
    fontSize: 16,
    color: '#8A1C1C',
    fontFamily: 'Domine-Bold',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  miniCardValue: {
    fontSize: 15,
    color: '#8A1C1C',
    fontWeight: '400',
  },
  cardAccent: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    width: '60%',
    height: '45%',
    backgroundColor: '#F36060', // Red accent
    borderTopLeftRadius: 20,
  },
  cardInfoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#8A1C1C',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfoText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Domine-Bold',
    fontWeight: '600',
    lineHeight: 18,
  },
  sleepCard: {},
  daysTogetherCard: {},
  stripDots: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
    height: 4,
    justifyContent: 'center',
  },
  stripDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#8B5CF6',
  },
  reminderCardContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: -10,
    alignItems: 'center',
  },
  reminderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: '100%',
    padding: 20,
    borderRadius: 30,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  partnerNameText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Domine-Bold',
    fontWeight: 'bold',
  },
  reminderMessageText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Domine-Regular',
    lineHeight: 20,
    paddingRight: 40,
  },
  heartOverlay: {
    position: 'absolute',
    bottom: -10,
    right: 20,
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
