import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Text } from '../../../components';

const styles = StyleSheet.create({
  formElement: {
    borderBottomColor: '#3a3a3a',
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

const Form = ({ onNicknameChange, onEmailChange }) => {
  const ScrollContainer =
    Platform.OS === 'ios' ? KeyboardAwareScrollView : ScrollView;
  return (
    <ScrollContainer
      contentContainerStyle={{
        flex: Platform.OS === 'ios' ? 1 : null,
        justifyContent: 'center',
      }}
    >
      <View style={styles.formElement}>
        <Text style={styles.formLabel}>Email</Text>
        <View style={styles.formInputRow}>
          <TextInput style={styles.formInput} onChangeText={onEmailChange} />
        </View>
      </View>
      <View style={styles.formElement}>
        <Text style={styles.formLabel}>Nickname</Text>
        <View style={styles.formInputRow}>
          <TextInput style={styles.formInput} onChangeText={onNicknameChange} />
        </View>
      </View>
    </ScrollContainer>
  );
};

export default Form;
