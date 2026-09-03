import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, Pill, PrimaryButton, Screen, SecondaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';
import {lessons} from '../../data/content';

export function LessonDetailScreen({navigation, route}: any) {
  const {state, completeLesson, saveLessonAnswer} = useAppContext();
  const lesson = useMemo(() => lessons.find(item => item.id === route.params.lessonId)!, [route.params.lessonId]);
  const savedAnswer = state.lessonAnswers[lesson.id];
  const [selected, setSelected] = useState<number | undefined>(savedAnswer);

  const markDone = () => {
    if (selected === undefined) {
      return;
    }
    saveLessonAnswer(lesson.id, selected);
    if (selected === lesson.question.answerIndex) {
      completeLesson(lesson.id);
    }
  };

  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.back}>‹ Back</Text>
      </Pressable>
      <View style={styles.header}>
        <Pill label={lesson.category.toUpperCase()} active color={colors.purple} />
        <Pill label={lesson.duration} active color={colors.yellow} />
      </View>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.description}>{lesson.description}</Text>
      <Card>
        <Text style={styles.sectionTitle}>Learning Objectives</Text>
        {lesson.objectives.map((item, index) => (
          <Text key={item} style={styles.bullet}>{index + 1}. {item}</Text>
        ))}
      </Card>
      {lesson.sections.map(section => (
        <Card key={section.title}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </Card>
      ))}
      <Card>
        <Text style={styles.sectionTitle}>Knowledge Check</Text>
        <Text style={styles.body}>{lesson.question.prompt}</Text>
        <View style={styles.answers}>
          {lesson.question.options.map((option, index) => {
            const isCorrect = index === lesson.question.answerIndex;
            const isSelected = selected === index;
            return (
              <Pressable
                key={option}
                onPress={() => setSelected(index)}
                style={[
                  styles.answer,
                  isSelected && styles.answerSelected,
                  savedAnswer !== undefined && isSelected && isCorrect && styles.answerCorrect,
                  savedAnswer !== undefined && isSelected && !isCorrect && styles.answerWrong,
                ]}>
                <Text style={styles.answerText}>{String.fromCharCode(65 + index)}  {option}</Text>
              </Pressable>
            );
          })}
        </View>
      </Card>
      <PrimaryButton title={state.completedLessons.includes(lesson.id) ? '✓ Lesson Completed' : 'Mark as Completed'} onPress={markDone} disabled={selected === undefined} />
      <View style={styles.navButtons}>
        <View style={styles.flex}><SecondaryButton title="← Previous" onPress={() => navigation.goBack()} /></View>
        <View style={styles.flex}><SecondaryButton title="Next →" onPress={() => navigation.goBack()} /></View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  back: {color: '#C8A8FF', fontSize: 16},
  header: {flexDirection: 'row', justifyContent: 'space-between'},
  title: {color: colors.text, fontSize: 32, fontWeight: '900'},
  description: {color: colors.textMuted, lineHeight: 24},
  sectionTitle: {color: colors.text, fontWeight: '800', marginBottom: 10},
  bullet: {color: colors.textMuted, marginBottom: 8},
  body: {color: colors.textMuted, lineHeight: 24},
  answers: {gap: 10, marginTop: 14},
  answer: {borderRadius: 14, borderWidth: 1, borderColor: '#2A3268', backgroundColor: '#161B3A', paddingHorizontal: 14, paddingVertical: 16},
  answerSelected: {borderColor: colors.purple},
  answerCorrect: {backgroundColor: 'rgba(25, 227, 139, 0.12)', borderColor: colors.green},
  answerWrong: {backgroundColor: 'rgba(255, 95, 109, 0.12)', borderColor: colors.red},
  answerText: {color: colors.text, fontWeight: '700'},
  navButtons: {flexDirection: 'row', gap: 12},
});
