import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ViewContainer } from '../components/containers/ViewContainer'
import { GroupTitle } from '../components/Text/GroupTitle'
import { TextImage } from '../components/Text/TextImage'
import PotionCartItem from '../components/PotionCartItem'

export const PotionChest = props => {
  const { potions_chest } = props

  return (
    <ViewContainer className="bx--row">
      <div className="bx--col-md-7">
      <GroupTitle>
        <TextImage src="static/images/shopping-cart-teal.svg" /> Productos
      </GroupTitle>
      {potions_chest.map((item, index) => (
        <PotionCartItem key={index} item={item}/>
      ))}
      </div>
    </ViewContainer>
  )
}

PotionChest.propTypes = {
  chest: PropTypes.array
}

function mapStateToProps(state) {
  return {
    potions_chest: state.root.chest.potions
  }
}

export default connect(mapStateToProps)(PotionChest)
