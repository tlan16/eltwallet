import React, { Component } from 'react';
import {
  SafeAreaView,
  Share,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  GradientBackground,
  Header,
  SecondaryButton,
  Text,
} from '../../components';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  rowContainer: {
    borderBottomWidth: 1,
    borderColor: '#372F49',
    paddingVertical: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bodyContainer: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowText: {
    color: '#fff',
    fontSize: 18,
  },
});

class ViewMessage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    privateKey: PropTypes.string.isRequired,
  };

  render() {
    const { selectedMessage } = this.props;
    console.log(selectedMessage);
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.props.navigation.goBack()}
            title={selectedMessage.title}
          />
          <ScrollView>
            <View style={styles.rowContainer}>
              <Text style={styles.rowText}>{`from:${
                selectedMessage.sender_address
              }`}</Text>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.rowText}>{`body: ${
                selectedMessage.body
              }`}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  selectedMessage: state.selectedMessage,
});

export default connect(mapStateToProps)(ViewMessage);
