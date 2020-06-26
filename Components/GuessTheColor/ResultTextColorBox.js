import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const ResultTextColorBox = (props) => {
  return (
    <View
      style={{
        ...styles.box,
        backgroundColor: props.color,
      }}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    height: 25,
    width: 25,
    borderRadius: 15,
    alignSelf: "center",
    marginLeft: "85%",
    marginTop: Dimensions.get("window").height < 700 ? 22 : 30,
  },
});

export default ResultTextColorBox;
