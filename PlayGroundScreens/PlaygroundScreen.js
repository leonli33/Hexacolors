import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Colors from "../Constants/Colors";
import Slider from "react-native-slider";
import ColorMixedBox from "../Components/PlaygroundComponents/ColorMixedBox";
import ColorOptions from "../Components/PlaygroundComponents/ColorOption";
import ColorValue from "../Components/PlaygroundComponents/ColorValue";
import MixColors from "../Functions/MixColor";
import Convert from "color-convert";
import { connect } from "react-redux";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import {
  AddColorToPlaygroundList,
  RemoveColorFromPlaygroundList,
  ResetPlaygroundColors,
  AddUserChosenColorPlayground,
  RemoveUserChosenColorPlayground,
} from "../Redux/Actions";

class PlaygroundScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redValue: 0,
      greenValue: 0,
      blueValue: 0,
      redHexValue: "00",
      greenHexValue: "00",
      blueHexValue: "00",
    };
  }

  componentDidMount() {
    this.props.ResetPlaygroundColors();
    this.props.navigation.setOptions({
      gestureEnabled: false,
    });
  }

  // Executed whenever the user moves a color slider
  handleSliderColorChange = (number, color) => {
    this.props.ResetPlaygroundColors();
    let hexString = number.toString(16);
    if (hexString.length === 1) hexString = `0${hexString}`;
    if (color === "red") {
      this.setState({
        redValue: number,
        redHexValue: hexString,
      });
    } else if (color === "green") {
      this.setState({
        greenValue: number,
        greenHexValue: hexString,
      });
    } else {
      this.setState({
        blueValue: number,
        blueHexValue: hexString,
      });
    }
  };

  // Logic behind when a user selects a color option
  handleColorOptionSelected = (color) => {
    if (this.props.colors.includes(color)) {
      // If there are no more selected colors, reset all the colors
      if (this.props.colors.length <= 1) {
        this.props.ResetPlaygroundColors();
        this.setState({
          redValue: 0,
          greenValue: 0,
          blueValue: 0,
          redHexValue: "00",
          greenHexValue: "00",
          blueHexValue: "00",
        });
      } else {
        // Get new colors that results from remaining selected colors
        let newArr = [...this.props.colors];
        let index = newArr.indexOf(color);
        newArr.splice(index, 1);
        let newColor = MixColors(newArr).toUpperCase();
        this.setHexValuesOnMixColors(newColor);
      }
      // Remove the color pressed
      this.props.RemoveUserChosenColorPlayground(color);
    } else {
      // User wants to add a color to the mix
      if (this.props.colors.length === 0) {
        // If there are currently no selected colors, then the color that the user selects is the
        // color to be displayed
        this.setHexValuesOnMixColors(color);
      } else {
        // Otherwise, mix all of the currently selected colors together and form a new color
        let newColor = MixColors(
          this.props.colors.concat([color])
        ).toUpperCase();
        this.setHexValuesOnMixColors(newColor);
      }
      this.props.AddUserChosenColorPlayground(color);
    }
  };

  // Set the values of the new color mixed
  setHexValuesOnMixColors = (color) => {
    let redHex = color.substring(1, 3);
    let greenHex = color.substring(3, 5);
    let blueHex = color.substring(5, 7);
    let decimalValueRed = parseInt(redHex, 16);
    let decimalValueGreen = parseInt(greenHex, 16);
    let decimalValueBlue = parseInt(blueHex, 16);
    this.setState({
      redHexValue: redHex,
      greenHexValue: greenHex,
      blueHexValue: blueHex,
      redValue: decimalValueRed,
      greenValue: decimalValueGreen,
      blueValue: decimalValueBlue,
    });
  };

  // Clear all the colors that are selected and reset color values
  clearSelectedColors = () => {
    this.props.ResetPlaygroundColors();
    this.setState({
      redValue: 0,
      greenValue: 0,
      blueValue: 0,
      redHexValue: "00",
      greenHexValue: "00",
      blueHexValue: "00",
    });
  };

  // Add a color to the palette
  handleAddColorPressed = () => {
    let colorToAdd = `#${this.state.redHexValue.toUpperCase()}${this.state.greenHexValue.toUpperCase()}${this.state.blueHexValue.toUpperCase()}`;
    if (
      colorToAdd != "#000000" &&
      !this.props.playgroundColors.has(colorToAdd)
    ) {
      this.props.AddColorToPlaygroundList(colorToAdd);
      if (this.props.signedIn) {
        this.addColorFirebase(colorToAdd);
      }

      this.clearSelectedColors();
      setTimeout(() => {
        this.scrollRef.scrollToEnd({ animated: true });
      }, 50);
    } else {
      if (colorToAdd != "#000000") {
        alert("This color is already present in your palette");
      }
    }
  };

  // Store the new color in firebase
  addColorFirebase = (color) => {
    try {
      firebase
        .firestore()
        .collection("users")
        .doc(this.props.userID)
        .update({
          playground_palette: firebase.firestore.FieldValue.arrayUnion(color),
        });
    } catch (error) {
      let errorMessage = error.message;
      Alert.alert("An error has occured!", "" + errorMessage, [
        { text: "Okay" },
      ]);
    }
  };

  // Remove a color form the palette
  handleRemoveColorsPressed = () => {
    this.props.RemoveColorFromPlaygroundList(this.props.colors);
    if (this.props.signedIn && this.props.colors.length != 0) {
      try {
        firebase
          .firestore()
          .collection("users")
          .doc(this.props.userID)
          .update({
            playground_palette: Array.from(this.props.playgroundColors),
          });
      } catch (error) {
        let errorMessage = error.message;
        Alert.alert("An error has occured!", "" + errorMessage, [
          { text: "Okay" },
        ]);
      }
    }
    this.clearSelectedColors();
  };

  render() {
    // Get the name of the color closest to currently selected color
    let hexColor = `#${this.state.redHexValue.toUpperCase()}${this.state.greenHexValue.toUpperCase()}${this.state.blueHexValue.toUpperCase()}`;
    let color = Convert.hex.keyword(hexColor);

    return (
      <View style={styles.container}>
        <View
          style={{
            width: "90%",
            height: "35%",
            flexDirection: "row",
            marginTop: "3%",
          }}
        >
          <View style={styles.sliderColorContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <ColorValue
                borderColor={Colors.tropicalRed}
                currentValue={this.state.redValue}
              />
              <ColorValue
                borderColor={Colors.tropicalGreen}
                currentValue={this.state.greenValue}
              />
              <ColorValue
                borderColor={Colors.tropicalBlue}
                currentValue={this.state.blueValue}
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
            />
            <Slider
              maximumValue={255}
              style={{ width: "100%", marginBottom: -10 }}
              thumbTintColor={Colors.tropicalBlue}
              minimumTrackTintColor={Colors.tropicalBlue}
              value={this.state.blueValue}
              onValueChange={(value) => {
                this.handleSliderColorChange(Math.round(value), "blue");
              }}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={this.handleAddColorPressed}
            >
              <Text>Add Color</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "40%",
              height: "100%",
              alignSelf: "center",
              margin: "3%",
              marginLeft: "8%",
            }}
          >
            <Text
              style={{ fontSize: 20, alignSelf: "center", marginBottom: 5 }}
            >{`#${this.state.redHexValue.toUpperCase()}${this.state.greenHexValue.toUpperCase()}${this.state.blueHexValue.toUpperCase()}`}</Text>
            <View
              style={{
                ...styles.colorView,
                backgroundColor: `#${this.state.redHexValue}${this.state.greenHexValue}${this.state.blueHexValue}`,
              }}
            />
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              {color}
            </Text>
          </View>
        </View>
        <View style={{ height: "15%", width: "100%", marginTop: -4 }}>
          <ScrollView
            horizontal={true}
            style={styles.scroll}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            disableIntervalMomentum={true}
            decelerationRate={0}
          >
            {this.props.colors.map((color, index) => {
              return <ColorMixedBox color={color} key={index} />;
            })}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            height: 50,
            alignItems: "center",
            marginTop: "3%",
            alignSelf: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={styles.clearSelectedColors}
            onPress={this.clearSelectedColors}
          >
            <Text>Clear Selected Colors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeSelectedColors}
            onPress={this.handleRemoveColorsPressed}
          >
            <Text>Remove Colors</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollViewColorMix}
          showsVerticalScrollIndicator={false}
          ref={(node) => (this.scrollRef = node)}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-evenly",
          }}
        >
          {this.props.palette.map((playColors, rowindex) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  height: Dimensions.get("window").width * (4 / 13),
                }}
                key={rowindex + 1000}
              >
                {playColors.map((color, index) => {
                  return (
                    <ColorOptions
                      key={index + rowindex * 4}
                      color={color}
                      handleSelected={this.handleColorOptionSelected}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    palette: state.playground.playgroundModePalette,
    colors: state.playground.currentColorsChosen,
    userID: state.auth.userID,
    signedIn: state.auth.signedIn,
    playgroundColors: state.playground.paletteColorsSet,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lavender",
  },
  colorView: {
    width: "100%",
    height: "65%",
    borderRadius: 10,
    borderWidth: 1,
  },
  sliderColorContainer: {
    alignSelf: "flex-start",
    width: "50%",
    justifyContent: "space-evenly",
    height: "100%",
  },
  addButton: {
    width: "100%",
    height: 35,
    borderRadius: 10,
    backgroundColor: Colors.buttonBackground,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
  },
  scroll: {
    backgroundColor: "ivory",
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginTop: "5%",
    paddingLeft: 10,
  },
  scrollViewColorMix: {
    width: "100%",
    backgroundColor: "ivory",
    marginTop: "3%",
    paddingTop: 10,
    height: "55%",
  },
  clearSelectedColors: {
    height: 40,
    borderRadius: 15,
    backgroundColor: Colors.buttonBackground,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    paddingHorizontal: 17,
  },
  removeSelectedColors: {
    height: 40,
    borderRadius: 15,
    backgroundColor: Colors.buttonBackground,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 1 },
    paddingHorizontal: 17,
  },
});

export default connect(mapStateToProps, {
  AddUserChosenColorPlayground,
  RemoveUserChosenColorPlayground,
  ResetPlaygroundColors,
  AddColorToPlaygroundList,
  RemoveColorFromPlaygroundList,
})(PlaygroundScreen);
