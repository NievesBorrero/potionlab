import { HTTP_ERROR } from '../constants/http'
import {
  HttpAuthenticationError,
  BadRequestError,
  InternalServerError
} from '../errors/index'
import _ from 'lodash'

export class ApiClient {
  constructor (token) {
    this.BASE_URL = '/api/v1/{resource}/'
    this.resource = null
    this.setHeaders(token)
  }

  on (resource) {
    this.resource = resource
    return this
  }

  setHeaders (token, extraOptions) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + token
    }
    this.headers = { ...defaultHeaders, ...extraOptions }
    return this
  }

  authenticate (payload) {
    const request = new Request('/api-token-auth/', {
      method: 'POST',
      headers: {},
      body: payload
    })

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      return response.json()
    })
  }

  register (payload) {
    const request = new Request(this.generateUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    return this.request(request)
  }

  upload (token, payload, id) {
    const request = new Request(this.generateUrl('upload/'.concat(id)), {
      method: 'POST',
      headers: { Authorization: 'JWT ' + token },
      body: payload
    })
    return this.request(request)
  }

  uploadBase64File (payload, id) {
    const request = new Request(this.generateUrl('upload/'.concat(id)), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload)
    })
    return this.request(request)
  }

  list (payload) {
    let url = this.generateUrl()

    if (payload) {
      url = url.concat('?', payload.filter, '=', payload.query)
    }

    const request = new Request(url, {
      method: 'GET',
      headers: this.headers
    })
    return this.request(request)
  }

  retrieve (id) {
    const request = new Request(this.generateUrl(id), {
      method: 'GET',
      headers: this.headers
    })
    return this.request(request)
  }

  create (payload) {
    const request = new Request(this.generateUrl(), {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.headers
    })

    return this.request(request)
  }

  update (id, payload) {
    const request = new Request(this.generateUrl(id), {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: this.headers
    })
    return this.request(request)
  }

  delete (id) {
    const request = new Request(this.generateUrl(id), {
      method: 'DELETE',
      headers: this.headers
    })
    return this.request(request)
  }

  request (request) {
    return fetch(request)
      .then(response => this.handleHttpResponse(response))
      .then(response => this.handleHttpResponseData(response))
  }

  generateUrl (id) {
    let url = _.replace(this.BASE_URL, '{resource}', this.resource)

    if (id) {
      return url.concat(id, '/')
    }

    return url
  }

  handleHttpErrorResponses (response) {
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

  handleHttpResponse (response) {
    this.handleHttpErrorResponses(response)

    if (response.status === 204) {
      return
    }

    return response.json()
  }

  handleHttpResponseData (data) {
    if (data.status_code !== 400) {
      return data
    }
    throw new BadRequestError(JSON.stringify(data))
  }

  static getHttpActionError (error, defaultError) {
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
}

export const apiCreate = (token, resource, payload) => {
  const apiClient = new ApiClient(token)
  return apiClient.on(resource).create(payload)
}

export const apiRetrieve = (token, resource, id) => {
  const apiClient = new ApiClient(token)
  return apiClient.on(resource).retrieve(id)
}

export const apiDelete = (token, resource, id) => {
  const apiClient = new ApiClient(token)
  return apiClient.on(resource).delete(id)
}

export const apiList = (token, resource, payload) => {
  const apiClient = new ApiClient(token)
  return apiClient.on(resource).list(payload)
}

export const apiUpdate = (token, resource, payload, id) => {
  const apiClient = new ApiClient(token)
  return apiClient.on(resource).update(id, payload)
}

export const apiAuthenticate = payload => {
  const apiClient = new ApiClient({})
  return apiClient.authenticate(payload)
}

export const apiRegister = payload => {
  const apiClient = new ApiClient()
  return apiClient.on('users').register(payload)
}

export const apiUploadFile = (token, resource, payload, id) => {
  const apiClient = new ApiClient()
  return apiClient.on(resource).upload(token, payload, id)
}

export const apiUploadBase64File = (token, resource, payload, id) => {
  const apiClient = new ApiClient(token)
  return apiClient.on(resource).uploadBase64File(payload, id)
}
