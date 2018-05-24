import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#616773',
    borderRadius: 8,
    paddingVertical: 20,
    borderColor: '#e8cf75',
    borderWidth: 3,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#e8cf75',
    fontSize: 18,
  },
});

export default class SecondaryButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    disabled: false,
    isLoading: false,
  };

  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.8}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={{
          opacity: this.props.disabled ? 0.5 : 1,
        }}
      >
        <View style={styles.container}>
          {this.props.isLoading ? (
            <ActivityIndicator color="#4D00FF" />
          ) : (
            <Text style={styles.text}>{this.props.text}</Text>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}
