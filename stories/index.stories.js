import React from 'react'
import '../src/index.scss'

import configureStore from '../src/store/index'
import Provider from '../src/store/Provider'

const store = configureStore()

export const withProvider = story => (
  <Provider store={store}>{story()}</Provider>
)

