import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Font from "../../Constants/Font";
import { isTablet } from "../../Functions/GeneralFunctions";

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
          fontSize: isTablet(Dimensions.get("window").height)
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
    width: isTablet(Dimensions.get("window").height) ? 80 : 50,
    height: isTablet(Dimensions.get("window").height) ? 50 : 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "ivory",
  },
});

export default ColorValue;
