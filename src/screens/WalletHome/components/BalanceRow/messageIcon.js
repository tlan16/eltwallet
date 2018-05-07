import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import messageImg from './images/message.png';

class MessageIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BadgeCount: 1,
    };
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconBadge
          MainElement={
            <Image
              source={messageImg}
              style={{
                width: 37,
                height: 24,
                marginRight: 20,
              }}
            />
          }
          BadgeElement={
            <Text style={{ color: '#FFFFFF' }}>{this.state.BadgeCount}</Text>
          }
          IconBadgeStyle={{
            width: 17,
            height: 17,
            backgroundColor: '#FF00EE',
          }}
          Hidden={this.state.BadgeCount == 0}
        />
      </View>
    );
  }
}

export default MessageIcon;
