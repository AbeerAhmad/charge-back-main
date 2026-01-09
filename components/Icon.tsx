import { Colors } from '@/constants';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';

export type IconFamily = 'MaterialIcons' | 'MaterialCommunityIcons';

export interface IconProps {
  name: string;
  family?: IconFamily;
  size?: number;
  color?: string;
  style?: any;
}

/**
 * Reusable Icon component that supports MaterialIcons and MaterialCommunityIcons
 * Only imports the icon families that are actually used to reduce bundle size
 */
const Icon: React.FC<IconProps> = ({ 
  name, 
  family = 'MaterialIcons', 
  size = 24, 
  color = Colors.text,
  style 
}) => {
  switch (family) {
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name as any} size={size} color={color} style={style} />;
    case 'MaterialIcons':
    default:
      return <MaterialIcons name={name as any} size={size} color={color} style={style} />;
  }
};

export default Icon;

