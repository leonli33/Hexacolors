import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, Dimensions, Text} from 'react-native'
import ColorBox from '../Components/ColorBox'
import ColorChoice from '../Components/ColorChoice'
import Colors from '../Constants/Colors'
import {connect} from 'react-redux'


class GameScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            colors: [],
            color: ''
        }
    }

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

    handleColorSelected = (color) => {
        if(this.state.colors.length === 0) {
            let newColors = this.state.colors
            newColors.push(color);
            this.setState({
                color: color,
                colors: newColors
            })
        } else {
            let newColors = this.state.colors
            newColors.push(color);
            let newColor = this.mix_hexes(newColors).toUpperCase();
            this.setState({
                color: newColor,
                colors: newColors
            })
        }
    }

    render() {
        const {width, height} = Dimensions.get('window')
        const colorWidth = Math.round(width / 5);

        return(
            <View style={{backgroundColor: Colors.backgroundCol}}>
                <View style={styles.colorboxes}>
                    <ColorBox title={"Target Color"} color={'black'}></ColorBox>
                    <ColorBox title={"Current Color"} color={this.state.color}></ColorBox>
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
                                            <ColorChoice onColorPress={this.handleColorSelected} color={color} key={index + arrIndex}></ColorChoice>
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