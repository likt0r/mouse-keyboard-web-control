export const state = () => ({
  snack: null,
})

export const mutations = {
  SET_SNACK(state, snack) {
    state.snack = snack
  },
}
export const actions = {
  setSnack({ commit }, { message, color }) {
    const snack = {
      message,
      color: color || 'success',
    }
    commit('SET_SNACK', snack)
  },
}
