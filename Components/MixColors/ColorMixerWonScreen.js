import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import GameWonColorBox from "./GameWonColorBox";
import Colors from "../../Constants/Colors";
import Modal from "react-native-modal";
import Font from "../../Constants/Font";

// Screen displayed when the user wins a game
class ColorMixerWonScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const styles = StyleSheet.create({
      background: {
        width: "90%",
        height: "40%",
        backgroundColor: "whitesmoke",
        alignSelf: "center",
        borderRadius: 15,
        alignItems: "center",
        borderWidth: 5,
        borderColor: this.props.targetColor,
        minHeight: 250,
        justifyContent: "space-evenly",
      },
      LevelsButton: {
        backgroundColor: Colors.buttonBackground,
        borderRadius: 15,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        width: "40%",
      },
      text: {
        fontSize: Dimensions.get("window").height > 1000
        ? Font.tabletTextSize
        : Font.regularTextSize,
        marginVertical: 10,
      },
    });

    return (
      <Modal
        style={{
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
          <Text
            style={{
              fontSize: Dimensions.get("window").height > 1000 ? 37 : 25,
            }}
          >
            Nice Job!
          </Text>
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "flex-start",
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
                <Text
                  style={{
                    fontSize:
                      Dimensions.get("window").height > 1000
                        ? Font.tabletTextSize
                        : Font.regularTextSize,
                    marginLeft: 10,
                  }}
                >
                  =
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                width: "80%",
                alignSelf: "center",
                alignItems: "center",
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.handleBackPress(this.props.level)}
              style={styles.LevelsButton}
            >
              <Text style={styles.text}>Back</Text>
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
              <Text style={styles.text}>
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
