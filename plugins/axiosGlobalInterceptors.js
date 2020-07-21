export default ({ store, app: { $axios } }) => {
  console.log('plugin')
  $axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      console.log('Response'.response)
      return response
    },
    function (error) {
      // Do something with response error
      console.log('Found Error')
      store.dispatch('snackbar/setSnack', {
        message: error.message,
        color: 'error',
      })
      return Promise.reject(error)
    }
  )
}
