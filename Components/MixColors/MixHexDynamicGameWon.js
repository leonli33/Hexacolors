import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import GameWonColorBox from "./GameWonColorBox";
import Colors from "../../Constants/Colors";
import Modal from "react-native-modal";

class MixHexDynamicGameWon extends Component {
  constructor() {
    super();
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
        minHeight: 200,
        justifyContent: 'space-evenly',

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
        justifyContent: 'space-evenly'
      },
      text: {
        fontSize: 15,
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
          <Text style={{fontSize: 25 }}>Nice Job!</Text>
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
                <Text style={{ fontSize: 25, marginLeft: 10 }}>=</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                width: "80%",
                alignSelf: 'center',
                alignItems: 'center'
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
              onPress={this.props.handleBackPress}
              style={styles.LevelsButton}
            >
              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.playAgainPress}
              style={styles.LevelsButton}
            >
              <Text style={styles.text}>
                Play Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MixHexDynamicGameWon;
