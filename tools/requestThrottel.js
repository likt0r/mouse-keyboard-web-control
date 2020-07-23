export default function factory({
  axios,
  method,
  url,
  accumulator,
  preSendFilter,
}) {
  let dataPipeline = []
  let pending = false
  let _preSendFilter = preSendFilter
  return {
    async send(data) {
      if (data) dataPipeline.push(data)
      if (!pending) {
        pending = true
        const accumulated = accumulator(dataPipeline)
        dataPipeline = []
        await axios[method](
          url,
          _preSendFilter ? _preSendFilter(accumulated) : accumulated
        )
        pending = false
        if (dataPipeline.length > 0) {
          this.send()
        }
      }
    },
    isPending() {
      return pending
    },
    cancelPending() {
      dataPipeline = []
    },
    setpreSendFilter(alteration) {
      _preSendFilter = alteration
    },
  }
}
