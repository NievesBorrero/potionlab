import Raven from 'raven-js'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRavenMiddleware from 'raven-for-redux'

import rootReducer from '../reducers/index'
import rootSaga from '../sagas'

Raven.config(process.env.SENTRY_DSN_FRONTEND, { tags: ['frontend'] }).install()

export const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore (preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    storeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        createRavenMiddleware(Raven, {})
      )
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}
