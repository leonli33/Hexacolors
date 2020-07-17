import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import GradientButton from "react-native-gradient-buttons";

class GameModeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <GradientButton
            style={styles.option}
            text="Color Mixer"
            textStyle={{ fontSize: 25, color: "white", fontWeight: "bold" }}
            gradientBegin="#5bc8ac"
            gradientEnd="#e6d72a"
            gradientDirection="diagonal"
            height={90}
            width={"100%"}
            radius={15}
            impact
            impactStyle="Light"
            onPressAction={() => this.props.navigation.navigate("MixHexGameMode")}
          />

          <GradientButton
            style={styles.option}
            text="Hex Guesser"
            textStyle={{ fontSize: 25, color: "white", fontWeight: "bold" }}
            gradientBegin="#e6d72a"
            gradientEnd="#f18d9e"
            gradientDirection="diagonal"
            height={90}
            width={"100%"}
            radius={15}
            impact
            impactStyle="Light"
            onPressAction={() =>
              this.props.navigation.navigate("GuessHexDifficultyScreen")
            }
          />

          <GradientButton
            style={styles.option}
            text="Playground"
            textStyle={{ fontSize: 25, color: "white", fontWeight: "bold" }}
            gradientBegin="#f18d9e"
            gradientEnd="#1995ad"
            gradientDirection="diagonal"
            height={90}
            width={"100%"}
            radius={15}
            impact
            impactStyle="Light"
            onPressAction={() => this.props.navigation.navigate("Playground")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "lavender",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "100%",
  },
  option: {
    height: 90,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6B09D",
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  optionText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

export default GameModeScreen;
