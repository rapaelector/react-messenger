const initialState = {
    counter: 0
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'DO_INCREMENT':
            return {...state, count: state.counter + 1}
        default : 
            return state;
    }
}