const initialState = {
    chanels: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_CHANEL_CURRENT_USER':
            return {...state, chanels: action.payload.Groups}
        default : 
            return state;
    }
}