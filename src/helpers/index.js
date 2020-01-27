import { runSaga } from 'redux-saga'

import { history } from '../store/index'
import { HTTP_ERROR } from '../constants/http'
import {
  HttpAuthenticationError,
  BadRequestError,
  InternalServerError
} from '../errors'

export const redirectTo = target => {
  history.push(target)
}

export async function recordSaga(saga, initialAction) {
  const dispatched = []

  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => ({})
    },
    saga,
    initialAction
  ).done

  return dispatched
}

export const getHttpActionError = (error, defaultError) => {
  switch (error.constructor) {
    case HttpAuthenticationError:
      return HTTP_ERROR.AUTHENTICATION
    case BadRequestError:
      return HTTP_ERROR.BAD_REQUEST
    case InternalServerError:
      return HTTP_ERROR.INTERNAL_SERVER_ERROR
    default:
      return defaultError
  }
}

export const handleHttpErrorResponses = response => {
  if ([403, 401].includes(response.status)) {
    throw new HttpAuthenticationError('Need to login again')
  }

  if (response.status >= 500) {
    throw new InternalServerError('Internal server error')
  }

  if (!response.ok && response.status !== 400) {
    throw Error('Response not valid')
  }
}

export const handleHttpResponse = response => {
  handleHttpErrorResponses(response)

  if (response.status === 204) {
    return
  }

  return response.json()
}

export const handleHttpResponseCsv = response => {
  handleHttpErrorResponses(response)
  return response.text()
}

export const handleHttpResponseData = data => {
  if (data.status_code !== 400) {
    return data
  }
  throw new BadRequestError(JSON.stringify(data))
}

export const getHttpHeaders = (token, extraOptions = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: 'JWT ' + token
  }

  return { ...defaultHeaders, ...extraOptions }
}
