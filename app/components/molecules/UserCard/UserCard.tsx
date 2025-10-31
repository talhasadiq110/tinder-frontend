import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import { Person } from '../../../types';
import { Text } from '../../atoms/Text/Text';

interface UserCardProps {
  person: Person;
  showActions?: boolean;
  style?: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

export const UserCard: React.FC<UserCardProps> = ({ 
  person, 
  showActions = true,
  style 
}) => {
  return (
    <Animated.View style={[styles.container, style]}>
      <Image 
        source={{ uri: person.picture }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
        locations={[0, 0.6, 1]}
        style={styles.gradient}
      >
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text variant="h2" weight="bold" color="white" style={styles.name}>
              {person.name}
            </Text>
            <Text variant="h3" weight="medium" color="white" style={styles.age}>
              {person.age}
            </Text>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text variant="body" weight="medium" color="white">
                {person.location}
              </Text>
            </View>
            
            <View style={styles.bioContainer}>
              <Text variant="caption" color="white" numberOfLines={2}>
                Love hiking, coffee, and good conversations. Looking for someone to explore the city with!
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Distance Badge */}
      <View style={styles.distanceBadge}>
        <Text variant="caption" weight="medium" color="white">
          🔍 2 km away
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  infoContainer: {
    padding: 24,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  name: {
    marginRight: 8,
  },
  age: {
    opacity: 0.9,
  },
  detailsContainer: {
    marginTop: 4,
  },
  detailItem: {
    marginBottom: 8,
  },
  bioContainer: {
    opacity: 0.9,
  },
  distanceBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
  },
});