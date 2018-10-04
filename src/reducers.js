import {
  ADD_IGNORE,
  REMOVE_IGNORE,
  REQUEST_UPDATE,
  RECEIVE_UPDATE,
  UPDATE_MARGIN,
  UPDATE_MULTIPLIER,
  UPDATE_FILTER
} from './actions'

export function rootReducer (
  state = {
    isFetching: false,
    didInvalidate: false,
    data: {},
    margin: 0,
    multiplier: 100,
    filter: '',
    ignoreList: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_UPDATE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_UPDATE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: Object.assign({}, action.data, {
          lines: action.data.lines.sort((a, b) => a.chaosEquivalent > b.chaosEquivalent
            ? -1
            : a.chaosEquivalent < b.chaosEquivalent ? 1 : 0)
        }),
        lastUpdated: action.receivedAt
      })
    case ADD_IGNORE:
      return Object.assign({}, state, {
        ignoreList: [
          ...state.ignoreList,
          action.id
        ]
      })
    case REMOVE_IGNORE:
      return Object.assign({}, state, {
        ignoreList: state.ignoreList.filter(id => id !== action.id)
      })
    case UPDATE_MARGIN:
      return Object.assign({}, state, {
        margin: action.margin
      })
    case UPDATE_MULTIPLIER:
      return Object.assign({}, state, {
        multiplier: action.multiplier
      })
    case UPDATE_FILTER:
      return Object.assign({}, state, {
        filter: action.filter
      })
    default: return state
  }
}
