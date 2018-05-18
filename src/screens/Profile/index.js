import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GradientBackground, Header, SecondaryButton } from '../../components';
import Form from './components/Form';

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

class Profile extends Component {
  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.props.navigation.goBack()}
            title="Profile"
          />
          <Form />
        </SafeAreaView>
        <View style={styles.buttonContainer}>
          <SecondaryButton text="Save" />
        </View>
      </GradientBackground>
    );
  }
}
export default Profile;
