import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import GradientButton from "react-native-gradient-buttons";

const GameModeColorMix = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <GradientButton
          style={styles.option}
          text="Fixed Palette"
          textStyle={{ fontSize: 25, color: "white", fontWeight: "bold" }}
          gradientBegin="#003b46"
          gradientEnd="#66a5ad"
          gradientDirection="diagonal"
          height={90}
          width={"100%"}
          radius={15}
          impact
          impactStyle="Light"
          onPressAction={() => props.navigation.navigate("Levels")}
        />

        <GradientButton
          style={styles.option}
          text="Dynamic Palette"
          textStyle={{ fontSize: 25, color: "white", fontWeight: "bold" }}
          gradientBegin="#1995ad"
          gradientEnd="#a1d6e2"
          gradientDirection="diagonal"
          height={90}
          width={"100%"}
          radius={15}
          impact
          impactStyle="Light"
          onPressAction={() =>
            props.navigation.navigate("MixHexDynamicDifficulty")
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "lavender",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "100%",
  },
  option: {
    height: Dimensions.get("window").height / 9,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6B09D",
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  optionText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

export default GameModeColorMix;
