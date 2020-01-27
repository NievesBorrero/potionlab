import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { withProvider } from './index.stories'
import { Login } from '../src/views/Login'

storiesOf('Login', module)
  .addDecorator(withProvider)
  .addDecorator(StoryRouter())
  .add('Default', () => <Login />)
