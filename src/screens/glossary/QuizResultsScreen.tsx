import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, PrimaryButton, Screen, SecondaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';
import {quizQuestions} from '../../data/content';

export function QuizResultsScreen({navigation, route}: any) {
  const {state} = useAppContext();
  const result = route.params ?? state.quizHistory;

  if (!result) {
    navigation.goBack();
    return null;
  }

  const message = result.accuracy >= 80
    ? 'Excellent court awareness. Keep building on it!'
    : result.accuracy >= 50
      ? 'Solid work. A quick review will make these concepts stick.'
      : 'Every great player starts with the fundamentals. Try again when you are ready.';

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.celebration}>{result.accuracy >= 80 ? '🏆' : '🎾'}</Text>
        <Text style={styles.kicker}>QUIZ COMPLETE</Text>
        <Text style={styles.title}>{result.accuracy}%</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Card style={styles.scoreCard}>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreValue, {color: colors.green}]}>{result.correct}</Text>
          <Text style={styles.scoreLabel}>Correct</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreValue, {color: colors.red}]}>{result.incorrect}</Text>
          <Text style={styles.scoreLabel}>To review</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreValue, {color: colors.purple}]}>{result.score}/{quizQuestions.length}</Text>
          <Text style={styles.scoreLabel}>Score</Text>
        </View>
      </Card>
      <Text style={styles.bestScore}>
        {state.quizBestScore > result.accuracy ? `Your best result: ${state.quizBestScore}%` : 'This is your best result so far.'}
      </Text>
      <PrimaryButton title="Try again" onPress={() => navigation.replace('Quiz')} />
      <SecondaryButton title="Back to Glossary" onPress={() => navigation.popToTop()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {alignItems: 'center', paddingTop: 22, gap: 8},
  celebration: {fontSize: 46, marginBottom: 4},
  kicker: {color: colors.purple, fontSize: 12, fontWeight: '900', letterSpacing: 1.6},
  title: {color: colors.text, fontSize: 64, fontWeight: '900', lineHeight: 72},
  message: {color: colors.textMuted, textAlign: 'center', fontSize: 16, lineHeight: 24, maxWidth: 300},
  scoreCard: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 22},
  scoreItem: {flex: 1, alignItems: 'center', gap: 5},
  scoreValue: {fontSize: 26, fontWeight: '900'},
  scoreLabel: {color: colors.textMuted, fontSize: 12, fontWeight: '700'},
  divider: {width: 1, height: 42, backgroundColor: colors.border},
  bestScore: {color: colors.textMuted, textAlign: 'center', fontSize: 14},
});
