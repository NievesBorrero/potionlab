import { all } from 'redux-saga/effects'

import { authenticationSaga } from '../sagas/authentication'
import { potionSaga } from './potions'

export default function * rootSaga () {
  yield all([
    ...authenticationSaga,
    ...potionSaga
  ])
}
