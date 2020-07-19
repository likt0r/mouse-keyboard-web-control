import axios from 'axios'
export default function factory(url, dataAccumulator, preSendAlteration) {
  let dataPipeline = []
  let pending = false
  let _preSendAlteration = preSendAlteration
  return {
    async send(data) {
      if (data) dataPipeline.push(data)
      if (!pending) {
        pending = true
        const accumulated = dataAccumulator(dataPipeline)
        dataPipeline = []
        await axios.post(url, _preSendAlteration(accumulated))
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
    setPreSendAlteration(alteration) {
      _preSendAlteration = alteration
    },
  }
}
