import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Input, PrimaryButton, Screen} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';

export function NewMatchScreen({navigation, route}: any) {
  const {addMatch} = useAppContext();
  const initialScore = route.params?.score;
  const [partner, setPartner] = useState(''); const [opponentOne, setOpponentOne] = useState(''); const [opponentTwo, setOpponentTwo] = useState('');
  const [youScore, setYouScore] = useState(initialScore ? String(initialScore.you) : ''); const [oppScore, setOppScore] = useState(initialScore ? String(initialScore.opponents) : '');
  const [duration, setDuration] = useState(''); const [notes, setNotes] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));
  const [time, setTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
  const [court, setCourt] = useState('Court 1');
  const [matchType, setMatchType] = useState('Friendly');
  const [format, setFormat] = useState('Best of 3');
  const save = () => {
    addMatch({id: String(Date.now()), date, time, court, matchType, partner, opponentOne, opponentTwo, format, setScores: [{you: youScore || '0', opp: oppScore || '0'}], duration: duration || '0', notes});
    navigation.popToTop();
  };

  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>‹ Back</Text></Pressable>
      <Text style={styles.title}>New Match</Text>
      <Text style={styles.section}>MATCH DETAILS</Text>
      <View style={styles.row}>
        <SelectField label="DATE" value={date} options={dateOptions()} onSelect={setDate} />
        <SelectField label="TIME" value={time} options={timeOptions} onSelect={setTime} />
      </View>
      <View style={styles.row}>
        <SelectField label="COURT" value={court} options={['Court 1', 'Court 2', 'Court 3', 'Court 4']} onSelect={setCourt} />
        <SelectField label="MATCH TYPE" value={matchType} options={['Friendly', 'Competitive', 'Training']} onSelect={setMatchType} />
      </View>
      <Text style={styles.section}>PLAYERS</Text>
      <Field label="YOUR PARTNER" value={partner} onChangeText={setPartner} placeholder="Partner name" />
      <View style={styles.row}>
        <Field label="OPPONENT 1" value={opponentOne} onChangeText={setOpponentOne} placeholder="Name" />
        <Field label="OPPONENT 2" value={opponentTwo} onChangeText={setOpponentTwo} placeholder="Name" />
      </View>
      <Text style={styles.section}>SCORE</Text>
      <View style={styles.row}>
        <Field label="YOUR TEAM" value={youScore} onChangeText={setYouScore} placeholder="0" />
        <Field label="OPPONENTS" value={oppScore} onChangeText={setOppScore} placeholder="0" />
      </View>
      <SelectField label="FORMAT" value={format} options={['Best of 3', 'Best of 5', 'One set']} onSelect={setFormat} />
      <Field label="DURATION (MINUTES)" value={duration} onChangeText={setDuration} placeholder="e.g. 75" />
      <Field label="NOTES" value={notes} onChangeText={setNotes} placeholder="Add match notes, observations, or highlights..." multiline />
      <PrimaryButton title="Save Match" onPress={save} />
    </Screen>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString();
}

function dateOptions() {
  return [-1, 0, 1, 2, 3].map(offset => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return formatDate(date);
  });
}

const timeOptions = ['07:00', '08:00', '09:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

function Field({
  label,
  value,
  onChangeText = () => {},
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText?: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Input value={value} onChangeText={onChangeText} placeholder={placeholder} multiline={multiline} />
    </View>
  );
}

function SelectField({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.select} onPress={() => setVisible(true)}>
        <Text style={styles.selectValue} numberOfLines={1}>{value}</Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setVisible(false)}>
          <Pressable style={styles.menu} onPress={() => {}}>
            <Text style={styles.menuTitle}>{label}</Text>
            {options.map(option => (
              <Pressable key={option} style={[styles.menuOption, option === value && styles.menuOptionActive]} onPress={() => {onSelect(option); setVisible(false);}}>
                <Text style={[styles.menuOptionText, option === value && styles.menuOptionTextActive]}>{option}</Text>
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {color: '#C8A8FF', fontWeight: '800'}, title: {color: colors.text, fontSize: 28, fontWeight: '900'}, section: {color: colors.purple, fontSize: 11, fontWeight: '900', letterSpacing: 1.2, marginTop: 8}, label: {color: colors.textMuted, fontSize: 10, fontWeight: '800'}, row: {flexDirection: 'row', gap: 10}, field: {flex: 1, gap: 6},
  select: {minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: '#2A3164', backgroundColor: '#151B3C', paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, selectValue: {flex: 1, color: colors.text, fontSize: 14}, chevron: {color: '#C8A8FF', fontSize: 18, marginLeft: 6},
  modalBackdrop: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.62)', justifyContent: 'flex-end', padding: 16}, menu: {backgroundColor: '#171C3E', borderRadius: 22, borderWidth: 1, borderColor: '#383876', padding: 16, gap: 6}, menuTitle: {color: colors.textMuted, fontWeight: '900', fontSize: 11, letterSpacing: 1.2, marginBottom: 4}, menuOption: {paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12}, menuOptionActive: {backgroundColor: 'rgba(154, 92, 255, 0.2)'}, menuOptionText: {color: colors.text, fontWeight: '700'}, menuOptionTextActive: {color: '#C8A8FF'},
});
