import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colors from "../Constants/Colors";
import { connect } from "react-redux";
import { ResetColorsDynamixMix } from "../Redux/Actions";
import Font from "../Constants/Font";

const MixColorDynamicDifficulty = (props) => {
  console.log(Dimensions.get("window").height);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={{ ...styles.option, backgroundColor: Colors.tropicalYellow }}
          onPress={() => {
            props.ResetColorsDynamixMix();
            props.navigation.navigate("MixHexDynamicGameMode", {
              difficulty: "8",
            });
          }}
        >
          <Text style={styles.optionText}>8 Color Palette</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.option, backgroundColor: Colors.tropicalBlue }}
          onPress={() => {
            props.ResetColorsDynamixMix();
            props.navigation.navigate("MixHexDynamicGameMode", {
              difficulty: "10",
            });
          }}
        >
          <Text style={styles.optionText}>10 Color Palette</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.option, backgroundColor: Colors.tropicalRed }}
          onPress={() => {
            props.ResetColorsDynamixMix();
            props.navigation.navigate("MixHexDynamicGameMode", {
              difficulty: "12",
            });
          }}
        >
          <Text style={styles.optionText}>12 Color Palette</Text>
        </TouchableOpacity>
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
    justifyContent: "space-evenly",
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
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize:
      Dimensions.get("window").height > 1000
        ? Font.tabletFontSize
        : Font.regularFontSize,
  },
});

export default connect(null, { ResetColorsDynamixMix })(
  MixColorDynamicDifficulty
);
