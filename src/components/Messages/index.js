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

const styles = StyleSheet.create({
  listContainer: {
    borderTopWidth: 1,
    borderColor: '#372F49',
    flex: 1,
    marginTop: 40,
  },
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
  },
  rowIcon: {
    height: 15,
    width: 15,
  },
});

export default class Messages extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.string.isRequired,
        at: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        swipeToDelete: PropTypes.bool,
        onDeletePress: PropTypes.func,
      }),
    ).isRequired,
  };

  renderOption = (option, index) => {
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
          <TouchableWithoutFeedback onPress={option.onPress}>
            <View style={styles.rowContainer}>
              <View stype={styles.messageContainer}>
                <Text style={styles.rowText}>{option.from}</Text>
                <Text style={styles.rowText}>{option.at}</Text>
              </View>
              <Image source={arrow} style={styles.rowIcon} />
            </View>
          </TouchableWithoutFeedback>
        </Swipeout>
      );
    }

    return (
      <TouchableOpacity onPress={option.onPress} key={index}>
        <View style={styles.rowContainer}>
          <View stype={styles.messageContainer}>
            <Text style={styles.rowText}>{option.from}</Text>
            <Text style={styles.rowText}>{option.at}</Text>
          </View>
          <Image source={arrow} style={styles.rowIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={styles.listContainer}>
        {this.props.options.map(this.renderOption).sort((optionA, optionB) => {
          const sendAtA = new Date(optionA.at);
          const sendAtB = new Date(optionB.at);
          return sendAtA > sendAtB ? -1 : sendAtA < sendAtB ? 1 : 0;
        })}
      </ScrollView>
    );
  }
}
