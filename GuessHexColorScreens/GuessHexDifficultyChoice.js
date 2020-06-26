import React, { Component, useDebugValue } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Colors from "../Constants/Colors";

class GuessHexDifficultyChoice extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={{ ...styles.option, backgroundColor: Colors.tropicalYellow }}
            onPress={() => {
              this.props.navigation.navigate("GuessHexGameScreen", {
                difficulty: "Easy",
              });
            }}
          >
            <Text style={styles.optionText}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.option, backgroundColor: Colors.tropicalBlue }}
            onPress={() => {
              this.props.navigation.navigate("GuessHexGameScreen", {
                difficulty: "Medium",
              });
            }}
          >
            <Text style={styles.optionText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.option, backgroundColor: Colors.tropicalRed }}
            onPress={() => {
              this.props.navigation.navigate("GuessHexGameScreen", {
                difficulty: "Hard",
              });
            }}
          >
            <Text style={styles.optionText}>Hard</Text>
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
    justifyContent: "space-evenly",
  },
  innerContainer: {
    backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "100%",
  },
  option: {
    height: 80,
    width: "100%",
    borderRadius: 15,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 25,
  },
});

export default GuessHexDifficultyChoice;
