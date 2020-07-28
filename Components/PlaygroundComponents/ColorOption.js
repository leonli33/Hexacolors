import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import Font from "../../Constants/Font";
import { isTablet } from "../../Functions/GeneralFunctions";

// Represents a color in the user's playground palette
const ColorOptions = (props) => {
  const handleColorPressed = () => {
    props.handleSelected(props.color);
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        if (props.color) {
          handleColorPressed();
        }
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            ...styles.colorBox,
            backgroundColor: props.color ? props.color : "Ivory",
            borderWidth: props.color ? 1 : 0,
            elevation: props.color ? 5 : 0,
            opacity: props.color ? 1 : 0,
          }}
        >
          {props.currentColorsChosen.includes(props.color) ? (
            <View
              style={{
                ...styles.colorBox,
                backgroundColor: "black",
                opacity: 0.6,
              }}
            />
          ) : (
            <View />
          )}
        </View>
        <Text style={styles.hexText}>{props.color}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").width / 5,
    borderRadius: 10,
    marginBottom: 3,
    elevation: 5,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
  },
  container: {
    flex: 1,
  },
  hexText: {
    alignSelf: "center",
    marginBottom: 17,
    fontSize: isTablet(Dimensions.get("window").height)
      ? Font.tabletTextSize - 2
      : Font.regularTextSize - 2,
  },
});

function mapStateToProps(state) {
  return {
    currentColorsChosen: state.playground.currentColorsChosen,
  };
}

export default connect(mapStateToProps)(ColorOptions);
