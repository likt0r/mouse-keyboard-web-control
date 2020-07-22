const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const cors = require('cors')
const app = express()

const magnifier = require('../../scripts/linux/magnifier')

const refreshTokens = []
app.use(cors())
app.use(bodyParser.json())

app.post('/open', function (req, res) {
  const { target } = req.body
  console.log('/open ', target)
  if (target === 'browser') exec(`xdg-open http://`)
  else if (target === 'file') exec(`xdg-open ~/`)
  else {
    res.status(500)
  }
  res.end()
})

app.post('/shutdown', async function (req, res) {
  const { time } = req.body
  console.log('/shutdowm ', time)
  if (typeof time === 'number' && time >= 0) {
    await exec(`shutdown -P ${time}`)
  } else {
    res.status(500)
  }
  res.end()
})

app.delete('/shutdown', async function (req, res) {
  console.log('/shutdowm delete')
  await exec(`shutdown -c`)
  res.end()
})

app.post('/magnifier', async function (req, res) {
  const { active } = req.body
  console.log('/magnifier ', active)
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
