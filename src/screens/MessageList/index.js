import React, { Component } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
//import { Header } from 'react-native-elements';
import { GradientBackground, Messages, Text, Header } from '../../components';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { SELECT_MESSAGE } from '../../config/actionTypes';
import ComposeIcon from './components/composeIcon';
//import  BackIcon from './components/backIcon'

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
  }
  messageOnPress(id) {
    const { messages, selectMessage } = this.props;
    const message = messages.filter(mesg => {
      return mesg.uuid == id;
    })[0];
    selectMessage(message);
    this.props.navigation.navigate('ViewMessage');
  }
  deleteMessage() {
    console.log('delete message');
  }
  render() {
    const { messages } = this.props;
    const options = messages.map(message => {
      return {
        id: message.uuid,
        from: message.sender_address,
        at: message.updatedAt,
        onPress: this.messageOnPress,
        swipeToDelete: false,
        onDeletePress: this.deleteMessage,
        content: message.body,
      };
    });
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            onBackPress={() => this.props.navigation.goBack()}
            title="Messages"
            rightComponent={
              <ComposeIcon
                onPress={() => this.props.navigation.navigate('ComposeMessage')}
              />
            }
          />
          <Messages options={options} />
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
  selectMessage: selectedMessage =>
    dispatch({ type: SELECT_MESSAGE, selectedMessage }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
