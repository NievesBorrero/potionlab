import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormGroup } from 'carbon-components-react'

import { authenticateUser, checkAuthenticated } from '../actions/users'
import { Button } from './Button'
import { TextInput } from './Form/TextInput'
import { LoginFormContainer } from './containers/LoginFormContainer'

const LoginForm = props => {
  const [user, setUser] = useState({})

  useEffect(() => {
    props.checkAuthenticated()
  })

  const login = e => {
    const { authenticateUser } = props

    e.preventDefault()

    const userFormData = new FormData()
    userFormData.append('username', user.username)
    userFormData.append('password', user.password)

    authenticateUser(userFormData)
  }

  const handleChange = (propertyName, e) => {
    user[propertyName] = e.target.value
    console.log(user)
    setUser(user)
  }

  return (
    <LoginFormContainer className="bx--col-md-5">
      <FormGroup legendText="">
        <TextInput
          placeholder="Email"
          name="username"
          onChange={e => handleChange('username', e)}
        />
      </FormGroup>
      <FormGroup legendText="">
        <TextInput
          placeholder="Password"
          name="password"
          type="password"
          onChange={e => handleChange('password', e)}
        />
      </FormGroup>

      <FormGroup legendText="">
        <Button primary onClick={e => login(e)}>
          Inicia sesión escoria humana
        </Button>
      </FormGroup>
    </LoginFormContainer>
  )
}

LoginForm.propTypes = {
  checkAuthenticated: PropTypes.func,
  authenticateUser: PropTypes.func
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, {
  authenticateUser,
  checkAuthenticated
})(LoginForm)
