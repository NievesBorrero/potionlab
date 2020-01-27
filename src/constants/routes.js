import Dashboard from '../views/Dashboard'
import { LearnReact } from '../views/LearnReact'
import { SimpleComponent } from '../views/componentList/SimpleComponent'
import { NAVIGATION_ROUTES } from './navigation'
import { PropsComponent } from '../views/componentList/PropsComponent'
import { ConditionalPropsComponent } from '../views/componentList/ConditionalPropsComponent'
import { StateComponent } from '../views/componentList/StateComponent'
import { EffectComponent } from '../views/componentList/EffectComponent'
import { Login } from '../views/Login'
import PotionChest from '../views/PotionChest'

export const APPLICATION_ROUTES = {
  PUBLIC: [
    {
      path: NAVIGATION_ROUTES.LOGIN,
      exact: true,
      component: Login
    }
  ],
  PRIVATE: [
    {
      path: NAVIGATION_ROUTES.HOME,
      exact: true,
      component: Dashboard
    },
    {
      path: NAVIGATION_ROUTES.SIMPLE_COMPONENT,
      exact: true,
      component: SimpleComponent
    },
    {
      path: NAVIGATION_ROUTES.PROPS_COMPONENT,
      exact: true,
      component: PropsComponent
    },
    {
      path: NAVIGATION_ROUTES.STATE_COMPONENT,
      exact: true,
      component: StateComponent
    },
    {
      path: NAVIGATION_ROUTES.EFFECT_COMPONENT,
      exact: true,
      component: EffectComponent
    },
    {
      path: NAVIGATION_ROUTES.LEARN_REACT,
      exact: true,
      component: LearnReact
    },
    {
      path: NAVIGATION_ROUTES.CONDITIONAL_PROPS_COMPONENT,
      exact: true,
      component: ConditionalPropsComponent
    },
    {
      path: NAVIGATION_ROUTES.LOGIN,
      exact: true,
      component: Login
    },
    {
      path: NAVIGATION_ROUTES.POTION_CHEST,
      exact: true,
      component: PotionChest
    }
  ]
}
