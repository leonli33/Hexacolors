import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import Colors from "../Constants/Colors";

class StartScreen extends Component {
  render() {
    const { width, height } = Dimensions.get("window");
    const iconSize = Math.round(width / 10);
    const styles = StyleSheet.create({
      container: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: Colors.backgroundCol,
        height: "100%",
        width: "100%",
      },
      playButton: {
        width: "85%",
        height: "15%",
        backgroundColor: Colors.tropicalRed,
        borderRadius: 10,
        marginTop: Dimensions.get("window").height / 2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 15,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
      },
      playButtonImage: {
        position: "absolute",
        height: iconSize,
        width: iconSize,
      },
      infoButton: {
        width: "85%",
        height: "15%",
        backgroundColor: Colors.tropicalBlue,
        borderRadius: 10,
        marginTop: "12%",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 15,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
      },
      textOption: {
        color: "white",
        fontSize: 25,
        position: "absolute",
      },
    });
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            this.props.navigation.navigate("GameMode");
          }}
        >
          <Text style={styles.textOption}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton} onPress={() => this.props.navigation.navigate("AuthOptions")}>
          <Text style={styles.textOption}>Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default StartScreen;
