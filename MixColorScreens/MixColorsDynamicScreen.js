import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ColorBox from "../Components/MixColors/ColorBox";
import ColorChoice from "../Components/MixColors/ColorChoice";
import Colors from "../Constants/Colors";
import { connect } from "react-redux";
import MixColors from "../Functions/MixColor";
import MixHexDynamicGameWon from "../Components/MixColors/MixHexDynamicGameWon";
import GetAnswer from "../Components/MixColors/GetAnswer";
import {
  ResetColorsDynamixMix,
  RemoveUserChosenColorDynamixMix,
  AddUserChosenColorDynamicMix,
  SetCurrentColorAndColorsUsedDynamicMix,
  Generate8ColorPaletteAndMix,
  Generate10ColorPaletteAndMix,
  Generate12ColorPaletteAndMix,
} from "../Redux/Actions";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const MixColorsDynamicScreen = (props) => {
  const [gameWon, setGameWon] = useState(false);
  const [getAnswer, setGetAnswer] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    const { difficulty } = props.route.params;
    props.navigation.setOptions({
      headerStyle: { backgroundColor: getBackgroundColor(difficulty) },
    });
    initializeGame(difficulty);
  }, []);

  const getBackgroundColor = (difficulty) => {
    let color = Colors.tropicalYellow;
    if (difficulty === "10") {
      color = Colors.tropicalBlue;
    } else if (difficulty === "12") {
      color = Colors.tropicalRed;
    }
    return color;
  };

  const initializeGame = (difficulty) => {
    if (difficulty === "8") {
      props.Generate8ColorPaletteAndMix();
    } else if (difficulty === "10") {
      props.Generate10ColorPaletteAndMix();
    } else {
      props.Generate12ColorPaletteAndMix();
    }
    setGameWon(false);
    props.ResetColorsDynamixMix();
  };

  const handleGetAnswerPress = () => {
    setGetAnswer(!getAnswer);
  };

  // This function handles the logic when a user presses a color
  const handleColorSelected = (color) => {
    // If the set of currently chosen colors includes the color that that
    // user is pressing, then we know that they want to remove it
    if (props.colorsChosen.includes(color)) {
      // Remove the color pressed
      props.RemoveUserChosenColorDynamixMix(color);
      // If there are no more selected colors, reset all the colors
      if (props.colorsChosen.length === 0) {
        props.ResetColorsDynamixMix();
      } else {
        // Get new colors that results from remaining selected colors
        let newColor = MixColors(props.colorsChosen).toUpperCase();
        props.SetCurrentColorAndColorsUsedDynamicMix({
          currentColorGuessed: newColor,
          colorsChosen: props.colorsChosen,
        });
      }
    } else {
      // User wants to add a color to the mix
      props.AddUserChosenColorDynamicMix(color);
      if (props.colorsChosen.length === 0) {
        // If there are currently no selected colors, then the color that the user selects is the
        // color to be displayed
        props.SetCurrentColorAndColorsUsedDynamicMix({
          currentColorGuessed: color,
          colorsChosen: props.colorsChosen,
        });
      } else {
        // Otherwise, mix all of the currently selected colors together and form a new color
        let newColor = MixColors(props.colorsChosen).toUpperCase();
        props.SetCurrentColorAndColorsUsedDynamicMix({
          currentColorGuessed: newColor,
          colorsChosen: props.colorsChosen,
        });
      }
    }
  };

  const handlePlayAgainPress = () => {
    setTimeout(() => {
      const { difficulty } = props.route.params;
      initializeGame(difficulty);
    }, 100);
  };

  const handleBackPress = () => {
    props.navigation.navigate("MixHexDynamicDifficulty");
  };

  const handleGameWon = () => {
    setGameWon(true);
  };

  return (
    <View style={styles.container}>
      <MixHexDynamicGameWon
        visibility={gameWon}
        handleBackPress={handleBackPress}
        colorsNeeded={props.colorsChosen}
        targetColor={props.targetColor}
        visibility={gameWon}
        playAgainPress={handlePlayAgainPress}
      />
      <View style={styles.colorboxes}>
        <ColorBox
          handleGameWon={handleGameWon}
          lastColor={props.prevColor}
          title={"Target Color"}
          color={props.targetColor}
        />
        <ColorBox
          handleGameWon={handleGameWon}
          targetColor={props.targetColor}
          lastColor={props.prevColor}
          title={"Current Color"}
          color={props.currentColor}
          type="Dynamic"
        />
      </View>
      <View>
        <View style={{ marginLeft: "2.5%", justifyContent: "flex-start" }}>
          <GetAnswer selected={getAnswer} handlePress={handleGetAnswerPress} />
        </View>
        <View style={styles.scrollContainer}>
          <View style={styles.scrollHeader}>
            <Text
              style={{ fontSize: 17 }}
            >{`Select ${props.numColors} Colors`}</Text>
            <TouchableOpacity
              onPress={() => scrollRef.current.scrollToEnd({ animated: true })}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Image
                style={{ marginRight: 40 }}
                source={require("../Icons/rightarrow.png")}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            disableIntervalMomentum={true}
            directionalLockEnabled={true}
            style={styles.scroll}
            decelerationRate={0}
            horizontal={true}
            snapToAlignment={"end"}
            snapToInterval={Dimensions.get("window").width - 45}
            ref={scrollRef}
          >
            {props.currentPalette.map((elementArr, arrIndex) => {
              return (
                <View key={arrIndex + 12}>
                  {elementArr.map((color, index) => {
                    return (
                      <ColorChoice
                        hint1Activated={false}
                        hint2Activated={false}
                        hint3Activated={false}
                        hints1={[]}
                        colorsChosen={props.colorsChosen}
                        onColorPress={handleColorSelected}
                        hints2={[]}
                        color={color}
                        key={index + arrIndex}
                        notInAnswer={!props.answer.includes(color)}
                        getAnswerSelected={getAnswer}
                      />
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorboxes: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: "28%",
  },
  scroll: {
    marginLeft: "2.5%",
    padding: 6,
    width: "100%",
    marginTop: "2%",
    marginBottom: -10,
  },
  scrollHeader: {
    marginLeft: "4%",
    marginTop: "2%",
    flexDirection: "row",
    height: 35,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    backgroundColor: Colors.buttonBackground,
    marginTop: "3%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 15,
    elevation: 5,
    justifyContent: "center",
  },
  container: {
    backgroundColor: Colors.backgroundCol,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
});

function mapStateToProps(state) {
  return {
    currentPalette: state.mixColorsDynamic.colorPalette,
    colorsChosen: state.mixColorsDynamic.colorsChosen,
    targetColor: state.mixColorsDynamic.colorToMix,
    prevColor: state.mixColorsDynamic.previousColor,
    currentColor: state.mixColorsDynamic.currentColorGuessed,
    numColors: state.mixColorsDynamic.numColors,
    answer: state.mixColorsDynamic.answer
  };
}

export default connect(mapStateToProps, {
  ResetColorsDynamixMix,
  RemoveUserChosenColorDynamixMix,
  AddUserChosenColorDynamicMix,
  SetCurrentColorAndColorsUsedDynamicMix,
  Generate8ColorPaletteAndMix,
  Generate10ColorPaletteAndMix,
  Generate12ColorPaletteAndMix,
})(MixColorsDynamicScreen);
