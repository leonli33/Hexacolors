import React from "react";
import { View, StyleSheet, Text } from "react-native";

// Colored box that appears on game won screen
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
