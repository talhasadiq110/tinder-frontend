import React, { useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, View } from 'react-native';
import { useSwipeActions } from '../../../hooks/useSwipeActions';
import { Person } from '../../../types';
import { SwipeButtons } from '../../molecules/SwipeButtons/SwipeButtons';
import { UserCard } from '../../molecules/UserCard/UserCard';

interface CardStackProps {
  people: Person[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

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
          // Swipe right - Like
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // Swipe left - Dislike
          swipeLeft();
        } else {
          // Reset position
          resetPosition();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      const person = people[currentIndex.current];
      if (person) {
        likePerson(person.id);
      }
      nextCard();
    });
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
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
      useNativeDriver: false,
    }).start();
  };

  const nextCard = () => {
    currentIndex.current += 1;
    position.setValue({ x: 0, y: 0 });
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp',
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  if (people.length === 0 || currentIndex.current >= people.length) {
    return (
      <View style={styles.container}>
        <View style={styles.noMoreContainer}>
          <UserCard
            person={{
              id: 0,
              name: "No more people",
              age: 0,
              location: "Try again later",
              picture: "https://picsum.photos/300/400?random=999",
              created_at: "",
              updated_at: ""
            }}
            showActions={false}
          />
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
      </Animated.View>

      <SwipeButtons
        onLike={swipeRight}
        onDislike={swipeLeft}
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
    top: '10%',
  },
  noMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});