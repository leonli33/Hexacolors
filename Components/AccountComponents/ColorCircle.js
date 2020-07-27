import React from "react";
import { View, StyleSheet } from "react-native";

// Small circle in that is displayed in the account screens
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
