// window.require = require;
const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('server', {
    connect: async (device)=> {
        if (device === "PDG") {
            ipcRenderer.invoke('connectPDG')
        }
        else if (device === "Spectrometer") {
            console.log("Trying")
            ipcRenderer.invoke('connectSpectrometer')

        }
        else if (device === "Robot") {
            console.log("Robot")
            ipcRenderer.invoke('connectRobot')
        }
    },
    response: (callback) => ipcRenderer.on('response', callback),
    getFiles: async (files)=> {
        let res = await ipcRenderer.invoke("getFiles", files)
        console.log(res)
        return res
    },
    runAll: ()=>ipcRenderer.invoke('runAll')
})