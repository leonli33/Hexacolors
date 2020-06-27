import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import Colors from "../Constants/Colors";
import Slider from "react-native-slider";
import ColorOption from "../Components/GuessTheColor/ColorOption";
import { connect } from "react-redux";
import ResultTextColorBox from "../Components/GuessTheColor/ResultTextColorBox";
import GuessHexGameWon from "./GuessHexGameWon";
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
    };
  }

  componentDidMount() {
    this.renderAllColors();
  }

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
    });
    this.props.CreateNewColorToGuess();
    this.createColorOptions(difficulty);
  };

  createColorOptions = (difficulty) => {
    if (difficulty === "Easy") {
      this.props.GenerateColorsToGuessEasy();
    } else if (difficulty === "Medium") {
      this.props.GenerateColorsToGuessMedium();
    } else if (difficulty === "Hard") {
      this.props.GenerateColorsToGuessHard();
    }
  };

  getBackgroundColorForLevel = (difficulty) => {
    let color = Colors.tropicalYellow;
    if (difficulty === "Medium") {
      color = Colors.tropicalBlue;
    } else if (difficulty === "Hard") {
      color = Colors.tropicalRed;
    }
    return color;
  };

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

  handleColorPressed = (color) => {
    let arr = this.state.hiddenColors;
    arr.push(color);
    if (color === this.props.targetColor) {
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
  };

  handleBackPressed = () => {
    this.props.navigation.navigate("GuessHexDifficultyScreen");
  };

  handlePlayAgainPressed = () => {
    this.renderAllColors();
  };

  getColorOptions = () => {
    const { difficulty } = this.props.route.params;
    if (difficulty === "Easy") {
      return this.props.easyColorOptions.map((colorArr, arrIndex) => {
        return (
          <View style={{ marginRight: 20 }} key={arrIndex}>
            {colorArr.map((color, index) => {
              return (
                <View key={index + arrIndex * 2}>
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
    } else if (difficulty === "Medium") {
      return this.props.mediumColorOptions.map((colorArr, arrIndex) => {
        return (
          <View style={{ marginRight: 20 }} key={arrIndex}>
            {colorArr.map((color, index) => {
              return (
                <View key={index + arrIndex * 2}>
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
    } else {
      return this.props.hardColorOptions.map((colorArr, arrIndex) => {
        return (
          <View style={{ marginRight: 20 }} key={arrIndex}>
            {colorArr.map((color, index) => {
              return (
                <View key={index + arrIndex * 2}>
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
        <View>
          <Text style={styles.hex}>{this.props.targetColor}</Text>
        </View>
        <View
          style={{
            width: "90%",
            height: "25%",
            flexDirection: "row",
            marginTop: "7%",
          }}
        >
          <View style={styles.sliderColorContainer}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text style={{ alignSelf: "flex-start", fontSize: 18 }}>#00</Text>
              <Text
                style={{
                  alignSelf: "flex-end",
                  marginLeft: "70%",
                  fontSize: 18,
                }}
              >
                #FF
              </Text>
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
              ...styles.colorView,
              backgroundColor: `#${this.state.redHex}${this.state.greenHex}${this.state.blueHex}`,
            }}
          ></View>
        </View>

        <View style={styles.resultText}>
          <Text style={styles.resultGuessText}>
            {this.state.resultAfterGuess}
          </Text>
          <ResultTextColorBox color={this.state.lastGuessedColor} />
        </View>

        <View style={styles.colorContainer}>
          <ScrollView
            style={styles.scroll}
            horizontal={true}
            contentContainerStyle={{
              justifyContent: "space-evenly",
              flexGrow: 1,
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
    fontSize: 45,
    alignSelf: "center",
    margin: "8%",
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "lavender",
  },
  colorContainer: {
    backgroundColor: Colors.buttonBackground,
    width: "100%",
    alignSelf: "center",
    height: "40%",
    marginTop: "5%",
  },
  scroll: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    marginTop: -10,
  },
  colorView: {
    width: "35%",
    height: "90%",
    borderWidth: 1,
    margin: "5%",
    borderRadius: 10,
    alignSelf: "center",
  },
  resultGuessText: {
    fontSize: 17,
    marginTop: 15,
    alignSelf: "center",
    position: "absolute",
  },
  sliderColorContainer: {
    alignSelf: "flex-start",
    width: "60%",
    justifyContent: "space-evenly",
    height: "100%",
  },
  resultText: {
    width: "90%",
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    marginTop: Dimensions.get("window").height > 700 ? "15%" : "9%",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

function mapStateToProps(state) {
  return {
    targetColor: state.targetColorToGuess,
    easyColorOptions: state.guessHexEasyColorOptions,
    mediumColorOptions: state.guessHexMediumColorOptions,
    hardColorOptions: state.guessHexHardColorOptions,
  };
}

export default connect(mapStateToProps, {
  CreateNewColorToGuess,
  GenerateColorsToGuessEasy,
  GenerateColorsToGuessMedium,
  GenerateColorsToGuessHard,
})(GuessColorScreen);
