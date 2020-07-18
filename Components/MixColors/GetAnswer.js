import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";

class GetAnswer extends Component {
  render() {
    const { width, height } = Dimensions.get("window");
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
            height: Math.round(width / 12),
            width: Math.round(width / 3),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: outline,
            backgroundColor: backColor,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={{ color: textColor, marginHorizontal: 12 }}>Get Answer</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default GetAnswer;
