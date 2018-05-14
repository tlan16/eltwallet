import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import messageImg from './images/message.png';
import { connect } from 'react-redux';

class MessageIcon extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     BadgeCount: 1,
  //   };
  // }
  render() {
    const badgeCount = this.props.messages.length;
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
          BadgeElement={<Text style={{ color: '#FFFFFF' }}>{badgeCount}</Text>}
          IconBadgeStyle={{
            width: 17,
            height: 17,
            backgroundColor: '#FF00EE',
          }}
          Hidden={badgeCount == 0}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(MessageIcon);
