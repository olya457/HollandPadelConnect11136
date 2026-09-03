import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, Pill, Screen} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';
import {glossaryTerms} from '../../data/content';

export function TermDetailScreen({navigation, route}: any) {
  const {state, toggleBookmark} = useAppContext();
  const term = useMemo(() => glossaryTerms.find(item => item.id === route.params.termId)!, [route.params.termId]);
  const bookmarked = state.bookmarkedTerms.includes(term.id);
  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>‹</Text></Pressable>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{term.term}</Text>
          <Text style={styles.subtitle}>{term.pronunciation}</Text>
        </View>
        <Pressable onPress={() => toggleBookmark(term.id)}><Text style={styles.bookmark}>{bookmarked ? '★' : '☆'}</Text></Pressable>
      </View>
      <View style={styles.row}>
        <Pill label={term.category} active color={colors.purple} />
        <Text style={styles.type}>{term.type}</Text>
      </View>
      <Card><Text style={styles.section}>Definition</Text><Text style={styles.body}>{term.definition}</Text></Card>
      <Card><Text style={[styles.section, {color: colors.yellow}]}>When It’s Used</Text><Text style={styles.body}>{term.whenUsed}</Text></Card>
      <Card style={styles.exampleCard}><Text style={[styles.section, {color: colors.green}]}>Example Situation</Text><Text style={styles.example}>{term.example}</Text></Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {flexDirection: 'row', alignItems: 'center', gap: 12},
  titleWrap: {flex: 1},
  back: {color: colors.text, fontSize: 30},
  title: {color: colors.text, fontWeight: '900', fontSize: 28},
  subtitle: {color: colors.textMuted},
  bookmark: {color: colors.text, fontSize: 26},
  row: {flexDirection: 'row', alignItems: 'center', gap: 10},
  type: {color: colors.textMuted, fontStyle: 'italic'},
  section: {color: '#C38FFF', fontWeight: '800', marginBottom: 10, textTransform: 'uppercase', fontSize: 12, letterSpacing: 1},
  body: {color: colors.text, lineHeight: 24},
  exampleCard: {backgroundColor: 'rgba(25, 227, 139, 0.08)'},
  example: {color: '#BDEFD3', lineHeight: 24, fontStyle: 'italic'},
});
