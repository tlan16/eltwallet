import React, { Component } from 'react';
import { Animated, Image, Easing, View, StyleSheet } from 'react-native';
import { GradientBackground, Text } from '../../../components/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sending: {
    paddingHorizontal: 15,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 18,
  },
});

class IsSending extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <Text style={styles.sending}>Sending ...</Text>
        </View>
      </GradientBackground>
    );
  }
}
export default IsSending;
