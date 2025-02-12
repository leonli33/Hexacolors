import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import Colors from "../Constants/Colors";
import Font from "../Constants/Font";
import Slider from "react-native-slider";
import { isTablet } from "../Functions/GeneralFunctions";
import ColorOption from "../Components/GuessTheColor/ColorOption";
import { connect } from "react-redux";
import ResultTextColorBox from "../Components/GuessTheColor/ResultTextColorBox";
import GuessHexGameWon from "./GuessHexGameWon";
import ColorValue from "../Components/PlaygroundComponents/ColorValue";
import ColorSliderResult from "../Components/GuessTheColor/ColorSliderResult";
import {
  CreateNewColorToGuess,
  GenerateColorsToGuessEasy,
  GenerateColorsToGuessMedium,
  GenerateColorsToGuessHard,
} from "../Redux/Actions";

class GuessColorScreen extends Component {
  constructor() {
    super();
    this.state = {
      redHex: "00",
      greenHex: "00",
      blueHex: "00",
      hiddenColors: [],
      resultAfterGuess: "Guess a Color!",
      lastGuessedColor: "",
      gameWon: false,
      redValue: 0,
      greenValue: 0,
      blueValue: 0,
      sliderMoving: false,
      textToFadeIn: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.renderAllColors();
    this.fadeInText();
  }

  // Fade in the color to be guessed
  fadeInText = () => {
    setTimeout(() => {
      Animated.timing(this.state.textToFadeIn, {
        toValue: 1,
        timing: 700,
      }).start();
    }, 400);
  };

  // Reset all properties and render new colors for the level
  renderAllColors = () => {
    const { difficulty } = this.props.route.params;
    let color = this.getBackgroundColorForLevel(difficulty);
    this.props.navigation.setOptions({
      title: "Guess the color",
      headerStyle: { backgroundColor: color },
      gestureEnabled: false,
    });
    this.setState({
      gameWon: false,
      resultAfterGuess: "Guess a Color!",
      lastGuessedColor: "white",
      redHex: "00",
      greenHex: "00",
      blueHex: "00",
      blueValue: 0,
      redValue: 0,
      greenValue: 0,
      hiddenColors: [],
      sliderMoving: false,
      textToFadeIn: new Animated.Value(0),
    });
    this.props.CreateNewColorToGuess();
    this.createColorOptions(difficulty);
  };

  // Generate the color options based on the difficulty
  createColorOptions = (difficulty) => {
    if (difficulty === "Easy") {
      this.props.GenerateColorsToGuessEasy();
    } else if (difficulty === "Medium") {
      this.props.GenerateColorsToGuessMedium();
    } else if (difficulty === "Hard") {
      this.props.GenerateColorsToGuessHard();
    }
  };

  // Get the appropriate background color for the title
  getBackgroundColorForLevel = (difficulty) => {
    let color = Colors.tropicalYellow;
    if (difficulty === "Medium") {
      color = Colors.tropicalBlue;
    } else if (difficulty === "Hard") {
      color = Colors.tropicalRed;
    }
    return color;
  };

  // Updates color whenever the slider changes
  handleSliderColorChange = (number, color) => {
    let hexString = number.toString(16);
    if (hexString.length === 1) hexString = `0${hexString}`;
    if (color === "red") {
      this.setState({
        redHex: hexString,
        redValue: number,
        sliderMoving: true,
      });
    } else if (color === "green") {
      this.setState({
        greenHex: hexString,
        greenValue: number,
        sliderMoving: true,
      });
    } else {
      this.setState({
        blueHex: hexString,
        blueValue: number,
        sliderMoving: true,
      });
    }
  };

  // Logic for when a color is guessed
  handleColorPressed = (color) => {
    let arr = this.state.hiddenColors;
    arr.push(color);
    if (color === this.props.targetColor) {
      if (this.props.signedIn) {
        this.updateColorsCompletedFirebase(this.props.targetColor);
      }
      this.setState({
        lastGuessedColor: "",
        gameWon: true,
        hiddenColors: arr,
      });
    } else {
      this.setState({
        resultAfterGuess: "Almost! You guessed " + color,
        lastGuessedColor: color,
        hiddenColors: arr,
      });
    }
    if (this.props.signedIn) {
      this.updatedColorsClicked();
    }
  };

  // Update the information in firebase
  updateColorsCompletedFirebase = async (color) => {
    const { difficulty } = this.props.route.params;
    if (difficulty === "Easy") {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.props.userId)
          .update({
            guess_hex_easy_total_right: firebase.firestore.FieldValue.increment(
              1
            ),
            guess_hex_colors_guessed: firebase.firestore.FieldValue.arrayUnion(
              color
            ),
          });
      } catch (error) {
        let errorMessage = error.message;
        Alert.alert("An error has occured!", "" + errorMessage, [
          { text: "Okay" },
        ]);
      }
    } else if (difficulty === "Medium") {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.props.userId)
          .update({
            guess_hex_medium_total_right: firebase.firestore.FieldValue.increment(
              1
            ),
            guess_hex_colors_guessed: firebase.firestore.FieldValue.arrayUnion(
              color
            ),
          });
      } catch (error) {
        let errorMessage = error.message;
        Alert.alert("An error has occured!", "" + errorMessage, [
          { text: "Okay" },
        ]);
      }
    } else {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.props.userId)
          .update({
            guess_hex_hard_total_right: firebase.firestore.FieldValue.increment(
              1
            ),
            guess_hex_colors_guessed: firebase.firestore.FieldValue.arrayUnion(
              color
            ),
          });
      } catch (error) {
        let errorMessage = error.message;
        Alert.alert("An error has occured!", "" + errorMessage, [
          { text: "Okay" },
        ]);
      }
    }
  };

  // Update the color guessed in firebase
  updatedColorsClicked = async () => {
    const { difficulty } = this.props.route.params;
    if (difficulty === "Easy") {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.props.userId)
          .update({
            guess_hex_easy_total_tries: firebase.firestore.FieldValue.increment(
              1
            ),
          });
      } catch (error) {
        let errorMessage = error.message;
        Alert.alert("An error has occured!", "" + errorMessage, [
          { text: "Okay" },
        ]);
      }
    } else if (difficulty === "Medium") {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.props.userId)
          .update({
            guess_hex_medium_total_tries: firebase.firestore.FieldValue.increment(
              1
            ),
          });
      } catch (error) {
        let errorMessage = error.message;
        Alert.alert("An error has occured!", "" + errorMessage, [
          { text: "Okay" },
        ]);
      }
    } else {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.props.userId)
          .update({
            guess_hex_hard_total_tries: firebase.firestore.FieldValue.increment(
              1
            ),
          });
      } catch (error) {
        let errorMessage = error.message;
        Alert.alert("An error has occured!", "" + errorMessage, [
          { text: "Okay" },
        ]);
      }
    }
  };

  handleBackPressed = () => {
    this.props.navigation.navigate("GuessHexDifficultyScreen");
  };

  handlePlayAgainPressed = () => {
    this.renderAllColors();
    this.fadeInText();
  };

  // Return the appropriate amount of color options based on difficulty
  getColorOptions = () => {
    const { difficulty } = this.props.route.params;
    let colors;
    if (difficulty === "Easy") {
      colors = this.props.easyColorOptions;
    } else if (difficulty === "Medium") {
      colors = this.props.mediumColorOptions;
    } else {
      colors = this.props.hardColorOptions;
    }
    return colors.map((colorArr, arrIndex) => {
      return (
        <View
          style={{
            justifyContent: "space-evenly",
            marginRight: 25,
          }}
          key={arrIndex}
        >
          {colorArr.map((color, index) => {
            return (
              <View
                key={index + arrIndex * 2}
                style={{ marginTop: index === 0 ? 0 : 30 }}
              >
                <ColorOption
                  hiddenColors={this.state.hiddenColors}
                  pressed={this.handleColorPressed}
                  color={color}
                  lastGuessedColor={this.state.lastGuessedColor}
                  sliderMoving={this.state.sliderMoving}
                />
              </View>
            );
          })}
        </View>
      );
    });
  };

  // Show the appropriate text in the boxes above the color sliders based on difficuly
  returnCurrentColorValue = (color) => {
    const { difficulty } = this.props.route.params;
    let index = 0;
    if (difficulty === "Medium") index = 1;
    if (difficulty === "Hard") index = 2;
    if (color === "red") {
      let valueArr = [this.state.redHex.toUpperCase(), this.state.redValue, ""];
      return valueArr[index];
    } else if (color === "green") {
      let valueArr = [
        this.state.greenHex.toUpperCase(),
        this.state.greenValue,
        "",
      ];
      return valueArr[index];
    } else {
      let valueArr = [
        this.state.blueHex.toUpperCase(),
        this.state.blueValue,
        "",
      ];
      return valueArr[index];
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <GuessHexGameWon
          visiblity={this.state.gameWon}
          colorsGuessed={this.state.hiddenColors}
          targetColor={this.props.targetColor}
          backPress={this.handleBackPressed}
          playAgainPress={this.handlePlayAgainPressed}
        />
        <View style={styles.hexContainer}>
          <Animated.Text
            style={{ ...styles.hex, opacity: this.state.textToFadeIn }}
          >
            {this.props.targetColor}
          </Animated.Text>
        </View>

        <View
          style={{
            width: "90%",
            height: "30%",
            flexDirection: "row",
            marginTop: "3%",
            alignItems: "center",
            marginTop: -15,
          }}
        >
          <View style={styles.sliderColorContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <ColorValue
                borderColor={Colors.tropicalRed}
                currentValue={this.returnCurrentColorValue("red")}
              />
              <ColorValue
                borderColor={Colors.tropicalGreen}
                currentValue={this.returnCurrentColorValue("green")}
              />
              <ColorValue
                borderColor={Colors.tropicalBlue}
                currentValue={this.returnCurrentColorValue("blue")}
              />
            </View>
            <Slider
              maximumValue={255}
              style={{ width: "100%" }}
              thumbTintColor={Colors.tropicalRed}
              minimumTrackTintColor={Colors.tropicalRed}
              value={this.state.redValue}
              onValueChange={(value) => {
                this.handleSliderColorChange(Math.round(value), "red");
              }}
              onSlidingComplete={() => {
                this.setState({
                  sliderMoving: false,
                });
              }}
            />
            <Slider
              maximumValue={255}
              style={{ width: "100%" }}
              thumbTintColor={Colors.tropicalGreen}
              minimumTrackTintColor={Colors.tropicalGreen}
              value={this.state.greenValue}
              onValueChange={(value) => {
                this.handleSliderColorChange(Math.round(value), "green");
              }}
              onSlidingComplete={() => {
                this.setState({
                  sliderMoving: false,
                });
              }}
            />
            <Slider
              maximumValue={255}
              style={{ width: "100%" }}
              thumbTintColor={Colors.tropicalBlue}
              minimumTrackTintColor={Colors.tropicalBlue}
              value={this.state.blueValue}
              onValueChange={(value) => {
                this.handleSliderColorChange(Math.round(value), "blue");
              }}
              onSlidingComplete={() => {
                this.setState({
                  sliderMoving: false,
                });
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              height: "100%",
              marginLeft: "2%",
              marginTop: -15,
            }}
          >
            <View style={{ flexDirection: "row", width: "40%", height: "40%" }}>
              <ColorSliderResult
                color={`#00${this.state.greenHex}00`}
                borderCol={Colors.tropicalGreen}
              />
              <ColorSliderResult
                color={`#0000${this.state.blueHex}`}
                borderCol={Colors.tropicalBlue}
              />
            </View>
            <View style={{ flexDirection: "row", width: "40%", height: "40%" }}>
              <ColorSliderResult
                color={`#${this.state.redHex}0000`}
                borderCol={Colors.tropicalRed}
              />
              <ColorSliderResult
                color={`#${this.state.redHex}${this.state.greenHex}${this.state.blueHex}`}
                borderCol={"black"}
              />
            </View>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.resultText}>
            <Text style={styles.resultGuessText}>
              {this.state.resultAfterGuess}
            </Text>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                height: "100%",
                width: "93%",
                position: "absolute",
              }}
            >
              <ResultTextColorBox color={this.state.lastGuessedColor} />
            </View>
          </View>
          <ScrollView
            style={styles.scroll}
            horizontal={true}
            contentContainerStyle={{
              justifyContent: "space-evenly",
              flexGrow: 1,
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            directionalLockEnabled={true}
          >
            {this.getColorOptions()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hex: {
    fontSize: isTablet(Dimensions.get("window").height) ? 65 : 45,
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  hexContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    margin: "8%",
    minHeight: 60,
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 1 },
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "lavender",
    justifyContent: "space-between",
  },
  scroll: {
    width: "100%",
    paddingVertical: 15,
    paddingLeft: 20,
    marginTop: 15,
    backgroundColor: Colors.buttonBackground,
    paddingRight: 5,
  },
  colorView: {
    width: "35%",
    height: "75%",
    borderWidth: 1,
    margin: "5%",
    borderRadius: 10,
    alignSelf: "center",
  },
  resultGuessText: {
    fontSize: isTablet(Dimensions.get("window").height)
      ? Font.tabletTextSize
      : Font.regularTextSize,
    alignSelf: "center",
    position: "absolute",
  },
  sliderColorContainer: {
    alignSelf: "flex-start",
    width: "50%",
    justifyContent: "space-evenly",
    height: "100%",
  },
  resultText: {
    width: "90%",
    height: isTablet(Dimensions.get("window").height) ? 55 : 40,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: "center",
  },
});

function mapStateToProps(state) {
  return {
    targetColor: state.hexGuesser.targetColorToGuess,
    easyColorOptions: state.hexGuesser.guessHexEasyColorOptions,
    mediumColorOptions: state.hexGuesser.guessHexMediumColorOptions,
    hardColorOptions: state.hexGuesser.guessHexHardColorOptions,
    signedIn: state.auth.signedIn,
    userId: state.auth.userID,
  };
}

export default connect(mapStateToProps, {
  CreateNewColorToGuess,
  GenerateColorsToGuessEasy,
  GenerateColorsToGuessMedium,
  GenerateColorsToGuessHard,
})(GuessColorScreen);
