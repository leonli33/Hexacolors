import React, { useState, useEffect } from "react";
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
  Image,
} from "react-native";
import Colors from "../Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { connect, useDispatch } from "react-redux";
import { login } from "../Redux/Actions";

// Login screen
const OptionScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [iconName, setIconName] = useState("ios-eye");

  const dispatch = useDispatch();

  // Executes whenever the user presses the login button
  const handleLogIn = async () => {
    setLoading(true);
    Keyboard.dismiss()
    setError(null);
    try {
      await dispatch(() => props.login(email, password));
      props.navigation.navigate("Profile");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Display error is there are any
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
          <Image
            source={require("../Icons/hexacolorslight.png")}
            style={{
              transform: [{ scaleX: 0.45 }, { scaleY: 0.45 }],
              resizeMode: "contain",
              marginTop: "5%",
            }}
          />
          <TextInput
            placeholder="Email"
            style={{ ...styles.textInput, marginTop: "10%" }}
            onChangeText={(email) => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <View style={{ width: "90%", marginTop: "1%" }}>
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
            style={{
              ...styles.textInput,
              marginTop: 5,
              marginBottom: Dimensions.get("window").height / 12,
            }}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            secureTextEntry={iconName === "ios-eye"}
          />
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.tropicalBlue}
              style={{ height: 40 }}
            />
          ) : (
            <TouchableOpacity
              onPress={handleLogIn}
              style={styles.loginContainer}
            >
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          )}
          <View style={styles.makeAccountContainer}>
            <Text style={styles.makeAccountText}>Don't have an account?</Text>
            <TouchableOpacity
              style={{
                marginTop: "2%",
                justifyContent: "center",
                alignItems: "center",
              }}
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

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
  },
  welcomeText: {
    fontSize: 45,
    color: "white",
    marginTop: Dimensions.get("window").height > 700 ? "10%" : "5%",
    marginBottom: "7%",
  },
  logIn: {
    marginTop: "8%",
    backgroundColor: Colors.tropicalBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  loginText: {
    fontSize: 20,
    color: "white",
  },
  loginContainer: {
    borderRadius: 15,
    backgroundColor: Colors.tropicalBlue,
    paddingVertical: 5,
    paddingHorizontal: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  loginInformation: {
    borderWidth: 1,
    borderColor: "silver",
    elevation: 3,
    backgroundColor: "white",
    marginTop: "10%",
    alignItems: "center",
    width: "90%",
  },
  textInput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "silver",
    fontSize: 18,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
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
    minHeight: 25,
  },
  backButton: {
    color: "gray",
    alignSelf: "flex-start",
  },
});

export default connect(null, { login })(OptionScreen);
