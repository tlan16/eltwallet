import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  GradientBackground,
  Header,
  PinIndicator,
  PinKeyboard,
} from '../../components';
import { getSystem } from '../../reducer/';
import { getPinCode } from '../../reducer/system';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  dotsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  dot: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
});

class PinCode extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
    }).isRequired,
    pinCode: PropTypes.string.isRequired,
  };

  state = {
    pinCode: '',
  };

  onAuthSuccess = () => {
    if (this.props.navigation.getParam('onAuthSuccess') instanceof Function)
      this.props.navigation.getParam('onAuthSuccess')();
    else this.props.navigation.navigate('Wallet');
  };

  onBackPress = () => {
    this.setState({
      pinCode: this.state.pinCode.slice(0, -1),
    });
  };

  onKeyPress = n => {
    this.updatePinCode(n);
  };

  updatePinCode = n => {
    this.setState(
      {
        pinCode: `${this.state.pinCode}${n}`,
      },
      () => {
        if (this.state.pinCode.length === 4) {
          if (this.state.pinCode === this.props.pinCode) {
            setTimeout(() => {
              this.onAuthSuccess();
            });
          } else {
            this.setState(
              {
                pinCode: '',
              },
              () => {
                Alert.alert(
                  'PIN Code',
                  'Your PIN code is incorrect. Please try again.',
                );
              },
            );
          }
        }
      },
    );
  };

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header title="Enter Pin" />
          <PinIndicator length={this.state.pinCode.length} />
          <PinKeyboard
            onBackPress={this.onBackPress}
            onKeyPress={this.onKeyPress}
            onAuthSuccess={this.onAuthSuccess}
            showBackButton={this.state.pinCode.length > 0}
          />
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

// const mapStateToProps = state => ({
//   pinCode: state.pinCode,
// });
const mapStateToProps = state => ({
  pinCode: getPinCode(getSystem(state)),
});

export default connect(mapStateToProps)(PinCode);
