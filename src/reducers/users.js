import { USER } from '../constants/users'
import { HTTP_ERROR } from '../constants/http'
import { getFromLocal } from '../services/LocalPersistService'

const token = getFromLocal('token')
const user = getFromLocal('user')
const authenticated = !!token

const setDefaultUser = () => {
  return {
    id: 0,
    email: '',
    first_name: '',
    is_staff: false,
    is_active: false,
    username: null
  }
}

const initialState = {
  currentUser: setDefaultUser(),
  authenticated: authenticated,
  token: token
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER.AUTHENTICATE.COMPLETE:
      return {
        ...state,
        token: action.token,
        authenticated: true
      }
    case USER.AUTHENTICATE.LOGOUT:
      return {
        ...state,
        token: '',
        authenticated: false,
        currentUser: setDefaultUser()
      }
    case HTTP_ERROR.AUTHENTICATION:
      return {
        ...state,
        token: '',
        authenticated: false
      }
    case HTTP_ERROR.INTERNAL_SERVER_ERROR:
      return {
        ...state,
        token: '',
        authenticated: false
      }
    case USER.GET.SUCCESS:
      return {
        ...state,
        currentUser: action.user
      }
    default:
      return state
  }
}
