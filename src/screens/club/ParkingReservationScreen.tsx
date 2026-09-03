import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, Input, PrimaryButton, Screen} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';
import {parkingSpaces} from '../../data/content';

export function ParkingReservationScreen({navigation, route}: any) {
  const {addParkingReservation} = useAppContext();
  const space = parkingSpaces.find(item => item.id === route.params?.spaceId) ?? parkingSpaces[0];
  const [date, setDate] = useState(''); const [time, setTime] = useState(''); const [duration, setDuration] = useState('2'); const [make, setMake] = useState(''); const [model, setModel] = useState(''); const [licensePlate, setLicensePlate] = useState(''); const [confirmed, setConfirmed] = useState(false);
  const confirm = () => { addParkingReservation({id: String(Date.now()), spaceId: space.id, arrivalDate: date, arrivalTime: time, duration, make, model, licensePlate}); setConfirmed(true); };
  if (confirmed) return <Screen scroll={false}><View style={styles.confirm}><Text style={styles.success}>✓</Text><Text style={styles.confirmTitle}>Space Reserved!</Text><Card style={styles.confirmCard}><Text style={styles.spaceBig}>{space.id}</Text><Text style={styles.copy}>{space.zone} · {space.distance}</Text><Text style={styles.copy}>{date} at {time}</Text></Card><View style={styles.buttonWrap}><PrimaryButton title="Done" onPress={() => navigation.popToTop()} /></View></View></Screen>;
  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>‹ Parking Map</Text></Pressable>
      <Text style={styles.title}>Reserve Space {space.id}</Text>
      <Card style={styles.spaceCard}><Text style={styles.spaceBig}>{space.id}</Text><Text style={styles.copy}>{space.zone} · {space.distance}</Text><Text style={styles.copy}>{space.type}</Text></Card>
      <View style={styles.row}><Field label="ARRIVAL DATE" value={date} setValue={setDate} placeholder="DD/MM/YYYY" /><Field label="ARRIVAL TIME" value={time} setValue={setTime} placeholder="HH:MM" /></View>
      <Field label="DURATION (HOURS)" value={duration} setValue={setDuration} placeholder="2" />
      <Text style={styles.section}>VEHICLE DETAILS</Text>
      <View style={styles.row}><Field label="MAKE" value={make} setValue={setMake} placeholder="e.g. BMW" /><Field label="MODEL" value={model} setValue={setModel} placeholder="e.g. 320" /></View>
      <Field label="LICENSE PLATE" value={licensePlate} setValue={setLicensePlate} placeholder="1234567" />
      <PrimaryButton title="Confirm Reservation" onPress={confirm} />
    </Screen>
  );
}

function Field({label, value, setValue, placeholder}: any) { return <View style={styles.field}><Text style={styles.label}>{label}</Text><Input value={value} onChangeText={setValue} placeholder={placeholder} /></View>; }

const styles = StyleSheet.create({
  back: {color: '#C8A8FF', fontWeight: '800'}, title: {color: colors.text, fontSize: 25, fontWeight: '900'}, spaceCard: {alignItems: 'center', backgroundColor: '#092737', borderColor: '#14586D'}, spaceBig: {color: colors.cyan, fontSize: 28, fontWeight: '900'}, copy: {color: colors.textMuted, textAlign: 'center'}, field: {flex: 1, gap: 6}, label: {color: colors.textMuted, fontSize: 10, fontWeight: '900'}, row: {flexDirection: 'row', gap: 10}, section: {color: colors.purple, fontSize: 11, fontWeight: '900', letterSpacing: 1.2}, confirm: {flex: 1, padding: 28, justifyContent: 'center', alignItems: 'center', gap: 16}, buttonWrap: {alignSelf: 'stretch'}, success: {width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: colors.green, color: colors.green, textAlign: 'center', paddingTop: 11, fontSize: 30}, confirmTitle: {color: colors.text, fontSize: 24, fontWeight: '900'}, confirmCard: {alignItems: 'center', minWidth: 250},
});
