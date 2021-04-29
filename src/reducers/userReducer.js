const initialState = {
    users: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_USERS_EXPRESS':
            return {...state, users: action.payload}
        default : 
            return state;
    }
}