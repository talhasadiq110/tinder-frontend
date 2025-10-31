import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

interface TextProps extends RNTextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  bold?: boolean;
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'body', 
  bold = false, 
  style, 
  ...props 
}) => {
  const getTextStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      default:
        return styles.body;
    }
  };

  return (
    <RNText
      style={[
        getTextStyle(),
        bold && styles.bold,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
  },
  body: {
    fontSize: 16,
    color: '#333',
  },
  caption: {
    fontSize: 14,
    color: '#666',
  },
  bold: {
    fontWeight: 'bold',
  },
});