import React, { Component } from 'react'
import {View, StyleSheet, Dimensions, Text, Animated} from 'react-native'

class ColorBox extends Component {

    state = {
        colorBoxAnimation: new Animated.Value(0)
    };

    componentDidUpdate() {
        // Every time the componenet updates, set an animated for the new color
        Animated.timing(this.state.colorBoxAnimation, {
            toValue: 150,
            duration: 500
        }).start(() => {
            // set the opacity back to zero after each animation
            this.state.colorBoxAnimation = new Animated.Value(0)
        });
    }

    // convert from hex to rgb
    hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

    render() {
        // Get the gdb version of the current resultant color and the last
        // resultant color
        let rgbVersion = this.hexToRgb(this.props.color)
        let rgbVesionLastColor = this.hexToRgb(this.props.lastColor)

        // get the current background color and the last background color
        let backColor = this.props.color === "" ? "lavender" : "rgb(" + rgbVersion.r + "," + rgbVersion.g + "," + rgbVersion.b + ")";  
        let fromColor = this.props.lastColor === "" ? 'lavender' : "rgb(" + rgbVesionLastColor.r + "," + rgbVesionLastColor.g + "," + rgbVesionLastColor.b + ")";  
        
        // Animated the background color, going from the last color to the curret color
        const interpolateColor = this.state.colorBoxAnimation.interpolate({
            inputRange: [0, 150],
            outputRange: [fromColor, backColor]
        })

        const animateValue= {
            width: '45%',
            height: '100%',
            backgroundColor: interpolateColor,
            marginTop: '2%',
            borderRadius: 10,
            borderWidth: 1
        }

        const styles = StyleSheet.create({
            box: {
                width: '45%',
                height: '100%',
                backgroundColor: backColor,
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
                fontSize: 18
            }
        })
        
        return (
            <View style={styles.container}>
                <Text style={styles.boxTitle}>{this.props.title}</Text>
                <Animated.View style={this.props.title === "Current Color" ? animateValue : styles.box}/>
                <Text style={{...styles.boxTitle, marginTop: '2%'}}>{this.props.color}</Text>
            </View>
        )
    }
}

export default ColorBox;