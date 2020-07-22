const { exec } = require('child_process')
const path = require('path')
const { execArgv } = require('process')
module.exports = {
  get() {
    return new Promise((resolve, reject) => {
      exec(
        `dconf read /org/gnome/desktop/a11y/applications/screen-magnifier-enabled`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            reject(error)
          }
          console.log(`stdout:${stdout}`)
          resolve(stdout === 'true')
        }
      )
    })
  },
  set(value) {
    return new Promise((resolve, reject) => {
      if (typeof value === 'boolean') {
        exec(
          `dconf write /org/gnome/desktop/a11y/applications/screen-magnifier-enabled ${value}`,
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
