import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { Text } from '../components/atoms/Text/Text';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Start fade and scale animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();

    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <LinearGradient 
      colors={['#FF5864', '#FD297B']} 
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <Text 
            variant="h1" 
            weight="bold" 
            color="white" 
            align="center"
            style={styles.logo}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            spark
          </Text>
        </View>
        
        <View style={styles.subtitleContainer}>
          <Text 
            variant="body" 
            color="white" 
            align="center"
            style={styles.subtitle}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Find your perfect match
          </Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40, // Add horizontal padding to prevent edge cutting
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Take full width minus padding
    maxWidth: 400, // Maximum width for very large screens
  },
  logoContainer: {
    marginBottom: 16,
    width: '100%', // Ensure full width for proper centering
  },
  logo: {
    fontSize: Math.min(SCREEN_WIDTH * 0.15, 60), // Responsive font size
    lineHeight: Math.min(SCREEN_WIDTH * 0.15, 60) * 1.1, // Responsive line height
    fontWeight: '800',
    letterSpacing: 1.5,
    includeFontPadding: false, // Remove extra padding that can cause cutting
    textAlignVertical: 'center', // Better vertical alignment
  },
  subtitleContainer: {
    width: '100%', // Ensure full width for proper centering
  },
  subtitle: {
    fontSize: Math.min(SCREEN_WIDTH * 0.045, 18), // Responsive font size
    lineHeight: Math.min(SCREEN_WIDTH * 0.045, 18) * 1.3, // Responsive line height
    opacity: 0.9,
    includeFontPadding: false, // Remove extra padding
    textAlignVertical: 'center', // Better vertical alignment
  },
});