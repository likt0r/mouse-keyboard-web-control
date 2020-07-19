const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const app = express()

const refreshTokens = []
app.use(bodyParser.json())

app.post('/move', function (req, res) {
  const { x, y } = req.body
  exec(`xdotool mousemove_relative -- ${x} ${y}`)
  //   exec('xdotool getmouselocation', (error, stdout, stderr) => {
  //     console.log(stdout)
  //   })
  res.end()
})

/**
 * button: value 1-3 1 left; 2 right; 3;middle
 */
app.post('/click', function (req, res) {
  const { button } = req.body
  // console.log('/click ', button)
  if (button === 'left') exec(`xdotool click ${1}`)
  if (button === 'right') exec(`xdotool click ${3}`)
  if (button === 'middle') exec(`xdotool click ${2}`)
  res.end()
})

module.exports = {
  path: '/api/mouse',
  handler: app,
}
