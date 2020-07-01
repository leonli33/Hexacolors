import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../Constants/Colors";
import Slider from "react-native-slider";
import ColorMixedBox from "../Components/PlaygroundComponents/ColorMixedBox";
import ColorOption from "../Components/PlaygroundComponents/ColorOption";
import ColorValue from "../Components/PlaygroundComponents/ColorValue";
import Convert from "color-convert";
import { connect } from "react-redux";

const PlaygroundScreen = (props) => {
  const [redValue, setRedValue] = useState(0);
  const [greenValue, setGreenValue] = useState(0);
  const [blueValue, setBlueValue] = useState(0);

  const [redHexValue, setRedHexValue] = useState("00");
  const [greenHexValue, setGreenHexValue] = useState("00");
  const [blueHexValue, setBlueHexValue] = useState("00");

  const [selectedColors, setSelectedColors] = useState([]);

  props.navigation.setOptions({
    gestureEnabled: false,
  });

  const handleSliderColorChange = (number, color) => {
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
    if (!selectedColors.includes(color)) {
      setSelectedColors((selectedColors) => [...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(currentColor => currentColor != color))
    }
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
          marginTop: "7%",
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
          <TouchableOpacity style={styles.addButton}>
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
      <View style={{ height: "15%", width: "100%" }}>
        <ScrollView horizontal={true} style={styles.scroll}>
            {selectedColors.map((color, index) => {
              return (
                <ColorMixedBox color={color} key={index} />
              )
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
        }}
      >
        <TouchableOpacity style={styles.clearSelectedColors}>
          <Text>Clear Selected Colors</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollViewColorMix}>
        {props.palette.map((colors, rowindex) => {
          return (
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              key={rowindex + 100}
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
    palette: state.playgroundModeColors,
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
    height: "45%",
    width: "100%",
    backgroundColor: "ivory",
    marginTop: "5%",
    paddingTop: 15,
  },
  clearSelectedColors: {
    width: 200,
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
  },
});

export default connect(mapStateToProps)(PlaygroundScreen);
