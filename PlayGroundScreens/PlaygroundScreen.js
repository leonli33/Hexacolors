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

const PlaygroundScreen = (props) => {
  const [redValue, setRedValue] = useState(0);
  const [greenValue, setGreenValue] = useState(0);
  const [blueValue, setBlueValue] = useState(0);

  const [redHexValue, setRedHexValue] = useState("00");
  const [greenHexValue, setGreenHexValue] = useState("00");
  const [blueHexValue, setBlueHexValue] = useState("00");

  handleSliderColorChange = (number, color) => {
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
            style={{ width: "100%" }}
            thumbTintColor={Colors.tropicalBlue}
            minimumTrackTintColor={Colors.tropicalBlue}
            value={blueValue}
            onValueChange={(value) => {
              handleSliderColorChange(Math.round(value), "blue");
            }}
          />
        </View>
        <View
          style={{
            width: "40%",
            height: "100%",
            alignSelf: "center",
            margin: "3%",
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
          <TouchableOpacity style={styles.addButton}>
            <Text>Add Color</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: "15%", width: "100%" }}>
        <ScrollView horizontal={true} style={styles.scroll}>
          <ColorMixedBox color="#FF23A8" />
          <ColorMixedBox color="#FF23A8" />
          <ColorMixedBox color="#FF23A8" />
          <ColorMixedBox color="#FF23A8" />
          <ColorMixedBox color="#FF23A8" />
          <ColorMixedBox color="#FF23A8" />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: 50,
          alignItems: "center",
          marginTop: "3%",
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity style={styles.clearSelectedColors}>
          <Text>Clear Selected Colors</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewColorMix}>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lavender",
  },
  colorView: {
    width: "100%",
    height: "65%",
    borderWidth: 1,
    borderRadius: 10,
  },
  sliderColorContainer: {
    alignSelf: "flex-start",
    width: "60%",
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
  },
  scroll: {
    backgroundColor: "white",
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
    marginTop: '5%'
  },
  clearSelectedColors: {
    width: 200,
    height: 40,
    borderRadius: 15,
    backgroundColor: Colors.buttonBackground,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});

export default PlaygroundScreen;
