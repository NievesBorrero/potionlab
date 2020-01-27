import { find, uniq } from 'lodash'

/** This is a provisional solution to the Sysmana, until the backend is ready */
export const getChest = (chest, payload) => {
  let newPotions
  const oldPotions = chest.potions
  const potion = find(oldPotions, { potion: { id: payload.id } })

  if (potion) {
    potion.count = potion.count + 1
    newPotions = uniq(oldPotions.concat(potion))
  } else {
    newPotions = oldPotions.concat({ potion: payload, count: 1 })
  }

  chest.potions = newPotions
  chest.total_potions = chest.total_potions + 1

  return chest
}
