import { POTION, CHEST } from '../constants/actionTypes'
import ChestType from '../constants/chestType'
import { getChest } from '../helpers/chest'

const initialState = {
  potions: [],
  chest: ChestType.getDefaultState()
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHEST.ADD_POTION.REQUEST:
      return {
        ...state,
        chest: getChest(state.chest, action.payload)
      }
    case POTION.LIST.SUCCESS:
      return {
        ...state,
        potions: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
