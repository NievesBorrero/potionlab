import { takeEvery, call, put, select } from 'redux-saga/effects'

import { getToken } from '../selectors/index'
import { getHttpActionError } from '../helpers'
import { POTION } from '../constants/actionTypes'
import { apiList } from '../services/ApiClient'

export function * getPotions (action) {
  const token = yield select(getToken)

  try {
    const payload = yield call(
      apiList,
      token,
      'potions',
      action.payload
    )

    yield put({ type: POTION.LIST.SUCCESS, payload })
  } catch (e) {
    console.log(e)
    yield put({
      type: getHttpActionError(e, POTION.LIST.ERROR),
      payload: e
    })
  }
}

export const potionSaga = [
  takeEvery(POTION.LIST.REQUEST, getPotions)
]
