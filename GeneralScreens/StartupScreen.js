import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../Constants/Colors";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { connect } from "react-redux";
import { autoLogin } from "../Redux/Actions";
import { CommonActions } from "@react-navigation/native";

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: (uid) => dispatch(autoLogin(uid)),
  };
}

const StartupScreen = (props) => {
  // Delete this screen from the stack and navigate the user to the home screen
  const resetStackAndNavigate = CommonActions.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        let uid = user.uid;
        props.autoLogin(uid);
      }
      // user cannot navigate back to the startup screen
      props.navigation.dispatch(resetStackAndNavigate);

      // close the listener
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
