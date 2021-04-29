const initialState = {
    groups: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_GROUP_CURRENT_USER':
            return {...state, groups: action.payload}
        default : 
            return state;
    }
}