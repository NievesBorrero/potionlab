import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { CardsContainer } from '../components/containers/CardsContainer'
import CardPotion from '../components/CardPotion'
import { getPotions } from '../actions/potions'
import { GroupTitle } from '../components/Text/GroupTitle'
import { ViewContainer } from '../components/containers/ViewContainer'

export const Dashboard = props => {
  const { getPotions, potions } = props

  useEffect(() => {
    getPotions()
  }, [])

  return (
    <ViewContainer>
      <GroupTitle>Las más populares</GroupTitle>
      <CardsContainer>
        {potions.map((potion, index) => (
          <CardPotion key={index} potion={potion} />
        ))}
      </CardsContainer>
      <hr/>
      <GroupTitle>Las demás pociones que no son tan ways</GroupTitle>
      <CardsContainer>
        {potions.map((potion, index) => (
          <CardPotion key={index} potion={potion} />
        ))}
      </CardsContainer>
    </ViewContainer>
  )
}

Dashboard.propTypes = {
  potions: PropTypes.array,
  getPotions: PropTypes.func
}

function mapStateToProps(state) {
  return {
    potions: state.root.potions
  }
}

export default connect(mapStateToProps, { getPotions })(Dashboard)
