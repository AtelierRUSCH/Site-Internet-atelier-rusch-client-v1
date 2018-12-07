import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from './reducers/index.js'

const middlewares = []

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger)
}

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)

export default store
