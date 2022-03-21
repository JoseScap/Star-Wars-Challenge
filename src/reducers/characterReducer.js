import { CHANGE_CHARACTER_PROPS, RESET_CHARACTER_PROPS } from '../constants/actionsTypes'

const initialState = {
  id: null,
  name: '',
  detail: {}
}

function characterReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_CHARACTER_PROPS:
      return { ...state, ...action.payload }
    case RESET_CHARACTER_PROPS:
      return initialState
    default:
      return state
  }
}

export default characterReducer
