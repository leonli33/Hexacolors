import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import ColorBox from '../Components/ColorBox'
import ColorChoice from '../Components/ColorChoice'

class GameScreen extends Component {

    render() {
        return(
            <View>
                <View style={styles.colorboxes}>
                    <ColorBox></ColorBox>
                    <ColorBox></ColorBox>
                </View>
                <ColorChoice></ColorChoice>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    colorboxes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})

export default GameScreen;