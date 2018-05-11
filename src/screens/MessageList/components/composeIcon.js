import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../components';
import compose from '../images/compose.png';

const styles = StyleSheet.create({
  compose: {
    height: 22,
    marginVertical: 4,
    width: 32,
  },
});
const ComposeIcon = ({ onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Image source={compose} style={styles.compose} />
      </TouchableOpacity>
    </View>
  );
};

export default ComposeIcon;
