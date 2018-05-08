import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Text from '../Text';
import arrow from './images/arrow.png';
import MessageItem from './messageItem';

const styles = StyleSheet.create({
  listContainer: {
    borderTopWidth: 1,
    borderColor: '#372F49',
    flex: 1,
    marginTop: 40,
  },
});

const Messages = ({ options }) => {
  return (
    <ScrollView style={styles.listContainer}>
      {options
        .map((option, index) => {
          return <MessageItem option={option} index={index} />;
        })
        .sort((optionA, optionB) => {
          const sendAtA = new Date(optionA.at);
          const sendAtB = new Date(optionB.at);
          return sendAtA > sendAtB ? -1 : sendAtA < sendAtB ? 1 : 0;
        })}
    </ScrollView>
  );
};
export default Messages;
