import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, Dimensions, Text} from 'react-native'
import ColorBox from '../Components/ColorBox'
import ColorChoice from '../Components/ColorChoice'
import Colors from '../Constants/Colors'
import {connect} from 'react-redux'
import {SetCurrentColorAndColorsUsed, AddUserChosenColor, RemoveUserChosenColor, ResetColors} from '../Redux/Actions'
import Hint from '../Components/Hint'


class GameScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hint1: false,
            hint2: false,
            hint3: false,
        }
    }

    // Determine which hints have been selected
    onHintPress1 = () => {
        this.setState({
            hint1: !this.state.hint1
        })
    }
    onHintPress2 =() => {
        this.setState({
            hint2: !this.state.hint2
        })
    }
    onHintPress3 =() => {
        this.setState({
            hint3: !this.state.hint3
        })
    }

    // Thanks to https://github.com/GirkovArpa/hex-color-mixer for the color mixing algorithm!
    hex2dec = (hex) => {
        hex = "" + hex
        return hex.replace('#', '').match(/.{2}/g).map(n => parseInt(n, 16));
    }
      
    rgb2hex = (r, g, b) => {
        r = Math.floor(r);
        g = Math.floor(g);
        b = Math.floor(b);
        r = Math.min(r, 255);
        g = Math.min(g, 255);
        b = Math.min(b, 255);
        return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    }
      
    rgb2cmyk = (r, g, b) => {
        let c = 1 - (r / 255);
        let m = 1 - (g / 255);
        let y = 1 - (b / 255);
        let k = Math.min(c, m, y);
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
        return [c, m, y, k];
    }
      
    cmyk2rgb = (c, m, y, k) => {
        let r = c * (1 - k) + k;
        let g = m * (1 - k) + k;
        let b = y * (1 - k) + k;
        r = (1 - r) * 255 + .5;
        g = (1 - g) * 255 + .5;
        b = (1 - b) * 255 + .5;
        return [r, g, b];
    }
      
    mix_cmyks = (...cmyks) => {
        let c = cmyks.map(cmyk => cmyk[0]).reduce((a, b) => a + b, 0) / cmyks.length;
        let m = cmyks.map(cmyk => cmyk[1]).reduce((a, b) => a + b, 0) / cmyks.length;
        let y = cmyks.map(cmyk => cmyk[2]).reduce((a, b) => a + b, 0) / cmyks.length;
        let k = cmyks.map(cmyk => cmyk[3]).reduce((a, b) => a + b, 0) / cmyks.length;
        return [c, m, y, k];
    }
      
    mix_hexes = (hexes) => {
        let rgbs = hexes.map(hex => this.hex2dec(hex)); 
        let cmyks = rgbs.map(rgb => this.rgb2cmyk(...rgb));
        let mixture_cmyk = this.mix_cmyks(...cmyks);
        let mixture_rgb = this.cmyk2rgb(...mixture_cmyk);
        let mixture_hex = this.rgb2hex(...mixture_rgb);
        return mixture_hex;
    }

    // This function handles the logic when a user presses a color
    handleColorSelected = (color) => {
        // If the set of currently chosen colors includes the color that that
        // user is pressing, then we know that they want to remove it
        if(this.props.currentColorsChosen.includes(color)) {
            // Remove the color pressed
            this.props.RemoveUserChosenColor(color);
            // If there are no more selected colors, reset all the colors
            if(this.props.colors.length === 0) {
                this.props.ResetColors();
            } else {
                // Get new colors that results from remaining selected colors
                let newColor = this.mix_hexes(this.props.colors).toUpperCase();
                this.props.SetCurrentColorAndColorsUsed({currentLevelUserHexCode: newColor, currentColorsChosen: this.props.colors})
            }
        } else {
            // User wants to add a color to the mix
            this.props.AddUserChosenColor(color)
            if(this.props.colors.length === 0) {
                // If there are currently no selected colors, then the color that the user selects is the
                // color to be displayed
                this.props.SetCurrentColorAndColorsUsed({currentLevelUserHexCode: color, currentColorsChosen: this.props.colors})
            } else {
                // Otherwise, mix all of the currently selected colors together and form a new color
                let newColor = this.mix_hexes(this.props.colors).toUpperCase();
                this.props.SetCurrentColorAndColorsUsed({currentLevelUserHexCode: newColor, currentColorsChosen: this.props.colors})
            }
        }
    }

    render() {
        // Level represents the current level in the game we are in
        const {level} = this.props.route.params;
        // Each level has a particular amont of hints. The following 2 if statements determine
        // how many hints the user is allowed
        let hints = <View style={{flexDirection: 'row', marginTop:'35%',marginLeft: '2.5%', justifyContent: 'flex-start'}}>
                        <Hint number={1} handlePress={this.onHintPress1} selected={this.state.hint1}></Hint>
                    </View>
        if(level >= 10 && level < 18) {
            hints = <View style={{flexDirection: 'row', marginTop:'35%', marginLeft: '2.5%', justifyContent: 'flex-start'}}>
                        <Hint number={1} handlePress={this.onHintPress1} selected={this.state.hint1}></Hint>
                        <Hint number={2} handlePress={this.onHintPress2} selected={this.state.hint2}></Hint>
                    </View>
        } else if(level >= 18) {
            hints = <View style={{flexDirection: 'row', marginTop:'35%', marginLeft: '2.5%', justifyContent: 'flex-start'}}>
                        <Hint number={1} handlePress={this.onHintPress1} selected={this.state.hint1}></Hint>
                        <Hint number={2} handlePress={this.onHintPress2} selected={this.state.hint2}></Hint>
                        <Hint number={3} handlePress={this.onHintPress3} selected={this.state.hint3}></Hint>
                    </View>
        }

        // selectedText tells the user how many colors they need to select in order to beat the level.
        // This count is determined through the logic below
        let selectedText = ""
        let numberOfColors = this.props.numColors[level];
        if(numberOfColors === 1) {
            selectedText= "Select 1 Color"
        } else if(numberOfColors !== 5) {
            selectedText =  "Select " + numberOfColors + " Colors"
        }
        if(this.state.hint3) {
            selectedText =  "Select " + numberOfColors + " Colors"
        }

        return(
            <View style={{backgroundColor: Colors.backgroundCol, width: '100%', height: '100%'}}>
                <View style={styles.colorboxes}>
                    <ColorBox lastColor={this.props.previousHexcode} title={"Target Color"} color={this.props.levelColors[level]}></ColorBox>
                    <ColorBox lastColor={this.props.previousHexcode} title={"Current Color"} color={this.props.color}></ColorBox>
                </View>
                {hints}
                <View style={{ width: '100%', backgroundColor: Colors.buttonBackground, marginTop: '5%', height:'100%',
                            shadowColor: 'black', shadowOffset: {width:0, height:2}, shadowOpacity: 0.26, shadowRadius: 15,
                            elevation: 5, justifyContent:'center',}}>
                    <Text style={{fontSize: 17, marginLeft: '2.5%', marginTop:'3%'}}>{selectedText}</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} automaticallyAdjustContentInsets={false} disableIntervalMomentum={true} 
                            directionalLockEnabled={true} style={styles.scroll} decelerationRate={0} horizontal={true} snapToAlignment={"end"} 
                        >
                        {this.props.colorElements.map((elementArr, arrIndex) => {
                            return (
                                <View key={arrIndex + 12}>
                                    {elementArr.map((color, index) => {
                                        return (
                                            <ColorChoice hint1Activated={this.state.hint1} hint2Activated={this.state.hint2} hint3Activated={this.state.hint3} hints1={this.props.hints1[level]} 
                                                         colorsChosen={this.props.currentColorsChosen} currentLevel={level} hint1={this.state.hint1} onColorPress={this.handleColorSelected} 
                                                         hints2={this.props.hints2[level]} color={color} index={index + (2 * arrIndex)} key={index + arrIndex}></ColorChoice>
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
        width: '100%',
        height: '30%'
    },
    scroll: {   
        marginLeft: '2.5%',
        padding: 6,
        width:'100%',
        height: '30%',
        marginTop:'3%'
    }
})

function mapStateToProps(state) {
    return {
        colorElements: state.levelColors,
        color: state.currentLevelUserHexCode,
        colors: state.colorsChosenSoFar,
        currentColorsChosen: state.colorsChosenSoFar,
        levelColors: state.levelAnswer,
        hints1: state.levelHint1,
        hints2: state.levelHint2,
        numColors: state.numColors,
        previousHexcode: state.lastColorHexcode
    }
}

export default connect(mapStateToProps, {SetCurrentColorAndColorsUsed, AddUserChosenColor, RemoveUserChosenColor, ResetColors})(GameScreen);