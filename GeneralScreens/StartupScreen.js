import React, { useEffect, useDispatch } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import Colors from "../Constants/Colors";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { connect } from "react-redux";
import { autoLogin } from "../Redux/Actions";

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: (uid) => dispatch(autoLogin(uid)),
  };
}

const StartupScreen = (props) => {
  
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        let uid = user.uid;
        // console.log(uid, "signed in");
        props.autoLogin(uid);
        props.navigation.navigate("Home");
      } else {
        props.navigation.navigate("Home");
        console.log("signed out");
      }
      listener();
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.tropicalBlue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(null, mapDispatchToProps)(StartupScreen);

/*
  const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");

        if (!userData) {
          props.navigation.navigate("Home");
          return;
        }
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;

        await firebase
          .auth()
          .verifyIdToken(token, true)
          .then((payload) => {
            console.log(true)
          })
          .catch((error) => {
            if (error.code == "auth/id-token-revoked") {
              // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
              console.log("revoked")
            } else {
              console.log("error")
            }
          });

        // console.log(token);
        // console.log(userId);
      } catch (error) {
          console.log(error)
      }
    };
    tryLogin();

*/
