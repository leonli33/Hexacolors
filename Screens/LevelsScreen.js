import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import LevelBox from '../Components/LevelBox'
import { color } from 'react-native-reanimated';

class LevelsScreen extends Component {

    navigateTo = () => {
        this.props.navigation.navigate("Game");
    }

    constructor() {
        super();
        const colors = [];
        for(let i = 0; i < 10; i++) {
            let colorArr = [];
            for(let j = 0; j < 3; j++) {
                colorArr.push(i)
            }
            colors.push(colorArr)
        }
        this.state = {
            colorList: colors
        }
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                {this.state.colorList.map((row, rowIndex) => {
                        return (
                           <View key={rowIndex + 31} style={styles.row}>
                                {row.map((color, index) => {
                                    return (
                                        <LevelBox hexColor={color} nagivateTo={this.navigateTo} level={(rowIndex * 3) + index + 1} key={(rowIndex * 3) + index + 1}></LevelBox>
                                    );
                                })}
                            </View> 
                        );
                    })    
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: '5%'
    },  
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})

export default LevelsScreen;