import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import ColorCircle from "../Components/AccountComponents/ColorCircle";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { connect } from "react-redux";
import { logout } from "../Redux/Actions";

const AccountScreen = (props) => {
  const [guessHexColors, setGuessHexColor] = useState([]);

  const calcPercentage = (totalRight, totalTries) => {
    if (totalRight === 0 || totalTries === 0) return "0%";
    let num = (totalRight / totalTries) * 100;
    return `${num.toFixed(2)}%`;
  };

  useEffect(() => {
    let colorsArr = props.guessHexTotalColors;
    let newArr = [];
    let row = ["", "", ""];
    let index = 0;
    for (let i = 0; i < colorsArr.length; i++) {
      let currentColor = colorsArr[i];
      if (index === 2) {
        row[index] = currentColor;
        newArr.push(row);
        row = ["", "", ""];
        index = 0;
      } else {
        row[index] = currentColor;
        index++;
      }
    }
    if (row[0] != "") newArr.push(row);
    setGuessHexColor(newArr);
  }, []);

  const handleSignout = () => {
    props.logout();
    props.navigation.navigate("Home");
  };

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
          <Text
            style={styles.nameText}
          >{`${props.firstName} ${props.lastName}`}</Text>
          <View
            style={{
              width: "100%",
              height: 5,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              backgroundColor: Colors.tropicalRed,
            }}
          />
          <Text style={styles.gameHeader}>Color Mixer</Text>
          <View style={styles.mixColors}>
            <View style={styles.informationTextRow}>
              <Text style={styles.informationText}>Furthest Level:</Text>
              <Text style={styles.informationText}>
                {props.hexMixFurthestLevel}
              </Text>
            </View>
            <View style={styles.informationTextRow}>
              <Text style={styles.informationText}>
                Total Levels Completed:
              </Text>
              <Text style={styles.informationText}>
                {props.totalLevelsCompleted}
              </Text>
            </View>

            <View style={styles.informationTextRow}>
              <Text style={styles.informationText}>Colors Mixed:</Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                }}
                style={styles.mixColorScrollView}
              >
                {props.mixColorLevelAnswers
                  .slice(1, props.hexMixFurthestLevel + 1)
                  .map((color, index) => {
                    return <ColorCircle key={index} color={color} />;
                  })}
              </ScrollView>
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
                <Text style={styles.informationText}>
                  {props.guessHexEasyTotalRight}
                </Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Total Guesses:</Text>
                <Text style={styles.informationText}>
                  {props.guessHexEasyTotalTries}
                </Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Correct %:</Text>
                <Text style={styles.informationText}>
                  {calcPercentage(
                    props.guessHexEasyTotalRight,
                    props.guessHexEasyTotalTries
                  )}
                </Text>
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
                <Text style={styles.informationText}>
                  {props.guessHexMediumTotalRight}
                </Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Total Guesses:</Text>
                <Text style={styles.informationText}>
                  {props.guessHexMediumTotalTries}
                </Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Correct %:</Text>
                <Text style={styles.informationText}>
                  {calcPercentage(
                    props.guessHexMediumTotalRight,
                    props.guessHexMediumTotalTries
                  )}
                </Text>
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
                <Text style={styles.informationText}>
                  {props.guessHexHardTotalRight}
                </Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Total Guesses:</Text>
                <Text style={styles.informationText}>
                  {props.guessHexHardTotalTries}
                </Text>
              </View>
              <View style={styles.informationTextRow}>
                <Text style={styles.informationText}>Correct %:</Text>
                <Text style={styles.informationText}>
                  {calcPercentage(
                    props.guessHexHardTotalRight,
                    props.guessHexHardTotalTries
                  )}
                </Text>
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
              <FlatList
                data={guessHexColors}
                style={styles.hexGuesserScroll}
                horizontal={true}
                renderItem={({ item }) => (
                  <View>
                    {item.map((color, index) => {
                      return <ColorCircle color={color} />;
                    })}
                  </View>
                )}
              ></FlatList>
            </View>
          </View>
          <Text style={styles.gameHeader}>Playground Palette</Text>
          <ScrollView style={styles.colorPaletteScroll}></ScrollView>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignout}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    hexMixFurthestLevel: state.auth.mixColorsFurthestLevel,
    totalLevelsCompleted: state.auth.mixColorsTotalCorrect,
    guessHexTotalColors: state.auth.guessHexTotalColors,
    guessHexEasyTotalRight: state.auth.guessHexEasyTotalRight,
    guessHexEasyTotalTries: state.auth.guessHexEasyTotalTries,
    guessHexMediumTotalRight: state.auth.guessHexMediumTotalRight,
    guessHexMediumTotalTries: state.auth.guessHexMediumTotalTries,
    guessHexHardTotalRight: state.auth.guessHexHardTotalRight,
    guessHexHardTotalTries: state.auth.guessHexHardTotalTries,
    mixColorLevelAnswers: state.mixColors.levelAnswer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

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
    padding: 5,
    paddingRight: 10,
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
    borderRadius: 10,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: Colors.tropicalBlue,
    backgroundColor: "ivory",
    padding: 5,
  },
  hexGuesser: {
    width: "100%",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
