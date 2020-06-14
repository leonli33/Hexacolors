import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, Dimensions, Text} from 'react-native'
import ColorBox from '../Components/ColorBox'
import ColorChoice from '../Components/ColorChoice'
import Colors from '../Constants/Colors'
import {connect} from 'react-redux'


class GameScreen extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {width, height} = Dimensions.get('window')
        const colorWidth = Math.round(width / 5);

        return(
            <View style={{backgroundColor: Colors.backgroundCol}}>
                <View style={styles.colorboxes}>
                    <ColorBox></ColorBox>
                    <ColorBox></ColorBox>
                </View>
                <View style={{ width: '100%', backgroundColor: Colors.buttonBackground, marginTop: '25%', height:'65%',
                                shadowColor: 'black', shadowOffset: {width:0, height:2}, shadowOpacity: 0.26, shadowRadius: 15,
                                elevation: 5, justifyContent:'center',}}>
                    <Text style={{fontSize: 17, marginLeft: '2.5%', marginTop:'3%'}}>Choose 3 Colors</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} automaticallyAdjustContentInsets={false} disableIntervalMomentum={true} 
                                directionalLockEnabled={true} style={styles.scroll} decelerationRate={0} horizontal={true} snapToAlignment={"end"} 
                                snapToInterval={width - 60}>
                        {this.props.colorElements.map((elementArr, arrIndex) => {
                            return (
                                <View key={arrIndex + 12}>
                                    {elementArr.map((color, index) => {
                                        return (
                                            <ColorChoice color={color} key={index + arrIndex}></ColorChoice>
                                        )
                                    })}
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    colorboxes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    scroll: {   
        marginLeft: '2.5%',
        marginTop: '4%',
        paddingTop: 4
    }
})

function mapStateToProps(state) {
    return {
        colorElements: state.levelColors
    }
}

export default connect(mapStateToProps)(GameScreen);