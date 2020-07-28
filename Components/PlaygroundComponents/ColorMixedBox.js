import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Font from "../../Constants/Font";

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
      <Text
        style={{
          fontSize:
            Dimensions.get("window").height > 1000
              ? Font.tabletTextSize - 2
              : Font.regularTextSize - 2,
        }}
      >
        {props.color}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: Dimensions.get("window").height > 1000 ? 55 : 40,
    height: Dimensions.get("window").height > 1000 ? 55 : 40,
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
