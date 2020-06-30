import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { connect, useDispatch } from "react-redux";
import { login } from "../Redux/Actions";

const OptionScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const handleLogIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(() => props.login(email, password));
      props.navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
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
          style={{
            marginTop: Dimensions.get("window").height > 700 ? 45 : 25,
            marginLeft: 20,
          }}
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        >
          <Ionicons
            name="md-close-circle"
            size={28}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={styles.welcomeText}>Welcome</Text>
          <View style={styles.loginInformation}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              placeholder="Password"
              style={{ ...styles.textInput, marginTop: "2%" }}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.tropicalBlue}
              style={{ marginTop: "8%", height: 55 }}
            />
          ) : (
            <TouchableOpacity style={styles.logIn} onPress={handleLogIn}>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          )}
          <View style={styles.makeAccountContainer}>
            <Text style={styles.makeAccountText}>Don't have an account?</Text>
            <TouchableOpacity
              style={{ marginTop: "2%" }}
              onPress={() => {
                props.navigation.navigate("RegisterScreen");
              }}
            >
              <Text
                style={{
                  ...styles.makeAccountText,
                  color: Colors.tropicalRed,
                }}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  },
  welcomeText: {
    fontSize: 45,
    color: "silver",
    marginTop: Dimensions.get("window").height > 700 ? "10%" : "5%",
    marginBottom: "7%",
  },
  logIn: {
    marginTop: "8%",
    height: 55,
    width: "80%",
    borderRadius: 20,
    backgroundColor: Colors.tropicalBlue,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
  },
  loginInformation: {
    width: "80%",
    height: "23%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "silver",
    elevation: 3,
    backgroundColor: "white",
    marginTop: "10%",
    alignItems: "center",
  },
  textInput: {
    height: "30%",
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "silver",
    fontSize: 20,
    padding: 5,
    marginVertical: "6%",
  },
  makeAccountContainer: {
    height: "90%",
    width: "100%",
    alignItems: "center",
    marginTop: "25%",
  },
  makeAccountText: {
    color: "gray",
    fontSize: 15,
  },
  backButton: {
    color: "black",
    alignSelf: "flex-start",
  },
});

export default connect(mapStateToProps, { login })(OptionScreen);
