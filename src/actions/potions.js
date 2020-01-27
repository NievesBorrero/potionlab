import { POTION } from '../constants/actionTypes'

export const getPotions = payload => {
  return { type: POTION.LIST.REQUEST, payload }
}
