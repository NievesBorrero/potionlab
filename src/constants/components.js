import { NAVIGATION_ROUTES } from './navigation'

export const COMPONENT_LIST = [
  {
    name: 'Componente paupérrimo (JSX)',
    url: NAVIGATION_ROUTES.SIMPLE_COMPONENT,
    explanation: 'Sintaxis que facilita la vida'
  },
  {
    name: 'Componente con props',
    url: NAVIGATION_ROUTES.PROPS_COMPONENT,
    explanation: 'Información que pasamos a los componentes'
  },
  {
    name: 'Componente condicional con props',
    url: NAVIGATION_ROUTES.CONDITIONAL_PROPS_COMPONENT,
    explanation: 'Podemos renderizar de forma condicional'
  },
  {
    name: 'Componente con state',
    url: NAVIGATION_ROUTES.STATE_COMPONENT,
    explanation: 'Se declara y se manipula dentro del componente'
  },
  {
    name: 'Haciendo uso del ciclo de vida',
    url: NAVIGATION_ROUTES.EFFECT_COMPONENT,
    explanation: 'Fases de ejecución por las que pasa un componente'
  }
]
