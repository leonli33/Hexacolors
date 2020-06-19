import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback} from 'react-native'
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
                marginBottom: -2,
                borderWidth: 1
            },
            container: {
                shadowColor: 'black',
                shadowOffset: {width:0, height:1},
                shadowOpacity: 0.4,
                shadowRadius: 4,
                elevation: 5,
                marginBottom: Math.round(width / 20),
            },
            hex: {
                marginLeft: Math.round(colorWidth / 10),
                marginTop: 5
            }
        
        })
        let shaded = <View></View>;
        if(this.props.colorsChosen.includes(this.props.color)) shaded = <View style={{...styles.color, backgroundColor: 'black', opacity: 0.6, borderWidth: 0 }}/>
        return (
            <TouchableWithoutFeedback onPress={() => this.props.onColorPress(this.props.color)} >
                <View style={styles.container}>
                    <View style={{...styles.color, backgroundColor: this.props.color}}>
                        {shaded}
                    </View>
                    <Text style={styles.hex}>{this.props.color}</Text> 
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default ColorChoice;
