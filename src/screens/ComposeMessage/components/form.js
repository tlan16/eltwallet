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
import { Text } from '../../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const styles = StyleSheet.create({
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

const Form = ({}) => {
  const ScrollContainer =
    Platform.OS === 'ios' ? KeyboardAwareScrollView : ScrollView;

  return (
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
        <View style={styles.formInputRow}>
          <TextInput style={styles.formInput} />
        </View>
      </View>
      <View style={styles.bodyElement}>
        <Text style={styles.formLabel}>Body: </Text>
        <View style={styles.formInputRow}>
          <TextInput style={styles.formInput} multiline={true} />
        </View>
      </View>
    </ScrollContainer>
  );
};
export default Form;
