import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, PrimaryButton, Screen} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';
import {quizQuestions} from '../../data/content';

export function QuizScreen({navigation}: any) {
  const {saveQuizResult} = useAppContext();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | undefined>();
  const question = quizQuestions[questionIndex];
  const isLastQuestion = questionIndex === quizQuestions.length - 1;

  const continueQuiz = () => {
    if (selected === undefined) {
      return;
    }

    const nextAnswers = [...answers, selected];
    if (!isLastQuestion) {
      setAnswers(nextAnswers);
      setSelected(undefined);
      setQuestionIndex(current => current + 1);
      return;
    }

    const correct = nextAnswers.reduce(
      (total, answer, index) => total + Number(answer === quizQuestions[index].answerIndex),
      0,
    );
    const accuracy = Math.round((correct / quizQuestions.length) * 100);
    const result = {score: correct, correct, incorrect: quizQuestions.length - correct, accuracy};
    saveQuizResult(result);
    navigation.replace('QuizResults', result);
  };

  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.back}>‹ Back to Glossary</Text>
      </Pressable>
      <View style={styles.progressHeader}>
        <Text style={styles.kicker}>KNOWLEDGE CHECK</Text>
        <Text style={styles.counter}>Question {questionIndex + 1} of {quizQuestions.length}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${((questionIndex + 1) / quizQuestions.length) * 100}%`}]} />
      </View>
      <Card style={styles.questionCard}>
        <Text style={styles.question}>{question.prompt}</Text>
      </Card>
      <View style={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          return (
            <Pressable
              key={option}
              onPress={() => setSelected(index)}
              style={[styles.option, isSelected && styles.optionSelected]}>
              <View style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                <Text style={[styles.optionLetterText, isSelected && styles.optionLetterTextSelected]}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
      <PrimaryButton
        title={isLastQuestion ? 'See results →' : 'Continue →'}
        onPress={continueQuiz}
        disabled={selected === undefined}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {color: '#C8A8FF', fontSize: 16, fontWeight: '700'},
  progressHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  kicker: {color: colors.purple, fontSize: 12, fontWeight: '900', letterSpacing: 1.4},
  counter: {color: colors.textMuted, fontSize: 13, fontWeight: '700'},
  progressTrack: {height: 8, borderRadius: 99, backgroundColor: '#23295B', overflow: 'hidden'},
  progressFill: {height: '100%', borderRadius: 99, backgroundColor: colors.purple},
  questionCard: {paddingVertical: 24, minHeight: 170, justifyContent: 'center'},
  question: {color: colors.text, fontSize: 22, lineHeight: 32, fontWeight: '800'},
  options: {gap: 12},
  option: {flexDirection: 'row', alignItems: 'center', gap: 14, padding: 15, borderRadius: 16, borderWidth: 1, borderColor: '#2A3268', backgroundColor: '#161B3A'},
  optionSelected: {borderColor: colors.purple, backgroundColor: 'rgba(154, 92, 255, 0.15)'},
  optionLetter: {width: 32, height: 32, borderRadius: 11, backgroundColor: '#2A3268', justifyContent: 'center', alignItems: 'center'},
  optionLetterSelected: {backgroundColor: colors.purple},
  optionLetterText: {color: '#C8A8FF', fontWeight: '900'},
  optionLetterTextSelected: {color: colors.text},
  optionText: {flex: 1, color: colors.text, fontSize: 15, lineHeight: 22, fontWeight: '700'},
});
