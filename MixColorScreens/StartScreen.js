import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import Colors from "../Constants/Colors";
import { connect } from "react-redux";

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
        flex: 1,
      },
      playButton: {
        width: "85%",
        height: "8%",
        backgroundColor: Colors.tropicalRed,
        borderRadius: 20,
        marginTop: "100%",
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
        height: "8%",
        backgroundColor: Colors.tropicalBlue,
        borderRadius: 12,
        marginTop: "12%",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 15,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
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
          <Image
            style={styles.playButtonImage}
            source={require("../Icons/play.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Image
            style={styles.playButtonImage}
            source={require("../Icons/info.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

export default StartScreen;
