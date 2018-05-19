import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import messageImg from './images/message.png';
import { connect } from 'react-redux';
import { getMessage } from '../../../../reducer';
import { getUnreadMessageCount } from '../../../../reducer/message';

class MessageIcon extends Component {
  render() {
    // const badgeCount = this.props.messages.length;
    const badgeCount = this.props.unreadMessageCount;
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

// const mapStateToProps = state => ({
//   unreadMessageCount: state.unreadMessageCount,
// });

const mapStateToProps = state => ({
  unreadMessageCount: getUnreadMessageCount(getMessage(state)),
});

export default connect(mapStateToProps)(MessageIcon);
