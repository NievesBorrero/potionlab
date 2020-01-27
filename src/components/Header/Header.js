import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logoutUser } from '../../actions/users'
import { history } from '../../store/index'
import { HeaderContainer } from './HeaderContainer'
import { TextLink } from '../Text/TextLink'
import { FlexContainer } from '../containers/FlexContainer'
import { Title } from '../Text/Title'
import PotionChestResume from '../PotionChestResume'
import { Link } from 'carbon-components-react'
import { ProfileContainer } from '../containers/ProfileContainer'
import {PROFILE_IMAGE_HEAD, PROFILE_IMAGE} from '../../constants/icons'
import { darkText } from '../../constants/colors'

const Header = props => {
  const { logoutUser } = props

  const signout = () => {
    logoutUser()
  }

  return (
    <HeaderContainer className="bx--row">
      <div className="bx--col-xs-10">
        <TextLink to="/" onClick={() => history.push('/')}>
          <Title color={darkText}>Tienda</Title>
        </TextLink>
      </div>
      <FlexContainer className="bx--col-xs-2">
        <PotionChestResume />
        <div>
        <Link
          onClick={e => {
            e.preventDefault()
            signout()
          }}
        >
          <ProfileContainer>
            <svg
              className="icon-denim"
              width="24"
              height="24"
              viewBox="0 0 20 20"
            >
              <path d={PROFILE_IMAGE} />
              <path d={PROFILE_IMAGE_HEAD} />
            </svg>
          </ProfileContainer>
        </Link>
        </div>
      </FlexContainer>
    </HeaderContainer>
  )
}

Header.propTypes = {
  logoutUser: PropTypes.func,
  authenticated: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, { logoutUser })(Header)
