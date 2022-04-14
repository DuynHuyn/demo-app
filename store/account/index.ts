import type { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '..'
import { FranchiseeObject } from '~/models/account'

export enum AccountMutations {
  SET_FRANCHISEE = 'SET_FRANCHISEE',
}

export const state = () =>
  ({
    franchisee: {
      fetched: false,
      data: {
        storeInformation: {
          code: '',
          name: '',
        },
        name: '',
        contractStartDate: '',
        billingInformation: {
          firstName: '',
          lastName: '',
          companyName: '',
          phone: '',
          address1: '',
          address2: '',
          city: {
            key: '',
            value: '',
          },
          state: {
            key: '',
            value: '',
          },
          zip: '',
          country: '',
        },
        deliveryInformation: {
          firstName: '',
          lastName: '',
          companyName: '',
          phone: '',
          address1: '',
          address2: '',
          city: {
            key: '',
            value: '',
          },
          state: {
            key: '',
            value: '',
          },
          zip: '',
          country: '',
        },
      },
    },
  } as { franchisee: { fetched: boolean; data: FranchiseeObject } })

export type AccountState = ReturnType<typeof state>

export const getters: GetterTree<AccountState, RootState> = {
  isFetched({ franchisee: { fetched } }) {
    return fetched
  },
}

export const mutations: MutationTree<AccountState> = {
  [AccountMutations.SET_FRANCHISEE](
    state: AccountState,
    payload: { fetched: boolean; data: FranchiseeObject }
  ) {
    state.franchisee = payload
  },
}

export const actions: ActionTree<AccountState, RootState> = {
  async fetchFranchisee({ commit, dispatch }) {
    dispatch('common/setLoading', true, { root: true })
    const payload = await this.$services.account.getFranchisee()
    commit(AccountMutations.SET_FRANCHISEE, { fetched: true, data: payload })
    dispatch('common/setLoading', false, { root: true })
  },
}
