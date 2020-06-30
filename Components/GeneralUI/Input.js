import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const Input = (props) => {
  return (
    <View style={styles.formControl}>
      <Text styles={styles.label}>{props.labelName}</Text>
      <TextInput style={styles.input} {...props}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Input;
