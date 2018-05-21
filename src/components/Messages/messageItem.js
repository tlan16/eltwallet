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
import read from './images/read.png';
import transparent from './images/transparent.png';

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rowContainer: {
    borderBottomWidth: 1,
    borderColor: '#372F49',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    color: '#fff',
    fontSize: 18,
    flex: 3,
  },
  rowIcon: {
    height: 15,
    width: 15,
  },
});

const MessageItem = ({ option, index }) => {
  const isRead = option.readAt ? transparent : read;
  if (option.swipeToDelete) {
    const swipeoutButtons = [
      {
        onPress: option.onDeletePress,
        text: 'Delete',
        type: 'delete',
      },
    ];
    return (
      <Swipeout
        backgroundColor="transparent"
        right={swipeoutButtons}
        key={index}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            option.onPress(option.id);
          }}
        >
          <View style={styles.rowContainer}>
            <Image source={isRead} style={styles.rowIcon} />
            <View stype={styles.messageContainer}>
              <Text style={styles.rowText}>{option.from}</Text>
              <Text style={styles.rowText}>{option.created_at}</Text>
            </View>
            <Image source={arrow} style={styles.rowIcon} />
          </View>
        </TouchableWithoutFeedback>
      </Swipeout>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        option.onPress(option.id);
      }}
      key={index}
    >
      <View style={styles.rowContainer}>
        <Image source={isRead} style={styles.rowIcon} />
        <View stype={styles.messageContainer}>
          <Text style={styles.rowText}>{option.from}</Text>
          <Text style={styles.rowText}>{option.title}</Text>
          <Text style={styles.rowText}>{option.created_at}</Text>
        </View>
        <Image source={arrow} style={styles.rowIcon} />
      </View>
    </TouchableOpacity>
  );
};
export default MessageItem;
