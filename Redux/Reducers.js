import ActionNames from '../Constants/ActionTypes'

const currentState = {
    // Color at index corresponds to the color of the level
    levelColors: [],
    // Has the user beaten this level yet?
    levelBeaten: [],
    // Contains an array that has the hexcodes of the colors needed
    levelAnswer: [],
    // current level that the user is playing
    currentLevel: 0,
    // furthest level that the user has gotten to
    furthestLevelCompleted: 0
}

export default (state = currentState, action) => {
    switch(action.type) {

    }
}