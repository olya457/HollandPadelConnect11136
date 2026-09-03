import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, Screen} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';

export function StatisticsScreen({navigation}: any) {
  const {state} = useAppContext();
  const matches = state.matches;
  const wins = matches.filter(match => score(match, 'you') > score(match, 'opp')).length;
  const losses = matches.length - wins;
  const winRate = matches.length ? Math.round((wins / matches.length) * 100) : 0;
  const totalMinutes = matches.reduce((sum, match) => sum + (Number(match.duration) || 0), 0);

  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>‹ Back</Text></Pressable>
      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.subtitle}>Your match performance</Text>
      <Card style={styles.winRateCard}>
        <View style={styles.ring}><Text style={styles.ringValue}>{winRate}%</Text><Text style={styles.ringLabel}>WIN RATE</Text></View>
        <View style={styles.summary}><Summary label="Matches played" value={String(matches.length)} /><Summary label="Matches won" value={String(wins)} color={colors.green} /><Summary label="Matches lost" value={String(losses)} color={colors.red} /></View>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>MATCH OVERVIEW</Text>
        <StatRow label="Time on court" value={`${totalMinutes} min`} />
        <StatRow label="Average duration" value={matches.length ? `${Math.round(totalMinutes / matches.length)} min` : '—'} />
        <StatRow label="Wins / losses" value={`${wins} / ${losses}`} />
      </Card>
      <Card>
        <Text style={styles.cardTitle}>RESULT DISTRIBUTION</Text>
        <View style={styles.bar}><View style={[styles.winBar, {flex: wins || 0.001}]} /><View style={[styles.lossBar, {flex: losses || 0.001}]} /></View>
        <View style={styles.legend}><Text style={styles.winLegend}>● Wins {wins}</Text><Text style={styles.lossLegend}>● Losses {losses}</Text></View>
      </Card>
      {matches.length === 0 ? <Text style={styles.empty}>Save your first match to unlock personalised trends.</Text> : null}
    </Screen>
  );
}

function score(match: any, team: 'you' | 'opp') {
  return match.setScores.reduce((sum: number, set: any) => sum + Number(set[team] || 0), 0);
}

function Summary({label, value, color = colors.text}: {label: string; value: string; color?: string}) {
  return <View><Text style={[styles.summaryValue, {color}]}>{value}</Text><Text style={styles.summaryLabel}>{label}</Text></View>;
}

function StatRow({label, value}: {label: string; value: string}) {
  return <View style={styles.statRow}><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  back: {color: '#C8A8FF', fontWeight: '800'}, title: {color: colors.text, fontSize: 32, fontWeight: '900'}, subtitle: {color: colors.textMuted, marginTop: -10},
  winRateCard: {flexDirection: 'row', alignItems: 'center', gap: 26}, ring: {width: 118, height: 118, borderRadius: 59, borderWidth: 9, borderColor: colors.purple, justifyContent: 'center', alignItems: 'center'}, ringValue: {color: colors.text, fontSize: 27, fontWeight: '900'}, ringLabel: {color: colors.textMuted, fontSize: 9, fontWeight: '900', letterSpacing: 0.7}, summary: {flex: 1, gap: 13}, summaryValue: {fontWeight: '900', fontSize: 18}, summaryLabel: {color: colors.textMuted, fontSize: 11, marginTop: 1},
  cardTitle: {color: '#C8A8FF', fontSize: 11, fontWeight: '900', letterSpacing: 1}, statRow: {flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8}, statLabel: {color: colors.textMuted}, statValue: {color: colors.text, fontWeight: '800'},
  bar: {height: 14, borderRadius: 10, overflow: 'hidden', flexDirection: 'row', backgroundColor: '#282D57'}, winBar: {backgroundColor: colors.green}, lossBar: {backgroundColor: colors.red}, legend: {flexDirection: 'row', justifyContent: 'space-between'}, winLegend: {color: colors.green, fontSize: 12, fontWeight: '700'}, lossLegend: {color: colors.red, fontSize: 12, fontWeight: '700'}, empty: {color: colors.textMuted, textAlign: 'center', lineHeight: 22},
});
