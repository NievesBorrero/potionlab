import React from 'react'
import { render } from 'react-dom'
import Provider from './store/Provider'

import './index.scss'
import configureStore from './store/index'
import { App } from './components/App'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

