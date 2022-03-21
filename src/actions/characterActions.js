import axios from 'axios'
import { CHANGE_CHARACTER_PROPS, RESET_CHARACTER_PROPS } from '../constants/actionsTypes'

export function changeCharacterProps (data) {
  return dispatch => dispatch({
    type: CHANGE_CHARACTER_PROPS,
    payload: data
  })
}

export function resetChanracterProps () {
  return dispatch => dispatch({
    type: RESET_CHARACTER_PROPS
  })
}

export function getCharacterData (number) {
  return async dispatch => {
    const responsePeople = await axios({
      url: 'https://swapi.dev/api/people/' + number,
      method: 'get'
    })

    if (responsePeople.status !== 200) {
      // SOMETHING WENT WRONG
    }

    const responseHomeworld = await axios({
      url: responsePeople.data.homeworld,
      method: 'get'
    })

    if (responseHomeworld.status !== 200) {
      // SOMETHING WENT WRONG
    }

    const homeworldName = responseHomeworld.data.name

    const filmPromises = responsePeople.data.films.map((url) => new Promise((resolve, reject) => {
      axios({
        url: url,
        method: 'get'
      })
        .then(res => resolve(res))
        .catch(err => reject(err))
    }))

    const filmResponses = await Promise.all([...filmPromises])

    dispatch({
      type: CHANGE_CHARACTER_PROPS,
      payload: { detail: { ...responsePeople.data, homeworldName, filmNames: [...filmResponses.map(f => f.data.title)] } }
    })
  }
}
