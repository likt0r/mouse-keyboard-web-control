const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const cors = require('cors')
const audio = require('../../scripts/linux/audio')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/volume', async function (req, res) {
  const volume = await audio.getVolume()
  res.json({ volume })
})
app.post('/volume', async function (req, res) {
  const { volume } = req.body
  if (typeof volume !== 'number') {
    res.status(500)
  } else {
    await audio.setVolume(volume)
  }
  res.end()
})

app.get('/mute', async function (req, res) {
  const muted = await audio.getMuteStatus()
  res.json({ muted })
})

app.post('/mute', async function (req, res) {
  const { mute } = req.body
  if (typeof mute !== 'boolean') {
    res.status(500)
  } else {
    await audio.setMuteStatus(mute)
  }
  res.end()
})

module.exports = {
  path: '/api/audio',
  handler: app,
}
