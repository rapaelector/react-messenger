const initialState = {
    messages: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_MESSAGE_FOR_GROUP':
            return {...state, messages: action.payload}
        default : 
            return state;
    }
}