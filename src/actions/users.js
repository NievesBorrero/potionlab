import { USER } from '../constants/users'

export function logoutUser() {
  return { type: USER.AUTHENTICATE.LOGOUT }
}

export function checkAuthenticated() {
  return { type: USER.AUTHENTICATE.CHECK }
}

export function authenticateUser(user) {
  return { type: USER.AUTHENTICATE.REQUEST, user }
}

export function authenticateSuccess(payload) {
  return { type: USER.AUTHENTICATE.SUCCESS, payload }
}

export function authenticateError(payload) {
  return { type: USER.AUTHENTICATE.ERROR, payload: payload }
}

export function authenticateComplete(token) {
  return { type: USER.AUTHENTICATE.COMPLETE, token }
}

export function getUserSuccess(user) {
  return { type: USER.GET.SUCCESS, user }
}

export function getUsers() {
  return { type: USER.LIST.REQUEST }
}

export function getUsersSuccess(users) {
  return { type: USER.LIST.SUCCESS, users }
}

export function updateUserSuccess(user) {
  return { type: USER.UPDATE.SUCCESS, user }
}

export function createUserSuccess(message) {
  return { type: USER.CREATE.SUCCESS, message }
}

export function getUsersError() {
  return { type: USER.LIST.ERROR }
}

export function createUser(user) {
  return { type: USER.CREATE.REQUEST, user }
}

export function updateUser(user) {
  return { type: USER.UPDATE.REQUEST, user }
}
