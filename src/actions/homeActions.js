import { CHANGE_HOME_PROPS, RESET_HOME_PROPS } from '../constants/actionsTypes'

export function changeHomeProps (data) {
  return dispatch => dispatch({
    type: CHANGE_HOME_PROPS,
    payload: data
  })
}

export function resetHomeProps () {
  return dispatch => dispatch({
    type: RESET_HOME_PROPS
  })
}
