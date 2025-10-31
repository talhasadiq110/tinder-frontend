import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Person } from '../../../types';
import { Text } from '../../atoms/Text/Text';

interface UserCardProps {
  person: Person;
  showActions?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;

export const UserCard: React.FC<UserCardProps> = ({ person, showActions = true }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: person.picture }} style={styles.image} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.infoContainer}>
          <Text variant="title" style={styles.name}>
            {person.name}, {person.age}
          </Text>
          <Text variant="body" style={styles.location}>
            {person.location}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    color: '#fff',
    marginBottom: 4,
  },
  location: {
    color: '#fff',
  },
});