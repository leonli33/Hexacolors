import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { isTablet } from "../../Functions/GeneralFunctions";

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
    height: isTablet(Dimensions.get("window").height) ? 40 : 25,
    width: isTablet(Dimensions.get("window").height) ? 40 : 25,
    borderRadius: isTablet(Dimensions.get("window").height) ? 25 : 15,
    position: "absolute",
    alignSelf: "flex-end",
    marginRight: 20,
  },
});

export default ResultTextColorBox;
