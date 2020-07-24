let timerIntervall
export const plugins = [
  (store) => {
    // called when the store is initialized
    store.subscribe((mutation, state) => {
      if (mutation.type === 'shutdown/SET_ACTIVE') {
        if (state.shutdown.active) {
          if (!timerIntervall) {
            timerIntervall = setInterval(() => {
              const time = store.state.shutdown.timer - 1
              if (time === 0) {
                store.commit('shutdown/SET_ACTIVE', false)
                clearInterval(timerIntervall)
                timerIntervall = undefined
              }
              store.commit('shutdown/SET_TIMER', time)
            }, 1000)
          }
        } else {
          clearInterval(timerIntervall)
          timerIntervall = undefined
        }
      }
    })
  },
]
