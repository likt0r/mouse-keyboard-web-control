const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/key', function (req, res) {
  console.log('key ', req.body)
  const { code } = req.body
  console.log('key ', code)
  if (typeof code !== 'number') {
    res.status(500)
  } else {
    exec(`xdotool key "${toHexCode(code)}"`)
  }

  res.end()
})
function toHexCode(number) {
  let template = '0x0000'
  let hex = number.toString(16)
  return template.slice(0, 6 - Math.min(hex.length, 4)).concat(hex)
}
module.exports = {
  path: '/api/keyboard',
  handler: app,
}
