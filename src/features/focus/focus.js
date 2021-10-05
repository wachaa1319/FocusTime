import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import AwesomeButton from 'react-native-really-awesome-button';

import { fontSizes, paddingSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';

// You can import from local files

export const Focus = ({ addSubject }) => {
  const [focusSubject, setFocusSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Focus on whaa? </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onSubmitEditing={({ nativeEvent }) => {
              setFocusSubject(nativeEvent.text);
            }}
          />
          <AwesomeButton
            onPress={() => addSubject(focusSubject)}
            backgroundColor={colors.primary}
            textColor={colors.secondary}>
            lesgo!
          </AwesomeButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 0.5,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  input: {
    flex: 1,
    marginRight: paddingSizes.md,
  },
  inputContainer: {
    flexDirection: 'row',
  },
});
