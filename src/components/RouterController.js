import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { HashRouter, Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { NAVIGATION_ROUTES } from '../constants/navigation'
import { history } from '../store'
import Header from './Header/Header'
import { PrincipalContainer } from './containers/PrincipalContainer'

const RouterController = props => {
  const { routes, authenticated } = props
  return (
    <HashRouter>
      <ConnectedRouter history={history}>
        <PrincipalContainer>
          <Switch>
            {routes.PUBLIC.map((route, i) => {
              return <Route key={i} {...route} routes={route} />
            })}
            <Header/>
          </Switch>
          <Switch>
            {routes.PRIVATE.map((route, i) => {
              return !authenticated ? (
                <Redirect key={i}
                  to={{
                    pathname: NAVIGATION_ROUTES.LOGIN
                  }}
                />
              ) : (
                <Route key={i} {...route} routes={route} />
              )
            })}
          </Switch>
        </PrincipalContainer>
      </ConnectedRouter>
    </HashRouter>
  )
}

RouterController.propTypes = {
  routes: PropTypes.object,
  authenticated: PropTypes.bool,
  userGroup: PropTypes.string
}

function mapStateToProps (state) {
  return {
    authenticated: state.user.authenticated
  }
}

export default connect(mapStateToProps)(RouterController)
