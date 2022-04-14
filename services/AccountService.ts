import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { FranchiseeDTO, FranchiseeObject } from '~/models/account'

export interface AccountServiceInstance {
  getFranchisee(): Promise<FranchiseeObject>
  updateFranchisee(payload: FranchiseeDTO): Promise<void>
}

export const createAccountService = ($axios: NuxtAxiosInstance) => ({
  getFranchisee: () =>
    $axios.$get<FranchiseeObject>(`/v1/Partner/Franchisees/Me`),
  updateFranchisee: (payload: FranchiseeDTO) =>
    $axios.$put(`/v1/Partner/Franchisees/Me`, payload),
})
