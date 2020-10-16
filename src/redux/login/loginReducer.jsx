
import { LOGGED_IN, LOGGED_OUT } from './actionsTypes'
const initialState = {
    loggedIn : false
}



function loginReducer(state = initialState, actions) {
    switch (actions.type) {
        case LOGGED_IN:
            return {
                ...state.state,
                loggedIn:true
            }
        case LOGGED_OUT:
            return {
                ...state.state,
                loggedIn:false
            } 
        default: return {state}
    }
}

export default loginReducer