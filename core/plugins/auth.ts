import { Context } from '@nuxt/types'

export default ({ $auth }: Context) => {
  // Passing error data to next handlers
  $auth.onError((error) => {
    throw error
  })
}
