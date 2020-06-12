import React, {Component, useDebugValue} from 'react'
import {StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback} from 'react-native'
import Colors from '../Constants/Colors'

class LevelBox extends Component {
    
    render() {
        const dimensions = Dimensions.get('window');
        const topHalfHeight = Math.round(dimensions.height / 20);
        const topHalfWidth = Math.round(dimensions.width * (1/4));
        const bottomHalfHeight = Math.round(dimensions.height * (1/7))

        const styles = StyleSheet.create({
            topHalf: {
                width: topHalfWidth,
                height: topHalfHeight,
                borderColor: 'black',
                backgroundColor: Colors.buttonBackground,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
                marginLeft: '5%',
                marginTop: '10%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            bottomHalf: {
                width: topHalfWidth,
                height: bottomHalfHeight,
                backgroundColor: Colors.tropicalBlue,
                marginLeft: '5%',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            },
            shadowAround: {
                shadowColor: 'black',
                shadowOffset: {width:0, height:1},
                shadowOpacity: 0.26,
                shadowRadius: 5,
                elevation: 5,
                marginTop: '8%'
            }
        })

        return (
            <TouchableWithoutFeedback onPress={this.props.nagivateTo}>
                <View style={styles.shadowAround}>
                   <View style={styles.topHalf}>
                        <Text>{this.props.level}</Text>
                    </View>
                    <View style={styles.bottomHalf}>
                        <Text></Text>
                    </View> 
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default LevelBox;