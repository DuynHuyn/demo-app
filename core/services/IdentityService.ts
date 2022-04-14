import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { withQuery } from 'ufo'
export interface IdentityServiceInstance {
  sendResetPasswordLink<T = any>(data: { email: string }): Promise<T>
  resetPassword<T = any>(data: {
    userId: string
    password: string
    token: string
  }): Promise<T>
  changePassword<T = any>(data: {
    oldPassword: string
    password: string
  }): Promise<T>
  checkValidToken<T = any>(data: {
    token: string
    purpose: string
    purposeKey?: string
    userId: string
  }): Promise<T>
}

export const createIdentityService = ($axios: NuxtAxiosInstance) => ({
  sendResetPasswordLink(data: { email: string }): Promise<any> {
    return $axios.$post('/v1/Identity/Account/SendLinkResetPassword', data)
  },
  resetPassword(data: {
    userId: string
    password: string
    token: string
  }): Promise<any> {
    return $axios.$put('/v1/Identity/Account/ResetPassword', data)
  },
  changePassword(data: {
    oldPassword: string
    password: string
  }): Promise<any> {
    return $axios.$put('/v1/Identity/Account/ChangePassword', data)
  },
  checkValidToken(data: {
    token: string
    purpose: string
    purposeKey?: string
    userId: string
  }): Promise<any> {
    const queries: {
      Token: string
      Purpose: string
      PurposeKey?: string
      UserId: string
    } = {
      Token: data.token,
      Purpose: data.purpose,
      UserId: data.userId,
    }
    if (data.purposeKey) {
      queries.PurposeKey = data.purposeKey
    }
    return $axios.$get(
      withQuery('/v1/Identity/Account/CheckValidToken?', queries)
    )
  },
})
