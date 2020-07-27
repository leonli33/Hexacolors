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
import { connect, useDispatch } from "react-redux";
import { SetWarningShownFalse, updateAuthData } from "../Redux/Actions";
import Font from "../Constants/Font";

class StartScreen extends Component {
  // Go to the account screen
  handleAccountClicked = async () => {
    if (this.props.loggedIn) {
      await this.updateUserAccountInformation();
      this.props.navigation.navigate("Profile");
    } else {
      this.props.navigation.navigate("AuthOptions");
    }
  };

  // If the user wants to go to their account and they are already log in,
  // read their information from firebase to display the most up to date info
  updateUserAccountInformation = async () => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.props.userId)
        .get()
        .then((snapshot) => {
          let data = snapshot.data();
          this.props.updateAuthData(data);
        });
    } catch (error) {
      let errorMessage = error.message;
      Alert.alert("An error has occured!", "" + errorMessage, [
        { text: "Okay" },
      ]);
    }
  };

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
        fontSize: Dimensions.get("window").height > 1100 ? Font.tabletFontSize : Font.regularFontSize,
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
              if (!this.props.loggedIn && !this.props.warningShown) {
                this.props.SetWarningShownFalse();
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
            onPress={this.handleAccountClicked}
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
    warningShown: state.auth.warningShown,
    userId: state.auth.userID,
  };
}

export default connect(mapStateToProps, {
  SetWarningShownFalse,
  updateAuthData,
})(StartScreen);
