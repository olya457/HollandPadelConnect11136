import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Card, PrimaryButton, Screen} from '../../components/ui';
import {colors} from '../../constants/theme';
import {offers} from '../../data/content';

export function OfferDetailScreen({navigation, route}: any) {
  const offer = offers.find(item => item.id === route.params?.offerId) ?? offers[0];
  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>‹ Offers</Text></Pressable>
      <Card><Text style={styles.icon}>🌅</Text><Text style={styles.title}>{offer.title}</Text><Text style={styles.copy}>{offer.description}</Text><Text style={styles.section}>WHAT'S INCLUDED</Text>{offer.included.map(item => <Text key={item} style={styles.included}>✓ {item}</Text>)}</Card>
      <Card><Text style={styles.section}>AVAILABILITY</Text><Text style={styles.copy}>{offer.availability}</Text><Text style={styles.section}>CONDITIONS</Text><Text style={styles.copy}>{offer.conditions}</Text><Text style={styles.section}>ELIGIBILITY</Text><Text style={styles.copy}>{offer.eligibility}</Text></Card>
      <PrimaryButton title="Request Session" onPress={() => navigation.navigate('ServiceRequest', {serviceId: 'coaching'})} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: {color: '#C8A8FF', fontWeight: '800'}, icon: {fontSize: 34}, title: {color: colors.text, fontSize: 25, fontWeight: '900'}, copy: {color: colors.textMuted, lineHeight: 21}, section: {color: colors.purple, fontSize: 11, fontWeight: '900', letterSpacing: 1.2, marginTop: 5}, included: {color: colors.green, fontSize: 13, lineHeight: 22},
});
