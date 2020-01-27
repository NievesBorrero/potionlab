import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { withProvider } from './index.stories'
import { Notification } from '../src/components/Notification'
import { SUCCESS, ERROR } from '../src/constants/MessageType'
import { INLINE, TOAST } from '../src/constants/NotificationTypes'

storiesOf('Notification', module)
  .addDecorator(withProvider)
  .addDecorator(StoryRouter())
  .add('Toast success', () => (
    <Notification
      notyficationType={TOAST}
      message={{ type: SUCCESS, text: 'Poción añadida en el cofre' }}
    />
  ))
  .add('Toast error', () => (
    <Notification
      notyficationType={TOAST}
      message={{
        type: ERROR,
        text: 'La poción no se ha podido añadir al cofre'
      }}
    />
  ))
