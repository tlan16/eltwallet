import React, { Component } from 'react';
import { AppState, Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GradientBackground, Text } from '../../components';
import {
  BalanceRow,
  CallToAction,
  Footer,
  TransactionsList,
} from './components';
import { SET_CALL_TO_ACTION_DISMISSED } from '../../config/actionTypes';
import WalletUtils from '../../utils/wallet';
import { fetchMessages, fetchUnreadMessageCount } from '../../actions';
import { getSelectedToken, getWalletAddress } from '../../reducer/wallet';
import { getWallet, getSystem, getProfile, getError } from '../../reducer';
import { isSavingProfile } from '../../reducer/profile';
import { getCallToActionDismissed } from '../../reducer/system';
import { getErrorMessage } from '../../reducer/error';
import IsSaving from './isSaving';
import { getIsSavingProfile } from '../../reducer/profile';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  topContainer: {
    flex: 1,
  },
  coinName: {
    color: '#e8cf75',
    fontSize: 18,
    letterSpacing: 3,
    paddingVertical: 5,
    textAlign: 'center',
  },
  bannerContainer: {
    backgroundColor: '#444650',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  bannerText: {
    color: '#9D9D9D',
  },
  listContainer: {
    flex: 1,
  },
});

class WalletHome extends Component {
  static propTypes = {
    callToActionDismissed: PropTypes.bool.isRequired,
    dismissCallToAction: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    selectedToken: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    walletAddress: PropTypes.string,
  };

  static defaultProps = {
    walletAddress: '',
  };

  state = {
    currentBalance: 0,
    appState: AppState.currentState,
    refreshingTransactions: false,
    transactions: [],
  };

  timerId = null;
  componentDidMount() {
    this.addEventListeners();
    this.onRefresh();
    this.loadTokensList();
    // this.fetchMessages();
    this.fetchUnreadMessageCount();
    if (!this.timerId)
      this.timerId = setInterval(this.fetchUnreadMessageCount, 5000);
  }
  leaveHomePage(page, callbackObject) {
    this.props.navigation.navigate(page, callbackObject);
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.walletAddress &&
      this.props.selectedToken !== newProps.selectedToken
    ) {
      this.setState(
        {
          currentBalance: 0,
          transactions: [],
        },
        () => {
          this.onRefresh();
        },
      );
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
    clearInterval(this.timerId);
  }

  onCallToActionPress = () => {
    //  this.props.navigation.navigate('Settings');
    //   this.props.navigation.navigate('PrivateKey');
  };

  onCallToActionDismiss = () => {
    Alert.alert(
      'Backup your wallet',
      "Make sure you've backed up your wallet private key. It can't be recovered if you lose it.",
      [
        { text: 'Ask me later' },
        {
          text: 'OK',
          onPress: async () => {
            this.props.dismissCallToAction();
          },
        },
      ],
    );
  };

  onRefresh = () => {
    this.fetchBalance();
    this.fetchTransactions();
  };

  fetchMessages = () => {
    const walletAddress = this.props.walletAddress;
    const fetchMessagesStart = this.props.fetchMessagesStart;
    fetchMessagesStart(walletAddress);
  };

  fetchUnreadMessageCount = () => {
    const walletAddress = this.props.walletAddress;
    const fetchUnreadMessageCountStart = this.props
      .fetchUnreadMessageCountStart;
    fetchUnreadMessageCountStart(walletAddress);
  };

  handleAppStateChange = nextAppState => {
    const currentState = this.state.appState;

    this.setState({ appState: nextAppState });

    if (currentState === 'background' && nextAppState === 'active') {
      this.props.navigation.navigate('PinCode');
      //this.leaveHomePage('PinCode');
    }
  };

  addEventListeners = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  };

  removeEventListeners = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };

  fetchBalance = async () => {
    const currentBalance = await WalletUtils.getBalance(
      this.props.selectedToken,
    );

    this.setState({
      currentBalance,
    });
  };

  fetchTransactions = async () => {
    this.setState({
      refreshingTransactions: true,
    });

    const transactions = await WalletUtils.getTransactions(
      this.props.selectedToken,
    );

    this.setState({
      refreshingTransactions: false,
      transactions,
    });
  };

  loadTokensList = () => {
    WalletUtils.loadTokensList();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errorMessage != this.props.errorMessage) {
      Alert.alert('Something is wrong!', this.props.errorMessage);
    }
  }

  render() {
    if (this.props.isSavingProfile) return <IsSaving />;
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.coinName} letterSpacing={2}>
              {this.props.selectedToken.name}
            </Text>
            <BalanceRow
              currentBalance={this.state.currentBalance}
              onTokenChangeIconPress={
                () => this.props.navigation.navigate('TokenPicker')
                // this.leaveHomePage('TokenPicker')
              }
              onSettingsIconPress={
                () => this.props.navigation.navigate('Settings')
                // this.leaveHomePage('Settings')
              }
              onMessageIconPress={() => {
                //return this.props.navigation.navigate('MessageList');
                this.fetchMessages();
                return this.leaveHomePage('MessageList');
              }}
            />
            {!this.props.callToActionDismissed && (
              <CallToAction
                onDismiss={this.onCallToActionDismiss}
                onPress={this.onCallToActionPress}
              />
            )}
            <View style={styles.bannerContainer}>
              <Text style={styles.bannerText}>
                Showing recent {this.props.selectedToken.name} transactions
              </Text>
            </View>
            <View style={styles.listContainer}>
              {!!this.props.walletAddress && (
                <TransactionsList
                  selectedToken={this.props.selectedToken}
                  transactions={this.state.transactions}
                  walletAddress={this.props.walletAddress}
                  onRefresh={this.onRefresh}
                  refreshing={this.state.refreshingTransactions}
                />
              )}
            </View>
          </View>
          <Footer
            onReceivePress={() => this.props.navigation.navigate('Receive')}
            onSendPress={
              () =>
                this.props.navigation.navigate('Send', {
                  onTokenChange: this.onTokenChange,
                })
              // this.leaveHomePage('Send', {
              //   onTokenChange: this.onTokenChange,
              // })
            }
          />
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

// const mapStateToProps = state => ({
//   callToActionDismissed: state.callToActionDismissed,
//   selectedToken: state.selectedToken,
//   walletAddress: state.walletAddress,
// });

const mapStateToProps = state => ({
  callToActionDismissed: getCallToActionDismissed(getSystem(state)),
  selectedToken: getSelectedToken(getWallet(state)),
  walletAddress: getWalletAddress(getWallet(state)),
  isSavingProfile: getIsSavingProfile(getProfile(state)),
  errorMessage: getErrorMessage(getError(state)),
});

const mapDispatchToProps = dispatch => ({
  dismissCallToAction: () => dispatch({ type: SET_CALL_TO_ACTION_DISMISSED }),
  fetchMessagesStart: walletAddress => dispatch(fetchMessages(walletAddress)),
  fetchUnreadMessageCountStart: walletAddress =>
    dispatch(fetchUnreadMessageCount(walletAddress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHome);
