import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Colors from "../Constants/Colors";
import Slider from "react-native-slider";
import ColorOption from "../Components/GuessTheColor/ColorOption";
import { connect } from "react-redux";
import ResultTextColorBox from "../Components/GuessTheColor/ResultTextColorBox";
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
      colorOptions: [],
    };
  }

  componentDidMount() {
    const { difficulty } = this.props.route.params;
    let color = this.getBackgroundColorForLevel(difficulty);
    this.props.navigation.setOptions({
      title: "Guess the color",
      headerStyle: { backgroundColor: color },
      gestureEnabled: false,
    });
    this.props.CreateNewColorToGuess();
    this.createColorOptions(difficulty);
  }

  createColorOptions = (difficulty) => {
    if (difficulty === "Easy") {
      this.props.GenerateColorsToGuessEasy();
      this.state.colorOptions = this.props.easyColorOptions;
    } else if (difficulty === "Medium") {
      this.props.GenerateColorsToGuessMedium();
      this.setState({
        colorOptions: this.props.mediumColorOptions,
      });
    } else if (difficulty === "Hard") {
      this.props.GenerateColorsToGuessHard();
      this.setState({
        colorOptions: this.props.hardColorOptions,
      });
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
      });
    } else if (color === "green") {
      this.setState({
        greenHex: hexString,
      });
    } else {
      this.setState({
        blueHex: hexString,
      });
    }
  };

  handleColorPressed = (color) => {
    if (color === this.props.targetColor) {
      this.setState({
        resultAfterGuess: "Nice Job!",
        lastGuessedColor: "",
      });
    } else {
      let arr = this.state.hiddenColors;
      arr.push(color);
      this.setState({
        resultAfterGuess: "Almost! You guessed " + color,
        lastGuessedColor: color,
        hiddenColors: arr,
      });
    }
  };

  getColorOptions = () => {
    const { difficulty } = this.props.route.params;
    if (difficulty === "Easy") {
      return this.props.easyColorOptions.map((colorArr, arrIndex) => {
        return (
          <View style={{ marginRight: 20 }} key={arrIndex + 20}>
            {colorArr.map((color, index) => {
              return (
                <View key={index + arrIndex * 2}>
                  <ColorOption
                    hiddenColors={this.state.hiddenColors}
                    pressed={this.handleColorPressed}
                    color={color}
                    lastGuessedColor={this.state.lastGuessedColor}
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
          <View style={{ marginRight: 20 }} key={arrIndex + 20}>
            {colorArr.map((color, index) => {
              return (
                <View key={index + arrIndex * 2}>
                  <ColorOption
                    hiddenColors={this.state.hiddenColors}
                    pressed={this.handleColorPressed}
                    color={color}
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
          <View style={{ marginRight: 20 }} key={arrIndex + 20}>
            {colorArr.map((color, index) => {
              return (
                <View key={index + arrIndex * 2}>
                  <ColorOption
                    hiddenColors={this.state.hiddenColors}
                    pressed={this.handleColorPressed}
                    color={color}
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
        <View style={{}}>
          <Text style={styles.hex}>{this.props.targetColor}</Text>
        </View>
        <View style={{ width: "90%", height: "25%", flexDirection: "row" }}>
          <View style={styles.sliderColorContainer}>
            <Slider
              maximumValue={255}
              style={{ width: "100%" }}
              thumbTintColor={Colors.tropicalRed}
              minimumTrackTintColor={Colors.tropicalRed}
              onValueChange={(value) => {
                this.handleSliderColorChange(Math.round(value), "red");
              }}
            />
            <Slider
              maximumValue={255}
              style={{ width: "100%" }}
              thumbTintColor={Colors.tropicalGreen}
              minimumTrackTintColor={Colors.tropicalGreen}
              onValueChange={(value) => {
                this.handleSliderColorChange(Math.round(value), "green");
              }}
            />
            <Slider
              maximumValue={255}
              style={{ width: "100%" }}
              thumbTintColor={Colors.tropicalBlue}
              minimumTrackTintColor={Colors.tropicalBlue}
              onValueChange={(value) => {
                this.handleSliderColorChange(Math.round(value), "blue");
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
          <View style={{ marginLeft: "85%", marginTop: 20 }}>
            <ResultTextColorBox color={this.state.lastGuessedColor} />
          </View>
        </View>

        <View style={styles.colorContainer}>
          <ScrollView
            style={styles.scroll}
            horizontal={true}
            contentContainerStyle={{
              justifyContent: "space-evenly",
              flexGrow: 1,
            }}
          >
            {this.getColorOptions()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

/*
{this.props.mediumColorOptions.map((colorArr, arrIndex) => {
              return (
                <View style={{ marginRight: 20 }} key={arrIndex + 20}>
                  {colorArr.map((color, index) => {
                    return (
                      <View key={index + arrIndex * 2}>
                        <ColorOption
                          hiddenColors={this.state.hiddenColors}
                          pressed={this.handleColorPressed}
                          color={color}
                        />
                      </View>
                    );
                  })}
                </View>
              );
            })}

*/

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
    height: "45%",
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
    height: "80%",
    borderWidth: 1,
    margin: "5%",
    borderRadius: 10,
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
    marginTop: "10%",
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
