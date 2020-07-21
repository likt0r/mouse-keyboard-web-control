import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'settings',
    paths: ['settings.touchSpeed', 'settings.touchAccel'],
  })(store)
}
