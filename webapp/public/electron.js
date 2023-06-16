const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const {PythonShell} = require('python-shell')
const fs = require('fs')
require('update-electron-app')()


let pyshell = new PythonShell("C:/Users/deolu/OneDrive/Documents/Ligo/LIBS/libs-control-software/server/main.py")


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
      icon:"favicon-L.ico"
    });
  
    // and load the index.html of the app.
    // win.loadFile("index.html");
    // win.loadURL(
    //   isDev
    //     ? 'http://localhost:3000'
    //     : `file://${path.join(__dirname, '../build/index.html')}`
    // );
    win.loadURL('http://localhost:3000');
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
    // Open the DevTools.
    // if (isDev) {
    //   win.webContents.openDevTools({ mode: 'detach' });
    // }
  }

  
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(()=>{
    ipcMain.handle('connectPDG', ()=> {
      pyshell.send(JSON.stringify({function: 'connectPDG', arguments: [true]}))
    })
    ipcMain.handle('connectSpectrometer', ()=> {
      console.log("sending")
      pyshell.send(JSON.stringify({function: 'connectSpectrometer', arguments: [true]}))
    })
    ipcMain.handle('connectRobot', ()=> {
      pyshell.send(JSON.stringify({function: 'connectRobot', arguments: [true]}))
    })
    ipcMain.handle('runAll', ()=>{
      console.log("runAll")
      pyshell.send(JSON.stringify({function: 'runAll', arguments: []}))
    })
    ipcMain.handle('getFiles', (channel, folder)=>{
      console.log(folder)
      let files = []
      const getDirectories = source =>
        fs.readdirSync(source, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
      const getFiles = source =>
        fs.readdirSync(source)
      let dates = getDirectories(folder)
      // dates.forEach((date)=>files.push({
      //   date: date, 
      //   sessions: getDirectories("F:/LIBS DB/"+date+"/Sessions").map((session)=>{
      //     return {
      //       name:session,
      //       runs: getFiles("F:/LIBS DB/"+date+"/Sessions/"+session).map((run)=>{
      //         return {name: run}
      //       })
      //     }
      //   })
      // }))
      dates.forEach((date)=>files.push({
        date: date, 
        runs: getFiles("F:/LIBS DB/"+date+"/runs").map((run)=>{
          return {name: run}
        })
          
        
      }))
      // res = res.map((date)=>getDirectories("F:/LIBS DB/"+date+"/Sessions"))
      console.log(files)
      return files
    })
    createWindow()
    pyshell.on('message', function(msg) {
      console.log(msg)
      win.webContents.send('response', JSON.parse(msg))
      
    })
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
  