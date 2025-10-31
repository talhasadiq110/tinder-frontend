import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../atoms/Icon/Icon';

interface SwipeButtonsProps {
  onLike: () => void;
  onDislike: () => void;
  onSuperLike?: () => void;
}

export const SwipeButtons: React.FC<SwipeButtonsProps> = ({
  onLike,
  onDislike,
  onSuperLike,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.dislikeButton]} onPress={onDislike}>
        <Icon name="✕" size={32} color="#FF5864" />
      </TouchableOpacity>

      {onSuperLike && (
        <TouchableOpacity style={[styles.button, styles.superLikeButton]} onPress={onSuperLike}>
          <Icon name="★" size={24} color="#3498DB" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={onLike}>
        <Icon name="❤" size={32} color="#4CD964" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dislikeButton: {
    borderWidth: 2,
    borderColor: '#FF5864',
  },
  likeButton: {
    borderWidth: 2,
    borderColor: '#4CD964',
  },
  superLikeButton: {
    borderWidth: 2,
    borderColor: '#3498DB',
  },
});