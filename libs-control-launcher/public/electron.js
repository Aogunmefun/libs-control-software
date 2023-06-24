const path = require('path');

const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const axios = require('axios')
var info
try {
    info = require('../../release/info.json');
} catch (e) {
    info = false
}
const fs = require('fs');
// const childProcess = require('child_process')
const util = require('util')
// const exec = util.promisify(require("child_process").exec)
const { spawn } = require("child_process");


var win

function createWindow() {
  // Create the browser window.
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: true,
    },
    icon: path.join(__dirname, "icon.png")
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
    
  }
  
}

function getUpdate() {
    // exec(path.join(__dirname, `update.bat ${__dirname}`), (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         return;
    //     }
    //     if (stderr) {
    //         console.log(`stderr: ${stderr}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(()=>{
    ipcMain.handle('queryUpdate', async ()=>{
        try {
            if (!info) return {"res": true, update:true}
            let res =  await axios({
                url:"http://3.15.145.129/release/info.json",
                method:"GET"
            })
            return {"res":true, "update":res.data.version!==info.version}
        } catch (e) {
            return {"res": false}
        }
        
    })
    ipcMain.handle('getUpdate', async ()=>{
        console.log("Getting update")
        try {
            // const updater = childProcess.spawn('cmd.exe', ['update.bat'])
            // updater.stdout.on('data', function (data) {
            // console.log('stdout: ' + data);
            // });
            // updater.stderr.on('data', function (data) {
            // console.log('stderr: ' + data);
            // });
            // updater.on('exit', function (code) {
            // console.log('child process exited with code ' + code);
            // });
            // childProcess.exec("cmd.exe update.bat", function (err, stdout, stderr) {
            //     if (err) {
            //          console.log(stderr);
            //          return;
            //     }
            //     if (stdout) {
            //         console.log("out", stdout)
            //     }
            //     // Done.
            //     console.log(stdout);
            // });
            // let path = path.resolve("/update.bat")
            // await util.promisify(getUpdate())
            const updater = spawn(path.join(__dirname, `update.bat`), [`${__dirname}`])
            updater.stdout.on("data", data => {
                console.log(`stdout: ${data}`);
            });
            
            updater.stderr.on("data", data => {
                // console.log(`stderr: ${data}`);
                // console.log("keys")
                
            });
            
            updater.on('error', (error) => {
                console.log(`error: ${error.message}`);
                return {"res":false}
            });
            
            updater.on("close", code => {
                console.log("done")
                return {"res":true}
                console.log(`child process exited with code ${code}`);
            });
            
        } catch (e) {
            console.log(e)
            return {"res": false}
        }
    })
    createWindow()
    
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});