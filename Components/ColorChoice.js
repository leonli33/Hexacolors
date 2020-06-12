import React, {Component} from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'

class ColorChoice extends Component {
    render() {
        const {width, height} = Dimensions.get('window')
        const colorWidth = Math.round(width / 5);
        const styles = StyleSheet.create({
            color: {
                width: colorWidth,
                height: colorWidth,
                backgroundColor: '#000',
                borderRadius: 10
            }
        
        })
        return (
            <View style={styles.color}>

            </View>
        )
    }
}

export default ColorChoice;