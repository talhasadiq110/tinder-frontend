import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';
import { Icon, IconName } from '../Icon/Icon';
import { Text } from '../Text/Text';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large' | 'xlarge'; // Added xlarge
  loading?: boolean;
  title?: string;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  title,
  icon,
  iconPosition = 'left',
  style,
  disabled,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      default:
        return styles.primary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      case 'xlarge': // New xlarge size
        return styles.xlarge;
      default:
        return styles.medium;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 20;
      case 'xlarge': // Larger icon for xlarge
        return 28;
      default:
        return 16;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return 'primary';
      default:
        return 'white';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return '#1A1A1A';
      default:
        return '#FFFFFF';
    }
  };

  const hasIconOnly = !title && icon;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        hasIconOnly && styles.iconOnly,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getIconColor()} size="small" />
      ) : (
        <View style={[
          styles.content,
          hasIconOnly && styles.iconOnlyContent
        ]}>
          {icon && iconPosition === 'left' && (
            <Icon 
              name={icon} 
              size={getIconSize()} 
              color={getIconColor()} 
              style={title ? styles.leftIcon : undefined}
            />
          )}
          {title && (
            <Text 
              variant="button" 
              weight="semibold" 
              color={getTextColor()}
              style={styles.text}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
          {icon && iconPosition === 'right' && (
            <Icon 
              name={icon} 
              size={getIconSize()} 
              color={getIconColor()} 
              style={title ? styles.rightIcon : undefined}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: 44,
  },
  primary: {
    backgroundColor: '#FF5864',
  },
  secondary: {
    backgroundColor: '#4CD964',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 48,
  },
  xlarge: { // New xlarge style
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 60,
    borderRadius: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
  },
  iconOnly: {
    paddingHorizontal: 8,
  },
  iconOnlyContent: {
    width: 24,
    height: 24,
  },
  text: {
    marginHorizontal: 4,
    flexShrink: 1,
  },
  leftIcon: {
    marginRight: 6,
  },
  rightIcon: {
    marginLeft: 6,
  },
});