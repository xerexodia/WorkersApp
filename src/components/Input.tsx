import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import React, { useState } from 'react';
import { ErrorText, Label, colors, fonts } from '~/utils/generalStyles';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props extends TextInputProps {
  label?: string;
  icon?: JSX.Element;
  onFocus?: () => void;
  error?: string;
  secureTextEntry?: boolean;
}

const Input: React.FC<Props> = ({ secureTextEntry, label, error, icon, onFocus, ...rest }) => {
  const [borderColor, setBorderColor] = useState<string>(colors.grey);
  const [isPassword, setIsPasswor] = useState<boolean>(true);
  return (
    <View style={styles.container}>
      {/* input label */}
      <Label>{label}</Label>
      <View style={[styles.inputContainer, { borderColor: borderColor }]}>
        {/* input left icon */}
        <View style={styles.leftIcon}>{icon ? icon : null}</View>
        {/* input field*/}
        <TextInput
          style={styles.input}
          {...rest}
          onFocus={() => {
            setBorderColor(colors.dark);
            onFocus?.();
          }}
          secureTextEntry={isPassword}
        />
        {/* input right icon */}
        <Pressable style={styles.rightIcon} onPress={() => setIsPasswor(!isPassword)}>
          {secureTextEntry ? (
            <Entypo name={isPassword ? 'eye' : 'eye-with-line'} size={28} color={colors.brand} />
          ) : null}
        </Pressable>
      </View>
      {/* input error */}
      <View style={styles.error}>{error ? <ErrorText>{error}</ErrorText> : null}</View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: { marginHorizontal: 10, position: 'relative' },
  inputContainer: {
    position: 'relative',
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 50,
    overflow: 'hidden',
    borderRadius: 4,
    borderWidth: 1,
  },
  input: {
    fontSize: fonts.m,
    paddingVertical: 13,
  },
  leftIcon: {
    position: 'absolute',
    zIndex: 10,
    left: 17,
    top: 12,
  },
  rightIcon: {
    position: 'absolute',
    zIndex: 10,
    right: 17,
    top: 12,
  },
  error: {
    position: 'absolute',
    bottom: -18,
  },
});
