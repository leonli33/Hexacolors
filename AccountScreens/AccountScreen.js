import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";

const AccountScreen = (props) => {
  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            marginTop: Dimensions.get("window").height > 700 ? 45 : 25,
            marginLeft: 20,
            alignSelf: "flex-start",
          }}
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        >
          <Ionicons name="md-close-circle" size={28} color="gray" />
        </TouchableOpacity>
        <View style={styles.informationContainer}>
          <Text style={styles.nameText}>Leon Li</Text>
          <View
            style={{
              width: "100%",
              height: 5,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              backgroundColor: Colors.tropicalRed
            }}
          />
          <Text style={styles.gameHeader}>Color Mixer</Text>
          <View style={styles.mixColors}>
            <View style={styles.informationTextRow}>
              <Text style={styles.informationText}>Furthest Level:</Text>
              <Text style={styles.informationText}>1</Text>
            </View>
            <View style={styles.informationTextRow}>
              <Text style={styles.informationText}>Total Answers Correct:</Text>
              <Text style={styles.informationText}>1</Text>
            </View>
            <View style={styles.informationTextRow}>
              <Text style={styles.informationText}>Total Colors Selected:</Text>
              <Text style={styles.informationText}>100</Text>
            </View>
            <View style={styles.informationTextRow}>
              <Text style={styles.informationText}>Correct %:</Text>
              <Text style={styles.informationText}>20%</Text>
            </View>
            <View style={styles.informationTextRow}>
              <Text style={styles.informationText}>Colors Mixed:</Text>
              <ScrollView style={styles.mixColorScrollView}></ScrollView>
            </View>
          </View>
          <Text style={styles.gameHeader}>Hex Guesser</Text>
          <View style={styles.hexGuesser}>
            <View
              style={{
                borderWidth: 3,
                borderColor: Colors.tropicalYellow,
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Colors Correct:</Text>
                <Text style={styles.informationText}>1</Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Total Guesses:</Text>
                <Text style={styles.informationText}>1</Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Correct %:</Text>
                <Text style={styles.informationText}>20%</Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 3,
                borderColor: Colors.tropicalBlue,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Colors Correct:</Text>
                <Text style={styles.informationText}>1</Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Total Guesses:</Text>
                <Text style={styles.informationText}>1</Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Correct %:</Text>
                <Text style={styles.informationText}>20%</Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 3,
                borderColor: Colors.tropicalRed,
                marginVertical: 10,
                borderRadius: 10,
              }}
            >
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Colors Correct:</Text>
                <Text style={styles.informationText}>1</Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Total Guesses:</Text>
                <Text style={styles.informationText}>1</Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Correct %:</Text>
                <Text style={styles.informationText}>20%</Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                borderWidth: 3,
                borderColor: Colors.tropicalGreen,
                paddingBottom: 15,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ ...styles.informationText, alignSelf: "flex-start" }}
              >
                Colors Guessed:
              </Text>
              <ScrollView style={styles.hexGuesserScroll}></ScrollView>
            </View>
          </View>
          <Text style={styles.gameHeader}>Playground Palette</Text>
          <ScrollView style={styles.colorPaletteScroll}></ScrollView>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    height: "100%",
    backgroundColor: "black",
  },
  informationContainer: {
    width: "90%",
    alignItems: "center",
    marginTop: 5,
  },
  nameText: {
    fontSize: 45,
    textAlign: "center",
    color: "white",
  },
  mixColors: {
    width: "100%",
    borderWidth: 2,
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
    paddingBottom: 15,
    paddingTop: 5,
    borderColor: "#5bc8ac",
  },
  informationTextRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  informationText: {
    fontSize: 17,
    margin: 10,
    color: "white",
  },
  mixColorScrollView: {
    borderWidth: 1,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.tropicalBlue,
    backgroundColor: "ivory",
  },
  sectionHeader: {
    fontSize: 22,
    alignSelf: "center",
    color: "white",
  },
  logoutButton: {
    backgroundColor: Colors.tropicalRed,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    marginVertical: 10,
    marginHorizontal: 35,
  },
  colorPaletteScroll: {
    width: "100%",
    height: 150,
    borderWidth: 3,
    alignSelf: "center",
    borderColor: "#1995ad",
    borderRadius: 10,
    backgroundColor: "ivory",
    marginTop: 10,
  },
  gameHeader: {
    fontSize: 25,
    alignSelf: "flex-start",
    marginTop: "10%",
    color: "white",
  },
  hexGuesserScroll: {
    width: "90%",
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: Colors.tropicalBlue,
    backgroundColor: "ivory",
  },
  hexGuesser: {
    width: "100%",
  },
});

export default AccountScreen;
