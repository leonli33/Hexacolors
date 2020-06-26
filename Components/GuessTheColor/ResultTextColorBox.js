import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

const ResultTextColorBox = (props) => {
  return <View style={{ ...styles.box, backgroundColor: props.color }} />;
};

const styles = StyleSheet.create({
  box: {
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 1,
  },
});

export default ResultTextColorBox;
