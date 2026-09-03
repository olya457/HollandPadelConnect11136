import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, Input, PrimaryButton, Screen} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';
import {services} from '../../data/content';

export function ServiceRequestScreen({navigation, route}: any) {
  const {addServiceRequest} = useAppContext();
  const service = services.find(item => item.id === route.params?.serviceId) ?? services[0];
  const [fullName, setFullName] = useState(''); const [date, setDate] = useState(''); const [time, setTime] = useState(''); const [participants, setParticipants] = useState('1'); const [contact, setContact] = useState(''); const [notes, setNotes] = useState(''); const [submitted, setSubmitted] = useState(false);
  const submit = () => {
    addServiceRequest({id: String(Date.now()), serviceId: service.id, fullName, preferredDate: date, preferredTime: time, participants, level: 'Beginner', contact, notes, confirmation: `HC-${String(Date.now()).slice(-6)}`});
    setSubmitted(true);
  };
  if (submitted) return <Screen scroll={false}><View style={styles.confirm}><Text style={styles.success}>✓</Text><Text style={styles.confirmTitle}>Request Submitted!</Text><Text style={styles.copy}>Your {service.title} request has been sent. We will get back to you shortly.</Text><View style={styles.buttonWrap}><PrimaryButton title="Done" onPress={() => navigation.popToTop()} /></View></View></Screen>;
  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>‹ Services</Text></Pressable>
      <Text style={styles.title}>Request Session</Text>
      <Card><Text style={styles.serviceName}>{service.title}</Text><Text style={styles.copy}>{service.description}</Text><Text style={styles.duration}>{service.duration}</Text></Card>
      <Field label="FULL NAME" value={fullName} setValue={setFullName} placeholder="Your name" />
      <View style={styles.row}><Field label="PREFERRED DATE" value={date} setValue={setDate} placeholder="DD/MM/YYYY" /><Field label="PREFERRED TIME" value={time} setValue={setTime} placeholder="HH:MM" /></View>
      <Field label="PARTICIPANTS" value={participants} setValue={setParticipants} placeholder="1" />
      <Field label="CONTACT EMAIL OR PHONE" value={contact} setValue={setContact} placeholder="you@email.com" />
      <Field label="ADDITIONAL NOTES" value={notes} setValue={setNotes} placeholder="Any special requirements..." multiline />
      <PrimaryButton title="Submit Request" onPress={submit} />
    </Screen>
  );
}

function Field({label, value, setValue, placeholder, multiline}: any) { return <View style={styles.field}><Text style={styles.label}>{label}</Text><Input value={value} onChangeText={setValue} placeholder={placeholder} multiline={multiline} /></View>; }

const styles = StyleSheet.create({
  back: {color: '#C8A8FF', fontWeight: '800'}, title: {color: colors.text, fontSize: 28, fontWeight: '900'}, serviceName: {color: colors.text, fontSize: 18, fontWeight: '900'}, copy: {color: colors.textMuted, lineHeight: 21}, duration: {color: colors.yellow, fontWeight: '900'}, field: {gap: 6}, label: {color: colors.textMuted, fontSize: 10, fontWeight: '900'}, row: {flexDirection: 'row', gap: 10}, confirm: {flex: 1, padding: 28, justifyContent: 'center', alignItems: 'center', gap: 16}, buttonWrap: {alignSelf: 'stretch'}, success: {width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: colors.green, color: colors.green, textAlign: 'center', paddingTop: 11, fontSize: 30}, confirmTitle: {color: colors.text, fontSize: 24, fontWeight: '900', textAlign: 'center'},
});
