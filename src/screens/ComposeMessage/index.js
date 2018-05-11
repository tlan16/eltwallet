import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { GradientBackground, Header, SecondaryButton } from '../../components';
import Form from './components/form';
import SendIcon from './components/sendIcon';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
});
class ComposeMessage extends Component {
  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.props.navigation.goBack()}
            title="Compose"
            rightComponent={<SendIcon />}
          />
          <Form />
        </SafeAreaView>
      </GradientBackground>
    );
  }
}
export default ComposeMessage;
