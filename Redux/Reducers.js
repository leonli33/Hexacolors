import ActionNames from '../Constants/ActionTypes'

const currentState = {
    // Color at index corresponds to the color of the level
    levelColors: [["#EA4335", "#4285F4"], ["#FBBC05", "#34A853"], ["#942EBE",
                  "#00ECFA"], ["#F8712E", "#181762"], ["#FFC6E3", "#696969"]],
    // Has the user beaten this level yet?
    levelBeaten: [],
    // Contains an array that has the hexcodes of the colors needed
    levelAnswer: [],
    // current level that the user is playing
    currentLevel: 0,
    // furthest level that the user has gotten to
    furthestLevelCompleted: 0,

}

export default (state = currentState, action) => {
    switch(action.type) {
        default:
            return state
    }
}