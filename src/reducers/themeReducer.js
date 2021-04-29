const initialState = {
    light: true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SWITCH_THEME':
            return {...state, light: !state.light}
        default : 
            return state;
    }
}