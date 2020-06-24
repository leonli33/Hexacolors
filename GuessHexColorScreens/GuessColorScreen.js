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

class GuessColorScreen extends Component {
  constructor() {
    super();
    this.state = {
      redHex: "00",
      greenHex: "00",
      blueHex: "00",
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: "Guess the color",
      headerStyle: { backgroundColor: Colors.tropicalYellow },
      gestureEnabled: false,
    });
  }

  handleSliderColorChange = (number, color) => {
    let hexString = number.toString(16);
    if (hexString === "0") hexString = "00";
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

  convertDecimalToHex = () => {};

  render() {
    return (
      <View style={styles.container}>
        <View style={{}}>
          <Text style={styles.hex}>#5576FA</Text>
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
          <Text style={styles.resultGuessText}>Guess a Color!</Text>
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
            <View style={{ marginRight: 20 }}>
              <ColorOption />
              <ColorOption />
            </View>
            <View style={{ marginRight: 20 }}>
              <ColorOption />
              <ColorOption />
            </View>
            <View style={{ marginRight: 20 }}>
              <ColorOption />
              <ColorOption />
            </View>
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
    alignSelf: "center",
    fontSize: 18,
    marginTop: 15,
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: "10%",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default GuessColorScreen;
