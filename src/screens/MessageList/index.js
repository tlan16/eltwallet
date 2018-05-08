import React, { Component } from 'react';
import { Alert, Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { GradientBackground, Header, Messages, Text } from '../../components';

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
  messageBrief: {
    color: '#fff',
    fontSize: 16,
  },
});
class MessageList extends Component {
  messageOnPress() {
    console.log('message on press');
  }
  deleteMessage() {
    console.log('delete message');
  }
  render() {
    const messages = [
      {
        uuid: '75652f4d-d07d-4e61-b862-36e6597dc723',
        sender_address: '0x12345               ',
        title: 'titles',
        body: 'here is some body content',
        updatedAt: '2018-05-07T06:25:36.629Z',
        createdAt: '2018-05-07T06:25:36.629Z',
        recipients: [
          {
            address: '0x22222',
          },
          {
            address: '0x33333',
          },
        ],
      },
    ];
    const options = messages.map(message => {
      return {
        from: message.sender_address,
        at: message.updatedAt,
        onPress: this.messageOnPress,
        swipeToDelete: false,
        onDeletePress: this.deleteMessage,
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
          <View style={styles.messageContainer}>
            <Text style={styles.messageBrief} />
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

export default MessageList;
