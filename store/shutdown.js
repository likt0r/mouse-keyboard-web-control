export const state = () => ({
  active: false,
  showDialog: false,
  timer: 0,
})

export const mutations = {
  SET_ACTIVE(state, active) {
    state.active = active
  },
  SET_SHOW_DIALOG(state, show) {
    state.showDialog = show
  },
  SET_TIMER(state, timer) {
    state.timer = timer
  },
}
export const actions = {
  async startTimer({ commit }, { minutes }) {
    await this.$axios.post('/api/commands/shutdown', { minutes })
    commit('SET_TIMER', minutes * 60)
    commit('SET_ACTIVE', true)
  },
  async stopTimer({ commit }) {
    await this.$axios.delete('/api/commands/shutdown')
    commit('SET_ACTIVE', false)
    commit('SET_TIMER', 0)
  },
  async showDialog({ commit }, { show }) {
    commit('SET_SHOW_DIALOG', show)
  },
  async initTimer({ commit }, { seconds }) {
    commit('SET_TIMER', seconds)
    commit('SET_ACTIVE', true)
  },
}
