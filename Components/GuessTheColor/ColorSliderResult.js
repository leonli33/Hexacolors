import React from "react";
import { View, StyleSheet } from "react-native";

const ColorSliderResult = (props) => {
  return (
    <View
      style={{
        ...styles.colorView,
        backgroundColor: props.color,
        borderWidth: props.borderCol === "black" ? 1 : 2.5,
        borderColor: props.borderCol,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  colorView: {
    width: "80%",
    height: "100%",
    borderWidth: 1,
    margin: "5%",
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default ColorSliderResult;
