import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { GradientBackground, Header, SecondaryButton } from '../../components';
import Form from './components/Form';
import validator from 'validator';
import { setProfile, fetchProfile } from '../../actions';
import { getWallet, getProfile } from '../../reducer';
import { getWalletAddress } from '../../reducer/wallet';
import { getEmail, getNickname } from '../../reducer/profile';

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
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
    };
  }
  componentDidMount() {
    const mode = this.props.navigation.getParam('mode');
    if (mode !== 'createWallet') {
      this.props.fetchProfile(this.props.walletAddress);
    }
  }

  render() {
    const mode = this.props.navigation.getParam('mode');
    const header =
      mode == 'createWallet' ? (
        <Header title="Profile" />
      ) : mode == 'recoverWallet' ? (
        <Header
          onBackPress={() => this.props.navigation.navigate('Wallet')}
          title="Profile"
        />
      ) : (
        <Header
          onBackPress={() => this.props.navigation.goBack()}
          title="Profile"
        />
      );
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          {/* <Header
            onBackPress={() => this.props.navigation.goBack()}
            title="Profile"
          /> */}
          {header}
          <Form
            onEmailChange={email => this.setState({ email })}
            onNicknameChange={nickname => this.setState({ nickname })}
            email={this.props.email}
            nickname={this.props.nickname}
          />
        </SafeAreaView>
        <View style={styles.buttonContainer}>
          <SecondaryButton
            text="Save"
            onPress={() => {
              this.props.setProfile(
                this.state.email,
                this.state.nickname,
                this.props.walletAddress,
              );
              this.props.navigation.navigate('WalletHome');
            }}
            disabled={
              this.state.email.trim() == '' ||
              this.state.nickname.trim() == '' ||
              !validator.isEmail(this.state.email)
            }
          />
        </View>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: getWalletAddress(getWallet(state)),
  email: getEmail(getProfile(state)),
  nickname: getNickname(getProfile(state)),
});

const mapDispatchToProps = dispatch => ({
  setProfile: (email, nickname, walletAddress) => {
    dispatch(setProfile(email, nickname, walletAddress));
  },
  fetchProfile: walletAddress => {
    dispatch(fetchProfile(walletAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
