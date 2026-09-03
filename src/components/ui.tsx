import React from 'react';
import {
  Animated,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, radii, spacing} from '../constants/theme';

export function Screen({
  children,
  scroll = true,
  backgroundImage,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  backgroundImage?: any;
}) {
  const insets = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const compact = width < 375 || height < 700;
  const animatedChildren = React.Children.toArray(children).map((child, index) => (
    <ScreenEntrance key={index} delay={index * 65} fill={!scroll}>
      {child}
    </ScreenEntrance>
  ));

  const content = scroll ? (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingHorizontal: compact ? spacing.sm : spacing.md,
          paddingTop: compact ? spacing.xs : spacing.sm,
          paddingBottom: Math.max(insets.bottom + (compact ? 94 : 110), compact ? 118 : 140),
        },
      ]}
      >
      {animatedChildren}
    </Animated.ScrollView>
  ) : (
    <Animated.View style={styles.flex}>
      {animatedChildren}
    </Animated.View>
  );

  if (backgroundImage) {
    return (
      <ImageBackground source={backgroundImage} style={styles.flex} resizeMode="cover">
        <View style={styles.backgroundOverlay}>
          <SafeAreaView edges={['top']} style={styles.flex}>
            {content}
          </SafeAreaView>
        </View>
      </ImageBackground>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      {content}
    </SafeAreaView>
  );
}

function ScreenEntrance({children, delay, fill}: {children: React.ReactNode; delay: number; fill?: boolean}) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(-28)).current;
  const scale = React.useRef(new Animated.Value(0.97)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        friction: 8,
        tension: 74,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay,
        friction: 9,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, scale, translateY]);

  return (
    <Animated.View style={[fill && styles.flex, {opacity, transform: [{translateY}, {scale}]}]}>
      {children}
    </Animated.View>
  );
}

export function SectionTitle({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.flex}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

export function Card({children, style}: {children: React.ReactNode; style?: any}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Pill({
  label,
  active = false,
  color,
}: {
  label: string;
  active?: boolean;
  color?: string;
}) {
  return (
    <View
      style={[
        styles.pill,
        active && {backgroundColor: `${color ?? colors.purple}22`, borderColor: color ?? colors.purple},
      ]}>
      <Text style={[styles.pillText, active && {color: color ?? colors.text}]}>{label}</Text>
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  color = colors.purple,
  textColor = colors.text,
  disabled,
}: {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.primaryButton,
        {backgroundColor: color, opacity: disabled ? 0.45 : 1},
      ]}>
      <Text style={[styles.primaryButtonText, {color: textColor}]}>{title}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.secondaryButton}>
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </Pressable>
  );
}

export function Input({
  value,
  onChangeText,
  placeholder,
  multiline,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      multiline={multiline}
      style={[styles.input, multiline && styles.textArea]}
    />
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 10,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#1B2146',
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#272F66',
  },
  pillText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 8},
    elevation: Platform.OS === 'android' ? 10 : 0,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    minHeight: 44,
    borderRadius: radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1F44',
    borderWidth: 1,
    borderColor: '#2B336C',
  },
  secondaryButtonText: {
    color: colors.textMuted,
    fontWeight: '700',
  },
  input: {
    minHeight: 48,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#2A3164',
    backgroundColor: '#151B3C',
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
});
