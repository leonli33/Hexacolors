import React, {Component, useDebugValue} from 'react'
import {StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Image} from 'react-native'
import Colors from '../Constants/Colors'

class LevelBox extends Component {

    render() {
        const dimensions = Dimensions.get('window');
        const topHalfHeight = Math.round(dimensions.height / 20);
        const topHalfWidth = Math.round(dimensions.width * (1/4));
        const bottomHalfHeight = Math.round(dimensions.height * (1/7))

        let color = Colors.buttonBackground;
        if(this.props.level >= 10 && this.props.level < 18){
            color = Colors.tropicalBlue
        } else if(this.props.level >= 18) {
            color = Colors.tropicalRed
        }


        const styles = StyleSheet.create({
            topHalf: {
                width: topHalfWidth,
                height: topHalfHeight,
                borderColor: 'black',
                backgroundColor: color,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
                marginLeft: '5%',
                marginTop: '10%',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5
            },
            bottomHalf: {
                width: topHalfWidth,
                height: bottomHalfHeight,
                backgroundColor: '#B3B3B3',
                marginLeft: '5%',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: "center",
                elevation: 5
            },
            shadowAround: {
                shadowColor: 'black',
                shadowOffset: {width:0, height:1},
                shadowOpacity: 0.26,
                shadowRadius: 5,
                marginTop: '8%',
            }
        })

        return (
            <TouchableWithoutFeedback onPress={() => this.props.nagivateTo(this.props.level)}>
                <View style={styles.shadowAround}>
                   <View style={styles.topHalf}>
                        <Text>{this.props.level}</Text>
                    </View>
                    <View style={styles.bottomHalf}>
                        <Image source={require('../Icons/lock.png')}></Image>
                    </View> 
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default LevelBox;