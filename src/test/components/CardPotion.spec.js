import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'

import { history } from '../../store/index'
import CardPotion from '../../components/CardPotion'

const initialState = {}

const middlewares = [routerMiddleware]
const mockStore = configureStore(middlewares)

describe('CardPotion', () => {
  it('should render correctly in "debug" mode', () => {
    const store = mockStore(initialState)
    const component = shallow(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CardPotion debug />
        </ConnectedRouter>
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })

  it('should render correctly a potion in the list', () => {
    const store = mockStore(initialState)
    const component = shallow(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CardPotion debug potion={{name: 'Veneno'}}/>
        </ConnectedRouter>
      </Provider>
    )
    expect(component.html()).toContain('Veneno')
  })
})
