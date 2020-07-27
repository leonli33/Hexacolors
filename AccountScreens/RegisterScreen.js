import React, { Component, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { connect, useDispatch } from "react-redux";
import { createNewUser } from "../Redux/Actions";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const RegisterScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState();
  const [iconName, setIconName] = useState("ios-eye");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Register the user if all fields are filled out correctly
  const handleSignUp = async () => {
    setError(null);
    Keyboard.dismiss();
    try {
      if (password.length < 8) {
        Alert.alert(
          "An error has occured!",
          "Please make sure your password is at least 8 characters long.",
          [{ text: "Okay" }]
        );
      } else if (!email || !firstName || !lastName) {
        Alert.alert(
          "An error has occured!",
          "Please make sure all fields are valid.",
          [{ text: "Okay" }]
        );
      } else {
        setLoading(true);
        await dispatch(() =>
          props.createNewUser(email, password, firstName, lastName)
        );
        props.navigation.navigate("Profile");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // Display error is one occurs
  useEffect(() => {
    if (error) {
      Alert.alert("An error has occured!", "" + error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <KeyboardAwareScrollView
      style={{ height: "100%", width: "100%", backgroundColor: "black" }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
              marginTop: Dimensions.get("window").height > 700 ? 55 : 25,
            }}
            onPress={() => props.navigation.navigate("AuthOptions")}
          >
            <Ionicons
              style={styles.backButton}
              name="ios-arrow-round-back"
              size={30}
            />
          </TouchableOpacity>
          <Image
            source={require("../Icons/hexacolorslight.png")}
            style={{
              transform: [{ scaleX: 0.45 }, { scaleY: 0.45 }],
              resizeMode: "contain",
            }}
          />
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: Dimensions.get("window").height / 2,
              marginBottom: Dimensions.get("window").height / 20,
            }}
          >
            <TextInput
              placeholder="First Name"
              style={{ ...styles.textInput }}
              onChangeText={(firstName) => {
                setFirstName(firstName);
              }}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <TextInput
              placeholder="Last Name"
              style={{ ...styles.textInput }}
              onChangeText={(lastName) => {
                setLastName(lastName);
              }}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <TextInput
              placeholder="Email"
              style={{ ...styles.textInput }}
              onChangeText={(email) => {
                setEmail(email);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: -15,
              }}
            >
              <View style={{ width: "90%" }}>
                <TouchableOpacity
                  onPress={() => {
                    let name = "ios-eye-off";
                    if (iconName === "ios-eye-off") name = "ios-eye";
                    setIconName(name);
                  }}
                  style={{ alignSelf: "flex-end" }}
                >
                  <Ionicons color="gray" size={30} name={iconName} />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Password"
                style={{ ...styles.textInput, marginTop: 2 }}
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                secureTextEntry={iconName === "ios-eye"}
              />
            </View>
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.tropicalBlue}
              style={{ height: 40 }}
            />
          ) : (
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.createAccountContainer}
            >
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
  },
  createAccountHeader: {
    fontSize: 35,
    color: "silver",
    marginTop: "6%",
  },
  createAccount: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderRadius: 20,
    backgroundColor: Colors.tropicalBlue,
    marginTop: "15%",
  },
  createAccountText: {
    fontSize: 20,
    color: "white",
  },
  createAccountContainer: {
    backgroundColor: Colors.tropicalBlue,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 35,
    paddingVertical: 5,
  },
  registerInformation: {
    width: "80%",
    height: "45%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "silver",
    elevation: 3,
    backgroundColor: "white",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "40%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 2,
  },
  textInput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "silver",
    fontSize: 18,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
  },
  backButton: {
    color: "gray",
    alignSelf: "flex-start",
    paddingLeft: 30,
  },
});

export default connect(null, { createNewUser })(RegisterScreen);
