import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import LevelBox from "../Components/MixColors/LevelBox";
import { color } from "react-native-reanimated";
import Colors from "../Constants/Colors";
import { connect } from "react-redux";
import { ResetColors } from "../Redux/Actions";

class LevelsScreen extends Component {
  navigateTo = (levelID) => {
    this.props.navigation.navigate("Game", {
      level: levelID,
    });
    this.props.ResetColors();
  };

  constructor() {
    super();
    const colors = [];
    for (let i = 0; i < 6; i++) {
      let colorArr = [];
      for (let j = 0; j < 3; j++) {
        colorArr.push(i);
      }
      colors.push(colorArr);
    }
    this.state = {
      colorList: colors,
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.colorList.map((row, rowIndex) => {
          return (
            <View key={rowIndex + 21} style={styles.row}>
              {row.map((color, index) => {
                return (
                  <LevelBox
                    hasUserCompleted={
                      this.props.furthestLevel >= rowIndex * 3 + index
                    }
                    hexColor={color}
                    nagivateTo={this.navigateTo}
                    targetColor={
                      this.props.levelColorAnswer[rowIndex * 3 + index + 1]
                    }
                    level={rowIndex * 3 + index + 1}
                    key={rowIndex * 3 + index + 1}
                  ></LevelBox>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.backgroundCol,
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: "5%",
  },
});

function mapStateToProps(state) {
  return {
    colorElements: state.mixColors.levelColors,
    color: state.mixColors.currentLevelUserHexCode,
    colors: state.mixColors.colorsChosenSoFar,
    currentColorsChosen: state.mixColors.colorsChosenSoFar,
    levelColorAnswer: state.mixColors.levelAnswer,
    furthestLevel: state.mixColors.furthestLevelCompleted,
  };
}

export default connect(mapStateToProps, { ResetColors })(LevelsScreen);
