import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { withProvider } from './index.stories'
import { NamesList } from '../src/views/componentList/ConditionalPropsComponent'

const defaultNamesList = ['React', 'Redux', 'Storybook']

storiesOf('NamesList', module)
  .addDecorator(withProvider)
  .addDecorator(StoryRouter())
  .add('Empty', () => <NamesList/>)
  .add('With data', () => <NamesList names={defaultNamesList}/>)
