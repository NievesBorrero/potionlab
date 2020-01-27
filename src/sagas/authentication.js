import { takeEvery, call, put } from 'redux-saga/effects'
import jwt_decode from 'jwt-decode'

import { HTTP_ERROR } from '../constants/http'
import { USER } from '../constants/users'
import {
  storeLocally,
  removeLocally,
  getFromLocal
} from '../services/LocalPersistService'
import { redirectTo } from '../helpers/index'
import { apiAuthenticate, apiRetrieve } from '../services/ApiClient'
import {
  authenticateSuccess,
  authenticateError,
  authenticateComplete,
  getUserSuccess
} from '../actions/users'

export function * authenticateUser (action) {
  try {
    const payload = yield call(apiAuthenticate, action.user)
    yield put(authenticateSuccess(payload))
  } catch (e) {
    yield put(authenticateError(e))
  }
}

export function * completeAuthentication (action) {
  let token

  if (action.type === USER.AUTHENTICATE.SUCCESS) {
    token = yield call(storeLocally, 'token', action.payload.token)
  } else {
    token = yield call(getFromLocal, 'token')
  }

  if (token) {
    yield put(authenticateComplete(token))
    const decoded = jwt_decode(token)
    const user = yield call(apiRetrieve, token, 'users', decoded.user_id)
    yield call(storeLocally, 'user', user)
    yield put(getUserSuccess(user))
    yield call(redirectTo, '/')
  }
}

export function * logout () {
  yield call(removeLocally, 'token')
  yield call(removeLocally, 'user')
  yield call(redirectTo, '/login')
}

export function * refreshAuthentication () {
  yield call(removeLocally, 'token')
  yield call(redirectTo, '/login')
}

export const authenticationSaga = [
  takeEvery(USER.AUTHENTICATE.REQUEST, authenticateUser),
  takeEvery(
    [USER.AUTHENTICATE.SUCCESS, USER.AUTHENTICATE.CHECK],
    completeAuthentication
  ),
  takeEvery(
    [HTTP_ERROR.AUTHENTICATION, HTTP_ERROR.INTERNAL_SERVER_ERROR],
    refreshAuthentication
  ),
  takeEvery(USER.AUTHENTICATE.LOGOUT, logout)
]
