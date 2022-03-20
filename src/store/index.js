import { combineReducers } from 'redux'
import homeReducer from '../reducers/homeReducer'
import characterReducer from '../reducers/characterReducer'

export const rootReducer = combineReducers({
  home: homeReducer,
  character: characterReducer
})
