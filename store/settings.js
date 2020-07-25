export const state = () => ({
  touchSpeed: 2,
  touchAccel: 1.1,
  keyboardDisplayTimeout: 6,
})

export const mutations = {
  SET_TOUCH_SPEED(state, speed) {
    state.touchSpeed = speed
  },
  SET_TOUCH_ACCEL(state, accel) {
    state.touchAccel = accel
  },
  SET_KEYBOARD_DISPLAY_TIMEOUT(state, timeout) {
    state.keyboardDisplayTimeout = timeout
  },
}
export const actions = {
  setTouchSpeed({ commit }, speed) {
    commit('SET_TOUCH_SPEED', speed)
  },
  setTouchAccel({ commit }, accel) {
    commit('SET_TOUCH_ACCEL', accel)
  },
  setKeyboardDisplayTimeout({ commit }, timeout) {
    commit('SET_KEYBOARD_DISPLAY_TIMEOUT', timeout)
  },
}
