import React, { Component } from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'

class ColorBox extends Component {

    render() {
        const {width, height} = Dimensions.get('window');
        const boxSize = Math.round(width * (2/5));
        const sizeOfFont = Math.round(height / 33);
        const color = "";

        const styles = StyleSheet.create({
            box: {
                width: boxSize,
                height: boxSize,
                backgroundColor: '#000',
                marginTop: '5%',
                borderRadius: 10,
                borderWidth: 1
            },
            container:{
                alignItems: 'center'
            },
            boxTitle: {
                marginTop: '10%',
                fontSize: sizeOfFont
            }
        })
        return (
            <View style={styles.container}>
                <Text style={styles.boxTitle}>{this.props.title}</Text>
                <View style={{...styles.box, backgroundColor: this.props.color}}/>
                <Text style={{...styles.boxTitle, marginTop: '5%'}}>{this.props.color}</Text>
            </View>
            
        )
    }
}

export default ColorBox;