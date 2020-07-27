import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";

// Get answer button
class GetAnswer extends Component {
  render() {
    const { width } = Dimensions.get("window");
    let backColor = "lavender";
    let outline = "black";
    let textColor = "black";
    if (this.props.selected) {
      textColor = "lavender";
      backColor = "black";
    }

    return (
      <TouchableWithoutFeedback onPress={this.props.handlePress}>
        <View
          style={{
            width: Math.round(width / 3),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: outline,
            backgroundColor: backColor,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.26,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <Text
            style={{
              color: textColor,
              marginHorizontal: 12,
              marginVertical: 6,
            }}
          >
            Get Answer
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default GetAnswer;
