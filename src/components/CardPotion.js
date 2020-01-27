import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { Card } from './Card'
import { addPotion } from '../actions/chest'
import { ImageContainer } from './containers/ImageContainer'
import { Title } from './Text/Title'
import { primaryColor } from '../constants/colors'
import { Text } from './Text/Text'
import { ButtonCardContainer } from './containers/ButtonCardContainer'
import { Button } from './Button'

export const CardPotion = props => {
  const { potion, addPotion } = props

  const onClick = e => {
    e.preventDefault()
    addPotion(potion)
  }

  return (
    <Card>
      <ImageContainer>
        <img width="100%" src={potion.image_thumb} />
      </ImageContainer>
      <Title color={primaryColor}>
        {potion.prize} {potion.currency}
      </Title>
      <Text>{potion.name}</Text>
      <ButtonCardContainer>
        <Button secondary onClick={e => onClick(e)}>Añadir al carrito</Button>
      </ButtonCardContainer>
    </Card>
  )
}

CardPotion.propTypes = {
  potion: PropTypes.object,
  addPotion: PropTypes.func
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps, { addPotion })(CardPotion)
