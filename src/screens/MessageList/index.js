import React, { Component } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { GradientBackground, Messages, Text, Header } from '../../components';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { SELECT_MESSAGE } from '../../config/actionTypes';
import ComposeIcon from './components/composeIcon';
import IsSending from './components/isSending';
import { fetchMessages } from '../../actions';
import moment from 'moment';
import { getMessage, getWallet } from '../../reducer';
import { getMessages, getIsSendingMessage } from '../../reducer/message';
import { getWalletAddress } from '../../reducer/wallet';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  headerContainer: {
    borderBottomColor: 'transparent',
    flexDirection: 'row',
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 27,
  },
  messageContainer: {
    alignItems: 'center',
  },
});
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messageOnPress = this.messageOnPress.bind(this);
    this.timerId = null;
  }
  componentDidMount() {
    this.fetchMessages();
    this.timerId = setInterval(this.fetchMessages, 5000);
  }
  messageOnPress(id) {
    const { messages, selectMessage } = this.props;
    const message = messages.filter(mesg => {
      return mesg.uuid == id;
    })[0];
    selectMessage(message);
    this.leaveMessageListPage('ViewMessage');
  }
  deleteMessage() {
    console.log('delete message');
  }
  fetchMessages = () => {
    const walletAddress = this.props.walletAddress;
    const fetchMessagesStart = this.props.fetchMessagesStart;
    fetchMessagesStart(walletAddress);
  };

  leaveMessageListPage = (page, callbackObj) => {
    if (this.timerId) clearInterval(this.timerId);
    this.props.navigation.navigate(page, callbackObj);
  };

  render() {
    const { messages } = this.props;
    const options = messages.map(message => {
      //bad spelling from back-end
      const showFrom = message.senser_nickname
        ? message.senser_nickname
        : 'Anonymous';
      const show_created_at = `${moment(message.created_at).format(
        'hh:mm:ss a',
      )}`;
      return {
        id: message.uuid,
        from: showFrom,
        created_at: show_created_at,
        onPress: this.messageOnPress,
        swipeToDelete: false,
        onDeletePress: this.deleteMessage,
        content: message.body,
        readAt: message.read_at,
        title: message.title,
      };
    });
    if (this.props.isSendingMessage) return <IsSending />;
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.leaveMessageListPage('WalletHome')}
            title="Messages"
            rightComponent={
              <ComposeIcon
                onPress={() => this.leaveMessageListPage('ComposeMessage')}
              />
            }
          />
          <Messages options={options} />
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

// const mapStateToProps = state => ({
//   messages: state.messages,
//   isSendingMessage: state.isSendingMessage,
//   walletAddress: state.walletAddress,
// });
const mapStateToProps = state => ({
  messages: getMessages(getMessage(state)),
  isSendingMessage: getIsSendingMessage(getMessage(state)),
  walletAddress: getWalletAddress(getWallet(state)),
});

const mapDispatchToProps = dispatch => ({
  fetchMessagesStart: walletAddress => dispatch(fetchMessages(walletAddress)),
  selectMessage: selectedMessage =>
    dispatch({ type: SELECT_MESSAGE, selectedMessage }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
