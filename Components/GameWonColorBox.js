import React, { useDebugValue } from 'react'
import {View, StyleSheet, Text} from 'react-native'

const GameWonColorBox = (props) => {
    const styles = StyleSheet.create({
        box: {
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: props.color.trim(),
            width: 50,
            height: 50,
        }
    })

    return (
        <View style={{alignItems:'center'}}>
            <View style={styles.box}/>
            <Text>{props.color}</Text>
        </View>
        
    )
}

export default GameWonColorBox;