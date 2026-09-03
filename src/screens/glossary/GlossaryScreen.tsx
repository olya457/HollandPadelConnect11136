import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, PrimaryButton, Screen, SectionTitle} from '../../components/ui';
import {colors} from '../../constants/theme';
import {glossaryTerms, quizQuestions} from '../../data/content';

export function GlossaryScreen({navigation}: any) {
  return (
    <Screen>
      <SectionTitle title="Glossary" subtitle={`${glossaryTerms.length} Padel terms defined`} />
      <Card>
        <View style={styles.quizHead}>
          <View>
            <Text style={styles.quizEmoji}>🧠</Text>
            <Text style={styles.quizTitle}>Test Your Knowledge</Text>
            <Text style={styles.quizMeta}>{quizQuestions.length} questions • ~15 min</Text>
          </View>
          <View style={styles.quizButtonWrap}>
            <PrimaryButton title="Start" onPress={() => navigation.navigate('Quiz')} />
          </View>
        </View>
      </Card>
      {glossaryTerms.map(term => (
        <Pressable key={term.id} onPress={() => navigation.navigate('TermDetail', {termId: term.id})}>
          <Card>
            <View style={styles.termRow}>
              <View style={styles.badge}><Text style={styles.badgeText}>{term.term[0]}</Text></View>
              <View style={styles.termCopy}>
                <Text style={styles.termTitle}>{term.term}</Text>
                <Text style={styles.termSubtitle}>{term.type}</Text>
              </View>
            </View>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  quizHead: {flexDirection: 'row', justifyContent: 'space-between', gap: 12},
  quizEmoji: {fontSize: 30, marginBottom: 8},
  quizTitle: {color: colors.text, fontWeight: '800', fontSize: 20},
  quizMeta: {color: colors.textMuted, marginTop: 4},
  quizButtonWrap: {width: 110, justifyContent: 'center'},
  termRow: {flexDirection: 'row', alignItems: 'center', gap: 12},
  badge: {width: 40, height: 40, borderRadius: 14, backgroundColor: '#2E2B69', justifyContent: 'center', alignItems: 'center'},
  badgeText: {color: '#C79AFF', fontWeight: '900'},
  termCopy: {flex: 1},
  termTitle: {color: colors.text, fontWeight: '800'},
  termSubtitle: {color: colors.textMuted, marginTop: 4},
});
