const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const cors = require('cors')
const app = express()

app.use(cors())
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
