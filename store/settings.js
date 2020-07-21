export const state = () => ({
  touchSpeed: 2,
  touchAccel: 1.1,
})

export const mutations = {
  SET_TOUCH_SPEED(state, speed) {
    state.touchSpeed = speed
  },
  SET_TOUCH_ACCEL(state, accel) {
    state.touchAccel = accel
  },
}
export const actions = {
  setTouchSpeed({ commit }, speed) {
    commit('SET_TOUCH_SPEED', speed)
  },
  setTouchAccel({ commit }, accel) {
    commit('SET_TOUCH_ACCEL', accel)
  },
}
