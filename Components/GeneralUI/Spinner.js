import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import Colors from "../../Constants/Colors";

const Spinner = () => {
  let topColors = [
    Colors.tropicalRed,
    "#003B46",
    "#98DBC6",
    "#4897d8",
    "#f52549",
    "#1995ad",
  ];
  let rightColors = [
    Colors.tropicalGreen,
    "#07575B",
    "#5BC8AC",
    "#ffdb5c",
    "#fa6775",
    "#a1d6e2",
  ];
  let bottomColors = [
    Colors.tropicalBlue,
    "#C4DFE6",
    "#E6D72A",
    "#fa6e59",
    "#ffd64d",
    "#bcbabe",
  ];
  let leftColors = [
    "#F6D41B",
    "#66A5AD",
    "#F18D9E",
    "#f8a055",
    "#9bc01c",
    "#f1f1f2",
  ];

  let topIndex = 0;
  let bottomIndex = 0;
  let rightIndex = 0;
  let leftIndex = 0;

  let sideBlue = "front";
  let colorValue1Blue = new Animated.Value(0);
  let colorValue2Blue = new Animated.Value(1);

  let sideRed = "front";
  let colorValue1Red = new Animated.Value(0);
  let colorValue2Red = new Animated.Value(1);

  let sideGreen = "front";
  let colorValue1Green = new Animated.Value(0);
  let colorValue2Green = new Animated.Value(1);

  let sideYellow = "front";
  let colorValue1Yellow = new Animated.Value(0);
  let colorValue2Yellow = new Animated.Value(1);

  // blue
  let colorSideOneBlue = colorValue1Blue.interpolate({
    inputRange: [...Array(bottomColors.length)].map((_, index) => index),
    outputRange: bottomColors,
  });

  let colorSideTwoBlue = colorValue2Blue.interpolate({
    inputRange: [...Array(bottomColors.length)].map((_, index) => index),
    outputRange: bottomColors,
  });

  // red
  let colorSideOneRed = colorValue1Red.interpolate({
    inputRange: [...Array(topColors.length)].map((_, index) => index),
    outputRange: topColors,
  });

  let colorSideTwoRed = colorValue2Red.interpolate({
    inputRange: [...Array(topColors.length)].map((_, index) => index),
    outputRange: topColors,
  });

  // green
  let colorSideOneGreen = colorValue1Green.interpolate({
    inputRange: [...Array(rightColors.length)].map((_, index) => index),
    outputRange: rightColors,
  });

  let colorSideTwoGreen = colorValue2Green.interpolate({
    inputRange: [...Array(rightColors.length)].map((_, index) => index),
    outputRange: rightColors,
  });

  // yellow
  let colorSideOneYellow = colorValue1Yellow.interpolate({
    inputRange: [...Array(leftColors.length)].map((_, index) => index),
    outputRange: leftColors,
  });

  let colorSideTwoYellow = colorValue2Yellow.interpolate({
    inputRange: [...Array(leftColors.length)].map((_, index) => index),
    outputRange: leftColors,
  });

  let spinSquare = new Animated.Value(0);

  useEffect(() => {
    valBlue = 0;
    valGreen = 0;
    valRed = 0;
    valYellow = 0;
    topIndex = 0;
    bottomIndex = 0;
    rightIndex = 0;
    leftIndex = 0;

    Animated.timing(spinSquare, {
      toValue: 1,
      duration: 1500,
      easing: Easing.bezier[(0, 1)],
      useNativeDriver: true,
    }).start();
  });

  const startSpin = spinSquare.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "225deg"],
  });

  let animatedValueBlue = new Animated.Value(0);
  let animatedValueGreen = new Animated.Value(0);
  let animatedValueRed = new Animated.Value(0);
  let animatedValueYellow = new Animated.Value(0);

  let valBlue = 0;
  let valGreen = 0;
  let valRed = 0;
  let valYellow = 0;

  animatedValueBlue.addListener(({ value }) => {
    valBlue = value;
  });

  animatedValueGreen.addListener(({ value }) => {
    valGreen = value;
  });

  animatedValueRed.addListener(({ value }) => {
    valRed = value;
  });

  animatedValueYellow.addListener(({ value }) => {
    valYellow = value;
  });

  // blue square
  let frontInterpolateBlue = animatedValueBlue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  let backInterpolateBlue = animatedValueBlue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });
  let frontOpacityBlue = animatedValueBlue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  let backOpacityBlue = animatedValueBlue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  // green square
  let frontInterpolateGreen = animatedValueGreen.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  let backInterpolateGreen = animatedValueGreen.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });
  let frontOpacityGreen = animatedValueGreen.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  let backOpacityGreen = animatedValueGreen.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  // red square
  let frontInterpolateRed = animatedValueRed.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  let backInterpolateRed = animatedValueRed.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });
  let frontOpacityRed = animatedValueRed.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  let backOpacityRed = animatedValueRed.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  // yellow square
  let frontInterpolateYellow = animatedValueYellow.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  let backInterpolateYellow = animatedValueYellow.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });
  let frontOpacityYellow = animatedValueYellow.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  let backOpacityYellow = animatedValueYellow.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  const flipCard = (color) => {
    let colorValue = valBlue;
    if (color === "green") {
      colorValue = valGreen;
    } else if (color === "red") {
      colorValue = valRed;
    } else if (color === "yellow") {
      colorValue = valYellow;
    }

    if (colorValue >= 90) {
      Animated.spring(getCorrectValue(color), {
        toValue: 0,
        friction: 8,
        tension: 10,
        duration: 100,
      }).start();
    } else {
      Animated.spring(getCorrectValue(color), {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  };

  const getCorrectValue = (color) => {
    let colorValue = animatedValueBlue;
    if (color === "green") {
      colorValue = animatedValueGreen;
    } else if (color === "red") {
      colorValue = animatedValueRed;
    } else if (color === "yellow") {
      colorValue = animatedValueYellow;
    }

    return colorValue;
  };

  // blue
  const frontAnimatedStyleBlue = {
    transform: [{ rotateY: frontInterpolateBlue }],
  };
  const backAnimatedStyleBlue = {
    transform: [{ rotateY: backInterpolateBlue }],
  };

  // red
  const frontAnimatedStyleRed = {
    transform: [{ rotateY: frontInterpolateRed }],
  };
  const backAnimatedStyleRed = {
    transform: [{ rotateY: backInterpolateRed }],
  };

  // green
  const frontAnimatedStyleGreen = {
    transform: [{ rotateY: frontInterpolateGreen }],
  };
  const backAnimatedStyleGreen = {
    transform: [{ rotateY: backInterpolateGreen }],
  };

  // yellow
  const frontAnimatedStyleYellow = {
    transform: [{ rotateY: frontInterpolateYellow }],
  };
  const backAnimatedStyleYellow = {
    transform: [{ rotateY: backInterpolateYellow }],
  };

  return (
    <View>
      <Animated.View
        style={{ marginBottom: 40, transform: [{ rotate: startSpin }] }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                sideBlue = sideBlue === "front" ? "back" : "front";
                if (bottomIndex % 2 == 0) {
                  colorValue2Blue.setValue(
                    (bottomIndex + 1) % bottomColors.length
                  );
                } else {
                  colorValue1Blue.setValue(
                    (bottomIndex + 1) % bottomColors.length
                  );
                }
                bottomIndex++;
                flipCard("blue");
              }}
            >
              <View>
                <Animated.View
                  style={[
                    styles.square,
                    {
                      backgroundColor: colorSideOneBlue,
                    },
                    frontAnimatedStyleBlue,
                    { opacity: frontOpacityBlue },
                  ]}
                ></Animated.View>
                <Animated.View
                  style={[
                    styles.square,
                    {
                      backgroundColor: colorSideTwoBlue,
                    },
                    { position: "absolute" },
                    backAnimatedStyleBlue,
                    { opacity: backOpacityBlue },
                  ]}
                ></Animated.View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                sideYellow = sideYellow === "front" ? "back" : "front";
                if (leftIndex % 2 == 0) {
                  colorValue2Yellow.setValue(
                    (leftIndex + 1) % leftColors.length
                  );
                } else {
                  colorValue1Yellow.setValue(
                    (leftIndex + 1) % leftColors.length
                  );
                }
                leftIndex++;
                flipCard("yellow");
              }}
            >
              <View>
                <Animated.View
                  style={[
                    styles.square,
                    {
                      backgroundColor: colorSideOneYellow,
                    },
                    frontAnimatedStyleYellow,
                    { opacity: frontOpacityYellow },
                  ]}
                ></Animated.View>
                <Animated.View
                  style={[
                    styles.square,
                    {
                      backgroundColor: colorSideTwoYellow,
                    },
                    { position: "absolute" },
                    backAnimatedStyleYellow,
                    { opacity: backOpacityYellow },
                  ]}
                ></Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                sideGreen = sideGreen === "front" ? "back" : "front";
                if (rightIndex % 2 == 0) {
                  colorValue2Green.setValue(
                    (rightIndex + 1) % rightColors.length
                  );
                } else {
                  colorValue1Green.setValue(
                    (rightIndex + 1) % rightColors.length
                  );
                }
                rightIndex++;
                flipCard("green");
              }}
            >
              <View>
                <Animated.View
                  style={[
                    styles.square,
                    {
                      backgroundColor: colorSideOneGreen,
                    },
                    frontAnimatedStyleGreen,
                    { opacity: frontOpacityGreen },
                  ]}
                ></Animated.View>
                <Animated.View
                  style={[
                    styles.square,
                    {
                      backgroundColor: colorSideTwoGreen,
                    },
                    { position: "absolute" },
                    backAnimatedStyleGreen,
                    { opacity: backOpacityGreen },
                  ]}
                ></Animated.View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                sideRed = sideRed === "front" ? "back" : "front";
                if (topIndex % 2 == 0) {
                  colorValue2Red.setValue((topIndex + 1) % topColors.length);
                } else {
                  colorValue1Red.setValue((topIndex + 1) % topColors.length);
                }
                topIndex++;
                flipCard("red");
              }}
            >
              <View>
                <Animated.View
                  style={[
                    styles.square,
                    { backgroundColor: colorSideOneRed },
                    frontAnimatedStyleRed,
                    { opacity: frontOpacityRed },
                  ]}
                ></Animated.View>
                <Animated.View
                  style={[
                    styles.square,
                    {
                      backgroundColor: colorSideTwoRed,
                    },
                    { position: "absolute" },
                    backAnimatedStyleRed,
                    { opacity: backOpacityRed },
                  ]}
                ></Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    width: Dimensions.get("window").height / 8,
    height: Dimensions.get("window").height / 8,
    borderRadius: 8,
    backgroundColor: "black",
    marginRight: 7,
    marginBottom: 7,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 5,
    elevation: 3.5,
  },
  text: {
    fontSize: 15,
    color: "white",
  },
});

export default Spinner;
