import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import ColorCircle from "../Components/AccountComponents/ColorCircle";
import ColorMixedBox from "../Components/PlaygroundComponents/ColorMixedBox";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { connect } from "react-redux";
import { logout } from "../Redux/Actions";

const AccountScreen = (props) => {
  const [guessHexColors, setGuessHexColor] = useState([]);

  const leftValueFirstView = useState(new Animated.Value(-600))[0];
  const leftValueSecondView = useState(new Animated.Value(-600))[0];
  const leftValueThirdView = useState(new Animated.Value(-600))[0];
  const leftValueFourthView = useState(new Animated.Value(-600))[0];
  const leftValueFifthView = useState(new Animated.Value(-600))[0];

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

    animateSlideRight(leftValueFirstView);
    setTimeout(() => {
      animateSlideRight(leftValueSecondView);
    }, 100);
    setTimeout(() => {
      animateSlideRight(leftValueThirdView);
    }, 200);
    setTimeout(() => {
      animateSlideRight(leftValueFourthView);
    }, 300);
    setTimeout(() => {
      animateSlideRight(leftValueFifthView);
    }, 400);
  }, []);

  function animateSlideRight(valueToAnimate) {
    Animated.timing(valueToAnimate, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

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
          <Animated.View
            style={{
              ...styles.mixColors,
              transform: [{ translateX: leftValueFirstView }],
            }}
          >
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
              <Text style={styles.informationText}>Colors Mixed</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: 7,
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
          </Animated.View>
          <Text style={styles.gameHeader}>Hex Guesser</Text>
          <View style={styles.hexGuesser}>
            <Animated.View
              style={{
                borderWidth: 3,
                borderColor: Colors.tropicalYellow,
                marginTop: 10,
                borderRadius: 10,
                transform: [{ translateX: leftValueSecondView }],
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
                <Text style={styles.informationText}>Accuracy:</Text>
                <Text style={styles.informationText}>
                  {calcPercentage(
                    props.guessHexEasyTotalRight,
                    props.guessHexEasyTotalTries
                  )}
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              style={{
                borderWidth: 3,
                borderColor: Colors.tropicalBlue,
                borderRadius: 10,
                marginTop: 10,
                transform: [{ translateX: leftValueThirdView }],
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
                <Text style={styles.informationText}>Accuracy:</Text>
                <Text style={styles.informationText}>
                  {calcPercentage(
                    props.guessHexMediumTotalRight,
                    props.guessHexMediumTotalTries
                  )}
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              style={{
                borderWidth: 3,
                borderColor: Colors.tropicalRed,
                marginVertical: 10,
                borderRadius: 10,
                transform: [{ translateX: leftValueFourthView }],
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
                <Text style={styles.informationText}>Accuracy:</Text>
                <Text style={styles.informationText}>
                  {calcPercentage(
                    props.guessHexHardTotalRight,
                    props.guessHexHardTotalTries
                  )}
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              style={{
                width: "100%",
                alignItems: "center",
                borderWidth: 3,
                borderColor: Colors.tropicalGreen,
                paddingBottom: 15,
                borderRadius: 10,
                transform: [{ translateX: leftValueFifthView }],
              }}
            >
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={{
                    ...styles.informationText,
                    alignSelf: "flex-start",
                    marginLeft: 0,
                  }}
                >
                  Colors Guessed
                </Text>
              </View>

              <FlatList
                data={guessHexColors}
                style={styles.hexGuesserScroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 2,
                  paddingRight: 7,
                }}
                renderItem={({ item }) => (
                  <View>
                    {item.map((color, index) => {
                      return <ColorCircle color={color} key={index} />;
                    })}
                  </View>
                )}
                keyExtractor={(item) => item[0]}
              />
            </Animated.View>
          </View>
          <Text style={styles.gameHeader}>Playground Palette</Text>
          <FlatList
            nestedScrollEnabled={true}
            data={props.playgroundPalette}
            style={styles.colorPaletteScroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "space-evenly",
                  paddingTop: 6,
                  alignItems: "center",
                }}
              >
                {item.map((color, index) => {
                  return <ColorMixedBox color={color} key={color + index} />;
                })}
              </View>
            )}
            contentContainerStyle={{
              paddingRight: 10,
              paddingLeft: 5,
              justifyContent: "space-evenly",
              flexGrow: 1,
            }}
            keyExtractor={(item) => item[0]}
          />
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
    playgroundPalette: state.auth.palette,
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
    paddingBottom: 0,
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
    borderWidth: 3,
    alignSelf: "center",
    borderColor: "#1995ad",
    borderRadius: 10,
    backgroundColor: "ivory",
    marginTop: 10,
    padding: 10,
    paddingRight: 0,
    height: 170,
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
    minHeight: 50,
  },
  hexGuesser: {
    width: "100%",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
