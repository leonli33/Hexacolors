import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ColorCircle = (props) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: props.color,
        borderWidth: props.color === "" ? 0 : 1,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginBottom: 4,
    marginRight: 10,
  },
});

export default ColorCircle;
