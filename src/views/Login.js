import React from 'react'

import LoginForm from '../components/LoginForm'
import { SecondaryContainer } from '../components/containers/SecondaryContainer'
import { LoginContainer } from '../components/containers/LoginContainer'
import { SecondaryLightContainer } from '../components/containers/SecondaryLightContainer'

export const Login = () => {
  return (
    <SecondaryContainer>
      <LoginContainer className="bx--row">
        <LoginForm />
        <SecondaryLightContainer className="bx--col-md-7"></SecondaryLightContainer>
      </LoginContainer>
    </SecondaryContainer>
  )
}
