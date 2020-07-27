import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Font from "../../Constants/Font";

// This is the small box above the sliders
const ColorValue = (props) => {
  return (
    <View
      style={{
        ...styles.container,
        borderColor: props.borderColor,
        backgroundColor: props.currentValue === "" ? "dimgray" : "ivory",
      }}
    >
      <Text
        style={{
          fontSize:
            Dimensions.get("window").height > 1000
              ? Font.tabletTextSize
              : Font.regularTextSize,
        }}
      >
        {props.currentValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").height > 1000 ? 80 : 50,
    height: Dimensions.get("window").height > 1000 ? 50 : 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "ivory",
  },
});

export default ColorValue;
