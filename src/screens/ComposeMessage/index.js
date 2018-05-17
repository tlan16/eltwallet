import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {
  GradientBackground,
  Header,
  SecondaryButton,
  Text,
} from '../../components';
import SendIcon from './components/sendIcon';
import WalletUtils from '../../utils/wallet';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { sendMessage } from '../../actions';

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
  formElement: {
    borderBottomColor: '#3a3a3a',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 15,
  },
  bodyElement: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 15,
  },
  formLabel: {
    color: '#9d9d9d',
    paddingLeft: Platform.OS === 'ios' ? 0 : 4,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  formInputRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  formInput: {
    color: '#fff',
    flex: 1,
    flexGrow: 1,
    fontFamily: 'Varela Round',
    fontSize: 25,
  },
});

class ComposeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      messageTitle: '',
      messageBody: '',
    };
  }
  async fetchTransactions() {
    const transactions = await WalletUtils.getTransactions(
      this.props.selectedToken,
    );
    this.setState({ transactions });
  }

  createMessage() {
    const transactions = [...this.state.transactions];
    const recipients = this.getRecipientsFromTransactions(transactions);
    return {
      sender_address: this.props.walletAddress,
      title: this.state.messageTitle,
      body: this.state.messageBody,
      recipients: recipients,
    };
  }

  getRecipientsFromTransactions(transactions) {
    return transactions
      .reduce((acc, transaction) => {
        const from = transaction.from;
        if (acc.indexOf(from) == -1) {
          acc = [...acc, from];
        }
        return acc;
      }, [])
      .map(recipient => {
        return { address: recipient };
      });
  }

  sendNewMessage() {
    const newMessage = this.createMessage();
    this.props.sendMessage(newMessage);
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  render() {
    const ScrollContainer =
      Platform.OS === 'ios' ? KeyboardAwareScrollView : ScrollView;

    const titleInput = (
      <TextInput
        style={styles.formInput}
        onChangeText={title => this.setState({ messageTitle: title })}
      />
    );
    const bodyInput = (
      <TextInput
        style={styles.formInput}
        multiline={true}
        onChangeText={body => this.setState({ messageBody: body })}
      />
    );
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.props.navigation.goBack()}
            title="Compose"
            rightComponent={
              <SendIcon
                onPress={() => {
                  this.sendNewMessage();
                  this.props.navigation.navigate('MessageList');
                }}
              />
            }
          />
          <ScrollContainer
            contentContainerStyle={{
              flex: 1,
            }}
          >
            <View style={styles.formElement}>
              <Text style={styles.formLabel}>Recipient: </Text>
              <View style={styles.formInputRow}>
                <TextInput
                  style={styles.formInput}
                  editable={false}
                  placeholder={'All addresses'}
                  placeholderTextColor={'#9d9d9d'}
                />
              </View>
            </View>
            <View style={styles.formElement}>
              <Text style={styles.formLabel}>Title: </Text>
              <View style={styles.formInputRow}>{titleInput}</View>
            </View>
            <View style={styles.bodyElement}>
              <Text style={styles.formLabel}>Body: </Text>
              <View style={styles.formInputRow}>{bodyInput}</View>
            </View>
          </ScrollContainer>
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  selectedToken: state.selectedToken,
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(sendMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComposeMessage);
