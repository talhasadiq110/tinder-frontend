import * as Haptics from 'expo-haptics';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../atoms/Icon/Icon';

interface SwipeButtonsProps {
  onLike: () => void;
  onDislike: () => void;
  onSuperLike?: () => void;
  disabled?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const SwipeButtons: React.FC<SwipeButtonsProps> = ({
  onLike,
  onDislike,
  onSuperLike,
  disabled = false,
}) => {
  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onLike();
  };

  const handleDislike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onDislike();
  };

  const handleSuperLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSuperLike?.();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.dislikeButton, disabled && styles.disabled]}
        onPress={handleDislike}
        disabled={disabled}
      >
        <View style={styles.buttonInner}>
          <Icon name="close" size={28} color="#FF3B30" />
        </View>
      </TouchableOpacity>

      {onSuperLike && (
        <TouchableOpacity 
          style={[styles.button, styles.superLikeButton, disabled && styles.disabled]}
          onPress={handleSuperLike}
          disabled={disabled}
        >
          <View style={styles.buttonInner}>
            <Icon name="star" size={22} color="#007AFF" />
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={[styles.button, styles.likeButton, disabled && styles.disabled]}
        onPress={handleLike}
        disabled={disabled}
      >
        <View style={styles.buttonInner}>
          <Icon name="heart" size={28} color="#4CD964" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Use space-between for better distribution
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: Math.max(40, SCREEN_WIDTH * 0.1), // Responsive padding
    width: '100%', // Take full width
    backgroundColor: 'transparent',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dislikeButton: {
    borderWidth: 2,
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  likeButton: {
    borderWidth: 2,
    borderColor: 'rgba(76, 217, 100, 0.2)',
  },
  superLikeButton: {
    borderWidth: 2,
    borderColor: 'rgba(0, 122, 255, 0.2)',
  },
  disabled: {
    opacity: 0.5,
  },
});