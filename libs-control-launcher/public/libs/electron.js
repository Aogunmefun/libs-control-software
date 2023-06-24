const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const {PythonShell} = require('python-shell')
const fs = require('fs')
const axios = require('axios')
// require('update-electron-app')()


// let pyshell = new PythonShell("C:/Users/deolu/OneDrive/Documents/Ligo/LIBS/libs-control-software/server/main.py")
// let pyshell = new PythonShell("../../server/main.py")

var win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
      },
      icon: path.join(__dirname, "icon.png")
    });
  
    // and load the index.html of the app.
    // win.loadFile("index.html");
    // win.loadURL(
    //   isDev
    //     ? 'http://localhost:3000'
    //     : `file://${path.join(__dirname, '../build/index.html')}`
    // );
    win.loadURL('http://localhost:3000');
    // win.loadURL(path.join(__dirname, "index.html"))
    // Open the DevTools.
    // if (isDev) {
    //   win.webContents.openDevTools({ mode: 'detach' });
    // }
  }

  
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(()=>{

    ipcMain.handle('request', async (_, axios_request) => {
      const result = await axios(axios_request)
      return { data: result.data, status: result.status }
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
  