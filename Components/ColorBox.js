import React, { Component } from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'

class ColorBox extends Component {

    render() {
        const {width, height} = Dimensions.get('window');
        const boxSize = Math.round(width * (2/5));
        const sizeOfFont = Math.round(height / 33);

        let backColor = this.props.color === "" ? "lavender" : this.props.color;

        const styles = StyleSheet.create({
            box: {
                width: '45%',
                height: '100%',
                backgroundColor: '#000',
                marginTop: '2%',
                borderRadius: 10,
                borderWidth: 1
            },
            container:{
                alignItems: 'center',
                width: '100%',
                height: '100%'
            },
            boxTitle: {
                marginTop: '5%',
                fontSize: sizeOfFont
            }
        })
        return (
            <View style={styles.container}>
                <Text style={styles.boxTitle}>{this.props.title}</Text>
                <View style={{...styles.box, backgroundColor: backColor}}/>
                <Text style={{...styles.boxTitle, marginTop: '2%'}}>{this.props.color}</Text>
            </View>
            
        )
    }
}

export default ColorBox;