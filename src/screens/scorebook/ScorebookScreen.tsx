import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, Screen, SectionTitle} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';

export function ScorebookScreen({navigation}: any) {
  const {state} = useAppContext();
  const matches = state.matches;
  const wins = matches.filter(match => total(match, 'you') > total(match, 'opp')).length;
  const losses = matches.length - wins;
  const winRate = matches.length ? Math.round((wins / matches.length) * 100) : 0;

  return (
    <Screen>
      <SectionTitle title="Scorebook" subtitle="Match history & performance" />
      <View style={styles.metrics}>
        <Metric value={`${winRate}%`} label="Win rate" color={colors.green} />
        <Metric value={String(matches.length)} label="Played" color={colors.purple} />
        <Metric value={String(wins)} label="Won" color={colors.green} />
        <Metric value={String(losses)} label="Lost" color={colors.red} />
      </View>
      <Card style={styles.streakCard}>
        <Text style={styles.streakTitle}>🔥 {wins > 1 ? `${wins} Match Winning Streak` : 'Ready for your next match'}</Text>
        <Text style={styles.streakCopy}>{matches.length ? 'Your Scorebook is up to date.' : 'Save a match to start tracking your progress.'}</Text>
      </Card>
      <View style={styles.actions}>
        <Pressable style={[styles.action, styles.actionSecondary]} onPress={() => navigation.navigate('MatchCalculator')}>
          <Text style={styles.actionText}>▣ Calculator</Text>
        </Pressable>
        <Pressable style={[styles.action, styles.actionSecondary]} onPress={() => navigation.navigate('Statistics')}>
          <Text style={styles.actionText}>⌁ Statistics</Text>
        </Pressable>
        <Pressable style={[styles.action, styles.actionPrimary]} onPress={() => navigation.navigate('NewMatch')}>
          <Text style={styles.actionText}>+ New</Text>
        </Pressable>
      </View>
      <Card>
        <Text style={styles.cardTitle}>RECENT MATCHES</Text>
        {matches.length === 0 ? (
          <Text style={styles.empty}>No saved matches yet. Add your first result to see it here.</Text>
        ) : matches.slice(0, 3).map(match => {
          const won = total(match, 'you') > total(match, 'opp');
          return (
            <View key={match.id} style={styles.matchRow}>
              <View style={styles.matchDot}><Text>{won ? 'W' : 'L'}</Text></View>
              <View style={styles.matchInfo}>
                <Text style={styles.matchTitle}>{match.partner || 'Your team'} vs {match.opponentOne || 'Opponents'}</Text>
                <Text style={styles.matchMeta}>{match.date} · {match.matchType} · {match.duration} min</Text>
              </View>
              <Text style={[styles.matchResult, {color: won ? colors.green : colors.red}]}>{won ? 'WIN' : 'LOSS'}</Text>
            </View>
          );
        })}
      </Card>
      <Card>
        <Text style={styles.cardTitle}>PERSONAL RECORDS</Text>
        <Record label="Best streak" value={`${wins} wins`} />
        <Record label="Longest match" value={matches.length ? `${Math.max(...matches.map(match => Number(match.duration) || 0))} min` : '—'} />
        <Record label="Quickest win" value={matches.length ? `${Math.min(...matches.map(match => Number(match.duration) || 0))} min` : '—'} />
      </Card>
    </Screen>
  );
}

function total(match: any, team: 'you' | 'opp') {
  return match.setScores.reduce((sum: number, set: any) => sum + Number(set[team] || 0), 0);
}

function Metric({value, label, color}: {value: string; label: string; color: string}) {
  return <View style={styles.metric}><Text style={[styles.metricValue, {color}]}>{value}</Text><Text style={styles.metricLabel}>{label}</Text></View>;
}

function Record({label, value}: {label: string; value: string}) {
  return <View style={styles.record}><Text style={styles.recordLabel}>{label}</Text><Text style={styles.recordValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  metrics: {flexDirection: 'row', gap: 8},
  metric: {flex: 1, alignItems: 'center', gap: 4, paddingVertical: 12, borderRadius: 13, backgroundColor: '#171C3E'},
  metricValue: {fontSize: 18, fontWeight: '900'},
  metricLabel: {fontSize: 10, color: colors.textMuted, fontWeight: '700'},
  streakCard: {backgroundColor: '#1A192C', borderColor: '#383052', gap: 5},
  streakTitle: {color: colors.yellow, fontWeight: '900'},
  streakCopy: {color: colors.textMuted, fontSize: 13},
  actions: {flexDirection: 'row', gap: 8},
  action: {flex: 1, minHeight: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center'},
  actionSecondary: {backgroundColor: '#1C2149', borderWidth: 1, borderColor: '#30396F'},
  actionPrimary: {backgroundColor: colors.purple},
  actionText: {color: colors.text, fontSize: 12, fontWeight: '900'},
  cardTitle: {color: '#C8A8FF', fontSize: 11, fontWeight: '900', letterSpacing: 1},
  empty: {color: colors.textMuted, lineHeight: 21},
  matchRow: {flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 8},
  matchDot: {width: 30, height: 30, borderRadius: 10, backgroundColor: '#2E2B69', justifyContent: 'center', alignItems: 'center'},
  matchInfo: {flex: 1},
  matchTitle: {color: colors.text, fontSize: 13, fontWeight: '800'},
  matchMeta: {color: colors.textMuted, fontSize: 11, marginTop: 3},
  matchResult: {fontSize: 11, fontWeight: '900'},
  record: {flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8},
  recordLabel: {color: colors.textMuted, fontSize: 13},
  recordValue: {color: colors.yellow, fontWeight: '800', fontSize: 13},
});
