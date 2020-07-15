import React, { useDebugValue } from "react";
import { View, StyleSheet, Text } from "react-native";

const GameWonColorBox = (props) => {
  const styles = StyleSheet.create({
    box: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: props.color.trim(),
      width: 40,
      height: 40,
      borderRadius: 5
    },
  });

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.box} />
    </View>
  );
};

export default GameWonColorBox;
