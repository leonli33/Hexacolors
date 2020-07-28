import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { isTablet } from "../../Functions/GeneralFunctions";

// Colored box that appears on game won screen
const GameWonColorBox = (props) => {
  const styles = StyleSheet.create({
    box: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: props.color.trim(),
      width: isTablet(Dimensions.get("window").height) ? 50 : 40,
      height: isTablet(Dimensions.get("window").height) ? 50 : 40,
      borderRadius: 5,
    },
  });

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.box} />
    </View>
  );
};

export default GameWonColorBox;
