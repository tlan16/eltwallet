import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import {
  GradientBackground,
  PrimaryButton,
  SecondaryButton,
} from '../../components';
import logo from './images/exce_logo.png';
import { getWallet } from '../../reducer';
import { getWalletAddress } from '../../reducer/wallet';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Config.LANDING_PG_BG_COLOR || 'transparent',
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 0.3,
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: '65%',
  },
  buttonsContainer: {
    paddingHorizontal: 15,
    width: '100%',
  },
  logoTitlesContainer: {
    alignItems: 'center',
    flexGrow: 0.6,
    justifyContent: 'center',
    width: '100%',
  },
  logoTitle: {
    color: '#FFFFFF',
  },
  logoSubtitle: {
    color: '#FFFFFF',
  },
});

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.logoTitlesContainer}>
            <Text style={styles.logoTitle}>Exce</Text>
            <Text style={styles.logoSubtitle}>Innovative Emporium Wallet</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <PrimaryButton
              onPress={() => this.props.navigation.navigate('CreateWallet')}
              text="Create wallet"
            />
            <SecondaryButton
              onPress={() =>
                this.props.navigation.navigate('CreateWallet', {
                  recoverMode: true,
                })
              }
              text="Recover wallet"
            />
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

// const mapStateToProps = state => ({
//   walletAddress: state.walletAddress,
// });
const mapStateToProps = state => ({
  walletAddress: getWalletAddress(getWallet(state)),
});

export default connect(mapStateToProps)(Home);
