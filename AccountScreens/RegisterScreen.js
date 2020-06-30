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
  Alert
} from "react-native";

const RegisterScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const handleSignUp = async () => {
    setError(null);
    try {
      await dispatch(() => props.createNewUser(email, password));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error has occured!", "" + error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => props.navigation.navigate("AuthOptions")}
        >
          <Ionicons
            style={styles.backButton}
            name="ios-arrow-round-back"
            size={28}
          />
        </TouchableOpacity>

        <Text style={styles.createAccountHeader}>Create Account</Text>
        <View style={styles.registerInformation}>
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            onChangeText={(firstName) => {
              console.log(firstName);
            }}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.textInput}
            onChangeText={(lastName) => {
              console.log(lastName);
            }}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity style={styles.createAccount} onPress={handleSignUp}>
          <Text style={styles.createAccountText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

function mapStateToProps(state) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
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
    height: 55,
    borderRadius: 20,
    backgroundColor: Colors.tropicalBlue,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    marginTop: "15%",
  },
  createAccountText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
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
    height: "15%",
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "silver",
    fontSize: 20,
    padding: 5,
    marginVertical: "4%",
    color: "black",
  },
  backButton: {
    color: "black",
    paddingTop: Dimensions.get("window").height > 700 ? 50 : 30,
    alignSelf: "flex-start",
    paddingLeft: 30,
  },
});

export default connect(mapStateToProps, { createNewUser })(RegisterScreen);
