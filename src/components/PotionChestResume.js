import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { history } from '../store/index'
import { NAVIGATION_ROUTES } from '../constants/navigation'
import { TotalTagContainer } from './containers/TotalTagContainer'
import Link from 'carbon-components-react/lib/components/UIShell/Link'

const PotionChestResume = props => {
  const { total_potions } = props

  return (
    <div>
      <Link
        onClick={e => {
          e.preventDefault()
          history.push(NAVIGATION_ROUTES.POTION_CHEST)
        }}
      >
        <img src="static/images/shopping-cart.svg"/>

      <TotalTagContainer>{total_potions}</TotalTagContainer>
      </Link>
    </div>
  )
}

PotionChestResume.propTypes = {
  total_potions: PropTypes.number
}

function mapStateToProps(state) {
  return {
    total_potions: state.root.chest.total_potions
  }
}

export default connect(mapStateToProps)(PotionChestResume)
