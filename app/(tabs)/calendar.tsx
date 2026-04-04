import { useCycleStore } from '@/src/store/cycleStore';
import { Ionicons } from '@expo/vector-icons';
import { addDays, eachDayOfInterval, format, isSameDay, startOfWeek, subDays } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, Modal, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

export default function CalendarScreen() {
  const router = useRouter();
  const { profile } = useCycleStore();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [baseDate, setBaseDate] = useState(new Date());
  const [partnerActionSent, setPartnerActionSent] = useState(false);
  const [isMonthlyVisible, setIsMonthlyVisible] = useState(false);

  // Animation states for insights
  const [activeInsight, setActiveInsight] = useState<'diet' | 'mood' | 'exercise' | null>(null);
  const dietAnim = useRef(new Animated.Value(100)).current; 
  const moodAnim = useRef(new Animated.Value(100)).current;
  const exerciseAnim = useRef(new Animated.Value(100)).current;

  // Animation states for stats
  const [activeStat, setActiveStat] = useState<'sleep' | 'together' | null>(null);
  const sleepStatAnim = useRef(new Animated.Value(100)).current;
  const togetherStatAnim = useRef(new Animated.Value(100)).current;

  // Calendar days for the current displayed week
  const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ 
    start: addDays(weekStart, -1), 
    end: addDays(weekStart, 7) 
  });

  useEffect(() => {
    Animated.spring(dietAnim, {
      toValue: activeInsight === 'diet' ? 0 : 100,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();

    Animated.spring(moodAnim, {
      toValue: activeInsight === 'mood' ? 0 : 100,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();

    Animated.spring(exerciseAnim, {
      toValue: activeInsight === 'exercise' ? 0 : 100,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [activeInsight]);

  useEffect(() => {
    Animated.spring(sleepStatAnim, {
      toValue: activeStat === 'sleep' ? 0 : 100,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();

    Animated.spring(togetherStatAnim, {
      toValue: activeStat === 'together' ? 0 : 100,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [activeStat]);

  const handleDayPress = (day: Date) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDate(day);
  };

  const handleNextWeek = () => {
    Haptics.selectionAsync();
    setBaseDate(addDays(baseDate, 7));
  };

  const handlePrevWeek = () => {
    Haptics.selectionAsync();
    setBaseDate(subDays(baseDate, 7));
  };

  const handlePartnerAction = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setPartnerActionSent(true);
    Alert.alert('Love Sent!', `You've sent a virtual hug to ${profile?.partnerName || 'Agra'}! ❤️`);
    setTimeout(() => setPartnerActionSent(false), 2000);
  };

  const toggleMonthly = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsMonthlyVisible(!isMonthlyVisible);
  };

  const handleInsightPress = (type: 'diet' | 'mood' | 'exercise') => {
    Haptics.selectionAsync();
    if (activeInsight === type) {
      setActiveInsight(null);
    } else {
      setActiveInsight(type);
    }
  };

  const handleStatPress = (type: 'sleep' | 'together') => {
    Haptics.selectionAsync();
    if (activeStat === type) {
      setActiveStat(null);
    } else {
      setActiveStat(type);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Monthly Calendar Modal */}
      <Modal
        visible={isMonthlyVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleMonthly}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cycle Calendar</Text>
              <TouchableOpacity onPress={toggleMonthly} style={styles.modalCloseBtn}>
                <Ionicons name="close-circle" size={32} color="#E45D5D" />
              </TouchableOpacity>
            </View>
            
            <Calendar
              current={format(selectedDate, 'yyyy-MM-dd')}
              onDayPress={day => {
                const date = new Date(day.timestamp);
                setSelectedDate(date);
                setBaseDate(date);
                setIsMonthlyVisible(false);
              }}
              markedDates={{
                [format(selectedDate, 'yyyy-MM-dd')]: { selected: true, selectedColor: '#FFAD77' },
                [format(new Date(), 'yyyy-MM-dd')]: { marked: true, dotColor: '#E45D5D' },
              }}
              theme={{
                calendarBackground: '#FFF9E1',
                textSectionTitleColor: '#A0AEC0',
                selectedDayBackgroundColor: '#FFAD77',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#E45D5D',
                dayTextColor: '#4A5568',
                textDisabledColor: '#d9e1e8',
                arrowColor: '#FFAD77',
                monthTextColor: '#1A365D',
                indicatorColor: '#FFAD77',
                textDayFontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
                textMonthFontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
                textDayHeaderFontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14
              }}
              style={styles.monthlyCalendar}
            />
          </View>
        </View>
      </Modal>

      {/* Pink Gradient Background Header */}
      <View style={styles.headerArea}>
        <LinearGradient
          colors={['#FFC0CB', '#FFB6C1', '#FBA1B1']}
          style={styles.backgroundGradient}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.topRow}>
              <Text style={styles.headerGreeting}>Good Morning, {profile?.name || 'Cha'}!</Text>
              <TouchableOpacity 
                style={styles.cogIcon}
                onPress={() => Alert.alert('Settings', 'User profile settings will be implemented soon.')}
              >
                <Ionicons name="settings-sharp" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>

      {/* Main Body Card */}
      <View style={styles.bodyCard}>
        {/* Purple decorative dots on top left */}
        <View style={styles.topLeftDots}>
          <Text style={styles.dotsText}>...</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Calendar Title & Icon */}
          <View style={styles.titleRow}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.back();
              }}
            >
              <Ionicons name="close" size={28} color="#FF9A62" />
            </TouchableOpacity>


            <Text style={styles.pageTitle}>Calendar</Text>

            <TouchableOpacity 
              style={styles.calendarIconBtn}
              onPress={toggleMonthly}
            >
              <Ionicons name="calendar-sharp" size={24} color="#1A365D" />
            </TouchableOpacity>
          </View>

          {/* Weekly Slider */}
          <View style={styles.weekNavContainer}>
              <View style={styles.calendarSlider}>
                {calendarDays.map((day, index) => {
                  const isSelected = isSameDay(day, selectedDate);
                  
                  return (
                    <TouchableOpacity 
                      key={index} 
                      style={[styles.calendarDayCol, isSelected && styles.activeDayCol]}
                      onPress={() => handleDayPress(day)}
                    >
                      <Text style={[styles.dayLetter, isSelected && styles.activeDayLetter]}>
                        {format(day, 'EEEEE')}
                      </Text>
                      <View style={[
                        styles.dayTile, 
                        isSelected && styles.activeDayTile
                      ]}>
                        <Text style={[styles.dateText, isSelected && styles.activeDateText]}>
                          {format(day, 'd')}
                        </Text>
                      </View>
                      {!isSelected && <View style={styles.dotIndicator} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
          </View>

          {/* Insight Section */}
          <Text style={styles.sectionTitle}>Insight</Text>
          <View style={styles.insightScroll}>
            <TouchableOpacity 
              style={[styles.insightTile, { backgroundColor: '#CCE2A3' }]}
              onPress={() => handleInsightPress('diet')}
              activeOpacity={0.8}
            >
              <Ionicons name="restaurant" size={24} color="#556B2F" />
              <Animated.View style={[styles.insightOverlay, { transform: [{ translateY: dietAnim }] }]}>
                <Text style={styles.insightOverlayText}>Iron-rich foods like spinach help today.</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.insightTile, { backgroundColor: '#FC94C1' }]} 
              onPress={() => handleInsightPress('mood')}
              activeOpacity={0.8}
            >
              <Ionicons name="happy" size={24} color="#8B008B" />
              <Animated.View style={[styles.insightOverlay, { transform: [{ translateY: moodAnim }] }]}>
                <Text style={styles.insightOverlayText}>Self-care is key! Try meditation.</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.insightTile, { backgroundColor: '#9DD9F3' }]} 
              onPress={() => handleInsightPress('exercise')}
              activeOpacity={0.8}
            >
              <Ionicons name="walk" size={24} color="#1A365D" />
              <Animated.View style={[styles.insightOverlay, { transform: [{ translateY: exerciseAnim }] }]}>
                <Text style={styles.insightOverlayText}>Light walking is great for recovery.</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsGrid}>
            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleStatPress('sleep')}
              activeOpacity={0.8}
            >
              <Text style={styles.statTitle}>Sleep Track</Text>
              <Text style={styles.statValue}>{isSameDay(selectedDate, new Date()) ? '3,35 Hr' : '--'}</Text>
              <View style={[styles.statAccent, { backgroundColor: '#EE5D5D' }]} />
              
              <Animated.View style={[styles.statOverlay, { transform: [{ translateY: sleepStatAnim }] }]}>
                <Text style={styles.statOverlayText}>Avg sleep tracked. Keeping consistent helps accuracy!</Text>
              </Animated.View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleStatPress('together')}
              activeOpacity={0.8}
            >
              <Text style={styles.statTitle}>Days Together</Text>
              <Text style={styles.statValue}>1035</Text>
              <View style={[styles.statAccent, { backgroundColor: '#62B6CB' }]} />

              <Animated.View style={[styles.statOverlay, { transform: [{ translateY: togetherStatAnim }] }]}>
                <Text style={styles.statOverlayText}>You and {profile?.partnerName || 'Agra'} share 1035 wonderful days!</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Send Love Section */}
          <Text style={styles.loveTitle}>Send <Text style={{ color: '#E45D5D' }}>love</Text> to your partner!</Text>
          <View style={styles.partnerCard}>
            <View style={styles.partnerRow}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={24} color="#FFF5F5" />
              </View>
              <Text style={styles.partnerNameText}>{profile?.partnerName || 'Agra Mahardika'}</Text>
              <View style={styles.heartDecoration}>
                <Ionicons name="heart" size={40} color="#FDE2E2" />
              </View>
              <View style={[styles.heartDecoration, { right: 60, top: 0 }]}>
                <Ionicons name="heart" size={20} color="#FDE2E2" />
              </View>
            </View>
            <TouchableOpacity 
              style={[
                styles.partnerActionBtn, 
                partnerActionSent && { backgroundColor: '#4CAF50' }
              ]}
              onPress={handlePartnerAction}
            >
              <Ionicons 
                name={partnerActionSent ? "checkmark" : "person"} 
                size={22} 
                color="white" 
              />
              {!partnerActionSent && (
                <View style={styles.pillBadgeIcon}>
                  <Ionicons name="heart" size={8} color="#E45D5D" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E1',
  },
  headerArea: {
    height: 180,
  },
  backgroundGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 10,
    alignItems: 'center',
  },
  headerGreeting: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  cogIcon: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    padding: 2,
  },
  bodyCard: {
    flex: 1,
    backgroundColor: '#FFF9E1',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -80,
    paddingTop: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  topLeftDots: {
    position: 'absolute',
    top: 5,
    left: 15,
    zIndex: 10,
  },
  dotsText: {
    fontSize: 24,
    color: '#9D50FF',
    fontWeight: 'bold',
    letterSpacing: -2,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 60,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    height: 40,
  },
  closeBtn: {
    position: 'absolute',
    left: 0,
  },
  pageTitle: {
    fontSize: 28,
    color: '#1A365D',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  calendarIconBtn: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  weekNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navArrow: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  calendarSlider: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
  },
  calendarDayCol: {
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 25,
    width: 38,
  },
  activeDayCol: {
    backgroundColor: '#FF964F',
  },
  dayLetter: {
    color: '#D1D1D1',
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
  },
  activeDayLetter: {
    color: 'white',
  },
  dayTile: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayTile: {
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 14,
    color: '#D1D1D1',
    fontWeight: '600',
  },
  activeDateText: {
    color: '#FF964F',
    fontWeight: 'bold',
  },
  dotIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF964F',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1A365D',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 15,
  },
  insightScroll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  insightTile: {
    width: '31%',
    aspectRatio: 0.85,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  insightOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightOverlayText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 16,
    borderRadius: 28,
    height: 100,
    position: 'relative',
    overflow: 'hidden',
  },
  statOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1A365D', // Dark blue for calendar overlay
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statOverlayText: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 16,
  },
  statTitle: {
    fontSize: 17,
    color: '#1A365D',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    color: '#4A5568',
    fontWeight: '700',
  },
  statAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '60%',
    height: '40%',
    borderTopLeftRadius: 24,
  },
  loveTitle: {
    fontSize: 18,
    color: '#8B1C1C',
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 15,
  },
  partnerCard: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6', // Blue background for the avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  partnerNameText: {
    fontSize: 18,
    color: '#E45D5D',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    zIndex: 2,
  },
  heartDecoration: {
    position: 'absolute',
    right: 0,
    bottom: -10,
    opacity: 0.4,
  },
  partnerActionBtn: {
    backgroundColor: '#E45D5D',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pillBadgeIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'white',
    borderRadius: 4,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E45D5D',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF9E1',
    borderRadius: 30,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: '#1A365D',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  modalCloseBtn: {
    padding: 5,
  },
  monthlyCalendar: {
    borderRadius: 15,
  },
});
