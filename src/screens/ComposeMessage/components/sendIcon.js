import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../components';
import send from '../images/send.png';

const styles = StyleSheet.create({
  send: {
    height: 31,
    marginVertical: 4,
    width: 32,
  },
});
const SendIcon = ({ onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Image source={send} style={styles.send} />
      </TouchableOpacity>
    </View>
  );
};

export default SendIcon;
