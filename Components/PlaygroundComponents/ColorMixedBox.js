import React from "react";
import { View, Text, StyleSheet } from "react-native";

// These are the boxes displayed in the small horizontal scrollview
// that indicates the current colors that the user has selected
const ColorMixedBox = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.colorBox,
          backgroundColor: props.color,
          borderWidth: props.color === "" ? 0 : 1,
        }}
      />
      <Text>{props.color}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
  },
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginBottom: 3,
    marginRight: 15,
  },
});

export default ColorMixedBox;
