import React from 'react'

import { ComponentList } from '../components/ComponentList'
import { COMPONENT_LIST } from '../constants/components'
import { ViewContainer } from '../components/containers/ViewContainer'
import { Title } from '../components/Text/Title'

export const LearnReact = () => {
  return (
    <ViewContainer>
      <Title>React para muggles: Componentes básicos</Title>
      <ComponentList elements={COMPONENT_LIST} />
    </ViewContainer>
  )
}
