import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native'
import Colors from '../Constants/Colors'

class StartScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.playButton}>
                    <Image style={styles.playButtonImage} source={require('../Icons/play.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoButton}>
                    <Image style={styles.playButtonImage} source={require('../Icons/info.png')}></Image>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        flex: 1
    },
    playButton: {
        width: '70%',
        height: '20%',
        backgroundColor: Colors.tropicalRed,
        borderRadius: 40,
        marginTop: '80%',
        shadowColor: 'black',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.26,
        shadowRadius: 15,
        elevation: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    playButtonImage: {
        position: "absolute",
    },
    infoButton :{
        width: '70%',
        height: '20%',
        backgroundColor: Colors.tropicalBlue,
        borderRadius: 12,
        marginTop: '12%',
        shadowColor: 'black',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.26,
        shadowRadius: 15,
        elevation: 5,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default StartScreen;