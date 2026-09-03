import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {PrimaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {useAppContext} from '../../context/AppContext';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

export function OnboardingScreen({navigation, slides}: any) {
  const {width} = useWindowDimensions();
  const {completeOnboarding} = useAppContext();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentOffset = useRef(new Animated.Value(-30)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageOffset = useRef(new Animated.Value(52)).current;
  const imageScale = useRef(new Animated.Value(1.08)).current;

  useEffect(() => {
    contentOpacity.setValue(0);
    contentOffset.setValue(-30);
    imageOpacity.setValue(0);
    imageOffset.setValue(52);
    imageScale.setValue(1.08);
    Animated.parallel([
      Animated.timing(imageOpacity, {toValue: 1, duration: 420, useNativeDriver: true}),
      Animated.spring(imageOffset, {toValue: 0, friction: 9, tension: 65, useNativeDriver: true}),
      Animated.spring(imageScale, {toValue: 1, friction: 10, tension: 70, useNativeDriver: true}),
      Animated.timing(contentOpacity, {toValue: 1, duration: 300, delay: 180, useNativeDriver: true}),
      Animated.spring(contentOffset, {toValue: 0, delay: 180, friction: 8, tension: 72, useNativeDriver: true}),
    ]).start();
  }, [contentOffset, contentOpacity, imageOffset, imageOpacity, imageScale, index]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(nextIndex);
  };

  const handleContinue = () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({index: index + 1});
      setIndex(index + 1);
      return;
    }
    completeOnboarding();
    navigation.replace('Tabs');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        extraData={index}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({item}) => (
          <AnimatedImageBackground
            source={item.image}
            style={[
              styles.slide,
              {
                width,
                opacity: imageOpacity,
                transform: [{translateX: imageOffset}, {scale: imageScale}],
              },
            ]}
            resizeMode="cover">
            <View style={styles.overlay}>
              <Animated.View
                style={[
                  styles.bottom,
                  {opacity: contentOpacity, transform: [{translateY: contentOffset}]},
                ]}>
                <Text style={[styles.eyebrow, {color: item.accent}]}>{item.eyebrow}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.dots}>
                  {slides.map((slide: any, dotIndex: number) => (
                    <View
                      key={slide.id}
                      style={[
                        styles.dot,
                        dotIndex === index && {width: 24, backgroundColor: item.accent},
                      ]}
                    />
                  ))}
                </View>
                <PrimaryButton
                  title={index === slides.length - 1 ? 'Get Started →' : 'Continue →'}
                  onPress={handleContinue}
                  color={item.accent}
                  textColor={item.accent === '#FFC529' ? '#070B21' : colors.text}
                />
              </Animated.View>
            </View>
          </AnimatedImageBackground>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  slide: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 23, 0.35)',
    justifyContent: 'flex-end',
  },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 34,
    gap: 14,
    backgroundColor: 'rgba(8, 11, 33, 0.82)',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 26,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: 'rgba(244,245,255,0.28)',
  },
});
