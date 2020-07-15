import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import GameWonColorBox from "./GameWonColorBox";
import Colors from "../../Constants/Colors";
import Modal from "react-native-modal";

class ColorMixerWonScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  startAnimations = () => {};

  render() {
    const styles = StyleSheet.create({
      background: {
        width: "90%",
        height: "60%",
        backgroundColor: "whitesmoke",
        alignSelf: "center",
        borderRadius: 15,
        alignItems: "center",
        borderWidth: 5,
        borderColor: this.props.targetColor,
        minHeight: 450,
      },
      LevelsButton: {
        width: "40%",
        height: 50,
        backgroundColor: Colors.buttonBackground,
        borderRadius: 15,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Avenir-Black",
        fontSize: 20,
        marginBottom: -5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
    });

    if (this.props.visibility) {
      setTimeout(() => {
        this.startAnimations();
      }, 1200);
    }

    return (
      <Modal
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        transparent={true}
        isVisible={this.props.visibility}
        animationType={"slide"}
        backdropOpacity={0.8}
        animationInTiming={1500}
        backdropTransitionInTiming={1500}
      >
        <View style={styles.background}>
          <Text style={{ marginTop: "5%", fontSize: 25 }}>Nice Job!</Text>
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: "7%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <GameWonColorBox color={this.props.targetColor} />
              <View style={{ height: 52, justifyContent: "center" }}>
                <Text style={{ fontSize: 25, marginLeft: 10 }}>=</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                padding: 5,
                width: "80%",
              }}
            >
              {this.props.colorsNeeded.map((color, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      marginHorizontal: "4%",
                      marginBottom: "4%",
                    }}
                  >
                    <GameWonColorBox color={color} />
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ width: "100%", borderWidth: 1, height: 100 }}>
            <Text>Hello</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: "110%",
              position: "absolute",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.handleBackPress(this.props.level)}
              style={styles.LevelsButton}
            >
              <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (this.props.level === 18) {
                  this.props.gameModePress();
                } else {
                  this.props.handleNextPress(this.props.level + 1);
                }
              }}
              style={styles.LevelsButton}
            >
              <Text>
                {this.props.level === 18 ? "Game Modes" : "Next Level"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ColorMixerWonScreen;
