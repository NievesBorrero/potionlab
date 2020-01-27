import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { withProvider } from './index.stories'
import Header from '../src/components/Header/Header'

storiesOf('Header', module)
  .addDecorator(withProvider)
  .addDecorator(StoryRouter())
  .add('Default', () => <Header/>)
