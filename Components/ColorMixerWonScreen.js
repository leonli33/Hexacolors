import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import GameWonColorBox from './GameWonColorBox'
import Colors from '../Constants/Colors';
import Modal from 'react-native-modal';

const ColorMixerWonScreen = (props) => {

    const styles = StyleSheet.create({
        background: {
            width: '90%',
            height: '60%',
            backgroundColor: 'whitesmoke',
            alignSelf: 'center',
            borderRadius: 15,
            alignItems: 'center',
            borderWidth: 5,
            borderColor: props.targetColor,
            minHeight: 450 
        },
        LevelsButton:{
            width:'40%',
            height: 50,
            backgroundColor: Colors.buttonBackground,
            borderRadius: 15,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Avenir-Black',
            fontSize: 20
        }
    })

    //<Text style={{fontSize: 25}}>{props.totalColorsNeeded - 1 === index ? "" : " + "}</Text>
    //style={{height: '100%', justifyContent: 'center', alignItems: 'center'}} transparent={true} visible={props.visibility} animationType={"slide"} backdropOpacity={0.5}
    return (
        <Modal style={{height: '100%', justifyContent: 'center', alignItems: 'center'}} transparent={true} isVisible={props.visibility} 
                        animationType={"slide"} backdropOpacity={0.8} animationInTiming={1500} backdropTransitionInTiming={2500}>
            <View style={styles.background}>
                <Text style={{marginTop: '5%', fontSize: 25}}>Nice Job!</Text>
                
                <View style={{width: '90%', height: '40%', flexDirection: 'row', justifyContent:'flex-start', marginTop:'7%'}}>
                    <View style={{width:'30%', marginRight: '-3%'}}>
                        <GameWonColorBox color={props.targetColor}/>
                    </View>
                    <Text style={{fontSize: 25}}> =</Text> 
                    <View style={{height: '100%', width:'80%', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'flex-start'}}>
                        {props.colorsNeeded.map((color, index) => {
                            return (
                                <View key={index} style={{flexDirection:'row', flexWrap: 'wrap', marginHorizontal: '6%', marginBottom:'6%'}}>
                                    <GameWonColorBox color={color}/>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View style={{flexDirection:'row', justifyContent: 'space-evenly', width: '100%', marginTop:'30%'}}>
                        <TouchableOpacity onPress={props.handleBackPress} style={styles.LevelsButton}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.handleNextPress(props.level + 1)} style={styles.LevelsButton}>
                            <Text>Next Level</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

//onPress={navigation.navigate("Levels")}


export default ColorMixerWonScreen;