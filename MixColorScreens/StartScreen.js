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
import Spinner from "../Components/GeneralUI/Spinner";
import "firebase/auth";
import "firebase/firestore";
import * as firebase from "firebase";

class StartScreen extends Component {

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((documentSnap) => {
          const {first_name} = documentSnap.data()
          console.log(first_name)
        })
      });
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const iconSize = Math.round(width / 10);
    const styles = StyleSheet.create({
      container: {
        alignItems: "center",
        backgroundColor: Colors.backgroundCol,
        height: "100%",
        width: "100%",
        justifyContent: "space-evenly",
      },
      playButton: {
        width: "85%",
        height: "35%",
        backgroundColor: Colors.tropicalRed,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 5,
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
        height: "35%",
        backgroundColor: Colors.tropicalBlue,
        borderRadius: 10,
        marginTop: "10%",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 5,
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
        <View style={{ height: 90, justifyContent: "center", marginTop: -15 }}>
          <Image
            source={require("../Icons/hexacolorLogo.png")}
            style={{
              transform: [{ scaleX: 0.3 }, { scaleY: 0.3 }],
              resizeMode: "contain",
            }}
          />
        </View>

        <Spinner />
        <View
          style={{
            width: "100%",
            alignItems: "center",
            height: "35%",
            marginBottom: -1 * (height / 16),
          }}
        >
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => {
              this.props.navigation.navigate("GameMode");
            }}
          >
            <Text style={styles.textOption}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => this.props.navigation.navigate("AuthOptions")}
          >
            <Text style={styles.textOption}>Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default StartScreen;
