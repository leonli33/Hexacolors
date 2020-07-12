import React, { Component } from "react";
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
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import {
  SetCurrentColorAndColorsUsed,
  AddUserChosenColor,
  RemoveUserChosenColor,
  ResetColors,
  IncrementFurthestLevel,
  IncrementTotalLevelsCompleted,
} from "../Redux/Actions";
import Hint from "../Components/MixColors/Hint";
import ColorMixerWonScreen from "../Components/MixColors/ColorMixerWonScreen";

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hint1: false,
      hint2: false,
      hint3: false,
    };
  }

  componentDidMount() {
    const { level } = this.props.route.params;
    this.props.navigation.setOptions({
      title: "Level " + level,
      headerStyle: { backgroundColor: this.getBackgroundColorForLevel(level) },
    });
  }

  getBackgroundColorForLevel = (level) => {
    let color = Colors.tropicalYellow;
    if (level >= 10 && level < 18) {
      color = Colors.tropicalBlue;
    } else if (level >= 18) {
      color = Colors.tropicalRed;
    }
    return color;
  };

  // Determine which hints have been selected
  onHintPress1 = () => {
    this.setState({
      hint1: !this.state.hint1,
    });
  };

  onHintPress2 = () => {
    this.setState({
      hint2: !this.state.hint2,
    });
  };
  onHintPress3 = () => {
    this.setState({
      hint3: !this.state.hint3,
    });
  };

  onBackPress = (level) => {
    this.props.navigation.navigate("Levels");
    this.setState({
      hint1: false,
      hint2: false,
      hint3: false,
    });
    this.props.IncrementFurthestLevel(level);
    this.props.IncrementTotalLevelsCompleted();
    if (this.props.signedIn) this.incrementLevelFirebase(level);
  };

  onForwardPress = (levelID) => {
    if (levelID !== 19) {
      this.props.navigation.navigate("Game", {
        level: levelID,
      });
      this.props.navigation.setOptions({
        title: "Level " + levelID,
        headerStyle: {
          backgroundColor: this.getBackgroundColorForLevel(levelID),
        },
      });
      this.props.IncrementFurthestLevel(levelID - 1);
      this.props.IncrementTotalLevelsCompleted();
      if (this.props.signedIn) this.incrementLevelFirebase(levelID - 1);
    } else {
      this.props.navigation.navigate("Home");
    }
    this.setState({
      hint1: false,
      hint2: false,
      hint3: false,
    });
    this.props.ResetColors();
  };

  incrementLevelFirebase = async (level) => {
    if (level >= this.props.furthestLevelCompleted && level <= 18) {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(this.props.userID)
          .update({
            mix_furthest_level: level,
          });
      } catch (error) {
        alert(error.toString());
      }
    }
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.props.userID)
        .update({
          mix_colors_answers_correct: this.props.totalLevels + 1,
        });
    } catch (error) {
      alert(error.toString());
    }
  };

  // This function handles the logic when a user presses a color
  handleColorSelected = (color) => {
    // If the set of currently chosen colors includes the color that that
    // user is pressing, then we know that they want to remove it
    if (this.props.currentColorsChosen.includes(color)) {
      // Remove the color pressed
      this.props.RemoveUserChosenColor(color);
      // If there are no more selected colors, reset all the colors
      if (this.props.colors.length === 0) {
        this.props.ResetColors();
      } else {
        // Get new colors that results from remaining selected colors
        let newColor = MixColors(this.props.colors).toUpperCase();

        this.props.SetCurrentColorAndColorsUsed({
          currentLevelUserHexCode: newColor,
          currentColorsChosen: this.props.colors,
        });
      }
    } else {
      // User wants to add a color to the mix
      this.props.AddUserChosenColor(color);
      if (this.props.colors.length === 0) {
        // If there are currently no selected colors, then the color that the user selects is the
        // color to be displayed
        this.props.SetCurrentColorAndColorsUsed({
          currentLevelUserHexCode: color,
          currentColorsChosen: this.props.colors,
        });
      } else {
        // Otherwise, mix all of the currently selected colors together and form a new color
        let newColor = MixColors(this.props.colors).toUpperCase();

        this.props.SetCurrentColorAndColorsUsed({
          currentLevelUserHexCode: newColor,
          currentColorsChosen: this.props.colors,
        });
      }
    }
  };

  onGameModePress = () => {
    this.props.navigation.navigate("GameMode");
  };

  render() {
    let { width, height } = Dimensions.get("window");
    let gameWon = false;
    // Level represents the current level in the game we are in
    const { level } = this.props.route.params;
    // Each level has a particular amont of hints. The following 2 if statements determine
    // how many hints the user is allowed
    let hints = (
      <View
        style={{
          flexDirection: "row",
          marginLeft: "2.5%",
          justifyContent: "flex-start",
        }}
      >
        <Hint
          number={1}
          handlePress={this.onHintPress1}
          selected={this.state.hint1}
        />
      </View>
    );
    if (level >= 10 && level < 18) {
      hints = (
        <View
          style={{
            flexDirection: "row",
            marginLeft: "2.5%",
            justifyContent: "flex-start",
          }}
        >
          <Hint
            number={1}
            handlePress={this.onHintPress1}
            selected={this.state.hint1}
          />
          <Hint
            number={2}
            handlePress={this.onHintPress2}
            selected={this.state.hint2}
          />
        </View>
      );
    } else if (level >= 18) {
      hints = (
        <View
          style={{
            flexDirection: "row",
            marginLeft: "2.5%",
            justifyContent: "flex-start",
          }}
        >
          <Hint
            number={1}
            handlePress={this.onHintPress1}
            selected={this.state.hint1}
          />
          <Hint
            number={2}
            handlePress={this.onHintPress2}
            selected={this.state.hint2}
          />
          <Hint
            number={3}
            handlePress={this.onHintPress3}
            selected={this.state.hint3}
          />
        </View>
      );
    }

    // selectedText tells the user how many colors they need to select in order to beat the level.
    // This count is determined through the logic below
    let selectedText = "";
    let numberOfColors = this.props.numColors[level];
    if (numberOfColors === 1) {
      selectedText = "Select 1 Color";
    } else if (numberOfColors !== 5) {
      selectedText = "Select " + numberOfColors + " Colors";
    }
    if (this.state.hint3) {
      selectedText = "Select " + numberOfColors + " Colors";
    }

    if (this.props.levelColors[level] === this.props.color) {
      gameWon = true;
    }

    return (
      <View style={styles.container}>
        <ColorMixerWonScreen
          level={level}
          handleNextPress={this.onForwardPress}
          handleBackPress={this.onBackPress}
          totalColorsNeeded={this.props.colorsNeeded[level].length}
          colorsNeeded={this.props.colorsNeeded[level]}
          targetColor={this.props.levelColors[level]}
          visibility={gameWon}
          gameModePress={this.onGameModePress}
        />
        <View style={styles.colorboxes}>
          <ColorBox
            handleGameWon={this.handleGameWon}
            lastColor={this.props.previousHexcode}
            title={"Target Color"}
            color={this.props.levelColors[level]}
          />

          <ColorBox
            handleGameWon={this.handleGameWon}
            targetColor={this.props.levelColors[level]}
            lastColor={this.props.previousHexcode}
            title={"Current Color"}
            color={this.props.color}
          />
        </View>
        <View>
          {hints}
          <View style={styles.scrollContainer}>
            <View style={styles.scrollHeader}>
              <Text style={{ fontSize: 17 }}>{selectedText}</Text>
              <TouchableOpacity
                onPress={() => this.scroll.scrollToEnd({ animated: true })}
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
              snapToInterval={width - 45}
              ref={(node) => (this.scroll = node)}
            >
              {this.props.colorElements.map((elementArr, arrIndex) => {
                return (
                  <View key={arrIndex + 12}>
                    {elementArr.map((color, index) => {
                      return (
                        <ColorChoice
                          hint1Activated={this.state.hint1}
                          hint2Activated={this.state.hint2}
                          hint3Activated={this.state.hint3}
                          hints1={this.props.hints1[level]}
                          colorsChosen={this.props.currentColorsChosen}
                          currentLevel={level}
                          hint1={this.state.hint1}
                          onColorPress={this.handleColorSelected}
                          hints2={this.props.hints2[level]}
                          color={color}
                          index={index + 2 * arrIndex}
                          key={index + arrIndex}
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
  }
}

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
    colorElements: state.mixColors.levelColors,
    color: state.mixColors.currentLevelUserHexCode,
    colors: state.mixColors.colorsChosenSoFar,
    currentColorsChosen: state.mixColors.colorsChosenSoFar,
    levelColors: state.mixColors.levelAnswer,
    hints1: state.mixColors.levelHint1,
    hints2: state.mixColors.levelHint2,
    numColors: state.mixColors.numColors,
    previousHexcode: state.mixColors.lastColorHexcode,
    colorsNeeded: state.mixColors.levelComponentsToAnswer,
    signedIn: state.auth.signedIn,
    userID: state.auth.userID,
    furthestLevelCompleted: state.mixColors.furthestLevelCompleted,
    totalLevels: state.mixColors.totalLevelsComplete,
  };
}

export default connect(mapStateToProps, {
  SetCurrentColorAndColorsUsed,
  AddUserChosenColor,
  RemoveUserChosenColor,
  ResetColors,
  IncrementFurthestLevel,
  IncrementTotalLevelsCompleted,
})(GameScreen);
