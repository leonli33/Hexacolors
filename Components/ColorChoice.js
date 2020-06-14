import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'
import Colors from '../Constants/Colors'
import ColorBox from './ColorBox';

class ColorChoice extends Component {
    render() {
        const {width, height} = Dimensions.get('window')
        const colorWidth = Math.round(width / 5);
        const styles = StyleSheet.create({
            color: {
                width: colorWidth,
                height: colorWidth,
                backgroundColor: Colors.tropicalBlue,
                borderRadius: 10,
                marginRight: Math.round(width / 20),
                marginBottom: -2
            },
            container: {
                shadowColor: 'black',
                shadowOffset: {width:0, height:1},
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 5,
                marginBottom: Math.round(width / 20),

            },
            hex: {
                marginLeft: Math.round(colorWidth / 10),
                marginTop: 5
            }
        
        })
        return (
            <View style={styles.container}>
                <View style={{...styles.color, backgroundColor: this.props.color}}/>
                <Text style={styles.hex}>{this.props.color}</Text> 
            </View>
            
        )
    }
}

export default ColorChoice;