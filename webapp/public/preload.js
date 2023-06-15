// window.require = require;
const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('server', {
    connect: (device)=> {
        if (device === "PDG") {
            ipcRenderer.invoke('connectPDG')
        }
        else if (device === "Spectrometer") {
            ipcRenderer.invoke('connectSpectrometer')
        }
        else if (device === "Robot") {
            ipcRenderer.invoke('connectRobot')
        }
    },
    connectPDG: ()=> ipcRenderer.invoke('connectPDG'),
    connectSpectrometer: ()=> ipcRenderer.invoke('connectSpectrometer'),
    connectRobot: ()=> ipcRenderer.invoke('connectRobot'),
})