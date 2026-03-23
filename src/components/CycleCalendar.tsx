import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { format, addDays } from 'date-fns';
import { useCycleStore } from '../store/cycleStore';
import { getPhaseByDay, getCurrentPhaseDayNumber } from '../utils/cycleCalculator';

interface CycleCalendarProps {
  onDayPress?: (date: DateData) => void;
}

export function CycleCalendar({ onDayPress }: CycleCalendarProps) {
  const { profile, phases } = useCycleStore();

  const markedDates = useMemo(() => {
    if (!profile?.lastPeriodStart) return {};

    const dates: any = {};
    const cycleLength = profile.cycleLength || 28;
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const start = new Date(profile.lastPeriodStart);

    // Let's mark past 1 cycle and future 2 cycles
    for (let i = -cycleLength; i < cycleLength * 2; i++) {
        const currentDate = addDays(start, i);
        const dayInCycle = getCurrentPhaseDayNumber(start, currentDate, cycleLength);
        const phase = getPhaseByDay(dayInCycle, phases);
        const dateString = format(currentDate, 'yyyy-MM-dd');

        dates[dateString] = {
            customStyles: {
                container: {
                    backgroundColor: phase?.color + '20', // 20% opacity
                    borderRadius: 8,
                },
                text: {
                    color: phase?.color,
                    fontWeight: 'bold',
                }
            }
        };
        
        // Indicate today
        if (dateString === todayStr) {
            dates[dateString].customStyles.container.borderWidth = 2;
            dates[dateString].customStyles.container.borderColor = phase?.color;
        }
    }

    return dates;
  }, [profile, phases]);

  return (
    <View style={styles.container}>
      <Calendar
        markingType={'custom'}
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: '#4A5568',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#2d4150',
          indicatorColor: 'blue',
          textDayFontFamily: 'System',
          textMonthFontFamily: 'System',
          textDayHeaderFontFamily: 'System',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
          'stylesheet.calendar.header': {
            week: {
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }
          }
        } as any}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    backgroundColor: '#ffffff',
  },
});
