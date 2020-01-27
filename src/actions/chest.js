import { CHEST } from '../constants/actionTypes'

export const addPotion = payload => {
  return { type: CHEST.ADD_POTION.REQUEST, payload }
}

export const removePotion = payload => {
  return { type: CHEST.REMOVE_POTION.REQUEST, payload }
}
