import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import Colors from "../Constants/Colors";

const GuessHexGameWon = (props) => {
  return (
    <Modal
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      transparent={true}
      isVisible={props.visiblity}
      animationType={"slide"}
      backdropOpacity={0.8}
      animationInTiming={1500}
      backdropTransitionInTiming={1500}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginTop: "5%" }}>Nice Job!</Text>
        <View style={styles.informationContainer}>
          <View style={styles.colorGuess}>
            <Text style={{ fontSize: 20 }}>{props.targetColor}:</Text>
            <View
              style={{ ...styles.colorBox, backgroundColor: props.targetColor }}
            />
          </View>
          <View style={styles.colorGussed}>
            <Text style={{ fontSize: 20 }}>Guesses:</Text>
            <View style={styles.guessedColors}>
              {props.colorsGuessed.map((color, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      ...styles.colorBox,
                      backgroundColor: color,
                      marginTop: "3%",
                    }}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={props.backPress} style={styles.button}>
              <Text style={{ fontSize: 18, marginVertical: 10 }}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={props.playAgainPress}
              style={styles.button}
            >
              <Text style={{ fontSize: 18, marginVertical: 10 }}>
                Play Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "whitesmoke",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  colorGuess: {
    flexDirection: "row",
    alignItems: "center",
  },
  informationContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: "10%",
    justifyContent: "space-evenly",
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: "5%",
    alignSelf: "center",
  },
  colorGussed: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "8%",
  },
  guessedColors: {
    marginLeft: "2%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexDirection: "row",
    marginRight: "5%",
    width: "75%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 40,
  },
  button: {
    width: "40%",
    backgroundColor: Colors.buttonBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 5,
  },
});

export default GuessHexGameWon;
