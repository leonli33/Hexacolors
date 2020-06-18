import { bindActionCreators } from "redux"

const SET_COLOR_AND_COLORS_USED = "SET_COLOR_AND_COLORS_USED"
const ADD_USER_CHOSEN_COLOR = 'ADD_USER_CHOSEN_COLOR'
const REMOVE_USER_CHOSEN_COLOR = 'REMOVE_USER_CHOSEN_COLOR'
const RESET_LEVEL_COLORS = 'RESET_LEVEL_COLORS'

const currentState = {
    // Color at index corresponds to the color of the level
    levelColors: [["#EA4335", "#4285F4"], ["#FBBC05", "#34A853"], ["#942EBE",
                  "#00ECFA"], ["#F8712E", "#181762"], ["#FFC6E3", "#696969"]],
    // Contains an array that has the hexcodes of the colors needed
    levelAnswer: ["placeholder", "#EA4335", "#986393", "#9DA07E", "#89B736", "#5682DC", "#FA961A",
                  "#1567AE", "#835C93", "#C34C82", "#6C3C67", "#B88065", "#F47923", "#ADBD69", "#CF4969",
                  "#61C871", "#FBA65C", "#887EA7", "#2771C5", "#BA8C34", "#5F72CB", "#7E6EAA" ],
    levelComponentsToAnswer: ["placeholer",["#EA4335"], ["#EA4335", "#4285F4"], ["#FBBC05", "#4285F4"],
                              ["#FBBC05", "#34A853"], ["#942EBE", "#00ECFA"], ["#FBBC05", "#F8712E"], 
                              ["#00ECFA", "#181762"], ["#942EBE", "#696969"], ["#942EBE", "#F8712E"], 
                              ["#F8712E", "#181762"], ["#EA4335", "#FBBC05"," #4285F4"], 
                              ["#EA4335", "#FBBC05", "#F8712E"], ["#FBBC05", "#34A853", "#FFC6E3"], 
                              ["#EA4335", "#942EBE", "#F8712E"], ["#FBBC05","#00ECFA", "#34A853"], 
                              ["#FBBC05", "#F8712E", "#FFC6E3"], ["#F8712E", "#00ECFA", "#942EBE"], 
                              ["#4285F4", "#00ECFA"," #181762"], ["#EA4335", "#FBBC05", "#34A853", "#F8712E"],
                              ["#4285F4", "#942EBE", "#00ECFA", "#181762", "#FFC6E3"], 
                              ["#942EBE", "#00ECFA", "#F8712E", "#181762", "#FFC6E3"]] ,
    // current level that the user is playing
    currentLevel: 0,
    // furthest level that the user has gotten to
    furthestLevelCompleted: 0,
    colorsChosenSoFar: [],
    currentLevelUserHexCode: ""

}

export default (state = currentState, action) => {
    switch(action.type) {
        case SET_COLOR_AND_COLORS_USED: 
            currentState.currentLevelUserHexCode = action.payload.currentLevelUserHexCode
            currentState.colorsChosenSoFar = action.payload.currentColorsChosen
            return {...currentState}    
        case ADD_USER_CHOSEN_COLOR:
            currentState.colorsChosenSoFar.push(action.payload)
            return {...currentState}
        case REMOVE_USER_CHOSEN_COLOR:
            currentState.colorsChosenSoFar.splice(currentState.colorsChosenSoFar.indexOf(action.payload), 1);
            return {...currentState}
        case RESET_LEVEL_COLORS :
            currentState.colorsChosenSoFar = [];
            currentState.currentLevelUserHexCode = "";
            return {...currentState}
        default:
            return state;
    }
}