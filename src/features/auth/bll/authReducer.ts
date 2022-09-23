import { AuthActionsType } from './authActions'

export type AuthStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
}

export const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.value }
    case 'login/SET-IS-REGISTERED':
      return { ...state, isRegistered: action.payload.value }
    default:
      return state
  }
}
