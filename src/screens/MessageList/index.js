import React, { Component } from 'react';
import { Alert, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { GradientBackground, Header, Messages, Text } from '../../components';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { SELECT_MESSAGE } from '../../config/actionTypes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  messageContainer: {
    alignItems: 'center',
  },
  // messageBrief: {
  //   color: '#fff',
  //   fontSize: 16,
  // },
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
    console.log(message);
    console.log('###############');
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
          />
          <Messages options={options} />
          {/* <View style={styles.messageContainer}>
              <Text style={styles.messageBrief}>
                
              </Text>
            </View> */}
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
