import { Context } from '@nuxt/types'
import { ErrorObject } from '../models/common/ErrorObject'

export default ({ $axios }: Context) => {
  // $axios.onRequest((config) => {})

  // Passing error data to next handlers
  $axios.onResponseError(({ response }: any) => {
    const { status, title, errors } = response
    const error: ErrorObject = {
      statusCode: status,
      message: title || JSON.stringify(errors),
      errors,
    }
    throw new Error(JSON.stringify(error))
  })
}
