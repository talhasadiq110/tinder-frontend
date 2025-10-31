import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'error';
  align?: 'left' | 'center' | 'right';
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  align = 'left',
  style,
  ...props 
}) => {
  const getTextStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      default:
        return styles.body;
    }
  };

  const getWeightStyle = () => {
    switch (weight) {
      case 'medium':
        return styles.medium;
      case 'semibold':
        return styles.semibold;
      case 'bold':
        return styles.bold;
      default:
        return styles.regular;
    }
  };

  const getColorStyle = () => {
    switch (color) {
      case 'secondary':
        return styles.secondary;
      case 'white':
        return styles.white;
      case 'gray':
        return styles.gray;
      case 'error':
        return styles.error;
      default:
        return styles.primary;
    }
  };

  const getAlignStyle = () => {
    switch (align) {
      case 'center':
        return styles.center;
      case 'right':
        return styles.right;
      default:
        return styles.left;
    }
  };

  return (
    <RNText
      style={[
        styles.base,
        getTextStyle(),
        getWeightStyle(),
        getColorStyle(),
        getAlignStyle(),
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  // Variants
  h1: {
    fontSize: 32,
    lineHeight: 38,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
  },
  // Weights
  regular: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
  // Colors
  primary: {
    color: '#1A1A1A',
  },
  secondary: {
    color: '#666666',
  },
  white: {
    color: '#FFFFFF',
  },
  gray: {
    color: '#999999',
  },
  error: {
    color: '#FF3B30',
  },
  // Alignment
  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});