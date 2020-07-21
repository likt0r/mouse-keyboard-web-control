export default ({ store, app: { $axios } }) => {
  $axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      // Do something with response error
      store.dispatch('snackbar/setSnack', {
        message: error.message,
        color: 'error',
      })
      return Promise.reject(error)
    }
  )
}
