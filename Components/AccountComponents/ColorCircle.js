import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ColorCircle = (props) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: props.color,
        borderWidth: 1,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 4
  },
});

export default ColorCircle;
