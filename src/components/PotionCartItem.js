import React from 'react'

import { CartItemContainer } from './containers/cartItemContainer'
import { PotionName } from './Text/PotionName'

export const PotionCartItem = props => {
  const { item } = props

  return (
    <CartItemContainer className="bx--row">
      <div className="bx--col-md-1">
        <img width="72px" src={item.potion.image_thumb} />
      </div>
      <div className="bx--col-md-10">
        <PotionName>{item.potion.name}</PotionName>
      </div>
      <div className="bx--col-md-1">
        <PotionName>{item.count}</PotionName>
      </div>
    </CartItemContainer>
  )
}

export default PotionCartItem
