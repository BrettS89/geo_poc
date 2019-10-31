import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Target from 'react-native-vector-icons/MaterialCommunityIcons';

export default function indicator(props) {
  return (
    <View style={styles.indicatorContainer}>
      <Target name="target" size={props.crossHairSize} color={props.crossColor} />
    </View>
  );
}
