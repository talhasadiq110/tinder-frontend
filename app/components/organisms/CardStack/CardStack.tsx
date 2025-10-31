import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, View } from 'react-native';
import { useSwipeActions } from '../../../hooks/useSwipeActions';
import { Person } from '../../../types';
import { Icon } from '../../atoms/Icon/Icon';
import { Text } from '../../atoms/Text/Text';
import { SwipeButtons } from '../../molecules/SwipeButtons/SwipeButtons';
import { UserCard } from '../../molecules/UserCard/UserCard';
interface CardStackProps {
  people: Person[];
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const ROTATION_MULTIPLIER = 0.2;

export const CardStack: React.FC<CardStackProps> = ({ people }) => {
  const { likePerson, dislikePerson, isLoading } = useSwipeActions();
  const currentIndex = useRef(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      tension: 120,
      friction: 8,
      useNativeDriver: true,
    }).start(() => {
      const person = people[currentIndex.current];
      if (person) {
        likePerson(person.id);
      }
      nextCard();
    });
  };

  const swipeLeft = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      tension: 120,
      friction: 8,
      useNativeDriver: true,
    }).start(() => {
      const person = people[currentIndex.current];
      if (person) {
        dislikePerson(person.id);
      }
      nextCard();
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      tension: 300,
      friction: 20,
      useNativeDriver: true,
    }).start();
  };

  const nextCard = () => {
    currentIndex.current += 1;
    position.setValue({ x: 0, y: 0 });
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-15deg', '0deg', '15deg'],
      extrapolate: 'clamp',
    });

    const opacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    });

    return {
      transform: [
        { translateX: position.x },
        { translateY: position.y },
        { rotate },
      ],
      opacity,
    };
  };

  if (people.length === 0 || currentIndex.current >= people.length) {
    return (
      <View style={styles.container}>
        <View style={styles.noMoreContainer}>
          <UserCard
            person={{
              id: 0,
              name: "You're all caught up!",
              age: 0,
              location: "Check back later for new people",
              picture: "https://picsum.photos/300/400?random=999",
              created_at: "",
              updated_at: ""
            }}
            showActions={false}
          />
          <View style={styles.noMoreOverlay}>
            <Text variant="h2" weight="bold" color="white" align="center">
              No more people
            </Text>
            <Text variant="body" color="white" align="center" style={styles.noMoreText}>
              You've seen everyone in your area. Check back later for new matches!
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const currentPerson = people[currentIndex.current];

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, getCardStyle()]}
        {...panResponder.panHandlers}
      >
        <UserCard person={currentPerson} />
        
        {/* Swipe Indicators */}
        {position.x._value > 50 && (
          <View style={[styles.swipeIndicator, styles.likeIndicator]}>
            <Icon name="heart" size={48} color="#4CD964" />
          </View>
        )}
        
        {position.x._value < -50 && (
          <View style={[styles.swipeIndicator, styles.dislikeIndicator]}>
            <Icon name="close" size={48} color="#FF3B30" />
          </View>
        )}
      </Animated.View>

      <SwipeButtons
        onLike={swipeRight}
        onDislike={swipeLeft}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    top: '5%',
  },
  noMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  noMoreOverlay: {
    position: 'absolute',
    bottom: 100,
    paddingHorizontal: 40,
  },
  noMoreText: {
    marginTop: 8,
    opacity: 0.9,
  },
  swipeIndicator: {
    position: 'absolute',
    top: 50,
    borderWidth: 4,
    borderRadius: 12,
    padding: 8,
    transform: [{ rotate: '20deg' }],
  },
  likeIndicator: {
    right: 40,
    borderColor: '#4CD964',
    backgroundColor: 'rgba(76, 217, 100, 0.1)',
  },
  dislikeIndicator: {
    left: 40,
    borderColor: '#FF3B30',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
});