import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {PrimaryButton, Screen, SecondaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';

export function MatchCalculatorScreen({navigation}: any) {
  const [you, setYou] = useState(0);
  const [opponents, setOpponents] = useState(0);
  const [serving, setServing] = useState<'you' | 'opponents'>('you');
  const points = ['0', '15', '30', '40', 'Adv'];
  const addPoint = (team: 'you' | 'opponents') => {
    if (team === 'you') setYou(current => Math.min(current + 1, 4));
    else setOpponents(current => Math.min(current + 1, 4));
  };

  return (
    <Screen>
      <View style={styles.top}><Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>‹ Back</Text></Pressable><Text style={styles.heading}>Score Calculator</Text><Text style={styles.undo}>Undo</Text></View>
      <View style={styles.teams}>
        <Pressable onPress={() => setServing('you')} style={[styles.team, serving === 'you' && styles.teamServing]}><Text style={styles.teamLabel}>{serving === 'you' ? '● ' : ''}Serving</Text><Text style={styles.teamName}>Your Team</Text></Pressable>
        <Pressable onPress={() => setServing('opponents')} style={[styles.team, serving === 'opponents' && styles.teamServing]}><Text style={styles.teamLabel}>{serving === 'opponents' ? '● ' : ''}Serving</Text><Text style={styles.teamName}>Opponents</Text></Pressable>
      </View>
      <View style={styles.setCard}><Text style={styles.setLabel}>SET 1 — GAMES</Text><Text style={styles.games}>0 <Text style={styles.gamesDash}>–</Text> 0</Text></View>
      <View style={styles.pointCard}><Text style={styles.setLabel}>CURRENT GAME</Text><Text style={styles.points}>{points[you]} <Text style={styles.gamesDash}>–</Text> {points[opponents]}</Text></View>
      <View style={styles.pointActions}>
        <Pressable style={[styles.pointButton, styles.youButton]} onPress={() => addPoint('you')}><Text style={styles.pointText}>+ Point{`\n`}Your Team</Text></Pressable>
        <Pressable style={[styles.pointButton, styles.opponentButton]} onPress={() => addPoint('opponents')}><Text style={styles.pointText}>+ Point{`\n`}Opponents</Text></Pressable>
      </View>
      <View style={styles.controls}>
        <SecondaryButton title={`● Switch serve`} onPress={() => setServing(serving === 'you' ? 'opponents' : 'you')} />
        <SecondaryButton title="Reset" onPress={() => {setYou(0); setOpponents(0);}} />
      </View>
      <PrimaryButton title="Save Match" color={colors.green} onPress={() => navigation.navigate('NewMatch', {score: {you, opponents}})} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  back: {color: '#C8A8FF', fontWeight: '800'},
  heading: {color: colors.text, fontSize: 14, fontWeight: '900'},
  undo: {color: colors.purple, fontSize: 12, fontWeight: '700'},
  teams: {flexDirection: 'row', gap: 10},
  team: {flex: 1, borderRadius: 12, backgroundColor: '#171C3E', padding: 12, borderWidth: 1, borderColor: '#252C5B'},
  teamServing: {borderColor: colors.yellow, backgroundColor: '#282337'},
  teamLabel: {color: colors.textMuted, fontSize: 10}, teamName: {color: colors.text, fontWeight: '800', marginTop: 3},
  setCard: {backgroundColor: '#1B2050', borderRadius: 16, padding: 18, alignItems: 'center'},
  setLabel: {color: colors.textMuted, fontSize: 10, fontWeight: '800'},
  games: {color: colors.purple, fontSize: 38, fontWeight: '900', marginTop: 8}, gamesDash: {color: colors.textMuted},
  pointCard: {backgroundColor: '#0D112A', borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#1B2147'},
  points: {color: colors.text, fontSize: 25, fontWeight: '900', marginTop: 6},
  pointActions: {flexDirection: 'row', gap: 10}, pointButton: {flex: 1, minHeight: 72, borderRadius: 14, justifyContent: 'center', alignItems: 'center'},
  youButton: {backgroundColor: colors.purple}, opponentButton: {backgroundColor: '#D99500'}, pointText: {color: colors.text, textAlign: 'center', fontWeight: '900', lineHeight: 20},
  controls: {flexDirection: 'row', gap: 10},
});
