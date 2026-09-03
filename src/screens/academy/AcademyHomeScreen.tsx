import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, Pill, Screen, SectionTitle} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';
import {lessons} from '../../data/content';

export function AcademyHomeScreen({navigation}: any) {
  const {state} = useAppContext();
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const filteredLessons = useMemo(
    () => lessons.filter(item => filter === 'All' || item.level === filter),
    [filter],
  );

  return (
    <Screen>
      <SectionTitle title="Academy" subtitle="Your Padel learning journey" />
      <Card>
        <View style={styles.progressRow}>
          <View>
            <Text style={styles.cardTitle}>Course Progress</Text>
            <Text style={styles.cardSubtitle}>
              {state.completedLessons.length} of {lessons.length} lessons complete
            </Text>
          </View>
          <Text style={styles.progressValue}>
            {Math.round((state.completedLessons.length / lessons.length) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              {width: `${(state.completedLessons.length / lessons.length) * 100}%`},
            ]}
          />
        </View>
      </Card>
      <View style={styles.filters}>
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(item => (
          <Pressable key={item} onPress={() => setFilter(item)}>
            <Pill label={item} active={filter === item} color={colors.purple} />
          </Pressable>
        ))}
      </View>
      {filteredLessons.map(item => {
        const completed = state.completedLessons.includes(item.id);
        return (
          <Pressable
            key={item.id}
            onPress={() => navigation.navigate('LessonDetail', {lessonId: item.id})}>
            <Card style={completed && styles.lessonCardComplete}>
              <View style={styles.lessonHeader}>
                <View style={styles.lessonIcon}>
                  <Text style={styles.lessonIconText}>{completed ? '✓' : '◔'}</Text>
                </View>
                <View style={styles.lessonCopy}>
                  <Text style={styles.lessonTitle}>{item.title}</Text>
                  <Text style={styles.lessonMeta}>
                    {item.category} • {item.level} • {item.duration}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            </Card>
          </Pressable>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  progressRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  cardTitle: {color: colors.text, fontWeight: '800', fontSize: 15},
  cardSubtitle: {color: colors.textMuted, marginTop: 4},
  progressValue: {color: colors.purple, fontSize: 28, fontWeight: '900'},
  progressBarTrack: {height: 8, borderRadius: 999, backgroundColor: '#23295B'},
  progressBarFill: {height: 8, borderRadius: 999, backgroundColor: colors.purple},
  filters: {flexDirection: 'row', gap: 8, flexWrap: 'wrap'},
  lessonCardComplete: {borderColor: '#1E8E67', backgroundColor: '#0F2431'},
  lessonHeader: {flexDirection: 'row', alignItems: 'center', gap: 12},
  lessonIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#2A2560',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonIconText: {color: colors.green, fontWeight: '900', fontSize: 16},
  lessonCopy: {flex: 1},
  lessonTitle: {color: colors.text, fontWeight: '800', fontSize: 20},
  lessonMeta: {color: colors.textMuted, marginTop: 4},
  chevron: {color: colors.textMuted, fontSize: 24},
});
