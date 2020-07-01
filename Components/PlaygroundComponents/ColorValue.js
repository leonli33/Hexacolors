import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ColorValue = (props) => {
  return (
    <View style={{...styles.container, borderColor: props.borderColor}}>
      <Text>{props.currentValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: 'ivory'
  },
});

export default ColorValue;
