const { exec } = require('child_process')
const path = require('path')
const { execArgv } = require('process')
module.exports = {
  get() {
    return new Promise((resolve, reject) => {
      exec(
        `busctl get-property org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager ScheduledShutdown`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            reject(error)
          }
          const shutdownTime = parseInt(stdout.split(' ')[2])
          console.log(shutdownTime)
          console.log(Date.now())

          //  if no shutdown is sheduled 0 is returned from busctl
          resolve(
            shutdownTime ? Math.round(shutdownTime / 1000 - Date.now()) : 0
          )
        }
      )
    })
  },
  set(mintues) {
    return new Promise((resolve, reject) => {
      if (typeof mintues === 'number') {
        exec(`shutdown +${mintues}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            reject(error)
          }
          resolve()
        })
      }
    })
  },
  cancel() {
    return new Promise((resolve, reject) => {
      exec(`shutdown -c`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          reject(error)
        }
        resolve()
      })
    })
  },
}
