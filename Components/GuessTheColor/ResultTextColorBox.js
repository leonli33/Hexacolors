import React, { Component } from "react";
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
    height: 25,
    width: 25,
    borderRadius: 15,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: 20
  },
});

export default ResultTextColorBox;
