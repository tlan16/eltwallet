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
    borderColor: '#e8cf75',
    flex: 1,
    marginTop: 40,
  },
});

const Messages = ({ options }) => {
  return (
    <ScrollView style={styles.listContainer}>
      {options.map((option, index) => {
        return <MessageItem key={index} option={option} index={index} />;
      })}
    </ScrollView>
  );
};
export default Messages;
