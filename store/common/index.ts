import type { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'

enum MUTATIONS {
  SET_LOADING = 'SET_LOADING',
  SET_NAV_ACTIVE = 'SET_NAV_ACTIVE',
}

export const state = () => ({
  loading: false,
  navActive: false,
})

export type CommonState = ReturnType<typeof state>

export const mutations: MutationTree<CommonState> = {
  [MUTATIONS.SET_LOADING]: (state, payload: boolean) =>
    (state.loading = payload),
  [MUTATIONS.SET_NAV_ACTIVE]: (state, payload: boolean) =>
    (state.navActive = payload),
}

export const actions: ActionTree<CommonState, RootState> = {
  setLoading({ commit }, payload: boolean) {
    commit(MUTATIONS.SET_LOADING, payload)
  },
  setNavActive({ commit }, payload: boolean) {
    commit(MUTATIONS.SET_NAV_ACTIVE, payload)
  },
}

export const getters: GetterTree<CommonState, RootState> = {}
