import { combineReducers } from 'redux'
import characterReducer from '../reducers/characterReducer'

export const rootReducer = combineReducers({
  character: characterReducer
})
