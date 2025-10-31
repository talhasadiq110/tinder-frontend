import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export type IconName = 
  | 'heart'
  | 'heart-outline'
  | 'close'
  | 'flash'
  | 'star'
  | 'person'
  | 'refresh'
  | 'home'
  | 'list';

export type IconLibrary = 'ionicons' | 'material' | 'fontawesome';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  library?: IconLibrary;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#000',
  library = 'ionicons',
  style 
}) => {
  const getIconComponent = () => {
    switch (library) {
      case 'material':
        return getMaterialIcon();
      case 'fontawesome':
        return getFontAwesomeIcon();
      default:
        return getIoniconsIcon();
    }
  };

  const getIoniconsIcon = () => {
    const iconProps = { size, color };
    
    switch (name) {
      case 'heart': return <Ionicons name="heart" {...iconProps} />;
      case 'heart-outline': return <Ionicons name="heart-outline" {...iconProps} />;
      case 'close': return <Ionicons name="close" {...iconProps} />;
      case 'flash': return <Ionicons name="flash" {...iconProps} />;
      case 'star': return <Ionicons name="star" {...iconProps} />;
      case 'person': return <Ionicons name="person" {...iconProps} />;
      case 'refresh': return <Ionicons name="refresh" {...iconProps} />;
      case 'home': return <Ionicons name="home" {...iconProps} />;
      case 'list': return <Ionicons name="list" {...iconProps} />;
      default: return <Ionicons name="help" {...iconProps} />;
    }
  };

  const getMaterialIcon = () => {
    const iconProps = { size, color };
    // Add Material icons as needed
    return <Ionicons name="help" {...iconProps} />;
  };

  const getFontAwesomeIcon = () => {
    const iconProps = { size, color };
    // Add FontAwesome icons as needed
    return <Ionicons name="help" {...iconProps} />;
  };

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {getIconComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible', // Ensure icons aren't clipped
  },
});