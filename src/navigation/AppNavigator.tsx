import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Image, Platform, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../constants/theme';
import {useAppContext} from '../context/AppContext';
import {onboardingSlides} from '../data/content';
import {OnboardingScreen} from '../screens/root/OnboardingScreen';
import {AcademyHomeScreen} from '../screens/academy/AcademyHomeScreen';
import {LessonDetailScreen} from '../screens/academy/LessonDetailScreen';
import {GlossaryScreen} from '../screens/glossary/GlossaryScreen';
import {TermDetailScreen} from '../screens/glossary/TermDetailScreen';
import {QuizScreen} from '../screens/glossary/QuizScreen';
import {QuizResultsScreen} from '../screens/glossary/QuizResultsScreen';
import {ScorebookScreen} from '../screens/scorebook/ScorebookScreen';
import {MatchCalculatorScreen} from '../screens/scorebook/MatchCalculatorScreen';
import {NewMatchScreen} from '../screens/scorebook/NewMatchScreen';
import {StatisticsScreen} from '../screens/scorebook/StatisticsScreen';
import {ClubScreen} from '../screens/club/ClubScreen';
import {ServiceRequestScreen} from '../screens/club/ServiceRequestScreen';
import {ParkingReservationScreen} from '../screens/club/ParkingReservationScreen';
import {OfferDetailScreen} from '../screens/club/OfferDetailScreen';
import {AssistantScreen} from '../screens/assistant/AssistantScreen';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.bg,
    text: colors.text,
    border: 'transparent',
    primary: colors.purple,
  },
};

function SplashScreen({onDone}: {onDone: () => void}) {
  const {width, height} = useWindowDimensions();
  const compact = width < 375 || height < 700;
  const progress = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoOffset = useRef(new Animated.Value(-90)).current;
  const logoScale = useRef(new Animated.Value(0.82)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textOffset = useRef(new Animated.Value(-34)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0.15,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.sequence([
      Animated.delay(160),
      Animated.parallel([
        Animated.timing(logoOpacity, {toValue: 1, duration: 320, useNativeDriver: true}),
        Animated.spring(logoOffset, {toValue: 0, friction: 7, tension: 70, useNativeDriver: true}),
        Animated.spring(logoScale, {toValue: 1, friction: 7, tension: 80, useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {toValue: 1, duration: 260, useNativeDriver: true}),
        Animated.spring(textOffset, {toValue: 0, friction: 8, tension: 72, useNativeDriver: true}),
      ]),
    ]).start();

    const timer = setTimeout(onDone, 4000);
    return () => clearTimeout(timer);
  }, [onDone, progress]);

  return (
    <View style={styles.splashWrap}>
      <Image
        source={require('../assets/loader-holland-casino.png')}
        style={styles.splashBackground}
        resizeMode="cover"
      />
      <View style={styles.splashContent}>
        <Animated.View style={{opacity: logoOpacity, transform: [{translateX: logoOffset}, {scale: logoScale}]}}>
          <Image
            source={require('../assets/club-assistant-logo.png')}
            style={[styles.splashLogo, {width: Math.min(width - 48, 330), height: compact ? 132 : 157}]}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View style={{opacity: textOpacity, transform: [{translateY: textOffset}]}}>
          <Text style={styles.splashTitle}>Holland</Text>
          <Text style={styles.splashSubtitle}>PADEL CONNECT</Text>
        </Animated.View>
      </View>
      <View style={[styles.splashBars, {bottom: compact ? 94 : 145}]}> 
        {[0, 1, 2, 3, 4].map(index => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                backgroundColor: ['#19E38B', '#14C9E9', '#9A5CFF', '#FF6BD6', '#FFC529'][index],
                transform: [
                  {
                    scaleY: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.65 + index * 0.04, 1.35 - index * 0.06],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function TabEmoji({emoji, focused}: {emoji: string; focused: boolean}) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>{emoji}</Text>
    </View>
  );
}

function Tabs() {
  const insets = useSafeAreaInsets();
  const bottomOffset = Platform.OS === 'ios' ? 20 : 30;
  const tabBarHeight = 70 + insets.bottom * 0.4;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: bottomOffset,
          height: tabBarHeight,
          borderRadius: 26,
          backgroundColor: 'rgba(14, 18, 42, 0.95)',
          borderTopWidth: 0,
          paddingBottom: 6,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOpacity: 0.28,
          shadowRadius: 18,
          shadowOffset: {width: 0, height: 10},
          elevation: 10,
        },
      }}>
      <Tab.Screen
        name="AcademyHome"
        component={AcademyHomeScreen}
        options={{tabBarIcon: ({focused}) => <TabEmoji emoji="📖" focused={focused} />}}
      />
      <Tab.Screen
        name="GlossaryHome"
        component={GlossaryScreen}
        options={{tabBarIcon: ({focused}) => <TabEmoji emoji="➕" focused={focused} />}}
      />
      <Tab.Screen
        name="ScorebookHome"
        component={ScorebookScreen}
        options={{tabBarIcon: ({focused}) => <TabEmoji emoji="📊" focused={focused} />}}
      />
      <Tab.Screen
        name="ClubHome"
        component={ClubScreen}
        options={{tabBarIcon: ({focused}) => <TabEmoji emoji="🏠" focused={focused} />}}
      />
      <Tab.Screen
        name="AssistantHome"
        component={AssistantScreen}
        options={{tabBarIcon: ({focused}) => <TabEmoji emoji="💬" focused={focused} />}}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const {state} = useAppContext();
  const [showSplash, setShowSplash] = useState(true);
  const initialRoute = useMemo(() => {
    if (showSplash) {
      return 'Splash';
    }
    return state.hasCompletedOnboarding ? 'Tabs' : 'Onboarding';
  }, [showSplash, state.hasCompletedOnboarding]);

  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator
        key={initialRoute}
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false, animation: 'fade'}}>
        <RootStack.Screen name="Splash">
          {() => <SplashScreen onDone={() => setShowSplash(false)} />}
        </RootStack.Screen>
        <RootStack.Screen name="Onboarding">
          {props => <OnboardingScreen {...props} slides={onboardingSlides} />}
        </RootStack.Screen>
        <RootStack.Screen name="Tabs" component={Tabs} />
        <RootStack.Screen name="LessonDetail" component={LessonDetailScreen} />
        <RootStack.Screen name="TermDetail" component={TermDetailScreen} />
        <RootStack.Screen name="Quiz" component={QuizScreen} />
        <RootStack.Screen name="QuizResults" component={QuizResultsScreen} />
        <RootStack.Screen name="MatchCalculator" component={MatchCalculatorScreen} />
        <RootStack.Screen name="NewMatch" component={NewMatchScreen} />
        <RootStack.Screen name="Statistics" component={StatisticsScreen} />
        <RootStack.Screen name="ServiceRequest" component={ServiceRequestScreen} />
        <RootStack.Screen name="ParkingReservation" component={ParkingReservationScreen} />
        <RootStack.Screen name="OfferDetail" component={OfferDetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashWrap: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  splashContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -120,
  },
  splashLogo: {
    width: 330,
    height: 157,
    marginBottom: 26,
  },
  splashTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  splashSubtitle: {
    color: 'rgba(244, 245, 255, 0.68)',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 4.6,
    marginTop: 6,
    textAlign: 'center',
  },
  splashBars: {
    position: 'absolute',
    bottom: 145,
    flexDirection: 'row',
    gap: 7,
  },
  bar: {
    width: 8,
    height: 32,
    borderRadius: 10,
  },
  tabIcon: {
    width: 46,
    height: 46,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconActive: {
    backgroundColor: 'rgba(154, 92, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(154, 92, 255, 0.45)',
  },
  tabEmoji: {
    fontSize: 18,
    opacity: 0.55,
  },
  tabEmojiActive: {
    opacity: 1,
  },
});
