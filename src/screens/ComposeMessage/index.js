import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { GradientBackground, Header, SecondaryButton } from '../../components';
import Form from './components/form';
import SendIcon from './components/sendIcon';
import WalletUtils from '../../utils/wallet';
import { connect } from 'react-redux';

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
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }
  async fetchTransactions() {
    const transactions = await WalletUtils.getTransactions(
      this.props.selectedToken,
    );
    console.log(transactions);
    console.log(transactions);
    this.setState({ transactions });
  }
  componentDidMount() {
    this.fetchTransactions();
  }
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

const mapStateToProps = state => ({
  selectedToken: state.selectedToken,
});

export default connect(mapStateToProps)(ComposeMessage);
