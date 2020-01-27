import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { routerMiddleware } from 'connected-react-router'

import App from '../../components/App'

const initialState = {}

const middlewares = [routerMiddleware]
const mockStore = configureStore(middlewares)

describe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const store = mockStore(initialState)
    const component = shallow(
      <Provider store={store}>
        <App debug />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
