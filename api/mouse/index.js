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
  console.log('/click ', button)
  if (button === 'left') exec(`xdotool click ${1}`)
  if (button === 'right') exec(`xdotool click ${3}`)
  if (button === 'middle') exec(`xdotool click ${2}`)
  res.end()
})
app.post('/wheel', function (req, res) {
  const { direction } = req.body
  console.log('/wheel ', direction)
  if (direction === 'up') exec(`xdotool click ${4}`)
  if (direction === 'down') exec(`xdotool click ${5}`)
  res.end()
})

app.post('/mouse-down', function (req, res) {
  const { button } = req.body
  console.log('/mouse-down ', button)
  if (button === 'left') exec(`xdotool mousedown ${1}`)
  if (button === 'right') exec(`xdotool mousedown ${3}`)
  if (button === 'middle') exec(`xdotool mousedown ${2}`)
  res.end()
})

app.post('/mouse-up', function (req, res) {
  const { button } = req.body
  console.log('/mouse-up ', button)
  if (button === 'left') exec(`xdotool mouseup ${1}`)
  if (button === 'right') exec(`xdotool mouseup ${3}`)
  if (button === 'middle') exec(`xdotool mouseup ${2}`)
  res.end()
})

module.exports = {
  path: '/api/mouse',
  handler: app,
}
