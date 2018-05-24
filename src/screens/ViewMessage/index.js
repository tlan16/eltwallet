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
import { getSelectedMessage } from '../../reducer/message';
import { getMessage } from '../../reducer';

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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  bodyContainer: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: '#444650',
    fontSize: 18,
  },
  rowText: {
    color: '#e8cf75',
    fontSize: 18,
  },
});

class ViewMessage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { selectedMessage } = this.props;
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.props.navigation.goBack()}
            title={selectedMessage.title}
          />
          <ScrollView>
            <View style={styles.rowContainer}>
              <View>
                <Text style={styles.rowLabel}>{'from:'}</Text>
              </View>
              <View>
                <Text style={styles.rowText}>
                  {selectedMessage.sender_address}
                </Text>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View>
                <Text style={styles.rowLabel}>{'body:'}</Text>
              </View>
              <View>
                <Text style={styles.rowText}>{selectedMessage.body}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

// const mapStateToProps = state => ({
//   selectedMessage: state.selectedMessage,
// });
const mapStateToProps = state => ({
  selectedMessage: getSelectedMessage(getMessage(state)),
});

export default connect(mapStateToProps)(ViewMessage);
