import produce from 'immer'
import { authTypes } from '../action-types/authTypes'


const initialState = {
    token: '',
    isLoggedIn: false,
    logoutTimer: null,
    userId: 1234,
}

const authReducer = (state = initialState, { type, payload }) =>
    produce(state, (draftState) => {
        switch (type) {
            case authTypes.LOGIN_STATE_HANDLER:
                draftState.isLoggedIn = !!payload
                return

            case authTypes.LOGIN_HANDLER:
                draftState.token = payload.token
                draftState.isLoggedIn = !!payload.token
                localStorage.setItem('userId', payload.userId)
                localStorage.setItem('userEmail', payload.email)
                return

            case authTypes.LOGOUT_HANDLER:
                draftState.isLoggedIn = false
                localStorage.removeItem('userId')
                return

            default:
                return draftState
        }
    })

export default authReducer
