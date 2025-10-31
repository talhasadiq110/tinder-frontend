import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../components/atoms/Text/Text';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.logo}>
        TinderClone
      </Text>
      <Text variant="body" style={styles.subtitle}>
        Find your match
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5864',
  },
  logo: {
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff',
  },
});