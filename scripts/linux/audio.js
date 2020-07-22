const { exec, execFile } = require('child_process')
const path = require('path')
module.exports = {
  getDefaultDevice() {
    'pacmd dump | grep default'
  },
  getVolume() {
    return new Promise((resolve, reject) => {
      exec(
        `pacmd list-sinks|grep -A 15 '* index'| awk '/volume: front/{ print $5 }' | sed 's/[%|,]//g'`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            reject(error)
          }
          console.log(`stdout:${parseInt(stdout)}`)
          resolve(parseInt(stdout))
        }
      )
    })
  },
  setVolume(volume) {
    return new Promise((resolve, reject) => {
      if (typeof volume === 'number') {
        const clampedValue = Math.max(0, Math.min(100, volume))
        console.log(clampedValue)
        execFile(
          path.join(__dirname, '/setVolume.sh'),
          [clampedValue + '%'],
          (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`)
              reject(error)
            }
            resolve()
          }
        )
      }
    })
  },
  getMuteStatus() {
    return new Promise((resolve, reject) => {
      exec(
        "pacmd list-sinks|grep -A 15 '* index'|awk '/muted:/{ print $2 }'",
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            reject(error)
          }
          console.log(`stdout:${stdout}`)
          resolve(stdout.trim() === 'yes' ? true : false)
        }
      )
    })
  },
  setMuteStatus(mute) {
    return new Promise((resolve, reject) => {
      console.log(mute)
      if (typeof mute === 'boolean') {
        execFile(
          path.join(__dirname, '/setMute.sh'),
          [mute ? 1 : 0],
          (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`)
              reject(error)
            }
            resolve()
          }
        )
      }
    })
  },
}
