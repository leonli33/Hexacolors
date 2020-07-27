import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const ResultTextColorBox = (props) => {
  return (
    <View
      style={{
        ...styles.box,
        backgroundColor: props.color ? props.color : "white",
      }}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    height: Dimensions.get("window").height > 1000 ? 40 : 25,
    width: Dimensions.get("window").height > 1000 ? 40 : 25,
    borderRadius: Dimensions.get("window").height > 1000 ? 25 : 15,
    position: "absolute",
    alignSelf: "flex-end",
    marginRight: 20,
  },
});

export default ResultTextColorBox;
