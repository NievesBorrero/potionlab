import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'

import { withProvider } from './index.stories'
import CardPotion from '../src/components/CardPotion'

storiesOf('CardPotion', module)
  .addDecorator(withProvider)
  .addDecorator(StoryRouter())
  .add('Default', () => (
    <CardPotion
      potion={
        {
          id: '1',
          name: 'Poción de envejecimiento',
          effect:
            'Envejecimiento temporal. Cuanta más cantidad, mayor es el envejecimiento.',
          side_effects: null,
          ingredients: [
            {
              id: 1,
              created: '20-01-2020',
              modified: '20-01-2020',
              is_removed: false,
              name: 'Plátano'
            }
          ],
          image:
            'http://0.0.0.0:8080/media/local/images/b4e1d49d-d586-47a3-9b31-b390fc0a038a.png',
          image_thumb:
            'http://0.0.0.0:8080/media/CACHE/images/local/images/4dee3730-4c15-40dd-b52f-6cc9fd15b1da/58aa43e8d72d91ce744ab2a5761c7932.jpg'
        }
        }
    />
  ))

  export default CardPotion
