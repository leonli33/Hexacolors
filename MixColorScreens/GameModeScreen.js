import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../Constants/Colors";

class GameModeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={{ ...styles.option }}
            onPress={() => {
              this.props.navigation.navigate("Levels");
            }}
          >
            <Text style={styles.optionText}>Color Mixer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.option }}
            onPress={() => {
              this.props.navigation.navigate("GuessHexDifficultyScreen");
            }}
          >
            <Text style={styles.optionText}>Hex Guesser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.option }}
            onPress={() => {
              this.props.navigation.navigate("Playground");
            }}
          >
            <Text style={styles.optionText}>Playground</Text>
          </TouchableOpacity>
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
    borderWidth: 6,
    borderColor: "#F6B09D",
  },
  optionText: {
    fontSize: 25,
  },
});

export default GameModeScreen;
