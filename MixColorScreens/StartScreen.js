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
import { connect } from "react-redux";

class StartScreen extends Component {
  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((documentSnap) => {
          const { first_name } = documentSnap.data();
        });
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
              if (!this.props.loggedIn) {
                alert(
                  "Warning: Your data will be lost once you exit the app if you do not make an account."
                );
              }
              this.props.navigation.navigate("GameMode");
            }}
          >
            <Text style={styles.textOption}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() =>
              this.props.navigation.navigate(
                this.props.loggedIn ? "Profile" : "AuthOptions"
              )
            }
          >
            <Text style={styles.textOption}>Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.signedIn,
  };
}

export default connect(mapStateToProps)(StartScreen);
