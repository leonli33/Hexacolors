import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";

const ColorOption = () => {
  return <TouchableOpacity style={styles.colorBall}></TouchableOpacity>;
};

const styles = StyleSheet.create({
  colorBall: {
    height: Math.round(Dimensions.get("window").height / 8),
    width: Math.round(Dimensions.get("window").height / 8),
    borderRadius: Math.round(Dimensions.get("window").height / 16),
    backgroundColor: "lightblue",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    marginTop: Math.round(Dimensions.get("window").height / 20),
  },
});

export default ColorOption;
