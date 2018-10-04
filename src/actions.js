import axios from 'axios'
import { currencyoverview } from './url'

export const REQUEST_UPDATE = 'app.reload'
function requestUpdate () {
  return { type: REQUEST_UPDATE }
}

export const RECEIVE_UPDATE = 'app.reload_success'
function receiveUpdate (data) {
  return { type: RECEIVE_UPDATE, receivedAt: Date.now(), data }
}

export function fetchCurrency () {
  return function (dispatch) {
    dispatch(requestUpdate())

    return axios.get(currencyoverview())
      .then(response => response.data)
      .catch(error => console.error(error))
      .then(json => dispatch(receiveUpdate(json)))
  }
}

export const ADD_IGNORE = 'app.add_to_ignore_list'
export function addIgnoreList (id) {
  return { type: ADD_IGNORE, id }
}

export const REMOVE_IGNORE = 'app.remove_from_ignore_list'
export function removeIgnoreList (id) {
  return { type: REMOVE_IGNORE, id }
}

export const UPDATE_MARGIN = 'app.update_margin'
export function updateMargin (margin) {
  return { type: UPDATE_MARGIN, margin }
}

export const UPDATE_MULTIPLIER = 'app.update_multiplier'
export function updateMultiplier (multiplier) {
  return { type: UPDATE_MULTIPLIER, multiplier }
}

export const UPDATE_FILTER = 'app.update_filter'
export function updateFilter (filter) {
  return { type: UPDATE_FILTER, filter }
}
