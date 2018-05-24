import React, { Component } from 'react';
import { SafeAreaView, Share, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';
import {
  GradientBackground,
  Header,
  SecondaryButton,
  Text,
} from '../../components';
import { getWallet } from '../../reducer';
import { getWalletAddress } from '../../reducer/wallet';
import ShareButton from './ShareButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  qrcodeContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 5,
    width: 160,
  },
  addressTitle: {
    paddingHorizontal: 15,
    color: '#e8cf75',
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 18,
  },
  walletAddress: {
    paddingHorizontal: 15,
    color: '#e8cf75',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
});

class WalletReceive extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    walletAddress: PropTypes.string.isRequired,
  };

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.props.navigation.goBack()}
            title="Receive"
          />
          <View style={styles.qrcodeContainer}>
            <QRCode
              color="#090909"
              value={this.props.walletAddress}
              size={150}
            />
          </View>
          <View>
            <Text style={styles.addressTitle}>Address</Text>
            <Text style={styles.walletAddress}>{this.props.walletAddress}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {/* <SecondaryButton
              onPress={() => {
                Share.share({
                  message: this.props.walletAddress,
                  title: 'My Eltwallet address',
                });
              }}
              text="Share"
            /> */}
            <ShareButton
              onPress={() => {
                Share.share({
                  message: this.props.walletAddress,
                  title: 'My Eltwallet address',
                });
              }}
              text="Share"
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

export default connect(mapStateToProps)(WalletReceive);
