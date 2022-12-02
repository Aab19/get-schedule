import AsyncStorage from '@react-native-async-storage/async-storage'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import Auth from './auth/reducer'
import Schedule from './schedule/reducer'

export let Middlewares

if (process.env.NODE_ENV == 'production') {
  Middlewares = applyMiddleware(thunk)
} else {
  Middlewares = applyMiddleware(thunk, logger)
}

export const Reducers = combineReducers({
  Auth,
  Schedule,
})

const persistConfig = {
  setTimeout: 2000,
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, Reducers)

export default () => {
  let store = createStore(persistedReducer, {}, Middlewares)
  let persister = persistStore(store)
  return {store, persister}
}
