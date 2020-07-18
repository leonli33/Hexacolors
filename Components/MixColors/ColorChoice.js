import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../Constants/Colors";

class ColorChoice extends Component {
  render() {
    const { width } = Dimensions.get("window");
    const colorWidth = Math.round(width / 5);
    const styles = StyleSheet.create({
      color: {
        width: colorWidth,
        height: colorWidth,
        backgroundColor: Colors.tropicalBlue,
        borderRadius: 10,
        marginRight: Math.round(width / 20),
        borderWidth: 1,
        elevation: 6,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      container: {
        marginBottom: Math.round(width / 20),
      },
      hex: {
        marginLeft: Math.round(colorWidth / 10),
        marginTop: 2,
        marginBottom: -4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
    });

    // Shaded determines if the box has already been pressed by the user
    let shaded = <View></View>;
    if (this.props.colorsChosen.includes(this.props.color)) {
      shaded = (
        <View
          style={{
            ...styles.color,
            backgroundColor: "black",
            opacity: 0.6,
            borderWidth: 0,
          }}
        />
      );
    }

    let displayOnHint = (
      <View>
        <View style={{ ...styles.color, backgroundColor: this.props.color }}>
          {shaded}
        </View>
        <Text style={styles.hex}>{this.props.color}</Text>
      </View>
    );

    // If the current color is included in one of the hints, it should disappear
    let inHint =
      (this.props.hint1Activated &&
        this.props.hints1.includes(this.props.color)) ||
      (this.props.hint2Activated &&
        this.props.hints2.includes(this.props.color)) ||
        (this.props.getAnswerSelected && this.props.notInAnswer);
    if (inHint) {
      displayOnHint = (
        <View>
          <View
            style={{
              ...styles.color,
              backgroundColor: Colors.buttonBackground,
              borderWidth: 0,
              elevation: 0,
              shadowColor: Colors.buttonBackground,
            }}
          ></View>
          <Text
            style={{
              ...styles.hex,
              color: Colors.buttonBackground,
              shadowColor: Colors.buttonBackground,
            }}
          >
            {this.props.color}
          </Text>
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback
        pointerEvents={inHint ? "none" : "auto"}
        onPress={() => {
          if (!inHint) this.props.onColorPress(this.props.color);
        }}
      >
        <View
          style={
            inHint ? styles.container : { marginBottom: Math.round(width / 20) }
          }
        >
          {displayOnHint}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ColorChoice;
