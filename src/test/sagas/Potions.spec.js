import {
  getPotions
} from '../../sagas/potions'
import { recordSaga } from '../../helpers/index'
import * as selectors from '../../selectors/index'
import * as api from '../../services/ApiClient'
import { BadRequestError, HttpAuthenticationError } from '../../errors'
import { POTION } from '../../constants/actionTypes'
import { HTTP_ERROR } from '../../constants/http'

describe('getPotions', () => {
  selectors.getToken = jest.fn()
  api.apiList = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    selectors.getToken.mockImplementation(() => 'mytoken')
  })

  it('should return sucess if valid request', async () => {
    const payload = [{ id: 1 }, { id: 2 }]
    api.apiList.mockImplementation(() => {
      return payload
    })

    const initialAction = {}
    const dispatched = await recordSaga(getPotions, initialAction)

    expect(dispatched).toContainEqual({
      type: POTION.LIST.SUCCESS,
      payload: payload
    })
    expect(api.apiList).toHaveBeenCalled()
  })

  it('should return error if invalid request', async () => {
    const error = Error()
    api.apiList.mockImplementation(() => { throw error })

    const initialAction = {}
    const dispatched = await recordSaga(getPotions, initialAction)

    expect(dispatched).toContainEqual({
      type: POTION.LIST.ERROR,
      payload: error
    })
    expect(api.apiList).toHaveBeenCalled()
  })

  it('should return error if permission denied', async () => {
    const error = new HttpAuthenticationError()
    api.apiList.mockImplementation(() => { throw error })

    const initialAction = {}
    const dispatched = await recordSaga(getPotions, initialAction)

    expect(dispatched).toContainEqual({
      type: HTTP_ERROR.AUTHENTICATION,
      payload: error
    })
    expect(api.apiList).toHaveBeenCalled()
  })

  it('should return error if bad request', async () => {
    const error = new BadRequestError()
    api.apiList.mockImplementation(() => { throw error })

    const initialAction = {}
    const dispatched = await recordSaga(getPotions, initialAction)

    expect(dispatched).toContainEqual({
      type: HTTP_ERROR.BAD_REQUEST,
      payload: error
    })
    expect(api.apiList).toHaveBeenCalled()
  })
})
