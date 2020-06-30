import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const ColorOptions = (props) => {
  return (
    <TouchableWithoutFeedback style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ ...styles.colorBox, backgroundColor: props.color }} />
        <Text style={styles.hexText}>#FAB223</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").width / 5,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
  },
  container: {
    flex: 1,
  },
  hexText: {
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default ColorOptions;
