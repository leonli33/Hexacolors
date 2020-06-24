import React, { Component, useDebugValue } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Colors from "../Constants/Colors";

class LevelBox extends Component {
  render() {
    const dimensions = Dimensions.get("window");
    const topHalfHeight = Math.round(dimensions.height / 20);
    const topHalfWidth = Math.round(dimensions.width * (1 / 4));
    const bottomHalfHeight = Math.round(dimensions.height * (1 / 7));

    let color = Colors.tropicalYellow;
    if (this.props.level >= 10 && this.props.level < 18) {
      color = Colors.tropicalBlue;
    } else if (this.props.level >= 18) {
      color = Colors.tropicalRed;
    }

    const styles = StyleSheet.create({
      topHalf: {
        width: topHalfWidth,
        height: topHalfHeight,
        borderColor: "black",
        backgroundColor: color,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        marginLeft: "5%",
        marginTop: "15%",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
      },
      bottomHalf: {
        width: topHalfWidth,
        height: bottomHalfHeight,
        backgroundColor: this.props.targetColor,
        marginLeft: "5%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
      },
      shadowAround: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.26,
        shadowRadius: 5,
        marginTop: "8%",
        elevation: 5,
        backgroundColor: "white",
      },
    });

    let shadedBottom = <View></View>;
    if (!this.props.hasUserCompleted) {
      shadedBottom = (
        <View
          style={{
            ...styles.bottomHalf,
            marginLeft: "0%",
            backgroundColor: "black",
            opacity: 0.8,
            elevation: 0,
          }}
        ></View>
      );
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.hasUserCompleted
            ? this.props.nagivateTo(this.props.level)
            : "";
        }}
      >
        <View
          style={
            this.props.hasCompleted
              ? styles.shadowAround
              : {
                  marginBottom: -5,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 4,
                }
          }
        >
          <View style={styles.topHalf}>
            <Text>{this.props.level}</Text>
          </View>
          <View style={styles.bottomHalf}>{shadedBottom}</View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default LevelBox;
