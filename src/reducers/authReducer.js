import { AccessTimeOutlined } from "@material-ui/icons";

const initialState = {
    token: '',
    error: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            const {response} = action.payload;
            return {...state, token: response.token}
        case 'LOGIN_PENDING':
            return {...state, token: '', error: ''}
        case 'LOGOUT':
            return {...state, token: ''}
        case 'USER_NONVALID':
            return {...state, token: '', error: action.payload.error}
        case 'LOGIN_FAILED':
            const {error} = action.payload;
            return {...state, error: error}
        default : 
            return state;
    }
}