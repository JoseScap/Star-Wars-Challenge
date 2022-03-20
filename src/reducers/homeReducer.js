import { CHANGE_HOME_PROPS, RESET_HOME_PROPS } from '../constants/actionsTypes'

const initialState = {
  characters: [],
  emptyMessage: ''
}

function homeReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_HOME_PROPS:
      return {
        ...state,
        ...action.payload
      }
    case RESET_HOME_PROPS:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default homeReducer
