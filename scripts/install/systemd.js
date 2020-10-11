const { exec, execFile, spawn } = require('child_process')

function getServiceFileContent({ port, user, directory }) {
  return `[Unit]
  Description=This service alows a control via web api
  PartOf=graphical-session.target
  After=multi-user.target
  
  
  [Service]
  ExecStart=/usr/bin/npm run start
  WorkingDirectory=/home/bewr/projects/mouse-keyboard-web-control
  StandardOutput=inherit
  StandardError=inherit
  Restart=always
  
  
  [Install]
  WantedBy=xsession.target
  
  `
}
var process = exec('npm install')

process.stdout.on('data', (data) => {})

process.stderr.on('data', (data) => {})

process.on('exit', (code) => {
  console.log('child process exited with code ' + code.toString())
})
// console.log('npm install && npm run build')

// spawn('npm install && npm run build', { stdio: 'inherit' })

// console.log('now create file')

/*
1 Create desired *.service file in ~/.config/systemd/user/
2 Run systemctl --user enable [service] (exclude .service suffix)
3 Optionally run systemctl --user start [service] to start now
4 Use systemctl --user status [service] to check how it's doing
* */
