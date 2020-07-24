const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const cors = require('cors')
const app = express()

const magnifier = require('../../scripts/linux/magnifier')
const shutdown = require('../../scripts/linux/shutdown')

const refreshTokens = []
app.use(cors())
app.use(bodyParser.json())

app.post('/open', function (req, res) {
  const { target, url } = req.body
  if (target === 'browser') exec(`xdg-open http://`)
  else if (target === 'file') exec(`xdg-open ~/`)
  else {
    res.status(500)
  }
  res.end()
})

app.post('/shutdown', async function (req, res) {
  const { minutes } = req.body
  if (typeof minutes === 'number' && minutes >= 0) {
    await shutdown.set(minutes)
  } else {
    res.status(500)
  }
  res.end()
})

app.delete('/shutdown', async function (req, res) {
  await shutdown.cancel()
  res.end()
})

app.get('/shutdown', async function (req, res) {
  const result = await shutdown.get()
  res.json({ timer: Math.round(result / 1000) })
})

app.post('/magnifier', async function (req, res) {
  const { active } = req.body
  if (typeof active === 'boolean') {
    await magnifier.set(active)
  } else {
    res.status(500)
  }
  res.end()
})

app.get('/magnifier', async function (req, res) {
  console.log('/magnifier get')
  const active = await magnifier.get()
  return res.json({ active })
})

module.exports = {
  path: '/api/commands',
  handler: app,
}
