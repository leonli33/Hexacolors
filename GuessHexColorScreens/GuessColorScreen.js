import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native'
import Colors from '../Constants/Colors'
import Slider from "react-native-slider";

class GuessColorScreen extends Component {

    componentDidMount() {
        this.props.navigation.setOptions({
            title: "Guess the color",
            headerStyle: {backgroundColor: Colors.tropicalYellow}
         });
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.hex}>#5566FA</Text>
                <ScrollView style={styles.colorContainer}>
                    
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    hex: {
        fontSize: 45,
        alignSelf: 'center',
        margin: '8%'
    },
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'lavender'
    },
    colorContainer: {
        backgroundColor: Colors.buttonBackground,
        width: '100%',
        alignSelf: 'center',
        height: '50%',
        marginTop: '60%'
    }
})

export default GuessColorScreen;