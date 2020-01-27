import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import rootReducer from './root'
import userReducer from './users'

export default history =>
  combineReducers({
    router: connectRouter(history),
    root: rootReducer,
    user: userReducer
  })
