export const state = () => ({
  uiLandscape: false,
})

export const mutations = {
  SET_UI_LANDSCAPE(state, isLandscape) {
    state.uiLandscape = isLandscape
  },
}

export const actions = {
  setUiLandscape({ commit }, isLandscape) {
    commit('SET_UI_LANDSCAPE', isLandscape)
  },
}
