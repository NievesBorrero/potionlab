import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { withProvider } from './index.stories'
import { Button } from '../src/components/Button'

storiesOf('Button', module)
  .addDecorator(withProvider)
  .addDecorator(StoryRouter())
  .add('Primary', () => (
    <Button primary>Añadir Poción</Button>
  )).add('Secondary', () => (
    <Button secondary>Eliminar Poción</Button>
  ))

  export default Button
