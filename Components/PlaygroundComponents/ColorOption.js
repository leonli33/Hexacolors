import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const ColorOptions = (props) => {
  const [selected, setSelected] = useState(false);

  const handleColorPressed = () => {
    setSelected((selected) => !selected);
    props.handleSelected(props.color);
  };

  let shaded = selected ? (
    <View
      style={{ ...styles.colorBox, backgroundColor: "black", opacity: 0.6 }}
    />
  ) : (
    <View />
  );

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={handleColorPressed}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ ...styles.colorBox, backgroundColor: props.color }}>
          {shaded}
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
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
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
    marginBottom: 15,
  },
});

export default ColorOptions;
