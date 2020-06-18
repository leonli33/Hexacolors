import React, {Component} from 'react'
import {View, Text, TouchableWithoutFeedback, Dimensions} from 'react-native'
import Colors from '../Constants/Colors'

class Hint extends Component {
    render() {
        const {width, height} = Dimensions.get('window');
        let backColor = "lavender"
        let outline = 'black'
        let textColor = 'black'
        return (
            <TouchableWithoutFeedback>
                <View style={{height: Math.round(width / 12), width: Math.round(width / 5), borderRadius: 10, 
                      borderWidth: 1, borderColor: outline, backgroundColor: backColor, justifyContent: 'center', alignItems: 'center', marginRight: '5%',
                      shadowColor: 'black',
                        shadowOffset: {width:0, height:1},
                        shadowOpacity: 0.4,
                        shadowRadius: 4,
                        elevation: 5,}}>
                    <Text style={{color: textColor}}>Hint</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default Hint;