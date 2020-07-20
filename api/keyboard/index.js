const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const app = express()

const refreshTokens = []
app.use(bodyParser.json())

app.post('/key', function (req, res) {
  const { code } = req.body
  exec(`xdotool key "${code}"`)

  res.end()
})

module.exports = {
  path: '/api/keyboard',
  handler: app,
}
