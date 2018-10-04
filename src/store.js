import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './reducers'

const loggerMiddleware = createLogger()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['margin', 'filter', 'ignoreList', 'multiplier']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
))

export const persistor = persistStore(store)
