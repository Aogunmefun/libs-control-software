const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const {PythonShell} = require('python-shell')

let pyshell = new PythonShell("C:/Users/deolu/OneDrive/Documents/Ligo/LIBS/libs-control-software/server/main.py")

pyshell.on('message', function(msg) {
  console.log(msg)
})


function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
      },
      icon:"webapp/public/favicon-L.ico"
    });
  
    // and load the index.html of the app.
    // win.loadFile("index.html");
    // win.loadURL(
    //   isDev
    //     ? 'http://localhost:3000'
    //     : `file://${path.join(__dirname, '../build/index.html')}`
    // );
    win.loadURL('http://localhost:3000');
    // Open the DevTools.
    if (isDev) {
      win.webContents.openDevTools({ mode: 'detach' });
    }
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(()=>{
    ipcMain.handle('connectPDG', ()=> {
      pyshell.send('connectPDG')
    })
    ipcMain.handle('connectSpectrometer', ()=> {
      pyshell.send('connectSpectrometer')
    })
    ipcMain.handle('connectRobot', ()=> {
      pyshell.send('connectRobot')
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
  