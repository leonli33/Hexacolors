import React, { useState, useEffect } from "react";
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
import ColorOption from "../Components/PlaygroundComponents/ColorOption";
import ColorValue from "../Components/PlaygroundComponents/ColorValue";
import MixColors from "../Functions/MixColor";
import Convert from "color-convert";
import { connect } from "react-redux";
import {
  AddUserChosenColor,
  RemoveUserChosenColor,
  ResetColors,
  AddColorToPlaygroundList,
  RemoveColorFromPlaygroundList,
} from "../Redux/Actions";

const PlaygroundScreen = (props) => {
  useEffect(() => {
    props.ResetColors();
  }, []);

  const [redValue, setRedValue] = useState(0);
  const [greenValue, setGreenValue] = useState(0);
  const [blueValue, setBlueValue] = useState(0);

  const [redHexValue, setRedHexValue] = useState("00");
  const [greenHexValue, setGreenHexValue] = useState("00");
  const [blueHexValue, setBlueHexValue] = useState("00");

  props.navigation.setOptions({
    gestureEnabled: false,
  });

  const handleSliderColorChange = (number, color) => {
    props.ResetColors();
    let hexString = number.toString(16);
    if (hexString.length === 1) hexString = `0${hexString}`;
    if (color === "red") {
      setRedHexValue(hexString);
      setRedValue(number);
    } else if (color === "green") {
      setGreenHexValue(hexString);
      setGreenValue(number);
    } else {
      setBlueHexValue(hexString);
      setBlueValue(number);
    }
  };

  const handleColorOptionSelected = (color) => {
    if (props.colors.includes(color)) {
      // Remove the color pressed
      props.RemoveUserChosenColor(color);
      // If there are no more selected colors, reset all the colors
      if (props.colors.length === 0) {
        props.ResetColors();

        setRedHexValue("00");
        setGreenHexValue("00");
        setBlueHexValue("00");
        setRedValue(0);
        setGreenValue(0);
        setBlueValue(0);
      } else {
        // Get new colors that results from remaining selected colors
        let newColor = MixColors(props.colors).toUpperCase();
        setHexValuesOnMixColors(newColor);
      }
    } else {
      // User wants to add a color to the mix
      props.AddUserChosenColor(color);
      if (props.colors.length === 0) {
        // If there are currently no selected colors, then the color that the user selects is the
        // color to be displayed
        setHexValuesOnMixColors(color);
      } else {
        // Otherwise, mix all of the currently selected colors together and form a new color
        let newColor = MixColors(props.colors).toUpperCase();
        setHexValuesOnMixColors(newColor);
      }
    }
  };

  const setHexValuesOnMixColors = (color) => {
    let redHex = color.substring(1, 3);
    let greenHex = color.substring(3, 5);
    let blueHex = color.substring(5, 7);
    setRedHexValue(redHex);
    setGreenHexValue(greenHex);
    setBlueHexValue(blueHex);

    let decimalValueRed = parseInt(redHex, 16);
    let decimalValueGreen = parseInt(greenHex, 16);
    let decimalValueBlue = parseInt(blueHex, 16);
    setRedValue(decimalValueRed);
    setGreenValue(decimalValueGreen);
    setBlueValue(decimalValueBlue);
  };

  const clearSelectedColors = () => {
    props.ResetColors();
    setRedHexValue("00");
    setGreenHexValue("00");
    setBlueHexValue("00");
    setRedValue(0);
    setGreenValue(0);
    setBlueValue(0);
  };

  const handleAddColorPressed = () => {
    if (
      `#${redHexValue.toUpperCase()}${greenHexValue.toUpperCase()}${blueHexValue.toUpperCase()}` !=
      "#000000"
    ) {
      props.AddColorToPlaygroundList(
        `#${redHexValue.toUpperCase()}${greenHexValue.toUpperCase()}${blueHexValue.toUpperCase()}`
      );
      clearSelectedColors();
      setTimeout(() => {
        scrollRef.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleRemoveColorsPressed = () => {
    props.RemoveColorFromPlaygroundList(props.colors);
    clearSelectedColors();
  };

  let hexColor = `#${redHexValue.toUpperCase()}${greenHexValue.toUpperCase()}${blueHexValue.toUpperCase()}`;
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
              currentValue={redValue}
            />
            <ColorValue
              borderColor={Colors.tropicalGreen}
              currentValue={greenValue}
            />
            <ColorValue
              borderColor={Colors.tropicalBlue}
              currentValue={blueValue}
            />
          </View>
          <Slider
            maximumValue={255}
            style={{ width: "100%" }}
            thumbTintColor={Colors.tropicalRed}
            minimumTrackTintColor={Colors.tropicalRed}
            value={redValue}
            onValueChange={(value) => {
              handleSliderColorChange(Math.round(value), "red");
            }}
          />
          <Slider
            maximumValue={255}
            style={{ width: "100%" }}
            thumbTintColor={Colors.tropicalGreen}
            minimumTrackTintColor={Colors.tropicalGreen}
            value={greenValue}
            onValueChange={(value) => {
              handleSliderColorChange(Math.round(value), "green");
            }}
          />
          <Slider
            maximumValue={255}
            style={{ width: "100%", marginBottom: -10 }}
            thumbTintColor={Colors.tropicalBlue}
            minimumTrackTintColor={Colors.tropicalBlue}
            value={blueValue}
            onValueChange={(value) => {
              handleSliderColorChange(Math.round(value), "blue");
            }}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddColorPressed}
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
          >{`#${redHexValue.toUpperCase()}${greenHexValue.toUpperCase()}${blueHexValue.toUpperCase()}`}</Text>
          <View
            style={{
              ...styles.colorView,
              backgroundColor: `#${redHexValue}${greenHexValue}${blueHexValue}`,
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
          {props.colors.map((color, index) => {
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
          onPress={clearSelectedColors}
        >
          <Text>Clear Selected Colors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeSelectedColors}
          onPress={handleRemoveColorsPressed}
        >
          <Text>Remove Colors</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollViewColorMix}
        showsVerticalScrollIndicator={false}
        ref={(node) => (scrollRef = node)}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
      >
        {props.palette.map((colors, rowindex) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                height: Dimensions.get("window").width * (4 / 13),
              }}
              key={rowindex + 1000}
            >
              {colors.map((color, index) => {
                return (
                  <ColorOption
                    key={index + rowindex * 4}
                    color={color}
                    handleSelected={handleColorOptionSelected}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    palette: state.playgroundModePalette,
    colors: state.colorsChosenSoFar,
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
  AddUserChosenColor,
  RemoveUserChosenColor,
  ResetColors,
  AddColorToPlaygroundList,
  RemoveColorFromPlaygroundList,
})(PlaygroundScreen);
