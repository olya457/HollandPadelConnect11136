import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Card, PrimaryButton, Screen, SectionTitle} from '../../components/ui';
import {colors} from '../../constants/theme';
import {offers, parkingSpaces, services} from '../../data/content';

type ClubTab = 'Offers' | 'Services' | 'Parking';

export function ClubScreen({navigation}: any) {
  const [tab, setTab] = useState<ClubTab>('Offers');
  const [parkingFilter, setParkingFilter] = useState<'All' | 'Available' | 'Accessible'>('All');
  const [selectedSpaceId, setSelectedSpaceId] = useState('A6');
  const selectedSpace = parkingSpaces.find(space => space.id === selectedSpaceId) ?? parkingSpaces[0];
  const filteredSpaces = parkingSpaces.filter(space =>
    parkingFilter === 'Available' ? space.available : parkingFilter === 'Accessible' ? space.type === 'Accessible' : true,
  );
  return (
    <Screen>
      <SectionTitle title="Club" subtitle="Holland Casino Padel Connect" />
      <View style={styles.tabs}>
        {(['Offers', 'Services', 'Parking'] as ClubTab[]).map(item => <Pressable key={item} onPress={() => setTab(item)} style={[styles.tab, tab === item && styles.tabActive]}><Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text></Pressable>)}
      </View>
      {tab === 'Offers' && offers.map(offer => (
        <Pressable key={offer.id} onPress={() => navigation.navigate('OfferDetail', {offerId: offer.id})}>
          <Card style={styles.itemCard}><View style={styles.cardHeader}><Text style={styles.icon}>🌅</Text><Text style={styles.tag}>{offer.tag}</Text></View><Text style={styles.itemTitle}>{offer.title}</Text><Text style={styles.copy}>{offer.shortDescription}</Text><Text style={styles.link}>View details  ›</Text></Card>
        </Pressable>
      ))}
      {tab === 'Services' && services.map(service => (
        <Pressable key={service.id} onPress={() => navigation.navigate('ServiceRequest', {serviceId: service.id})}>
          <Card style={styles.itemCard}><View style={styles.cardHeader}><Text style={styles.icon}>🎓</Text><Text style={styles.duration}>{service.duration}</Text></View><Text style={styles.itemTitle}>{service.title}</Text><Text style={styles.copy}>{service.description}</Text><Text style={styles.link}>Request session  ›</Text></Card>
        </Pressable>
      ))}
      {tab === 'Parking' && <>
        <View style={styles.parkingFilters}>
          {(['All', 'Available', 'Accessible'] as const).map(filter => <Pressable key={filter} onPress={() => setParkingFilter(filter)} style={[styles.filter, parkingFilter === filter && styles.filterActive]}><Text style={[styles.filterText, parkingFilter === filter && styles.filterTextActive]}>{parkingFilter === filter ? '● ' : ''}{filter}</Text></Pressable>)}
        </View>
        <Card style={styles.mapCard}>
          <View style={styles.mapHeader}><Text style={styles.parkingTitle}>Parking Map</Text><Text style={styles.mapCount}>{filteredSpaces.filter(space => space.available).length} spaces free</Text></View>
          <View style={styles.entrance}><Text style={styles.entranceText}>↔ Entrance</Text></View>
          {(['Zone A', 'Zone B'] as const).map(zone => {
            const spaces = filteredSpaces.filter(space => space.zone === zone);
            return spaces.length ? <View key={zone} style={styles.zone}><Text style={styles.zoneTitle}>{zone.toUpperCase()}</Text><View style={styles.parkingGrid}>{spaces.map(space => <Pressable key={space.id} disabled={!space.available} onPress={() => setSelectedSpaceId(space.id)} style={[styles.space, !space.available && styles.spaceUnavailable, space.id === selectedSpaceId && styles.spaceSelected]}><Text style={styles.spaceText}>{space.id}</Text></Pressable>)}</View></View> : null;
          })}
        </Card>
        <Text style={styles.legend}><Text style={{color: colors.green}}>● Available</Text>   <Text style={{color: colors.purple}}>● Selected</Text>   <Text style={{color: colors.textMuted}}>● Occupied</Text></Text>
        <Card style={styles.selectedCard}><View><Text style={styles.selectedTitle}>Space {selectedSpace.id}</Text><Text style={styles.copy}>{selectedSpace.zone} · {selectedSpace.distance}</Text><Text style={styles.copy}>{selectedSpace.type}</Text></View><Text style={styles.available}>Available</Text></Card>
        <PrimaryButton title={`Reserve Space ${selectedSpace.id}`} onPress={() => navigation.navigate('ParkingReservation', {spaceId: selectedSpace.id})} />
      </>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabs: {flexDirection: 'row', padding: 4, borderRadius: 12, backgroundColor: '#141938'}, tab: {flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: 'center'}, tabActive: {backgroundColor: colors.purple}, tabText: {color: colors.textMuted, fontSize: 12, fontWeight: '800'}, tabTextActive: {color: colors.text},
  itemCard: {gap: 8}, cardHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, icon: {fontSize: 22}, tag: {color: colors.green, backgroundColor: 'rgba(25, 227, 139, 0.12)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 10, fontWeight: '800'}, duration: {color: colors.yellow, fontWeight: '800', fontSize: 11}, itemTitle: {color: colors.text, fontSize: 18, fontWeight: '900'}, copy: {color: colors.textMuted, fontSize: 13, lineHeight: 19}, link: {color: '#C8A8FF', fontSize: 12, fontWeight: '800', marginTop: 2},
  parkingFilters: {flexDirection: 'row', gap: 7}, filter: {flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 9, backgroundColor: '#171C3E'}, filterActive: {backgroundColor: 'rgba(154, 92, 255, 0.2)', borderWidth: 1, borderColor: colors.purple}, filterText: {color: colors.textMuted, fontSize: 11, fontWeight: '800'}, filterTextActive: {color: '#C8A8FF'},
  mapCard: {gap: 13}, mapHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, parkingTitle: {color: colors.text, fontWeight: '900', fontSize: 18}, mapCount: {color: colors.textMuted, fontSize: 11}, entrance: {alignSelf: 'flex-start', backgroundColor: '#20254D', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8}, entranceText: {color: '#C8A8FF', fontSize: 11, fontWeight: '800'}, zone: {gap: 7}, zoneTitle: {color: colors.textMuted, fontSize: 10, fontWeight: '900', letterSpacing: 1}, parkingGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: 9}, space: {width: '17%', aspectRatio: 1, minWidth: 45, borderRadius: 10, backgroundColor: '#14613F', justifyContent: 'center', alignItems: 'center'}, spaceUnavailable: {backgroundColor: '#30364A'}, spaceSelected: {backgroundColor: '#336CFA', borderWidth: 2, borderColor: '#A9BFFF'}, spaceText: {color: colors.text, fontWeight: '900', fontSize: 12}, legend: {color: colors.textMuted, textAlign: 'center', fontSize: 11}, selectedCard: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, selectedTitle: {color: colors.text, fontSize: 17, fontWeight: '900'}, available: {color: colors.green, fontSize: 11, fontWeight: '900'},
});
